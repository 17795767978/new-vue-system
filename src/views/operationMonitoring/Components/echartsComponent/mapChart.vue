<template>
  <div class="map-chart">
    <baidu-map
      ref="baiduMapWrapper"
      :style="{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0, 0.5)', borderRadius: '6px'}"
      :zoom="zoom"
      :ak="ak"
      :center="center"
      :scroll-wheel-zoom="true"
      @ready="handler"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0)"
    >
      <!-- animation="BMAP_ANIMATION_DROP" -->
      <!-- animation="BMAP_ANIMATION_BOUNCE" -->
      <!-- <bml-marker-clusterer :averageCenter="true" :maxZoom="seeZoom"> -->
      <bm-marker
        v-for="marker in markers"
        :key="marker.busId"
        :position="{lng: marker.lng, lat: marker.lat}"
        @click="handleMarkerClick(marker)"
        :title="`${marker.lineName}-${marker.busNumber}`"
        :icon="getIcon(marker)"
        class="arrow_box"
        animation="BMAP_ANIMATION_DROP"
        >
      </bm-marker>
      <!-- </bml-marker-clusterer> -->
      <bml-heatmap :data="hotdata" :max="max" :radius="20">
      </bml-heatmap>
      <bm-control style="margin: 30px;">
        <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
          <el-form-item>
            <el-select style="width: 130px;" size="mini" v-model="formInline.value" placeholder="线路" filterable :disabled="disabled">
              <el-option
                v-for="item in lineOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </bm-control>
    </baidu-map>
    <div class="map-dialog-only">
    <el-dialog :title="title" :visible.sync="dialogTableVisible" width="70%" :modal-append-to-body="false" :close-on-click-modal="false" :modal='false'>
      <el-row :gutter="10">
        <el-col :span="9">
          <div class="left-content">
            <div class="ts table-wrapper">
              <ul style="margin-bottom: 2.5vh">
                <li class="item">111</li>
                <li class="item">111</li>
                <li class="item">111</li>
                <li class="item">111</li>
              </ul>
            </div>
            <div class="ts vedio-wrapper">
              <div class="icon">
                <span style="color: #fff">视频通道</span>
              </div>
              <div class="content">
                <span class="button" @click="getCharItem(item, index)" size="mini" v-for="(item , index) in charData" :class="currentIndexChar === index ? 'active' : ''" :key="index" type="warning">{{item}}</span>
              </div>
            </div>
            <div class="ts alarm-wrapper">
              <div class="icon">
                <span style="color: #fff">报警视频</span>
              </div>
              <div class="content">
                <span class="button" @click="getAlarmItem(item, index)" v-for="(item , index) in alarmData" :class="currentIndexAlarm === index ? 'active' : ''" :key="index" type="warning">{{item}}</span>
              </div>
            </div>
            <div class="ts driver-wrapper">
              <span style="color: #fff;margin-right: 2.5vw">驾驶员</span>
                <span style="padding: 0.5vh 0.75vw;font-size: 0.6vw;background-color: #6076ad; color: #fff">张大小</span>
                <span style="color: #fff; margin-left: 1vw; margin-right: 1vw">工号</span>
                <span style="padding: 0.5vh 0.75vw;font-size: 0.6vw;background-color: #6076ad; color: #fff">09-14019</span>
              </div>
            <div class="ts class-wrapper">
              <span style="color: #fff; " class="left">班次执行</span>
              <el-progress :percentage="50" class="right"></el-progress>
            </div>
            <div class="ts flow-wrapper">
              <span style="color: #fff; " class="left">班次执行</span>
              <el-progress :percentage="50" class="right"></el-progress>
            </div>
            <div class="ts passeger-wrapper">
              <span style="color: #fff; " class="left">班次执行</span>
              <el-progress :percentage="50" class="right"></el-progress>
            </div>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="middle-content">
          </div>
        </el-col>
        <el-col :span="6">
          <div class="right-content"></div>
        </el-col>
      </el-row>
    </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// BmlMarkerClusterer
