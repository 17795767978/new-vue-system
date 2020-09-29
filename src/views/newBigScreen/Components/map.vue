<template>
  <div class="map-chart">
    <baidu-map
      ref="baiduMapWrapper"
      :style="{width: '100%', height: '100%'}"
      :zoom="zoom"
      :ak="ak"
      :mapClick="false"
      :center="center"
      :scroll-wheel-zoom="true"
      @ready="handler"
    >
      <!-- animation="BMAP_ANIMATION_DROP" -->
      <!-- animation="BMAP_ANIMATION_BOUNCE" -->
      <!-- <bml-marker-clusterer :averageCenter="true" :maxZoom="seeZoom"> -->
      <div v-if="isCarsDetail">
        <!-- 车 -->
        <bm-marker
          v-for="marker in markers"
          :key="marker.busId"
          :position="{lng: marker.lng, lat: marker.lat}"
          @click="handleMarkerClick(marker)"
          :title="`${marker.lineName}-${marker.busNumber}`"
          :icon="getIcon(marker)"
          class="arrow_box"
          >
            <bm-label :content="marker.busNumber" @click="handleMarkerClick(marker)" :labelStyle="{padding: '0px 0px', color: 'white', fontSize : '12px', backgroundColor: 'rgba(0,0,0,1)', border: 'hidden'}" :offset="{width: 10, height: 16}"/>
        </bm-marker>
      </div>
      <!-- <bm-polyline v-for="item in lineData" :key="item.name"></bm-polyline> -->
      <!-- 线路 -->
      <bm-polyline
        v-for="(item, index) in lineData"
        :key="item.lineUuid"
        :path="item.stations"
        :stroke-color="colors[index]"
        :stroke-opacity="0.7"
        :stroke-weight="3"
        :editing="false">
      </bm-polyline>
      <!-- 站点 -->
      <bm-marker
        v-for="marker in stationsDatas"
        :key="marker.busId"
        :position="{lng: marker.lng, lat: marker.lat}"
        :title="`${marker.lineName}-${marker.staName}站`"
        :icon="getIconStation"
        class="arrow_box"
        :top="true"
        :zIndex="1000"
        >
        <bm-label :content="''" @click="handleStationClick(marker)" :labelStyle="{padding: '3px 3px', backgroundColor: 'rgba(0,0,0,1)', border:`1.5px solid ${marker.color}`, borderRadius: '50%'}" :offset="{width: -5, height: -5}"/>
        <bm-label :content="`${marker.staName}`" v-if="marker.isSee" :labelStyle="{padding: '0px 0px', color: 'white', fontSize : '12px', backgroundColor: 'rgba(0,0,0,1)', border: 'hidden'}" :offset="{width: -3, height: 10}"/>
      </bm-marker>
      <!-- <bm-marker v-if="isSee" :position="{lng: details.stations[0].lng, lat: details.stations[0].lng}">
          <bm-label :content="details.lineName" :labelStyle="{color: '#e5e5e5', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
        </bm-marker> -->
        <!-- 场站 -->
        <!-- parkData -->
        <div v-for="(item, index) in parkData" :key="index + 111">
        <bm-polygon :path="item" :strokeColor="'white'" :strokeStyle="'dashed'" :stroke-weight="1" fillColor="#02fbf4" :fillOpacity="0.1">
        </bm-polygon>
        </div>
      <!-- <div v-for="(item, index) in parkData" :key="index" class="park-park">
      <bm-marker
        :position="{lng:item && item[Math.floor(item.length / 2)].lng, lat:item && item[Math.floor(item.length / 2)].lat}"
        :icon="getIconPark"
        >
        <bm-label :content="item[0].name" :labelStyle="{padding: '1px 1px', color: 'black', fontSize : '12px',fontWeight: 'bold', backgroundColor: '#02fbf4', border: 'hidden'}" :offset="{width: -15, height: -22}"/>
      </bm-marker>
      </div> -->
      <bm-overlay
        pane="labelPane"
        v-if="isSee"
        :class="{sample: true}"
        @draw="draw">
        <div>{{`${details.lineName} ${details.lineType === '1' ? '上行' : '下行'}`}}</div>
      </bm-overlay>
      <!-- </bml-marker-clusterer> -->
      <bml-heatmap :data="hotdata" :max="max" :radius="20" v-if="isHotMap">
      </bml-heatmap>
      <bm-control style="margin-left: 28vw; margin-top: 16vh;" v-show="isHidden" v-if="isSearchLine">
        <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
          <el-form-item>
            <el-select style="width: 130px; background-color: #0e2139" size="mini" v-model="formInline.value" placeholder="线路" filterable>
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
    <div style="position: absolute; right: 2vw; bottom: 2vh;z-index: 1000" v-if="isSelect">
        <button v-for="(item, index) in buttonGroup" @click="getMapType(index)" :class="currentIndexMap === index ? 'active' : ''" class="primary" :key="index">{{item}}</button>
    </div>
    <div class="map-dialog-only">
    <el-dialog :title="title" top="15vh" :visible.sync="dialogTableVisible" width="70%" :modal-append-to-body="false" :close-on-click-modal="false" :modal='false'>
      <el-row :gutter="20">
        <el-col :span="11">
          <div class="left-content">
            <div class="ts driver-wrapper">
              <span style="color: #fff;margin-right: 2.5vw; font-size: 0.8vw;">驾驶员</span>
                <span style="padding: 0.5vh 0.75vw;font-size: 0.6vw;background-color: #FFF; color: #000">{{carDetailData.drvName || '---'}}</span>
                <!-- <span style="padding: 0.5vh 0.75vw;font-size: 0.6vw;background-color: #fff; color: #000; border-radius:6px;">刘立群</span> -->
                <span style="color: #fff; margin-left: 1vw; margin-right: 1vw;font-size: 0.8vw;">工号</span>
                <span style="padding: 0.5vh 0.75vw;font-size: 0.6vw;background-color:  #FFF; color: #000">{{carDetailData.drvIccard || '---'}}</span>
                <!-- <span style="padding: 0.5vh 0.75vw;font-size: 0.6vw;background-color: #fff; color: #000; border-radius:6px;">EF0128</span> -->
            </div>
            <div class="ts flow-wrapper">
              <span style="color: #fff;font-size: 0.8vw; " class="left">客流</span>
              <div class="middle">
                 <span class="top" >当日累计</span>
                 <span class="bottom">{{carDetailData.totalPersonFlow}}</span>
                 <!-- <span class="bottom">132</span> -->
              </div>
              <div class="right">
                 <span class="top">本班累计</span>
                 <span class="bottom">{{carDetailData.currentPersonFlow}}</span>
                 <!-- <span class="bottom">56</span> -->
              </div>
            </div>
            <!-- <div class="ts passeger-wrapper">
              <span style="color: #fff; font-size: 0.8vw;" class="left">车内乘客</span>
              <div class="right-left">
                 <span class="top">整车/负载</span>
                 <span class="bottom">{{carDetailData.personNumberInCar}}/{{carDetailData.busLoadNumber}}</span>
              </div>
            </div> -->
            <div class="ts class-wrapper">
              <span style="color: #fff;" class="left">趟次执行</span>
              <div class="right">
                <el-progress :percentage="carDetailData.tripPercent" class="right" status="success" :show-text="false">
                </el-progress>
                <div style="width: 80%;height: 1vh;margin-top: 0.5vh">
                  <span style="display: inline-block;width: 50%; text-align: left; color: #fff">当前{{carDetailData.currenttrip}}</span>
                  <span style="display: inline-block;width: 50%; text-align: right; color: #fff">计划{{carDetailData.planTrips}}</span>
                </div>
              </div>
            </div>
            <div class="ts vedio-wrapper" v-if="isFlv">
              <div class="icon">
                <span style="color: #fff;font-size: 0.8vw;">视频通道</span>
              </div>
              <div class="content">
                <span class="button" @click="getCharItem(item)" size="mini" v-for="(item , index) in charData" :class="item.isAct ? 'active' : ''" :key="index">{{item.ch}}</span>
              </div>
            </div>
            <div class="ts alarm-wrapper" v-show="carDetailData.warnInfos && carDetailData.warnInfos.length > 0">
              <div class="icon">
                <span style="color: #fff;font-size: 0.8vw;">报警视频</span>
              </div>
              <div class="content">
                <span class="button" @click="getAlarmItem(warn, index)" v-for="(warn , index) in warnData" :class="warn.isAct ? 'active' : ''" :key="index">{{warn.warnTypeName}}</span>
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
                <div class="pub-code">牌照号：{{carDetailData.busNumber}}</div>
                <div class="company">公司：{{carDetailData.orgName}}</div>
                <div class="line">线路：{{carDetailData.lineName}}</div>
              </div>
              <div class="right">
                <div class="pub-code">自编号：{{carDetailData.busSelfcode}}</div>
                <div class="company">车队：{{carDetailData.carTeam}}</div>
                <div class="line">方向：{{carDetailData.lineType && carDetailData.lineType === '1' ? '上行' : '下行'}}</div>
              </div>
            </div>
            <div class="bottom-message">
              <!-- <span class="left">舒适度： 拥挤</span> -->
              <span class="middle">速度：{{carDetailData.positionSpeed}}KM/H</span>
              <!-- <span class="middle">车号：EF0128</span> -->
              <span class="right">时间：{{carDetailData.samplingTime}}</span>
              <!-- <span class="right">时间：2019-8-14 10:13:27</span> -->
            </div>
            <div class="live-video" v-if="isFlv">
              <div class="top-left-video" v-for="(item, index) in urlList" :key="index">
                <videoWrapper  v-if="charData[index].isAct" :item="item" :dialogTableVisible='dialogTableVisible'></videoWrapper>
              </div>
            </div>
            <div class="alarm-video"  v-show="carDetailData.warnInfos && carDetailData.warnInfos.length > 0">
              <div class="top-left-video" v-for="(warn, index) in carDetailData.warnInfos" :key="index">
                <videoWrapper v-if="warnData[index].isAct" :item="warn" :dialogTableVisible='dialogTableVisible'></videoWrapper>
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
import { BaiduMap, BmMarker, BmlHeatmap, BmControl, BmPolyline, BmOverlay, BmLabel, BmPolygon } from 'vue-baidu-map'
import { mapStyleSec } from '../utils/mapStyleSec'
import iconCarRed from '../../../assets/images/alarm-bus.png'
import iconCarGreen from '../../../assets/images/normal-bus.png'
// import park from '../../../assets/images/park.png'
import videoWrapper from '@/components/map/video'
import Bus from './bus.js'
import { mapGetters } from 'vuex'
// const COLOR = ['#f00', '#f0f', '#0ff', '#00f', '#0f0', '#ff0']
const TIME = 10 * 1000
// const URL = 'http://121.30.214.187:12056/api/v1/basic/' // 大同
const URL = 'http://117.34.118.30:12056/api/v1/basic/'
export default {
  props: {
    isHotMap: {
      type: Boolean
    },
    isCarsDetail: {
      type: Boolean
    },
    isSearchLine: {
      type: Boolean
    },
    isLineMap: {
      type: Boolean
    },
    isSelect: {
      type: Boolean
    },
    isFlv: {
      type: Boolean
    },
    searchData: {
      type: Object
    }
  },
  data () {
    return {
      formInline: {
        value: 'all'
      },
      isLoading: true,
      center: { lng: 0, lat: 0 },
      lineOptions: [],
      zoom: 3,
      ak: '7vVOlMOKr03PaWX82WajF6m',
      seeZoom: 15,
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
      isHidden: true,
      title: '',
      charData: [],
      warnData: [],
      buttonGroup: ['热力图', '单车', '线路'],
      currentIndexChar: 0,
      currentIndexAlarm: 0,
      currentIndexMap: 0,
      monitorData: [],
      carDetailData: {},
      key: '',
      urlList: [],
      lineDataAll: [],
      lineData: [],
      colors: ['#1694ff', '#12f6fa', '#00c0fe', '#14afb2', '#7299f2', '#11e692  ', '#07999c', '#1694ff', '#12f6fa', '#00c0fe', '#14afb2', '#7299f2', '#11e692  ', '#07999c', '#1694ff', '#12f6fa', '#00c0fe', '#14afb2', '#7299f2', '#11e692  ', '#07999c', '#1694ff', '#12f6fa', '#00c0fe', '#14afb2', '#7299f2', '#11e692  ', '#07999c', '#1694ff', '#12f6fa', '#00c0fe', '#14afb2', '#7299f2', '#11e692  ', '#07999c', '#1694ff', '#12f6fa', '#00c0fe', '#14afb2', '#7299f2', '#11e692  ', '#07999c', '#1694ff', '#12f6fa', '#00c0fe', '#14afb2', '#7299f2', '#11e692  ', '#07999c', '#1694ff', '#12f6fa', '#00c0fe', '#14afb2', '#7299f2', '#11e692  ', '#07999c', '#1694ff', '#12f6fa', '#00c0fe', '#14afb2', '#7299f2', '#11e692  ', '#07999c', '#1694ff', '#12f6fa', '#00c0fe', '#14afb2', '#7299f2', '#11e692  ', '#07999c'],
      isSee: false,
      details: {},
      currenPoint: {},
      stationsDatas: [],
      stationsDatasAll: [],
      parkData: []
    }
  },
  components: {
    BaiduMap,
    BmlHeatmap,
    BmMarker,
    BmPolyline,
    BmLabel,
    BmOverlay,
    BmPolygon,
    // BmlMarkerClusterer,
    // BmInfoWindow,
    BmControl,
    videoWrapper
  },
  beforeCreate () {
  },
  created () {
    // this._getOps()
  },
  mounted () {
    // this._getInitMap()
    // this._getParkingList()
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
          return { url: `${iconCarRed}`, size: { width: 87, height: 87, transform: 'scale(0.5)' } }
        } else {
          return { url: `${iconCarGreen}`, size: { width: 87, height: 87, transform: 'scale(0.5)' } }
        }
      }
    },
    getIconStation () {
      return { url: `${iconCarGreen}`, size: { width: 0, height: 0 } }
    },
    // getIconPark () {
    //   return { url: `${park}`, size: { width: 18, height: 23, transform: 'scale(0.2)' } }
    // },
    ...mapGetters(['formData'])
  },
  watch: {
    'formInline.value': {
      handler (newV) {
        console.log(newV)
        if (newV !== 'all') {
          let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
          let dataForm = this.$store.getters.formData
          this._getLineNetInfos({
            orgId,
            lineId: newV
          })
          this._positionRating({
            orgId,
            lineId: newV,
            busNumber: '',
            warnTypes: dataForm.warningArr,
            handleResult: []
          })
        } else {
          this.markers = this.markersAll
          this.lineData = this.lineDataAll
        }
      }
    },
    dialogTableVisible (newV) {
      let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
      if (newV) {
        clearTimeout(this.timerRate)
        this.timerRate = null
      } else {
        this.timerRate = setTimeout(() => {
          this._positionRating({
            orgId
          })
        }, TIME)
      }
    },
    'carDetailData.warnInfos': {
      deep: true,
      handler (newV) {
        console.log(newV)
      }
    },
    searchData: {
      deep: true,
      handler (newV) {
        clearTimeout(this.timerRate)
        this.timerRate = null
        let dataForm = this.$store.getters.formData
        let orgId = newV.orgId === '1' ? '' : newV.orgId
        this._positionRating({
          orgId,
          lineId: newV.lineId,
          busNumber: newV.busNumber,
          busSelfCode: newV.busSelfCode,
          warnTypes: newV.warnTypeId.length === 0 ? dataForm.warningArr : newV.warnTypeId,
          handleResult: newV.checkList
        })
      }
    }
  },
  methods: {
    initMap () {
      this.stationsDatasAll.forEach((item) => {
        item.isSee = false
      })
    },
    _getOps () {
      this.$api['wholeInformation.getCityCoordinatePoints']().then(res => {
        this.center.lat = res.lat
        this.center.lng = res.lng
      })
    },
    _positionRating (params) {
      this.timerRate && clearTimeout(this.timerRate)
      this.timerRate = null
      this.loading = true
      this.$api['homeMap.getBusPositionAndFullLoadRate'](params).then(res => {
        this.markersAll = res
        this.markers = this.markersAll
        this.loading = false
        this.disabled = false
        if (!this.searchData) {
          this.timerRate = setTimeout(() => {
            this._positionRating(params)
          }, TIME)
        }
      })
    },
    _getLineNetInfos (params) {
      this.stationsDatas = []
      this.stationsDatasAll = []
      this.$api['homeMap.getLineNetInfos'](params).then(res => {
        // this.lineData = res
        this.lineData = []
        this.lineDataAll = []
        for (let item in res) {
          this.lineDataAll.push({
            lineName: res[item][0].lineName,
            lineUuid: res[item][0].lineUuid,
            lineType: res[item][0].lineType,
            stations: res[item]
          })
        }
        // console.log(this.lineDataAll)
        this.lineDataAll.forEach((item, index) => {
          item.stations.forEach(val => {
            if (val.mlStaUuid !== '-1') {
              this.stationsDatasAll.push({ ...val, isSee: false, color: this.colors[index] })
            }
          })
        })
        this.stationsDatas = this.stationsDatasAll
        this.lineData = this.lineDataAll
      })
    },
    getDetail (event, item) {
      this.currenPoint = event.point
      this.details = item
      this.isSee = true
    },
    clearDetail () {
      this.isSee = false
    },
    draw ({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(this.currenPoint.lng, this.currenPoint.lat))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    },
    _getKey () {
      // ddzx8885899A 延安的密码
      // 1985916 大同的密码
      this.$jsonp(`${URL}key?username=admin&password=admin456$%^`).then(json => {
        this.key = json.data.key
      })
    },
    _getVideoList (terid) {
      this.urlList = []
      return new Promise((resolve, reject) => {
        this.$jsonp(`${URL}live/port?key=${this.key}`).then(res => {
          for (let i = 1; i < 7; i++) {
            if (i < 4) {
              this.$jsonp(`${URL}live/video?key=${this.key}&terid=${terid}&chl=${i}&audio=1&st=0&port=${res.data[0].port}`).then(res => {
                this.urlList.push(Object.assign({}, res.data, { ch: i, isAct: false }))
              })
            } else {
              this.$jsonp(`${URL}live/video?key=${this.key}&terid=${terid}&chl=${i}&audio=1&st=0&port=${res.data[1].port}`).then(res => {
                this.urlList.push(Object.assign({}, res.data, { ch: i, isAct: false }))
              })
            }
          }
          setTimeout(() => {
            resolve(this.urlList)
          }, 1000)
        })
      })
    },
    handler ({ BMap, map }) {
      let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
      this.zoom = 14
      this._getOps()
      this.$store.dispatch('getLineList').then(res => {
        this.lineOptions = res
        this.formInline.value = this.lineOptions[0].value
        this._getLineNetInfos({
          orgId,
          lineId: this.lineOptions[0].value
        })
      })
      this.isLoading = false
      map.setMapStyle(mapStyleSec)
    },
    handleMarkerClick (marker) {
      Bus.$emit('handlerMarker', marker)
    },
    handleStationClick (marker) {
      this.stationsDatasAll.forEach((item) => {
        if (item.staUuid === marker.staUuid) {
          item.isSee = true
        } else {
          item.isSee = false
        }
      })
    },
    getCharItem (item) {
      this.charData[item.index].isAct = !this.charData[item.index].isAct
    },
    getAlarmItem (item, index) {
      // this.carDetailData.warnInfos[item.index].isAct = true
      this.warnData[index].isAct = !this.warnData[index].isAct
      // item.isAct = true
    },
    getMapType (index) {
      if (this.isSelect) {
        this.currentIndexMap = index
      }
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
  .sample {
    width: 120px;
    height: 3vh;
    line-height: 3vh;
    background: rgba(0,0,0,0.5);
    overflow: hidden;
    box-shadow: 0 0 5px #000;
    color: #fff;
    text-align: center;
    padding: .5vw;
    position: absolute;
  }
  .sample.active {
    background: rgba(0,0,0,0.75);
    color: #fff;
  }
  .form-inline {
    /deep/ .el-input__inner {
      background-color: rgb(14, 33, 57);
      border: 1px solid #0e5b66;
      color: #16d9de
    }
  }
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
    background-color: rgba(113, 245, 255, 0.4)
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
          margin-right: 1.5vw;
          margin-bottom: 1vh;
          height: 3vh;
          line-height: 2;
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
          margin-right: 1.5vw;
          line-height: 2.1;
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
        width: 80%;
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
  margin-top: -6vh;
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
        box-sizing: border-box;
        border: 1px solid #ffffff;
        border-left: hidden;
        box-sizing: border-box;
        color: #fff;
        font-size: 0.3vw;
        text-align: center;
      }
      .company,.line {
        width: 100%;
        height: 3vh;
        line-height: 3vh;
        box-sizing: border-box;
        border-right: 1px solid #ffffff;
        border-bottom: 1px solid #ffffff;
        box-sizing: border-box;
        color: #fff;
        font-size: 0.3vw;
        text-align: center;
      }
    }
  }
  .live-video, .alarm-video {
    width: 100%;
    min-height: 30vh;
    display: flex;
    flex-wrap: wrap;
    margin-top: 1vh;
    .top-left-video,.top-right-video,.bottom-left-video,.bottom-right-video{
      width: 40%;
      min-height: 10vh;
      margin-right: 1vw;
      margin-top: 0.5vh;
      background-color: #333;
    }
  }
  .alarm-video {
    min-height: 15vh !important;
  }
  .bg {
    background-color: transparent
  }
  .bottom-message {
    width: 100%;
    height: 2vh;
    line-height: 3vh;
    display: flex;
    font-size: 0.1vw;
    color: #fff;
    margin-top: 1vh;
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
  position: relative;
  z-index: 2000;
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
