<template>
    <div class="passenger-container" :class="skinType === 0 ? 'normalBg' : ''">
        <!-- <corner-box></corner-box> -->
        <div class="passenger-item item-top">
            <div class="item-top-item item-top-left">
                <corner-box
                    boxWidth='96%'
                    boxHeight='84%'
                    :skinType="skinType"
                >
                    <div class="cornerBox-content" slot="content">
                        <totalData :skinType="skinType" />
                    </div>
                </corner-box>
            </div>
            <div class="item-top-item item-top-right">
                <corner-box
                    boxWidth='93.4%'
                    boxHeight='84%'
                    style="margin-left: 10px;"
                    :skinType="skinType"
                >
                    <div class="cornerBox-content" slot="content">
                        <div class="title">
                            <span style="background-color: rgba(236,111,0,1)"></span>
                            <span :style="{color: skinType === 0 ? '#333333' : ''}">实时客流时间趋势分析</span>
                        </div>
                        <passengerVol />
                    </div>
                </corner-box>
            </div>
        </div>
        <div class="passenger-item item-bottom">
            <div class="item-bottom-item item-bottom-left">
                <corner-box
                    boxWidth='97%'
                    boxHeight='94%'
                    :skinType="skinType"
                >
                    <div class="cornerBox-content" slot="content">
                        <div class="title">
                            <span style="background-color: #7ECEF4"></span>
                            <span :style="{color: skinType === 0 ? '#333333' : ''}">客流热力图</span>
                        </div>
                        <passengerHotmap />
                    </div>
                </corner-box>
            </div>
            <div class="item-bottom-item item-bottom-right">
                <div class="item-bottom-item-top" style="padding-right: 3.2%">
                    <div>
                        <corner-box
                            boxWidth='100%'
                            boxHeight='90%'
                            :skinType="skinType"
                        >
                            <div class="cornerBox-content" slot="content">
                                <div class="title">
                                    <span style="background-color: #7ECEF4;margin-top:4px;"></span>
                                    <span :style="{color: skinType === 0 ? '#333333' : ''}">客流最热站点TOP10(上车客流)</span>
                                </div>
                               <el-select
                                    size="mini"
                                    ref="elSelectWrapperUp"
                                    style="width:50%;margin-right:10px;position: absolute;top: 40px;left: 40px;height: 30px;"
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
                                    <el-button style="line-height: 0px;position: relative; z-index: 999;position: absolute; top: 40px;left:66%;height: 30px;" type="primary" size="mini" @click="getTopOpts('stations')">查询</el-button>
                                <station-echarts style="width: 20vw;" :sendStations="sendStations"/>
                            </div>
                        </corner-box>
                    </div>
                    <div>
                        <corner-box
                            boxWidth='100%'
                            boxHeight='90%'
                            :skinType="skinType"
                        >
                            <div class="cornerBox-content" slot="content">
                                <div class="title">
                                    <span style="background-color: #0098F0;margin-top:4px;"></span>
                                    <span :style="{color: skinType === 0 ? '#333333' : ''}">客流最热线路TOP10(上车客流)</span>
                                </div>
                                <el-select remote style="height: 30px;width:50%;margin-right:10px;position: absolute;top: 40px;left: 40px;" size="mini" filterable v-model="lineIds" multiple collapse-tags placeholder="请选择">
                                <el-option
                                    v-for="item in lineOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                                </el-select>
                                <el-button style="line-height: 0px;height: 30px;position: relative; z-index: 999;position: absolute; top: 40px;left:66%;" type="primary" size="mini" @click="getTopOpts('lines')">查询</el-button>
                                <lineEchartsTop style="width: 20vw;" :sendLineIds="sendLineIds"/>
                            </div>
                        </corner-box>
                    </div>
                </div>
                <div class="item-bottom-item-bottom">
                    <corner-box
                        boxWidth='94%'
                        boxHeight='85%'
                        :skinType="skinType"
                    >
                        <div class="cornerBox-content" slot="content">
                            <div class="title">
                                <span style="background-color: #0098F0;margin-top:2px;"></span>
                                <span :style="{color: skinType === 0 ? '#333333' : ''}">客流月趋势图</span>
                            </div>
                            <monthEcharts></monthEcharts>
                        </div>
                    </corner-box>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import cornerBox from '@/components/CornerBox'
import totalData from './Components/totalData.vue'
import passengerVol from './Components/passengerVol.vue'
import passengerHotmap from './Components/passengerHotmap.vue'
import stationEcharts from './Components/stationEcharts.vue'
import lineEchartsTop from './Components/lineEchartsTop.vue'
import monthEcharts from './Components/month.vue'
export default {
  name: 'passengerHome',
  data () {
    return {
      skinType: 0,
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
    this.$store.state.views.activeNight ? this.skinType = 1 : this.skinType = 0
  },
  mounted () {
    this.lineIds = []
    this.stations = []
  },
  watch: {
    '$store.state.views.activeNight' (val) {
      val ? this.skinType = 1 : this.skinType = 0
    },
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
    passengerHotmap,
    stationEcharts,
    lineEchartsTop,
    monthEcharts,
    cornerBox
  }
}
</script>

<style lang="scss" scoped>
    .normalBg {
        background-color: #F5F6FA!important;
    }
    .passenger-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #151A3A;
        // padding-left: 10px;
        // padding-right: 10px;
        overflow: hidden;
    }
    .passenger-item {
        // border: 1px solid #dddddd;
        box-sizing: border-box;
        width: 100%;
    }
    .item-top-item{
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        padding-bottom: 10px;
    }
    .item-top {
        flex: 1;
        display: flex;
        flex-direction: row;
    }
    .item-top-left {
        flex: 2;
        height: 100%;
        // border: 1px solid #dddddd;
        box-sizing: border-box;
        justify-content: center;
        margin-left: 20px;
    }
    .item-top-right {
        flex: 3;
        height: 100%;
        // border: 1px solid #dddddd;
        box-sizing: border-box;
        justify-content: flex-start;
    }
    .item-bottom {
        flex: 2;
        display: flex;
        flex-direction: row;
    }
    .item-bottom-item {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
    }
    .item-bottom-left {
        flex: 5;
        height: 100%;
        // border: 1px solid #dddddd;
        box-sizing: border-box;
        margin-left: 20px;
    }
    .item-bottom-right {
        flex: 6;
        height: 100%;
        // border: 1px solid #dddddd;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    .item-bottom-item-top {
        width: 100%;
        height: 100%;
        flex: 4;
        // border: 1px solid #dddddd;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
    }
    .item-bottom-item-top div {
        flex: 1;
        display: flex;
        flex-direction: row;
        // align-items: flex-start;
        // justify-content: center;
        padding-left: 10px;
    }
    .item-bottom-item-bottom {
        width: 100%;
        height: 100%;
        flex: 3;
        display: flex;
        flex-direction: row;
        // border: 1px solid #dddddd;
        box-sizing: border-box;
        align-items: flex-start;
        // justify-content: center;
        padding-left: 10px;
        padding-top: 6px;
    }
    .cornerBox-content {
        height: 100%;
        width: 100%;
    }
    .cornerBox-content .title {
        position: absolute;
        top: 10px;
        left: 16px;
        color: #ffffff;
        font-weight: Bold;
        font-size: 14px;
    }
    .cornerBox-content .title span {
        vertical-align: middle;
    }
    .cornerBox-content .title span:nth-child(1) {
        display: inline-block;
        width:4px;
        height:11px;
        border-radius:1px;
        margin-right: 10px;
    }
</style>