import { BaiduMap, BmMarker, BmlHeatmap, BmControl } from 'vue-baidu-map'
// import iconCarOrange from '../../../../assets/images/bus-orange.png'
import iconCarRed from '../../../../assets/images/bus-red.png'
// import iconCarYellow from '../../../../assets/images/bus-yellow.png'
import iconCarGreen from '../../../../assets/images/bus-green.png'
const TIME = 3 * 60 * 1000
export default {
  data () {
    return {
      formInline: {
        value: ''
      },
      isLoading: true,
      center: { lng: 0, lat: 0 },
      lineOptions: [],
      zoom: 3,
      ak: '7vVOlMOKr03PaWX82WajF6m',
      seeZoom: 15,
      mapStyle: {
        styleJson: [
          {
            'featureType': 'water',
            'elementType': 'all',
            'stylers': {
              'color': '#021019'
            }
          },
          {
            'featureType': 'highway',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'highway',
            'elementType': 'geometry.stroke',
            'stylers': {
              'color': '#147a92'
            }
          },
          {
            'featureType': 'arterial',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'arterial',
            'elementType': 'geometry.stroke',
            'stylers': {
              'color': '#0b3d51'
            }
          },
          {
            'featureType': 'local',
            'elementType': 'geometry',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'land',
            'elementType': 'all',
            'stylers': {
              'color': '#08304b'
            }
          },
          {
            'featureType': 'railway',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'railway',
            'elementType': 'geometry.stroke',
            'stylers': {
              'color': '#08304b'
            }
          },
          {
            'featureType': 'subway',
            'elementType': 'geometry',
            'stylers': {
              'lightness': -70
            }
          },
          {
            'featureType': 'building',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.fill',
            'stylers': {
              'color': '#857f7f'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.stroke',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'building',
            'elementType': 'geometry',
            'stylers': {
              'color': '#022338'
            }
          },
          {
            'featureType': 'green',
            'elementType': 'geometry',
            'stylers': {
              'color': '#062032'
            }
          },
          {
            'featureType': 'boundary',
            'elementType': 'all',
            'stylers': {
              'color': '#1e1c1c'
            }
          },
          {
            'featureType': 'manmade',
            'elementType': 'geometry',
            'stylers': {
              'color': '#022338'
            }
          },
          {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.icon',
            'stylers': {
              'visibility': 'off'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.fill',
            'stylers': {
              'color': '#2da0c6',
              'visibility': 'on'
            }
          }
        ]
      },
      markersAll: [],
      markers: [],
      hotdata: [],
      markersMin: [],
      max: 100,
      loading: true,
      timerRate: null,
      timerHot: null,
      isAll: false,
      disabled: true,
      dialogTableVisible: false,
      title: '',
      charData: ['司机位', '司机位', '司机位', '司机位', '司机位', '司机位', '司机位', '司机位'],
      alarmData: ['报警1', '报警1', '报警1', '报警1', '报警1'],
      currentIndexChar: '',
      currentIndexAlarm: ''
    }
  },
  components: {
    BaiduMap,
    BmlHeatmap,
    BmMarker,
    // BmlMarkerClusterer,
    BmControl
  },
  beforeCreate () {
  },
  created () {
    this._getOps()
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._positionRating({
      orgId
    })
    this._hotDataLine({
      orgId
    })
  },
  mounted () {
    this.$store.dispatch('getLineList').then(res => {
      this.lineOptions = res
      this.lineOptions.push({
        label: '全部线路',
        value: 'all'
      })
      // this.formInline.value = this.lineOptions[0].value
    })
    setTimeout(function () {
      let t = performance.timing
      console.log(performance.memory)
      console.log('DNS查询耗时 ：' + (t.domainLookupEnd - t.domainLookupStart).toFixed(0))
      console.log('TCP链接耗时 ：' + (t.connectEnd - t.connectStart).toFixed(0))
      console.log('客户端发起请求的耗时：' + (t.responseStart - t.requestStart).toFixed(0))
      console.log('解析dom树耗时 ：' + (t.domComplete - t.domInteractive).toFixed(0))
      console.log('白屏时间 ：' + (t.responseStart - t.navigationStart).toFixed(0))
      // console.log('domready时间 ：' + (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0))
      console.log('渲染时间：' + (t.domComplete - t.domLoading))
      // console.log('onload时间 ：' + (t.loadEventEnd - t.navigationStart).toFixed(0))

      // eslint-disable-next-line no-cond-assign
      if (t = performance.memory) {
        console.log('js内存使用占比 ：' + (t.usedJSHeapSize / t.totalJSHeapSize * 100).toFixed(2) + '%')
      }
    })
  },
  computed: {
    getIcon () {
      return function (marker) {
        if (marker.warnInfo) {
          return { url: `${iconCarRed}`, size: { width: 13, height: 15 } }
        } else {
          return { url: `${iconCarGreen}`, size: { width: 13, height: 15 } }
        }
      }
    }
  },
  watch: {
    'formInline.value': {
      handler (newV) {
        if (newV !== 'all') {
          this.markers = this.markersAll.filter(item => item.lineId === newV)
        } else {
          this.markers = this.markersAll
        }
      }
    }
  },
  methods: {
    _getOps () {
      this.$api['wholeInformation.getCityCoordinatePoints']().then(res => {
        this.center.lat = res.lat
        this.center.lng = res.lng
      })
    },
    _positionRating (params) {
      this.$api['homeMap.getBusPositionAndFullLoadRate'](params).then(res => {
        this.markersAll = res
        this.markers = this.markersAll
        this.formInline.value = 'all'
        this.loading = false
        this.disabled = false
        this.timerRate = setTimeout(() => {
          this._positionRating(params)
        }, TIME)
      })
    },
    _hotDataLine (params) {
      this.$api['homeMap.getBusHeatmapDatas'](params).then(res => {
        let dataArrCount = res.map(item => parseInt(item.getOnNumber))
        let dataArrLat = res.map(item => item.lat)
        let dataArrLng = res.map(item => item.lng)
        for (let i = 0; i < dataArrCount.length; i++) {
          this.hotdata[i] = {
            lng: +dataArrLng[i],
            lat: +dataArrLat[i],
            count: dataArrCount[i]
          }
        }
        this.max = 4000
        this.timerHot = setTimeout(() => {
          this._hotDataLine(params)
        }, TIME)
      })
    },
    handler ({ BMap, map }) {
      this.zoom = 12
      this.isLoading = false
      map.setMapStyle(this.mapStyle)
      this.$refs.baiduMapWrapper.$el.children[0].style.borderRadius = '6px'
    },
    handleMarkerClick (marker) {
      this.dialogTableVisible = true
      this.title = `${marker.lineName}-${marker.busNumber}-车辆详情`
      console.log(marker)
    },
    getCharItem (item, index) {
      console.log(item)
      this.currentIndexChar = index
    },
    getAlarmItem (item, index) {
      console.log(item)
      this.currentIndexAlarm = index
    }
  },
  destroyed () {
    clearTimeout(this.timerRate)
    clearTimeout(this.timerHot)
    this.timerRate = null
    this.timerHot = null
  }
}
</script>

<style lang="scss" scoped>
.map-chart {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}
.left-content {
  width: 100%;
  height: 30vw;
  .ts {
    width: 100%;
    height: 8vh;
    margin-bottom: 2.5vh;
    &.table-wrapper {
      width: 100%;
      .item {
        width: 50%;
        float:left;
        height: 3.75vh;
        line-height: 3.75vh;
        border: 1px solid #fff;
        text-align: center;
        box-sizing: border-box;
        color: #fff;
      }
    }
    &.vedio-wrapper {
      width: 100%;
      display: flex;
      height: 10vh;
      margin-top: 15px;
      .icon {
        flex: 0 0 80px;
        line-height: 10vh;
      }
      .content {
        width: 100%;
        padding: 1.5vh 0.75vw;
        display: flex;
        flex-direction:row;
        flex-wrap: wrap;
        align-content: center;
        box-sizing: border-box;
        .button {
          padding: 0.3vw 0.6vw;
          font-size: 0.6vw;
          margin-right: 1.5vw;
          margin-bottom: 0.5vw;
          background: #6076ad;
          color: #fff;
          border: hidden;
          outline: none;
          border-radius: 6px;
          // margin-left: -10px;
        }
        .active {
          background-color: #71f3ff;
          color: #000;
        }
      }
    }
    &.alarm-wrapper {
      width: 100%;
      display: flex;
      height: 7.5vh;
      .icon {
        flex: 0 0 80px;
        line-height: 7.5vh;
      }
      .content {
        width: 100%;
        padding: 1.5vh 0.75vw;
        display: flex;
        flex-direction:row;
        flex-wrap: wrap;
        align-content: center;
        box-sizing: border-box;
        .button {
          padding: 0.3vw 0.6vw;
          font-size: 0.6vw;
          margin-right: 1.5vw;
          margin-bottom: 0.5vw;
          background: #6076ad;
          color: #fff;
          border: hidden;
          outline: none;
          border-radius: 6px;
          // margin-left: -10px;
        }
        .active {
          background-color: #71f3ff;
          color: #000;
        }
      }
    }
    &.driver-wrapper {
      height: 3vh;
      margin-bottom: 2.5vh;
      margin-top: 2.5vh;
    }
    &.class-wrapper {
      height: 3vh;
      margin-bottom: 2.5vh;
      display: flex;
      .left {
        flex: 0 0 80px;
      }
      .right {
        width: 100%;
      }
    }
  }
}
.middle-content {
  width: 100%;
  height: 600px;
}
.right-content {
  width: 100%;
  height: 600px;
}
.arrow_box{animation: glow 800ms ease-out infinite alternate; }
@keyframes glow {
    0% {
        border-color: #393;
        box-shadow: 0 0 5px rgba(0,255,0,.2), inset 0 0 5px rgba(0,255,0,.1), 0 1px 0 #393;
    }
    100% {
        border-color: #6f6;
        box-shadow: 0 0 20px rgba(0,255,0,.6), inset 0 0 10px rgba(0,255,0,.4), 0 1px 0 #6f6;
    }
}
</style>
<style lang="scss">
.map-dialog-only {
  .el-dialog {
    background-color: rgba(18,25,48, 1)
  }
  .el-dialog__title {
    color: #fff
  }
}
</style>
