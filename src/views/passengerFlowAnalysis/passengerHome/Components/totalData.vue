<template>
  <div class="total-data">
    <header>
      <h2 style="margin-top: 2.5%">
        <span style="margin-right: 30%;">时间：{{date}}</span>
        <span>当日累计-客流量: <span style="color: #f00">{{totalPassenger}}</span>人次</span>
      </h2>
    </header>
    <div class="cul-wrapper">
      <div class="left">
        <p>周平均：{{weekPersoncount}}</p>
        <p><span :style="leftTitle === '增加' ? 'color: #0f0' : 'color: #f00'">{{leftTitle}}</span>：{{reduce}}%</p>
      </div>
      <div class="right">
        <p>昨日累计：{{beforePersoncount}}</p>
        <p><span :style="rightTitle === '增加' ? 'color: #0f0' : 'color: #f00'">{{rightTitle}}</span>：{{increase}}%</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
const TIME = 60 * 5000
export default {
  name: 'passengerHome',
  data () {
    return {
      date: '',
      timer: null,
      totalPassenger: '',
      timeTotal: null,
      beforePersoncount: '',
      timeBore: null,
      weekPersoncount: '',
      timeWeek: null,
      increase: '',
      reduce: '',
      leftTitle: '增加',
      rightTitle: '增加'
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this.timer = setInterval(() => {
      this.date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }, 1000)
    this._passengeFlow({
      orgId
    })
  },
  mounted () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    setTimeout(() => {
      this._getTotalPassengerSimple({
        orgId
      })
      this._getWeekData({
        orgId
      })
    }, 1000)
  },
  methods: {
    _passengeFlow (params) {
      this.$api['passengerFlow.getTotalPassengerFlow'](params).then(res => {
        if (res.personCount) {
          this.totalPassenger = Math.floor(+res.personCount)
        } else {
          this.totalPassenger = 0
        }
        this.timeTotal = setTimeout(() => {
          this._passengeFlow(params)
        }, TIME)
      })
    },
    _getTotalPassengerSimple (params) {
      this.$api['passengerSimple.getTotalPassengerSimple'](params).then(res => {
        if (res.personCount) {
          this.beforePersoncount = Math.floor(+res.personCount)
          if (this.totalPassenger === 0) {
            this.increase = '---'
          } else {
            let num = ((this.totalPassenger - this.beforePersoncount) / this.totalPassenger * 100).toFixed(2)
            console.log('zong', num)
            this.increase = Math.abs(num)
            if (num > 0) {
              this.rightTitle = '增加'
            } else {
              this.rightTitle = '减小'
            }
          }
        } else {
          this.beforePersoncount = '--'
          this.increase = '--'
        }
        this.timeBore = setTimeout(() => {
          this._getTotalPassengerSimple(params)
        }, TIME)
      })
    },
    _getWeekData (params) {
      this.$api['passengerSimple.getWeekData'](params).then(res => {
        if (res.personCount) {
          this.weekPersoncount = Math.floor(+res.personCount)
          if (this.totalPassenger === 0) {
            this.reduce = '---'
          } else {
            let num = ((this.totalPassenger - this.weekPersoncount) / this.totalPassenger * 100).toFixed(2)
            this.reduce = Math.abs(num)
            if (num > 0) {
              this.leftTitle = '增加'
            } else {
              this.leftTitle = '减小'
            }
          }
        } else {
          this.weekPersoncount = '--'
          this.reduce = '--'
        }
        this.timeWeek = setTimeout(() => {
          this._getWeekData(params)
        }, TIME)
      })
    }
  },
  destroyed () {
    clearInterval(this.timer)
    clearTimeout(this.timeTotal)
    clearTimeout(this.timeBore)
    clearTimeout(this.timeWeek)
    this.timer = null
    this.timeTotal = null
    this.timeBore = null
    this.timeWeek = null
  }
}
</script>

<style lang="scss" scoped>
.total-data {
  width: 100%;
  .cul-wrapper {
    width: 80%;
    margin: 5% auto;
    display: flex;
    justify-content: center;
    .left {
      width: 48%;
      background: #5d9ade;
      height: 120px;
      margin-right: 4%;
      border-radius: 6px;
      padding: 4.5%;
      box-sizing: border-box;
      font-size: 1.2rem;
      font-weight: 700;
      color: #fff;
    }
    .right {
      width: 48%;
      background: #43c6c3;
      height: 120px;
      border-radius: 6px;
      padding: 4.5%;
      box-sizing: border-box;
      font-size: 1.2rem;
      font-weight: 700;
      color: #fff;
    }
  }
}
</style>
