<template>
  <div class="passenger-home">
    <div class="top-wrapper">
      <div class="left-top-wrapper">
        <totalData />
      </div>
      <div class="right-top-wrapper">
        <passengerVol />
      </div>
      <div class="left-bottom-wrapper">
        <div class="title">
          <div>IC卡类型统计分析</div>
          <el-date-picker
              style="width:200px;margin-right:220px;position: absolute;right: 6vw; top: 4.5vh; z-index: 999" size="small"
              v-model="idSelectDate"
              type="date"
              :picker-options="pickerOptions"
              placeholder="选择日期">
            </el-date-picker>
            <el-select style="width:200px;margin-right:10px;position: absolute;right: 5vw; top: 4.5vh;z-index: 999" size="mini" filterable v-model="cardTypes" multiple collapse-tags placeholder="请选择卡类型">
              <el-option
                v-for="item in cardTypeData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button style="position: relative; z-index: 999;position: absolute;right: 1vw; top: 5vh;" type="primary" size="mini" @click="getTopOpts('cardType')">查询</el-button>
        </div>
        <div class="map">
          <passengerCard :sendCardType="sendCardType" @getIdType="getIdType" @getTotal="getTotal"/>
        </div>
      </div>
      <div class="right-bottom-wrapper">
        <!-- <div class="station-wrapper" style="border-right: 1px solid #ccc;">
          <div class="title">
            <div>客流最热站点TOP10(上车客流)</div>
            <el-select
              size="mini"
              ref="elSelectWrapperUp"
              style="width:200px;margin-right:10px;position: absolute;right: 4vw; top: 4.5vh;"
              multiple
              filterable
              collapse-tags
              clearable
              v-model="stations"
              remote
              reserve-keyword
              :remote-method="remoteMethod"
              placeholder="请搜索站点">
              <el-option
                v-for="item in searchStationOptions"
                :key="item.value"
                :label="item.label"
                :value="item">
              </el-option>
            </el-select>
            <el-button style="position: relative; z-index: 999;position: absolute; right: 1vw; top: 5vh;" type="primary" size="mini" @click="getTopOpts('stations')">查询</el-button>
          </div>
          <div class="map">
            <station-echarts :sendStations="sendStations"/>
          </div>
        </div> -->
        <div class="line-wrapper">
          <div class="title">
            <div>客流最热线路TOP10(登量)</div>
            <el-date-picker
              style="width:200px;margin-right:220px;position: absolute;right: 6vw; top: 4.5vh; z-index: 999" size="small"
              v-model="selectDate"
              :picker-options="pickerOptions"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <el-select style="width:200px;margin-right:10px;position: absolute;right: 5vw; top: 4.5vh;z-index: 999" size="mini" filterable v-model="lineIds" multiple collapse-tags placeholder="请选择线路">
              <el-option
                v-for="item in lineOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button style="position: relative; z-index: 999;position: absolute;right: 1vw; top: 5vh;" type="primary" size="mini" @click="getTopOpts('lines')">查询</el-button>
          </div>
          <div class="map">
            <lineEchartsTop :sendType="sendType" @getLineData="getLineData"/>
          </div>
        </div>
        <div class="month-wrapper">
          <monthEcharts @getLineTime="getLineTime"></monthEcharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import totalData from './Components/totalData.vue'
