<template>
  <div class="main-chart-wrapper">
    <el-row :gutter="20">
      <el-col :span="12" class="data-style">
        <div class="left-wrapper">
          <rankingChart></rankingChart>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="right-wrapper">
          <h1 style="text-align: center; color: #fff; margin-top:0;">司机不良驾驶行为实时报警</h1>
          <vueSeamless  class="scroll-wrapper" :class-option="allOptions" :data="alermData">
            <p class="list-font" v-for="(list, index) in alermData" :key="index">
              <span>{{list[0]}}：</span>
              <!-- <span v-if="index / 2 === parseInt(index / 2)" style="color: #eadf00">{{list[1]}}</span>
              <span v-else-if="index / 3 === parseInt(index / 3) && index / 2 === parseInt(index / 2)" style="color: #dc39ea">{{list[1]}}</span> -->
              <span v-if="list[1] === '打电话。'" style="color: #eadf00;">{{list[1]}}</span>
              <span v-show="list[1] === '抽烟。'" style="color: #fa8a96;">{{list[1]}}</span>
              <span v-show="list[1] === '分神驾驶。'" style="color: #e9a475;">{{list[1]}}</span>
              <span v-show="list[1] === '疲劳驾驶。'" style="color: #dc3971;">{{list[1]}}</span>
              <span v-show="list[1] === '驾驶员异常。'" style="color: #e8f19c;">{{list[1]}}</span>
            </p>
          </vueSeamless>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import rankingChart from './echartsComponent/rankingChart.vue'
import vueSeamless from 'vue-seamless-scroll'
const TIME = 5 * 60 * 1000
export default {
  data () {
    return {
      alermData: [],
      topY: 40,
      timer: null,
      alarmType: []
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
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._badDrivingBehavior({
      orgId
    })
  },
  mounted () {
  },
  methods: {
    _badDrivingBehavior (params) {
      this.$api['homeTired.getBadDrivingBehaviorTable'](params).then(res => {
        this.alermData = []
        res.forEach(alert => {
          this.alermData.push(alert.split('：'))
        })
        let typeData = new Set(this.alermData.map(item => item[1]))
        this.alarmType = [...typeData]
        setTimeout(() => {
          this._badDrivingBehavior()
        }, TIME)
      })
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
