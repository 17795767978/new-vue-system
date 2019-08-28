<template>
  <div class="main-chart-wrapper">
    <el-row :gutter="20">
      <el-col :span="getLeftWrapperWidth" class="data-style" v-if="config !== 'fatigueAlarm'">
        <div class="left-wrapper">
          <rankingChart></rankingChart>
        </div>
      </el-col>
      <el-col :span="getRightWrapperWidth" class="data-style" v-if="config !== 'passengerFlow'">
        <div>
          <div  v-loading="loading" element-loading-background="rgba(255, 255, 255, 0)" class="right-wrapper">
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
                <span v-else style="color: #dc39ea">{{list[1]}}</span>
              </p>
            </vueSeamless>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import rankingChart from './echartsComponent/rankingChart.vue'
import vueSeamless from 'vue-seamless-scroll'
const TIME = 3 * 60 * 1000
export default {
  props: {
    config: {
      type: String
    }
  },
  data () {
    return {
      alermData: [],
      topY: 40,
      timer: null,
      alarmType: [],
      diffArrData: [],
      timerOption: null,
      loading: true,
      codeNum: 0
    }
  },
  computed: {
    allOptions () {
      return {
        hoverStop: true,
        step: 0.5
      }
    },
    getLeftWrapperWidth () {
      let width = 0
      if (this.config === 'all') {
        width = 12
      } else if (this.config === 'passengerFlow') {
        width = 24
      } else if (this.config !== 'passengerFlow' && this.config !== 'all') {
        width = 0
      }
      return width
    },
    getRightWrapperWidth () {
      let width = 0
      if (this.config === 'all') {
        width = 12
      } else if (this.config === 'fatigueAlarm') {
        width = 24
      } else if (this.config !== 'fatigueAlarm' && this.config !== 'all') {
        width = 0
      }
      return width
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._badDrivingBehavior({
      orgId
    })
  },
  mounted () {
  },
  methods: {
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
    },
    getIndex (index) {
      console.log(index)
    }
  },
  watch: {
    alermData () {
      // this.timer = setInterval(() => {
      //   this.$refs.scrollWrapper.scrollTop = this.$refs.scrollWrapper.scrollTop + 10;
      //   console.log(this.$refs.scrollWrapper.scrollTop);
      //   if (this.$refs.scrollWrapper.scrollTop > 32 * (this.alermData.length - 4)) {
      //     this.$refs.scrollWrapper.scrollTop = 0;
      //   }
      // }, 1000);
    }
  },
  destroyed () {
    clearInterval(this.timer)
    clearTimeout(this.timerOption)
    this.timer = null
    this.timerOption = null
  },
  components: {
    rankingChart,
    vueSeamless
  }
}
</script>

<style lang="scss" scoped>
.main-chart-wrapper {
  width: 100%;
  margin-top: 10px;
  box-sizing: border-box;
  .left-wrapper {
    width: 100%;
    height: 210px;
    background-color: rgba(0,0,0, 0.65);
    border-radius: 6px;
    box-sizing: border-box;
  }
  .right-wrapper {
    width: 100%;
    height: 210px;
    background-color: rgba(0,0,0, 0.65);
    border-radius: 6px;
    padding: 15px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    .scroll-wrapper {
      padding: 0 30px;
      height: 80%;
      overflow: hidden;
      box-sizing: border-box;
      // animation:myfirst 20s infinite;
      // -webkit-animation:myfirst 20s infinite;
      // -o-animation:myfirst 20s infinite;
      // -moz-animation:myfirst 20s infinite;
      // position: absolute;
      // @keyframes myfirst

      // {

      // 0%   {top: -0px;}

      // 26.6%   {top: -0px;}

      // 36.6%   {top: -100px;}

      // 63.2%   {top: -300px;}

      // 73.2%   {top: -500px;}

      // 99.7%   {top: -700px;}

      // 100% {top: -0px;}
      // }
      .list-font {
        color: #fff;
        font-size: 14px;
        margin-top: 0;
        margin-bottom: 20px;
      }
    }
    .scroll-wrapper::-webkit-scrollbar {
      width: 10px;
      position: absolute;
    }
    .scroll-wrapper::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 1.9);
      -webkit-border-radius: 2em;
      -moz-border-radius: 2em;
      border-radius:2em;
    }
    .scroll-wrapper::-webkit-scrollbar-thumb {
      background: rgba(23, 114, 218, 0.3);
      -webkit-border-radius: 2em;
      -moz-border-radius: 2em;
      border-radius:  2em;
    }
  }
}
</style>