import passengerVol from './Components/passengerVol.vue'
// import passengerHotmap from './Components/passengerHotmap.vue'
import passengerCard from './Components/passengerCard.vue'
import lineEchartsTop from './Components/lineEchartsTop.vue'
import monthEcharts from './Components/month.vue'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  name: 'passengerHome',
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      stations: [],
      loading: false,
      searchStationOptions: [],
      stationOptions: [],
      sendCardType: {},
      lineOptions: [],
      lineIds: [],
      sendType: {},
      selectDate: moment().format('YYYY-MM-DD'),
      idSelectDate: moment().format('YYYY-MM-DD'),
      cardTypes: []
    }
  },
  computed: {
    ...mapGetters(['cardTypeData'])
  },
  created () {
    // this._stationList()
    this._getLinesList()
  },
  mounted () {
  },
  watch: {
    stations (newV) {
      this.condType(newV, '站点')
    },
    lineIds (newV) {
      this.condType(newV, '线路')
    }
  },
  methods: {
    _getLinesList () {
      this.$store.dispatch('getLineList').then(res => {
        this.lineOptions = res
      })
    },
    _stationList () {
      this.$store.dispatch('getStationList').then(res => {
        let arr = res
        arr.forEach(item => {
          this.stationOptions.push({
            value: item.staUuid,
            label: item.staName
          })
        })
      })
    },
    condType (value, type) {
      if (value.length > 10) {
        this.$message.warning(`最多可以选择10个${type}`)
        if (type === '站点') {
          this.stations = value.slice(0, 10)
        } else {
          this.lineIds = value.slice(0, 10)
        }
      }
    },
    getTopOpts (opts) {
      if (opts === 'cardType') {
        this.sendCardType = {
          cardTypes: this.cardTypes,
          date: this.idSelectDate
        }
      } else {
        this.sendType = {
          lineIds: this.lineIds,
          date: this.selectDate
        }
      }
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.searchStationOptions = this.stationOptions.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    // 点击最热线路
    getLineData (data) {
      this.$router.push({
        name: 'searchPassenger',
        params: {
          type: 'line',
          lineName: data,
          date: moment(this.selectDate).format('YYYY-MM-DD')
        }
      })
    },
    getIdType (data) {
      this.$router.push({
        name: 'searchPassenger',
        params: {
          type: 'idCard',
          idCard: [data],
          date: moment(this.idSelectDate).format('YYYY-MM-DD')
        }
      })
    },
    getLineTime (data) {
      this.$router.push({
        name: 'searchPassenger',
        params: {
          type: 'month',
          date: data
        }
      })
    },
    getTotal () {
      let allIdcardId = this.cardTypeData.map(item => item.value)
      console.log(this.cardTypes)
      this.$router.push({
        name: 'searchPassenger',
        params: {
          type: 'idCard',
          idCard: this.cardTypes.length === 0 ? allIdcardId : this.cardTypes,
          date: moment(this.idSelectDate).format('YYYY-MM-DD')
        }
      })
    }
  },
  components: {
    totalData,
    passengerVol,
    passengerCard,
    // stationEcharts,
    lineEchartsTop,
    monthEcharts
  }
}
</script>

<style lang="scss" scoped>
.passenger-home {
  width: 99% !important;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #ccc;
  padding: 0.5%;
  margin: 0.5%;
  box-sizing: border-box;
  border-radius: 6px;
  height: 89vh;
  .top-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: 100%;
    .left-top-wrapper {
      width: 44.5%;
      border: 1px solid #ccc;
      padding: 1vh 1vw;
      box-sizing: border-box;
      margin-right: 0.5%;
      margin-bottom: 1vh;
      height: 25vh;
    }
    .right-top-wrapper {
      width: 55%;
      border: 1px solid #ccc;
      box-sizing: border-box;
      margin-bottom: 1vh;
      height: 25vh;
    }
    .left-bottom-wrapper {
      width: 51%;
      border: 1px solid #ccc;
      box-sizing: border-box;
      margin-right: 0.5%;
      height: 61vh;
      .title {
        width: 100%;
        border-bottom: 1px solid #ccc;
        height: 4vh;
        line-height: 4vh;
        font-size: 1vw;
        padding-left: 1rem;
        box-sizing: border-box;
        font-weight: bold;
        position: relative;
      }
      .map {
        width:100%;
        height: 56vh;
      }
    }
    .right-bottom-wrapper {
      width: 48.5%;
      border: 1px solid #ccc;
      box-sizing: border-box;
      height: 61vh;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .station-wrapper, .line-wrapper {
        width: 100%;
        height: 60%;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        .title {
          width: 100%;
          border-bottom: 1px solid #ccc;
          height: 3rem;
          line-height: 3rem;
          font-size: 1vw;
          padding-left: 1rem;
          box-sizing: border-box;
          font-weight: bold;
          position: relative;
        }
        .map {
          width: 100%;
          height: 90%;
        }
      }
      .month-wrapper {
        width: 100%;
        height: 40%;
      }
    }
  }
}
</style>
