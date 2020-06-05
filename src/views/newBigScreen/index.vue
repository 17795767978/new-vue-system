<template>
  <div class="data-wrapper" id="full-wrapper" :class="skinType === 0 ? 'whitekBg' : 'blackBg'">
    <el-button type="success" @click="fullScreen" size="mini" style="position: absolute; right: 20px; top: 10px; z-index: 1003">
      <i class="el-icon-video-camera" style="font-size: 22px;"></i>
    </el-button>
    <div class="content-wrapper">
     <TopTitleMsg></TopTitleMsg>
     <StreamNum></StreamNum>
     <chartsComplete></chartsComplete>
     <el-row :gutter="20">
       <el-col :span="8">
        <div class="left-wrapper">
          <div class="top-left-wrapper" :class="skinType === 0 ? 'cardBg-white' : ''">
            <div class="corner-1" v-show="skinType === 1">
              <img src="../../assets/images/newScreen/card-tl.png"/>
            </div>
            <div class="corner-2" v-show="skinType === 1">
              <img src="../../assets/images/newScreen/card-tr.png"/>
            </div>
            <div class="corner-3" v-show="skinType === 1">
              <img src="../../assets/images/newScreen/card-bl.png"/>
            </div>
            <div class="corner-4" v-show="skinType === 1">
              <img src="../../assets/images/newScreen/card-br.png"/>
            </div>
            <div class="wrapper-title" :style="{ background:  skinType === 0 ? '#fff' : 'rgba(42,47,85,0.5)' }"><span></span><span :style="{color: skinType === 0 ? '#000' : '#fff', background:  skinType === 0 ? '#fff' : 'rgba(42,47,85,0.5)' }">实时满载率</span></div>
            <perChart></perChart>
          </div>
          <div class="middle-left-wrapper" :class="skinType === 0 ? 'cardBg-white' : ''">
            <div class="corner-1" v-show="skinType === 1">
              <img src="../../assets/images/newScreen/card-tl.png"/>
            </div>
            <div class="corner-2" v-show="skinType === 1">
              <img src="../../assets/images/newScreen/card-tr.png"/>
            </div>
            <div class="corner-3" v-show="skinType === 1">
              <img src="../../assets/images/newScreen/card-bl.png"/>
            </div>
            <div class="corner-4" v-show="skinType === 1">
              <img src="../../assets/images/newScreen/card-br.png"/>
            </div>
            <div class="wrapper-title" :style="{ background:  skinType === 0 ? '#fff' : 'rgba(42,47,85,0.5)' }"><span></span><span :style="{color: skinType === 0 ? '#000' : '#fff' }">客流最热线路TOP10(上车客流)</span></div>
            <!-- <driveChart></driveChart> -->
            <lineEchartsTop :isBigScreen="true"/>
          </div>
          <div class="bottom-left-wrapper" :class="skinType === 0 ? 'cardBg-white' : ''">
            <div class="corner-1" v-show="skinType === 1">
              <img src="../../assets/images/newScreen/card-tl.png"/>
            </div>
            <div class="corner-2" v-show="skinType === 1">
              <img src="../../assets/images/newScreen/card-tr.png"/>
            </div>
            <div class="corner-3" v-show="skinType === 1">
              <img src="../../assets/images/newScreen/card-bl.png"/>
            </div>
            <div class="corner-4" v-show="skinType === 1">
              <img src="../../assets/images/newScreen/card-br.png"/>
            </div>
            <div class="wrapper-title" :style="{ background:  skinType === 0 ? '#fff' : 'rgba(42,47,85,0.5)' }"><span></span><span :style="{color: skinType === 0 ? '#000' : '#fff', background:  skinType === 0 ? '#fff' : 'rgba(42,47,85,0.5)' }">客流最热站点TOP10(上车客流)</span></div>
            <stationEcharts :isBigScreen="true"/>
          </div>
        </div>
       </el-col>
       <el-col :span="16">
         <div class="right-wrapper" :class="skinType === 1 ? 'panelBg-black' : ''">
           <img src="../../assets/images/newScreen/mapCover.png"/>
           <div style="width: 94%;height: 86%;position: absolute;top: 10%;left:3%;z-index:100;">
             <mapChart></mapChart>
           </div>
         </div>
       </el-col>
     </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TopTitleMsg from '../operationMonitoring/Components/topTitleMsg.vue'
