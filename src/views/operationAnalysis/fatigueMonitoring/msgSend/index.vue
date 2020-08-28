<template>
  <div class="monitoring-ledger">
    <Search
      isOrg
      isLine
      isBus
      isBusMul
      isBusSelfCodeSelect
      isSend
      isEmpty
      @sendMsg="sendMsg"
      @configCheck="getSearch" />
      <div class="table-style">
        <Table :selectData="selectData"/>
      </div>
      <!-- <div class="time">
        <div class="time-wrapper">
          <span class="zero">0</span>
          <span class="three">3</span>
          <span class="six">6</span>
          <span class="nine">9</span>
          <div class="time-center"></div>
          <div class="time-hour" ref="hourWrapper"></div>
          <div class="time-minute"  ref="minuteWrapper"></div>
          <div class="time-second" ref="secondWrapper"></div>
        </div>
      </div> -->
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Table from './Components/table'
export default {
  name: 'msgSend',
  data () {
    return {
      selectData: {},
      time: new Date(),
      hourTime: 0,
      minuteTime: 0,
      secondTime: 0,
      timer: null
    }
  },
  mounted () {
    this.time = new Date()
    this.timeCalculate = 0
    this.hourTime = this.time.getHours()
    this.minuteTime = this.time.getMinutes()
    this.secondTime = this.time.getSeconds()
    // this.$refs.hourWrapper.style.transform = `rotate(${360 * (this.hourTime > 12 ? (this.hourTime - 12) / 12 + (this.minuteTime / 60 + this.secondTime / 3600) / 12 : this.hourTime / 12 + (this.minuteTime / 60 + this.secondTime / 60 / 60) / 12)}deg)`
    // this.$refs.minuteWrapper.style.transform = `rotate(${(360 * (this.minuteTime / 60 + this.secondTime / 60 / 60))}deg)`
    // this.$refs.secondWrapper.style.transform = `rotate(${360 * (this.secondTime / 60)}deg)`
    // this.calculateTime()
  },
  watch: {
    hourTime (newV) {
      if (newV === 12 || newV === 24) {
        this.hourTime = 0
      }
    },
    minuteTime (newV) {
      if (newV === 60) {
        this.minuteTime = 0
      }
    },
    secondTime (newV) {
      if (newV === 60) {
        this.secondTime = 0
      }
    },
    time (newV) {
      this.hourTime = newV.getHours()
      this.minuteTime = newV.getMinutes()
      this.secondTime = newV.getSeconds()
      // this.$refs.hourWrapper.style.transform = `rotate(${360 * (this.hourTime > 12 ? (this.hourTime - 12) / 12 + (this.minuteTime / 60 + this.secondTime / 3600) / 12 : this.hourTime / 12 + (this.minuteTime / 60 + this.secondTime / 60 / 60) / 12)}deg)`
      // this.$refs.minuteWrapper.style.transform = `rotate(${(360 * (this.minuteTime / 60 + this.secondTime / 60 / 60))}deg)`
      // this.$refs.secondWrapper.style.transform = `rotate(${360 * (this.secondTime / 60)}deg)`
    }
  },
  methods: {
    calculateTime () {
      this.timer = setInterval(() => {
        this.time = new Date()
      }, 1000)
    },
    getSearch (data) {
      this.selectData = data
    },
    sendMsg () {
      if (this.$children[1].selectItems.length > 0) {
        this.$children[1].dialogFormVisible = true
      } else {
        this.$message.warning('请选择下发车辆')
      }
    }
  },
  components: {
    Search,
    Table
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="scss" scoped>
.monitoring-ledger {
  .table-style {
    width: 100%;
    padding: 3vh 5vw;
    box-sizing: border-box;
  }
  .time {
    width: 100%;
    height: 20vh;
    margin-top: 5vh;
    border: 1px solid #e5e5e5;
    position: relative;
    .time-wrapper {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 1px solid #aaa;
      position: absolute;
      margin-left: -75px;
      margin-top: -75px;
      top: 50%;
      left: 50%;
      box-sizing: border-box;
      .time-center {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #aaa;
        position: absolute;
        margin-left: -5px;
        margin-top: -5px;
        top: 50%;
        left: 50%;
      }
      .time-second {
        width: 0px;
        height: 0px;
        margin: -40% -1px 0 0;
        padding: 40% 1px 0 0;
        background-color: #aaa;
        position: absolute;
        transform-origin: 0 100%;
        left: 50%;
        top: 50%;
      }
      .time-minute {
        width: 0px;
        height: 0px;
        background-color: #aaa;
        position: absolute;
        transform-origin: 0 100%;
        left: 50%;
        top: 50%;
        margin: -35% -0.75px 0;
        padding: 35% 0.75px 0;
      }
      .time-hour {
        width: 0px;
        height: 0px;
        background-color: #aaa;
        position: absolute;
        transform-origin: 0 100%;
        left: 50%;
        top: 50%;
        margin: -20% -2px 0 1px;
        padding: 20% 2px 0 0;
      }
      .zero {
        position: absolute;
        display: block;
        padding: 0px 5px;
        left: 50%;
        top: -2px;
        margin-left: -8px;
      }
      .three {
        position: absolute;
        display: block;
        padding: 1px 0px;
        left: 94%;
        top: 50%;
        margin-right: 1px;
        margin-top: -9px;
      }
      .six {
        position: absolute;
        display: block;
        padding: 0px 5px;
        left: 50%;
        top: 90%;
        margin-left: -8px;
      }
      .nine {
        position: absolute;
        display: block;
        padding: 1px 0px;
        left: 0%;
        top: 50%;
        margin-left: 1px;
        margin-top: -9px;
      }
    }
  }
}
</style>
