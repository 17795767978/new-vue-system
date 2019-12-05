<template>
  <div>
  <Dialog @defaultStation="getDefaultStation" @getDatas="getMonth" />
  <div class="map">
    <Map :datas="datas"/>
  </div>
  <div class="settings">
    <div class="left">
      <el-button type="primary" size="mini" @click="getMonthDialog">查询</el-button>
    </div>
    <!-- <div class="middle">
      <div class="play">
        <i @click="getStatus" class="el-icon-video-pause size"  v-if="play"></i>
        <i @click="getStatus" class="el-icon-video-play size" v-else></i>
        <i  class="el-icon-arrow-left size"></i>
      </div>
      <div class="display">
        <ul class="wrapper">
          <li class="icon" :class="[item === currentTime ? 'active' : '']" v-for="(item, index) in time" :key="item" @click="puase(item, index)"></li>
        </ul>
      </div>
      <div class="right-arrow">
        <i class="el-icon-arrow-right size"></i>
      </div>
    </div>
    <div class="right">
      <p class="font" style="text-align: center; margin-top: 0;margin-bottom: 1vh;font-size: 1.5vw;color: #fff">{{month}}</p>
      <p class="font" style="text-align: center; margin-top: 0;color: #fff" v-if="currentTime !== ''">{{currentTime}} 数据指标</p>
    </div> -->
  </div>
  </div>
</template>

<script>
import Map from './Components/map'
import Dialog from './Components/dialog'
import moment from 'moment'
const TIME_DATA = ['06:00-07:00', '07:00-08:00', '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00',
  '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00',
  '19:00-20:00', '20:00-21:00', '21:00-22:00', '22:00-23:00']
const TIME = 3000
export default {
  name: 'stationMap',
  data () {
    return {
      time: TIME_DATA,
      month: '',
      play: false,
      currentTime: '',
      setTimer: null,
      datas: {},
      current: 0,
      selectData: {},
      station: '',
      currentStop: false
    }
  },
  mounted () {
    // this.month = moment().subtract(30, 'days').format('YYYY-MM')
    // setTimeout(() => {
    //   this.$api['lineNet.getAnalStaOdDataMapData']({
    //     month: moment().subtract(30, 'days').format('YYYY-MM'),
    //     upStaName: this.station,
    //     linearDistanceMin: '',
    //     linearDistanceMax: '',
    //     payNumberMin: '',
    //     payNumberMax: '',
    //     payTimeIntervalMin: '',
    //     payTimeIntervalMax: ''
    //   }).then(res => {
    //     this.datas = res
    //   })
    // }, 1000)
  },
  watch: {
    play (newV) {
      if (newV) {
        this.currentStop = true
        this.animHotMap(this.current)
      } else {
        this.currentStop = false
        clearTimeout(this.setTimer)
        this.setTimer = null
      }
    },
    currentTime (newV) {
      // let timeArr = newV.split('-')
      // this.getDatas(timeArr)
    }
  },
  methods: {
    getDefaultStation (station) {
      this.station = station.staName
    },
    getMonth (data) {
      this.selectData = data
      this.month = moment(data.month).format('YYYY-MM')
      this.play = false
      this.currentStop = true
      clearTimeout(this.setTimer)
      this.setTimer = null
      this.currentTime = this.time[0]
      this.current = 0
      this.getDatas(this.currentTime)
    },
    // api获取数据
    async getDatas (time) {
      let result = await this.$api['lineNet.getAnalStaOdDataMapData']({
        month: this.month,
        upStaName: this.selectData.stations,
        linearDistanceMin: this.selectData.startDis,
        linearDistanceMax: this.selectData.endDis,
        payNumberMin: this.selectData.startNum,
        payNumberMax: this.selectData.endNum,
        payTimeIntervalMin: time[0],
        payTimeIntervalMax: time[1]
      })
      // 相当于异步重新开启播放
      if (this.currentStop) {
        this.play = true
      }
      this.datas = result
    },
    // 点击到具体的时间
    puase (time, index) {
      this.play = false
      this.currentTime = time
      this.current = index
    },
    // 暂停播放
    getStatus () {
      this.play = !this.play
    },
    // 动画
    animHotMap (index) {
      let num = index + 1
      this.currentTime = this.time[index]
      for (let i = 0; i < this.time; i++) {
        if (index === num) {
          num = index
        }
      }
      this.setTimer = setTimeout(() => {
        if (num < this.time.length) {
          this.current = num
          this.animHotMap(this.current)
        } else {
          this.current = 0
          this.animHotMap(this.current)
        }
      }, TIME)
    },
    // 弹出层
    getMonthDialog () {
      this.$children[0].dialogVisible = true
    }
  },
  destroyed () {
    clearTimeout(this.setTimer)
    this.setTimer = null
  },
  components: {
    Map,
    Dialog
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 93vh;
  position: absolute;
  z-index: 800
}
.settings {
  width: 100%;
  padding: 1vh 2vw;
  height: 5vh;
  box-sizing: border-box;
  z-index: 802;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  .left {
    width: 20%;
  }
  .middle {
    width: 60%;
    display: flex;
    justify-content: space-around;
    position: relative;
    // vertical-align: top;
    .play {
      width: 6%;
      .size {
        font-size: 1.5vw;
        color: #fff;
        margin-top: 0.2vh;
      }
    }
    .display {
      width: 91%;
      height: 0.5vh;
      margin-top: 1.25vh;
      background-color: #fff;
      border-radius: 0.25vh;
      position: relative;
      .wrapper {
        width: 100%;
        display: flex;
        height: 1rem;
        justify-content: space-around;
        margin-top: -0.25rem;
        .icon {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          border: 1px solid #fff;
          background: #fff;
        }
      }
    }
    .right-arrow {
      width: 3%;
      .size {
        font-size: 1.5vw;
        color: #fff;
        margin-top: 0.2vh;
      }
    }
  }
  .right {
    width: 20%;
    text-align: right;
    line-height: 2.5vh;
    .font {
      font-size: 1.2vw;
    }
  }
}
.line-echarts {
  width: 30%;
  height: 15vh;
  position: absolute;
  left: 2vw;
  top: 10vh;
  z-index: 1050
}
.station-echarts {
  width: 30%;
  height: 15vh;
  position: absolute;
  left: 2vw;
  top: 30vh;
  z-index: 1050
}
.active {
  background-color: #fe1702 !important;
  border: 1px solid #fe1702 !important;
  box-shadow: -1px -1px 2px #fe1702;
}
</style>
