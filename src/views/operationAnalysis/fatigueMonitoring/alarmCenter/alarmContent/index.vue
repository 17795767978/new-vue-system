<template>
  <div class="alarm-content" v-loading="load">
    <el-row class="pic" v-if="busDetails.warnTimesArr && busDetails.warnTimesArr.length > 0 || overspeedDetails.warnTimesArr && overspeedDetails.warnTimesArr.length > 0">
      <el-card shadow="hover" class="time-arr">
        <el-row :gutter="24" class="pic">
          <h3 class="demonstration">报警时间集合</h3>
          <el-col :span="24 / busDetails.warnTimesArr.length" v-for="(item, index) in busDetails.warnTimesArr" :key="item">
            <el-link :type="currentIndex === index ? 'primary' : 'info'" @click="handlerChange(item, busDetails.warnUuidsArr[index], index)">{{item}}</el-link>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row class="pic">
      <el-card shadow="hover" class="person-detail">
        <personDetail :busDetails="busDetails" :overspeedDetails="overspeedDetails" :position="position" @update="update"/>
      </el-card>
    </el-row>
    <el-row class="pic-middle" :gutter="12">
      <el-col :span="12" v-show="Object.keys(this.busDetails).length > 0">
        <el-card shadow="hover" class="pic-detail">
          <picDetail :busDetails="busDetails.warnPicList"/>
        </el-card>
      </el-col>
      <el-col :span="12" v-show="Object.keys(this.busDetails).length > 0">
        <el-card shadow="hover" class="video-detail">
          <videoDetail :busDetails="busDetails.warnMediaList"/>
        </el-card>
      </el-col>
      <el-col :span="24" v-show="Object.keys(overspeedDetails).length > 0">
        <el-card shadow="hover" class="speed-detail">
          <speedEchart :canDatas="overspeedDetails.canDatas"/>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="pic-bottom">
      <el-card shadow="hover" :class="busDetails.warnTimesArr && busDetails.warnTimesArr.length > 0 || overspeedDetails.warnTimesArr && overspeedDetails.warnTimesArr.length > 0 ? 'map-detail' : 'map-detail-second'" v-show="Object.keys(busDetails).length > 0">
        <mapDetail :busDetails="busDetails"/>
      </el-card>
      <el-card shadow="hover" class="speed-map-detail" v-show="Object.keys(overspeedDetails).length > 0">
        <overSpeedMap class="maps" :warnTrails="overspeedDetails.warnTrails" @getLocation="getLocation"></overSpeedMap>
      </el-card>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