import StreamNum from '../operationMonitoring/Components/streamNum.vue'
import chartsComplete from '../operationMonitoring/Components/chartsComplete.vue'
import perChart from '../operationMonitoring/Components/echartsComponent/perChart.vue'
import mapChart from '../operationMonitoring/Components/echartsComponent/mapChart.vue'
import lineEchartsTop from '../operationAnalysis/dispatchingOperationAnalysis/passengerHome/Components/lineEchartsTop'
import stationEcharts from '../operationAnalysis/dispatchingOperationAnalysis/passengerHome/Components/stationEcharts'
// import driveChart from '../operationMonitoring/Components/echartsComponent/driveChart.vue'
// import vueSeamless from 'vue-seamless-scroll'
const TIME = 3 * 60 * 1000
export default {
  name: 'chartAnalysis',
  data () {
    return {
      skinType: 0, // 皮肤 0 白色 1 黑色
      isFullScreen: false,
      config: '',
      loading: true,
      diffArrData: [],
      timer: null,
      timerOption: null
    }
  },
  computed: {
    allOptions () {
      return {
        hoverStop: true,
        step: 0.5
      }
    }
  },
  created () {
    // if (this.$route.path === '/chart-analysis/chart-analysis/all') {
    //   this.config = 'all'
    // } else if (this.$route.path === '/chart-analysis/chart-analysis/passenger-flow') {
    //   this.config = 'passengerFlow'
    // } else if (this.$route.path === '/chart-analysis/chart-analysis/fatigue-alarm') {
    //   this.config = 'fatigueAlarm'
    // }
    // 监听全屏事件 根据高度计算是否退出
    document.addEventListener('fullscreenchange', (e) => {
      if (window.innerHeight - window.outerHeight < -80) {
        this.noCache()
      }
    })
    document.addEventListener('mozfullscreenchange', (e) => {
      if (window.innerHeight - window.outerHeight < -80) {
        this.noCache()
      }
    })
    document.addEventListener('webkitfullscreenchange', (e) => {
      if (window.innerHeight - window.outerHeight < -80) {
        this.noCache()
      }
    })
    document.addEventListener('msfullscreenchange', (e) => {
      if (window.innerHeight - window.outerHeight < -80) {
        this.noCache()
      }
    })
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._badDrivingBehavior({
      orgId
    })
  },
  mounted () {
    // this.fullScreen()
    this.$store.state.views.activeNight ? this.skinType = 1 : this.skinType = 0
  },
  activated () {
    this.fullScreen()
  },
  methods: {
    fullScreen () {
      // let ele = document.getElementById('full-wrapper')
      if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen()
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen()
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        }
      } else {
        this.noCache()
        if (document.cancelFullScreen) {
          document.cancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        }
      }
    },
    noCache () {
      this.$router.replace('/homepage/home')
      let viewsArr = this.$store.state.views.visitedViews.filter(item => item.name !== 'chartAnalysis')
      let cachedViews = this.$store.state.views.cachedViews.filter(item => item !== 'chartAnalysis')
      this.$store.state.views.visitedViews = viewsArr
      this.$store.state.views.cachedViews = cachedViews
    },
    _badDrivingBehavior (params) {
      this.codeNum = 0
      this.$api['homeTired.getBadDrivingBehaviorTable'](params).then(res => {
        this.alermData = []
        this.diffArrData = []
        res.forEach(alert => {
          this.alermData.push(alert.split('：'))
        })
        this.getNumberArry()
        this.loading = false
        let typeData = new Set(this.alermData.map(item => item[1]))
        this.alarmType = [...typeData]
        this.timer = setInterval(() => {
          this.codeNum += 1
          if (this.codeNum === 300) {
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
        this.timerOption = setTimeout(() => {
          this._badDrivingBehavior()
        }, TIME)
      })
    },
    getNumberArry () {
      if (this.alermData.length > 500) {
        for (let i = 0; i < this.alermData.length; i += 500) {
          this.diffArrData[Math.floor(i / 500)] = this.alermData.slice(i, i + 500)
        }
      } else {
        this.diffArrData[0] = this.alermData
      }
    }
  },
  components: {
    TopTitleMsg,
    StreamNum,
    chartsComplete,
    perChart,
    // vueSeamless,
    mapChart,
    lineEchartsTop,
    stationEcharts
    // driveChart
  },
  destroyed () {
    clearInterval(this.timerOption)
    this.timer = null
    this.timerOption = null
  }
}
</script>

<style lang="scss" scoped>
.wrapper-title {
  position: absolute;
  top: 20px;
  left: 10px;
  // width: 100%;
  height: 20px;
  z-index: 200;
  background-color: #4ABDF4;
}
.wrapper-title span:nth-child(1) {
   display: inline-block;
  width: 4px;
  height: 11px;
  background-color: #4ABDF4;
  margin-right: 6px;
}
.wrapper-title span:nth-child(2) {
   color: #ffffff;
   font-size: 14px;
}
.corner-1 {
  position: absolute;
  top: 0;
  left: 0px;
}
.corner-2 {
  position: absolute;
  top: 0;
  right: 0px;
}
.corner-3 {
  position: absolute;
  bottom: 0;
  left: 0;
}
.corner-4 {
  position: absolute;
  bottom: 0;
  right: 0;
}
.blackBg {
  background-color: #151A3A;
}
.whitekBg {
  background-color: #F5F6FA;
}
.cardBg-white {
  background-color: #FFFFFF!important;
  color: #000000!important;
  box-shadow: 0px 0px 15px 0px rgba(4,56,161,0.2);
}
.data-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  min-height: calc(100vh);
  overflow: auto;
  // background: url(../../assets/images/space.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 1002;
  padding: 5px 20px;
  box-sizing: border-box;
  // background-color: #00082d;
  .content-wrapper {
    padding: 0;
    box-sizing: border-box;
    .left-wrapper {
      width: 100%;
      height: 660px;
      // background-color: rgba(0,0,0, 0.65);
      border-radius: 6px;
      box-sizing: border-box;
      margin-top: 20px;
      .top-left-wrapper {
        width: 100%;
        position: relative;
        background-color: rgba(42,47,85,0.5);
        height: 31%;
        border-radius: 6px;
      }
      .middle-left-wrapper {
        width: 100%;
        position: relative;
        background-color: rgba(42,47,85,0.5);
        height: 34%;
        border-radius: 6px;
        margin-top: 2%;
      }
      .bottom-left-wrapper {
        width: 100%;
        position: relative;
        background-color: rgba(42,47,85,0.5);
        height: 34%;
        margin-top: 2%;
        border-radius: 6px;
        .scroll-wrapper {
          padding: 0 30px;
          height: 80%;
          overflow: hidden;
          box-sizing: border-box;
        }
        .list-font {
          color: #fff;
          font-size: 14px;
          margin-top: 0;
          margin-bottom: 20px;
        }
      }
    }
    .right-wrapper {
      width: 100%;
      height: 660px;
      // background-color: #2A2F55;
      border-radius: 6px;
      box-sizing: border-box;
      margin-top: 20px;
      position: relative;
      // background-image: url('../../assets/images/newScreen/mapCover.png');
      // background-position: center;
      // background-repeat: no-repeat;
      // background-size: contain;
    }
  }
}
.right-wrapper img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
}
.panelBg-black {
  background-color: rgba(42,47,85,0.5) !important;
}
</style>
