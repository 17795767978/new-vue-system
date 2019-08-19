<template>
  <div class="map-chart">
    <baidu-map
      ref="baiduMapWrapper"
      :style="{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0, 0.5)', borderRadius: '6px'}"
      :zoom="zoom"
      :ak="ak"
      :mapClick="false"
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
        >
      </bm-marker>
      <!-- </bml-marker-clusterer> -->
      <bml-heatmap :data="hotdata" :max="max" :radius="20">
      </bml-heatmap>
      <bm-control style="margin: 30px;" v-show="isHidden">
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
    <div style="position: absolute; right: 2vw; bottom: 2vh;z-index: 1000">
        <button v-for="(item, index) in buttonGroup" @click="getMapType(index)" :class="currentIndexMap === index ? 'active' : ''" class="primary" :key="index">{{item}}</button>
    </div>
    <div class="map-dialog-only">
    <el-dialog :title="title" top="10vh" :visible.sync="dialogTableVisible" width="70%" :modal-append-to-body="false" :close-on-click-modal="false" :modal='false'>
      <el-row :gutter="20">
        <el-col :span="11">
          <div class="left-content">
            <div class="ts driver-wrapper">
              <span style="color: #fff;margin-right: 2.5vw; font-size: 0.8vw;">驾驶员</span>
                <!-- <span style="padding: 0.5vh 0.75vw;font-size: 0.6vw;background-color: #6076ad; color: #fff">{{carDetailData.driverName || '---'}}</span> -->
                <span style="padding: 0.5vh 0.75vw;font-size: 0.6vw;background-color: #fff; color: #000; border-radius:6px;">刘立群</span>
                <span style="color: #fff; margin-left: 1vw; margin-right: 1vw;font-size: 0.8vw;">工号</span>
                <!-- <span style="padding: 0.5vh 0.75vw;font-size: 0.6vw;background-color: #6076ad; color: #fff">{{carDetailData.driverNum || '---'}}</span> -->
                <span style="padding: 0.5vh 0.75vw;font-size: 0.6vw;background-color: #fff; color: #000; border-radius:6px;">EF0128</span>
            </div>
            <div class="ts flow-wrapper">
              <span style="color: #fff;font-size: 0.8vw; " class="left">POS客流</span>
              <div class="middle">
                 <span class="top" >当日累计</span>
                 <!-- <span class="bottom">{{carDetailData.totalPersonFlow}}</span> -->
                 <span class="bottom">132</span>
              </div>
              <div class="right">
                 <span class="top">本班累计</span>
                 <!-- <span class="bottom">{{carDetailData.currentPersonFlow}}</span> -->
                 <span class="bottom">56</span>
              </div>
            </div>
            <div class="ts passeger-wrapper">
              <span style="color: #fff; font-size: 0.8vw;" class="left">车内乘客</span>
              <div class="right-left">
                 <span class="top">整车/负载</span>
                 <!-- <span class="bottom">{{carDetailData.personNumberInCar}}/{{carDetailData.busLoadNumber}}</span> -->
                 <span class="bottom">33/56</span>
              </div>
            </div>
            <div class="ts class-wrapper">
              <span style="color: #fff;" class="left">班次执行</span>
              <div class="right">
                <el-progress :percentage="60" class="right" status="success" :show-text="false">
                </el-progress>
                <div style="width: 100%;height: 1vh;margin-top: 0.5vh">
                  <span style="display: inline-block;width: 50%; text-align: left; color: #fff">当前3</span>
                  <span style="display: inline-block;width: 50%; text-align: right; color: #fff">计划5</span>
                </div>
              </div>
            </div>
            <div class="ts vedio-wrapper">
              <div class="icon">
                <span style="color: #fff;font-size: 0.8vw;">视频通道</span>
              </div>
              <div class="content">
                <span class="button" @click="getCharItem(item, index)" size="mini" v-for="(item , index) in charData" :class="currentIndexChar === index ? 'active' : ''" :key="index" type="warning">{{item}}</span>
              </div>
            </div>
            <div class="ts alarm-wrapper">
              <div class="icon">
                <span style="color: #fff;font-size: 0.8vw;">报警视频</span>
              </div>
              <div class="content">
                <span class="button" @click="getAlarmItem(item, index)" v-for="(item , index) in alarmData" :class="currentIndexAlarm === index ? 'active' : ''" :key="index" type="warning">{{item}}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="13">
          <div class="middle-content">
            <div class="table">
              <div class="left">
                <div class="top-title">车辆信息</div>
                <div class="bottom-title"></div>
              </div>
              <div class="middle">
                <div class="pub-code"></div>
                <div class="company"></div>
                <div class="line"></div>
              </div>
              <div class="right">
                <div class="pub-code"></div>
                <div class="company"></div>
                <div class="line"></div>
              </div>
            </div>
            <div class="bottom-message">
              <!-- <span class="left">舒适度： 拥挤</span> -->
              <!-- <span class="middle">车号：{{carDetailData.busNumber}}</span> -->
              <span class="middle">车号：EF0128</span>
              <!-- <span class="right">时间：{{carDetailData.samplingTime}}</span> -->
              <span class="right">时间：2019-8-14 10:13:27</span>
            </div>
            <div class="video">
              <div class="top-left-video">
                <videoWrapper :monitorData="monitorData" :dialogTableVisible='dialogTableVisible'></videoWrapper>
              </div>
              <div class="top-right-video">
                <videoWrapper :monitorData="monitorData" :dialogTableVisible="dialogTableVisible"></videoWrapper>
              </div>
              <div class="bottom-left-video">
                <videoWrapper :monitorData="monitorData" :dialogTableVisible="dialogTableVisible"></videoWrapper>
              </div>
              <div class="bottom-right-video">
                <videoWrapper :monitorData="monitorData" :dialogTableVisible="dialogTableVisible"></videoWrapper>
              </div>
            </div>
          </div>
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
import videoWrapper from './video'
import moment from 'moment'
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
      isHidden: false,
      title: '',
      charData: ['通道1', '通道2', '通道3', '通道4', '通道5', '通道6', '通道7', '通道8'],
      alarmData: ['报警1', '报警2', '报警3'],
      buttonGroup: ['热力图', '单车', '线路'],
      currentIndexChar: 0,
      currentIndexAlarm: 0,
      currentIndexMap: 0,
      monitorData: {},
      carDetailData: {}
    }
  },
  components: {
    BaiduMap,
    BmlHeatmap,
    BmMarker,
    // BmlMarkerClusterer,
    BmControl,
    videoWrapper
  },
  beforeCreate () {
  },
  created () {
    this._getOps()
    this.$jsonp('http://192.168.0.55:12056/api/v1/basic/key?username=admin&password=admin').then(json => {
      console.log(json)
      let key = json.data.key
      this.$jsonp('http://192.168.0.55:12056/api/v1/basic/live/video?', {
        key,
        terid: '008800B07C',
        chl: 3,
        audio: 1,
        st: 0,
        port: 12060
      }).then(res => {
        this.monitorData = res.data
        // console.log(this.monitorData)
        console.log(res)
      })
    })
  },
  mounted () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._hotDataLine({
      orgId
    })
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
      console.log('DNS查询耗时 ：' + (t.domainLookupEnd - t.domainLookupStart).toFixed(0))
      console.log('TCP链接耗时 ：' + (t.connectEnd - t.connectStart).toFixed(0))
      console.log('客户端发起请求的耗时：' + (t.responseStart - t.requestStart).toFixed(0))
      console.log('解析dom树耗时 ：' + (t.domComplete - t.domInteractive).toFixed(0))
      console.log('白屏时间 ：' + (t.responseStart - t.navigationStart).toFixed(0))
      console.log('渲染时间：' + (t.domComplete - t.domLoading))

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
    },
    currentIndexMap (newV) {
      let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
      if (newV === 1) {
        clearTimeout(this.timerHot)
        this.timerHot = null
        this._positionRating({
          orgId
        })
        this.hotdata = []
        this.isHidden = true
      } else if (newV === 0) {
        this.markersAll = []
        this.markers = []
        clearTimeout(this.timerRate)
        this.timerRate = null
        this._hotDataLine({
          orgId
        })
        this.isHidden = false
      } else if (newV === 2) {
        this.markersAll = []
        this.markers = []
        this.hotdata = []
        this.isHidden = true
      }
    },
    dialogTableVisible (newV) {
      let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
      if (newV) {
        clearTimeout(this.timerRate)
        this.timerRate = null
      } else {
        // this._positionRating({
        //   orgId
        // })
        this.timerRate = setTimeout(() => {
          this._positionRating({
            orgId
          })
        }, TIME)
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
      this.loading = true
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
      this.loading = true
      this.hotdata = []
      this.$api['homeMap.getBusHeatmapDatas'](params).then(res => {
        this.hotdata = res
        // let dataArrCount = res.map(item => Number(item.getOnNumber))
        // let dataArrLat = res.map(item => item.lat)
        // let dataArrLng = res.map(item => item.lng)
        // for (let i = 0; i < dataArrCount.length; i++) {
        //   this.hotdata[i] = {
        //     lng: +dataArrLng[i],
        //     lat: +dataArrLat[i],
        //     count: dataArrCount[i]
        //   }
        // }
        this.max = 100
        this.loading = false
        this.timerHot = setTimeout(() => {
          this._hotDataLine(params)
        }, TIME)
      })
    },
    handler ({ BMap, map }) {
      this.zoom = 13
      this.isLoading = false
      map.setMapStyle(this.mapStyle)
      this.$refs.baiduMapWrapper.$el.children[0].style.borderRadius = '6px'
      // var map2 = new BMap.Map('map', { minZoom: 7, maxZoom: 18 })
      // map.centerAndZoom(new BMap.Point(this.center.lng, this.center.lat), 8)
      // // map.enableScrollWheelZoom()

      // var cityName = '邢台市'
      // // map.addControl(new BMap.OverviewMapControl())
      // // map.enableScrollWheelZoom()
      // // map.addControl(new BMap.NavigationControl({ type: 'BMAP_NAVIGATION_CONTROL_LARGE', anchor: 'BMAP_ANCHOR_TOP_LEFT', offset: new BMap.Size(40, 250) }))
      // var bdary = new BMap.Boundary()
      // bdary.get(cityName, function (rs) { // 获取行政区域
      //   var EN_JW = '180, 90;' // 东北角
      //   var NW_JW = '-180, 90;' // 西北角
      //   var WS_JW = '-180, -90;' // 西南角
      //   var SE_JW = '180, -90;' // 东南角
      //   // 4.添加环形遮罩层
      //   var ply1 = new BMap.Polygon(rs.boundaries[0] + SE_JW + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW, { strokeColor: 'none', fillColor: 'rgb(246,246,246)', fillOpacity: 1, strokeOpacity: 0.5 }) // 建立多边形覆盖物
      //   map.addOverlay(ply1)
      // })
    },
    handleMarkerClick (marker) {
      this.dialogTableVisible = true
      this.title = `${marker.lineName}-${marker.busNumber}-车辆详情`
      // console.log(marker)
      const { busId, busNumber, samplingTime, busSelfcode, warnSpeed, orgName, lineName, lineType } = marker
      this.$api['homeTired.getVideoMsg']({
        busId,
        busNumber,
        samplingTime,
        busSelfcode,
        warnSpeed,
        orgName,
        lineName,
        lineType,
        driverName: '',
        driverNum: ''
      }).then(res => {
        // console.log(res)
        this.carDetailData = res
        this.carDetailData.startUpDate = moment(this.carDetailData.startUpDate).format('YYYY-MM-DD')
      })
      // setTimeout(() => {
      //   this.initCamera(this.monitorData)
      // }, 2000)
    },
    getCharItem (item, index) {
      this.currentIndexChar = index
    },
    getAlarmItem (item, index) {
      this.currentIndexAlarm = index
    },
    getMapType (index) {
      this.currentIndexMap = index
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
  position: relative;
  .primary {
    padding: 0.5vh 1.5vw;
    margin-left: 1vw;
    background-color: rgba(0,0,0, 0.5);
    color: #ffffff;
    border: hidden;
    outline: none;
    border-radius: 6px;
  }
  .active {
    background-color: #71f3ff
  }
}
.left-content {
  width: 100%;
  .ts {
    width: 100%;
    height: 8vh;
    margin-bottom: 2.5vh;
    &.table-wrapper {
      width: 100%;
      margin-bottom: 3vh;
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
      margin-bottom: 3vh;
      .icon {
        flex: 0 0 80px;
        line-height: 10vh;
      }
      .content {
        width: 100%;
        padding: 1.5vh 0vw;
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
          background: #fff;
          color: #000;
          border: hidden;
          outline: none;
          border-radius: 6px;
          cursor: pointer;
          // margin-left: -10px;
        }
        .active {
          background-color: #67c23a;
          color: #000;
        }
      }
    }
    &.alarm-wrapper {
      width: 100%;
      display: flex;
      height: 7.5vh;
      margin-bottom: 3vh;
      .icon {
        flex: 0 0 80px;
        line-height: 7.5vh;
      }
      .content {
        width: 100%;
        padding: 1.5vh 0vw;
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
          background: #fff;
          color: #000;
          border: hidden;
          outline: none;
          border-radius: 6px;
          cursor: pointer;
          // margin-left: -10px;
        }
        .active {
          background-color: #67c23a;
          color: #000;
        }
      }
    }
    &.driver-wrapper {
      height: 3vh;
      margin-bottom: 5vh;
    }
    &.class-wrapper {
      height: 3vh;
      margin-bottom: 5vh;
      display: flex;
      line-height: 3vh;
      .left {
        flex: 0 0 80px;
      }
      .right {
        width: 100%;
      }
    }
    &.flow-wrapper {
      height: 3vh;
      margin-bottom: 5vh;
      display: flex;
      font-size: 0.65vw;
      .left {
        flex: 0 0 80px;
        line-height: 3vh;
      }
      .middle {
        width: 20%;
        text-align: center;
        margin-right: 2vw;
        .top {
          display: block;
          padding: 0.07vh 0.1vh;
          background-color: #fff;
          color: #000;
        }
        .bottom {
          display: block;
          padding: 0.05vh 0.1vh;
          background-color: #67c23a;
          color: #000;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
        }
      }
      .right {
        width: 20%;
        text-align: center;
        .top {
          display: block;
          padding: 0.05vh 0.1vh;
          background-color: #fff;
          color: #000;
        }
        .bottom {
          display: block;
          padding: 0.05vh 0.1vh;
          background-color: #67c23a;
          color: #000;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
        }
      }
    }
    &.passeger-wrapper{
      height: 3vh;
      margin-bottom: 5vh;
      display: flex;
      font-size: 0.65vw;
      .left {
        flex: 0 0 80px;
        line-height: 3vh;
      }
      .right-left {
        width: 20%;
        text-align: center;
        margin-right: 2vw;
        .top {
          display: block;
          padding: 0.07vh 0.1vh;
          background-color: #fff;
          color: #000;
        }
        .bottom {
          display: block;
          padding: 0.05vh 0.1vh;
          background-color: #67c23a;
          color: #000;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
        }
      }
      .right-middle {
        width: 20%;
        text-align: center;
        margin-right: 2vw;
        .top {
          display: block;
          padding: 0.05vh 0.1vh;
          background-color: #fff;
          color: #000;
        }
        .bottom {
          display: block;
          padding: 0.05vh 0.1vh;
          background-color: #6076ad;
          color: #fff;
        }
      }
      .right-right {
        width: 20%;
        text-align: center;
        .top {
          display: block;
          padding: 0.05vh 0.1vh;
          background-color: #fff;
          color: #000;
        }
        .bottom {
          display: block;
          padding: 0.05vh 0.1vh;
          background-color: #6076ad;
          color: #fff;
        }
      }
    }
  }
}
.middle-content {
  width: 100%;
  .table {
    width: 70%;
    display: flex;
    .left {
      width: 33%;
      box-sizing: border-box;
      .top-title {
        width: 100%;
        height: 3vh;
        text-align: center;
        background: #67c23a;
        line-height: 3vh;
        color: #000;
        box-sizing: border-box;
        font-size: 1.5vh;
        font-weight: 800;
        border: 1px solid #fff;
      }
      .bottom-title {
        width: 100%;
        height: 6vh;
        text-align: center;
        border-left: 1px solid #ffffff;
        border-right: 1px solid #ffffff;
        border-bottom: 1px solid #ffffff;
        box-sizing: border-box;
      }
    }
    .middle,
    .right
     {
      width: 33%;
      .pub-code {
        width: 100%;
        height: 3vh;
        line-height: 3vh;
        color: #000;
        box-sizing: border-box;
        border: 1px solid #ffffff;
        border-left: hidden;
        box-sizing: border-box;
      }
      .company,.line {
        width: 100%;
        height: 3vh;
        line-height: 3vh;
        color: #000;
        box-sizing: border-box;
        border-right: 1px solid #ffffff;
        border-bottom: 1px solid #ffffff;
        box-sizing: border-box;
      }
    }
  }
  .video {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .top-left-video,.top-right-video,.bottom-left-video,.bottom-right-video{
      width: 47%;
      margin-left: 1vw;
      // margin-top: 0.1vh;
      background-color: #000;
    }
  }
  .bottom-message {
    width: 100%;
    height: 3vh;
    line-height: 3vh;
    display: flex;
    font-size: 0.1vw;
    color: #fff;
    margin-top: 3vh;
    // .left {
    //   width: 30%;
    //   margin-right: 3%
    // }
    .middle {
      width: 30%;
      margin-right: 3%;
    }
    .right {
      width: 63%;
    }
  }
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
    background-color: rgba(0,0,0, 0.9);
    box-shadow:0px 0px 60px #066587;
    border-radius: 6px;
    padding: 20px;
    box-sizing: border-box;
  }
  .el-dialog__title {
    color: #fff
  }
}
</style>