// import { warnInfoDetail } from 'server/interface'
import personDetail from './Components/personDetail'
import picDetail from './Components/picDetail'
import videoDetail from './Components/videoDetail'
import mapDetail from './Components/mapDetail'
import overSpeedMap from './Components/overSpeedMap'
import speedEchart from './Components/echarts'
// import moment from 'moment';
export default {
  name: 'alarmContent',
  data () {
    return {
      load: false,
      busDetails: {},
      isClear: false,
      warnUuid: '',
      overspeedDetails: {},
      position: '',
      warnTimesArr: [],
      warnUuidsArr: [],
      currentIndex: ''
    }
  },
  provide () {
    return { parent: this }
  },
  components: {
    personDetail,
    picDetail,
    videoDetail,
    mapDetail,
    overSpeedMap,
    speedEchart
  },
  created () {
    sessionStorage.setItem('sessionQuery', this.$route.query.id)
    if (Object.keys(this.$route.query).length > 0) {
      this._warnInfoDetail(this.$route.query.id)
      if (this.$route.query.type !== 'normal') {
        this.position = ''
      }
      // if (this.$route.query.type === 'normal') {
      //   this._warnInfoDetail(this.$route.query.id)
      // } else {
      //   this.position = ''
      //   this._getOverWarnInfoDetail(this.$route.query.row)
      // }
    } else {
      this.$router.push({
        name: 'alarmCenter'
      })
    }
  },
  activated () {
    if (Object.keys(this.$route.query).length > 0) {
      sessionStorage.setItem('sessionQuery', this.$route.query.id)
      this._warnInfoDetail(this.$route.query.id)
      if (this.$route.query.type === 'normal') {
        this.overspeedDetails = {}
      } else {
        this.busDetails = {}
        this.position = ''
      }
    }
  },
  beforeDestroy () {
    sessionStorage.removeItem('sessionQuery')
  },
  watch: {},
  methods: {
    _warnInfoDetail (params) {
      this.load = true
      this.$api['tiredMonitoring.getWarnDetail']({
        warnUuid: params,
        warnTime: ''
      }).then(res => {
        this.warnTimesArr = res.warnTimes ? res.warnTimes.split(',') : []
        this.warnUuidsArr = res.warnUuids ? res.warnUuids.split(',') : []
        this.load = false
        if (this.$route.query.type === 'normal') {
          this.busDetails = Object.assign({ warnTimesArr: this.warnTimesArr, warnUuidsArr: this.warnUuidsArr }, res)
        } else {
          this.overspeedDetails = Object.assign({ warnTimesArr: this.warnTimesArr, warnUuidsArr: this.warnUuidsArr }, res)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    // _getOverWarnInfoDetail (params) {
    //   this.load = true
    //   const { busPlateNumber, busSelfCode, busUuid, driverName, lineName, orgName, speed, warnEndTime, warnStartTime, warnTypeName, duration } = JSON.parse(params)
    //   this.$api['tiredMonitoring.overWarnInfoDetail']({
    //     busUuid, busPlateNumber, busSelfCode, driverName, lineName, orgName, speed, warnEndTime, warnStartTime, warnTypeName, duration
    //   }).then(res => {
    //     this.overspeedDetails = res
    //     this.load = false
    //   }).catch(err => {
    //     this.$message.error(err.message)
    //   })
    // },
    handlerChange (time, uuid, index) {
      // console.log(time, uuid)
      this.currentIndex = index
      this.load = true
      this.$api['tiredMonitoring.getWarnDetail']({
        warnUuid: uuid,
        warnTime: time
      }).then(res => {
        this.load = false
        if (this.$route.query.type === 'normal') {
          this.busDetails = Object.assign({ warnTimesArr: this.warnTimesArr, warnUuidsArr: this.warnUuidsArr }, res)
        } else {
          this.overspeedDetails = Object.assign({ warnTimesArr: this.warnTimesArr, warnUuidsArr: this.warnUuidsArr }, res)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    getLocation (address) {
      this.position = address
    },
    update () {
      this._warnInfoDetail(JSON.parse(JSON.stringify(sessionStorage.getItem('sessionQuery'))))
    }
  }
}
</script>

<style lang="scss" scoped>
.alarm-content {
  width: 100%;
  height: 100%;
  padding: 1vh 1vw;
  box-sizing: border-box;
  background-color: #f0f2f5;
  .pic {
    margin-bottom: 1vh;
  }
  .pic-middle {
    margin-bottom: 1vh;
  }
  .pic-end {
    margin-bottom: 1vh;
  }
  .time-arr {
    min-height: 5vh;
    .demonstration {
      margin-top: 0;
      padding-left: 12px;
      box-sizing: border-box;
    }
  }
  .person-detail {
    height: 14vh;
  }
  .pic-detail {
    height: 32vh;
  }
  .video-detail {
    height: 32vh;
  }
  .speed-detail {
    height: 20vh;
    /deep/ .el-card__body {
      padding: 1vh 1vw;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
  }
  .map-detail {
    height: 30vh;
  }
  .map-detail-second {
    height: 38vh;
  }
  .speed-map-detail {
    width: 100%;
    height: 53vh;
    /deep/ .el-card__body {
      padding: 1vh 1vw;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
