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
      <div v-if="isCarsDetail">
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
      </div>
      <!-- </bml-marker-clusterer> -->
      <bml-heatmap :data="hotdata" :max="max" :radius="20" v-if="isHotMap">
      </bml-heatmap>
      <bm-control style="margin: 30px;" v-show="isHidden" v-if="isSearchLine">
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
    <div style="position: absolute; right: 2vw; bottom: 2vh;z-index: 1000" v-if="isSelect">
        <button v-for="(item, index) in buttonGroup" @click="getMapType(index)" :class="currentIndexMap === index ? 'active' : ''" class="primary" :key="index">{{item}}</button>
    </div>
    <div class="map-dialog-only">
    <el-dialog :title="title" top="10vh" :visible.sync="dialogTableVisible" width="70%" :modal-append-to-body="false" :close-on-click-modal="false" :modal='false'>
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
import { BaiduMap, BmMarker, BmlHeatmap, BmControl } from 'vue-baidu-map'
import { mapStyle } from './utils/mapStyle'
import iconCarRed from '../../assets/images/bus-red.png'
import iconCarGreen from '../../assets/images/bus-green.png'
import videoWrapper from './video'
import { mapGetters } from 'vuex'
import moment from 'moment'
const TIME = 3 * 60 * 1000
const URL = 'http://61.157.184.120:12056/api/v1/basic/' // 宜宾
// const URL = 'http://192.168.0.55:12056/api/v1/basic/' // 邢台
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
        value: ''
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
      urlList: []
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
    // this._getOps()
  },
  mounted () {
    this._getInitMap()
    this.$store.dispatch('getLineList').then(res => {
      this.lineOptions = res
      this.lineOptions.push({
        label: '全部线路',
        value: 'all'
      })
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
    },
    ...mapGetters(['formData'])
  },
  watch: {
    'formInline.value': {
      handler (newV) {
        if (newV !== 'all') {
          this.markers = Object.prototype.toString.call(this.markersAll) === '[object Array]' && this.markersAll.filter(item => item.lineGroupUuid === newV)
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
          warnTypes: newV.warnTypeId.length === 0 ? dataForm.warningArr : newV.warnTypeId,
          handleResult: newV.checkList
        })
      }
    }
  },
  methods: {
    _getInitMap () {
      const defaultData = this.$store.getters.formData
      let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
      if (this.isSelect) {
        this._hotDataLine({
          orgId
        })
      } else if (this.isHotMap) {
        this._hotDataLine({
          orgId
        })
      } else if (this.isCarsDetail) {
        this._positionRating({
          orgId,
          lineId: '',
          busNumber: '',
          warnTypes: defaultData.warningArr,
          handleResult: []
        })
      } else if (this.isLineMap) {
      }
    },
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
        if (!this.searchData) {
          this.timerRate = setTimeout(() => {
            this._positionRating(params)
          }, TIME)
        }
      })
    },
    _hotDataLine (params) {
      this.loading = true
      this.hotdata = []
      this.$api['homeMap.getBusHeatmapDatas'](params).then(res => {
        this.hotdata = res
        this.max = 100
        this.loading = false
        this.timerHot = setTimeout(() => {
          this._hotDataLine(params)
        }, TIME)
      })
    },
    _getKey () {
      this.$jsonp(`${URL}key?username=admin&password=1985916`).then(json => {
        this.key = json.data.key
      })
    },
    _getVideoList (terid) {
      console.log(terid)
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
    _getVideo (item) {
    },
    handler ({ BMap, map }) {
      this.zoom = 13
      // this.center = this.center
      this._getOps()
      this.isLoading = false
      map.setMapStyle(mapStyle)
      this.$refs.baiduMapWrapper.$el.children[0].style.borderRadius = '6px'
    },
    handleMarkerClick (marker) {
      this.charData.forEach(item => {
        item.isAct = false
      })
      this.warnData = []
      this.title = `${marker.lineName}-${marker.busNumber}-车辆详情`
      this.isLoading = true
      const { busId,
        busNumber,
        drvName,
        drvIccard,
        samplingTime,
        busSelfcode,
        warnSpeed,
        orgName,
        lineName,
        lineType,
        positionSpeed,
        currenttrip,
        warnDeviceCode,
        busVideoOrder } = marker
      this.$api['homeTired.getVideoMsg']({
        busId,
        busNumber,
        samplingTime,
        busSelfcode,
        warnSpeed,
        orgName,
        lineName,
        lineType,
        drvName,
        drvIccard,
        positionSpeed,
        currenttrip,
        warnDeviceCode,
        busVideoOrder
      }).then(res => {
        this.carDetailData = res
        this.carDetailData.startUpDate = moment(this.carDetailData.startUpDate).format('YYYY-MM-DD')
        this.carDetailData.tripPercent = Number(this.carDetailData.tripPercent)
        if (this.carDetailData.busVideoOrder && this.carDetailData.busVideoOrder.length > 0) {
          this.charData = []
          this.carDetailData.busVideoOrder.forEach((item, index) => {
            if (index < 6) {
              this.charData.push({
                ch: item,
                isAct: false,
                index: index
              })
            }
          })
        } else {
          this.charData = [
            { ch: '通道1', isAct: false, index: 0 },
            { ch: '通道2', isAct: false, index: 1 },
            { ch: '通道3', isAct: false, index: 2 },
            { ch: '通道4', isAct: false, index: 3 },
            { ch: '通道5', isAct: false, index: 4 },
            { ch: '通道6', isAct: false, index: 5 }
          ]
        }
        if (this.isFlv) {
          this._getKey()
          this._getVideoList(this.carDetailData.devRefId).then(res => {
          })
        }
        if (this.carDetailData.warnInfos.length > 0) {
          this.carDetailData.warnInfos = this.carDetailData.warnInfos.slice(0, 2)
          this.carDetailData.warnInfos.slice(0, 2).forEach((item, index) => {
            this.warnData.push({
              index,
              isAct: false,
              warnTypeName: item.warnTypeName + (index + 1)
            })
          })
        }
        this.dialogTableVisible = true
      }).catch((e) => {
        this.$message.error(e.message)
      })
    },
    // getWarnInfo (warnInfos) {
    //   warnInfos.forEach((item, index) => {
    //     item.warnTypeName = item.warnTypeName + (index + 1)
    //     item.isAct = false
    //     item.index = index
    //   })
    // },
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
