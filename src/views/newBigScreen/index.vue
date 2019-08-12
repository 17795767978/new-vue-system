<template>
  <div class="data-wrapper" id="full-wrapper">
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
          <div class="top-left-wrapper">
            <perChart></perChart>
          </div>
          <div class="middle-left-wrapper">
            <driveChart></driveChart>
          </div>
          <div class="bottom-left-wrapper">
            <div  v-loading="loading" element-loading-background="rgba(255, 255, 255, 0)" style="height: 100%">
            <h1 style="text-align: center; color: #fff; margin-top:0;">司机不良驾驶行为实时报警</h1>
            <div v-for="(arrData, index) in diffArrData" :key="index"  @click="getIndex(index)">
            <vueSeamless  v-if="Math.floor(codeNum / 500) ===  index"  class="scroll-wrapper" :class-option="allOptions" :data="arrData">
              <p class="list-font" v-for="(list, index) in arrData" :key="index">
                <span>{{list[0]}}：</span>
                <!-- <span v-if="index / 2 === parseInt(index / 2)" style="color: #eadf00">{{list[1]}}</span>
                <span v-else-if="index / 3 === parseInt(index / 3) && index / 2 === parseInt(index / 2)" style="color: #dc39ea">{{list[1]}}</span> -->
                <span v-if="list[1] === '打电话。'" style="color: #eadf00;">{{list[1]}}</span>
                <span v-if="list[1] === '抽烟。'" style="color: #fa8a96;">{{list[1]}}</span>
                <span v-if="list[1] === '分神驾驶。'" style="color: #e9a475;">{{list[1]}}</span>
                <span v-if="list[1] === '疲劳驾驶。'" style="color: #dc3971;">{{list[1]}}</span>
                <span v-if="list[1] === '驾驶员异常。'" style="color: #e8f19c;">{{list[1]}}</span>
              </p>
            </vueSeamless>
            </div>
          </div>
          </div>
        </div>
       </el-col>
       <el-col :span="16">
         <div class="right-wrapper">
           <mapChart></mapChart>
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
import driveChart from '../operationMonitoring/Components/echartsComponent/driveChart.vue'
import vueSeamless from 'vue-seamless-scroll'
const TIME = 3 * 60 * 1000
export default {
  name: 'chartAnalysis',
  data () {
    return {
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
  },
  activated () {
    this.fullScreen()
  },
  watch: {
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
    vueSeamless,
    mapChart,
    driveChart
  },
  destroyed () {
    clearInterval(this.timerOption)
    this.timer = null
    this.timerOption = null
  }
}
</script>

<style lang="scss" scoped>
.data-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  min-height: calc(100vh);
  overflow: auto;
  background: url(../../assets/images/space.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 1002;
  padding: 5px 20px;
  box-sizing: border-box;
  background-color: #00082d;
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
        background-color: rgba(0,0,0, 0.65);
        height: 31%;
        border-radius: 6px;
      }
      .middle-left-wrapper {
        width: 100%;
        position: relative;
        background-color: rgba(0,0,0, 0.65);
        height: 34%;
        border-radius: 6px;
        margin-top: 2%;
      }
      .bottom-left-wrapper {
        width: 100%;
        position: relative;
        background-color: rgba(0,0,0, 0.65);
        height: 32%;
        margin-top: 2%;
        border-radius: 6px;
        padding: 15px;
        box-sizing: border-box;
        overflow: hidden;
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
      background-color: rgba(0,0,0, 0.65);
      border-radius: 6px;
      box-sizing: border-box;
      margin-top: 20px;
    }
  }
}
</style>
