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
        <div class="title">线路OD图</div>
        <div class="map">
          <LineOD />
        </div>
      </div>
      <div class="right-bottom-wrapper">
        <div class="station-wrapper" style="border-right: 1px solid #ccc;">
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
        </div>
        <div class="line-wrapper">
          <div class="title">
            <div>客流最热线路TOP10(上车客流)</div>
            <el-select style="width:200px;margin-right:10px;position: absolute;right: 4vw; top: 4.5vh;" size="mini" filterable v-model="lineIds" multiple collapse-tags placeholder="请选择">
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
            <lineEchartsTop :sendLineIds="sendLineIds"/>
          </div>
        </div>
        <div class="month-wrapper">
          <monthEcharts></monthEcharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import totalData from './Components/totalData.vue'
import passengerVol from './Components/passengerVol.vue'
// import passengerHotmap from './Components/passengerHotmap.vue'
import LineOD from './Components/lineOD.vue'
import stationEcharts from './Components/stationEcharts.vue'
import lineEchartsTop from './Components/lineEchartsTop.vue'
import monthEcharts from './Components/month.vue'
import mixinsTime from '@/mixins/global/'
export default {
  name: 'passengerHome',
  mixins: [mixinsTime],
  data () {
    return {
      stations: [],
      loading: false,
      searchStationOptions: [],
      stationOptions: [],
      sendStations: [],
      lineOptions: [],
      lineIds: [],
      sendLineIds: []
    }
  },
  created () {
    this._stationList()
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
      if (opts === 'stations') {
        this.sendStations = this.stations.map(item => item.value)
      } else {
        this.sendLineIds = this.lineIds
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
    }
  },
  components: {
    totalData,
    passengerVol,
    // passengerHotmap,
    LineOD,
    stationEcharts,
    lineEchartsTop,
    monthEcharts
  }
}
</script>

<style lang="scss" scoped>
.passenger-home {
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
  height: 98%;
  .top-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: 100%;
    .left-top-wrapper {
      width: 44.5%;
      border: 1px solid #ccc;
      padding: 10px;
      box-sizing: border-box;
      margin-right: 0.5%;
      margin-bottom: 10px;
      height: 27vh;
    }
    .right-top-wrapper {
      width: 55%;
      border: 1px solid #ccc;
      box-sizing: border-box;
      margin-bottom: 10px;
      height: 27vh;
    }
    .left-bottom-wrapper {
      width: 51%;
      border: 1px solid #ccc;
      box-sizing: border-box;
      margin-right: 0.5%;
      height: 69%;
      .title {
        width: 100%;
        border-bottom: 1px solid #ccc;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.5rem;
        padding-left: 1rem;
        box-sizing: border-box;
        font-weight: bold;
        position: relative;
      }
      .map {
        width:100%;
        height: 96.7%;
      }
    }
    .right-bottom-wrapper {
      width: 48.5%;
      border: 1px solid #ccc;
      box-sizing: border-box;
      height: 69%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .station-wrapper, .line-wrapper {
        width: 50%;
        height: 60%;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        .title {
          width: 100%;
          border-bottom: 1px solid #ccc;
          height: 3rem;
          line-height: 3rem;
          font-size: 1.5rem;
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
