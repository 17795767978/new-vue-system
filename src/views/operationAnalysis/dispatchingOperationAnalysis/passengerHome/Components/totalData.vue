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
        <p><span style="color: #0f0">增加</span>：{{reduce}}%</p>
      </div>
      <div class="right">
        <p>昨日累计：{{beforePersoncount}}</p>
        <p><span style="color: #f00">减小</span>：{{increase}}%</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
export default {
  name: 'passengerHome',
  data () {
    return {
      date: '',
      totalPassenger: '',
      beforePersoncount: '',
      weekPersoncount: '',
      increase: '',
      reduce: ''
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    const date = new Date()
    this.date = moment(date).format('YYYY-MM-DD')
    this._passengeFlow({
      orgId
    })
    this._getTotalPassengerSimple({
      orgId
    })
    this._getWeekData({
      orgId
    })
    console.log(this._passengeFlow({
      orgId
    }))
  },
  methods: {
    _passengeFlow (params) {
      this.$api['passengerFlow.getTotalPassengerFlow'](params).then(res => {
        if (res.personCount) {
          this.totalPassenger = +res.personCount
        } else {
          this.totalPassenger = 0
        }
      })
    },
    _getTotalPassengerSimple (params) {
      this.$api['passengerSimple.getTotalPassengerSimple'](params).then(res => {
        console.log('__________________________')
        console.log(res)
        if (res.personCount) {
          this.beforePersoncount = +res.personCount
          if (this.totalPassenger === 0) {
            this.increase = '---'
          } else {
            console.log((this.totalPassenger - this.beforePersoncount) / this.totalPassenger * 100)
            this.increase = ((this.totalPassenger - this.beforePersoncount) / this.totalPassenger * 100).toFixed(2)
          }
        } else {
          this.beforePersoncount = '--'
          this.increase = '--'
        }
      })
    },
    _getWeekData (params) {
      this.$api['passengerSimple.getWeekData'](params).then(res => {
        if (res.personCount) {
          this.weekPersoncount = +res.personCount
          if (this.totalPassenger === 0) {
            this.reduce = '---'
          } else {
            console.log((this.weekPersoncount - this.totalPassenger) / this.totalPassenger)
            this.reduce = ((this.weekPersoncount - this.totalPassenger) / this.totalPassenger * 100).toFixed(2)
          }
        } else {
          this.weekPersoncount = '--'
          this.reduce = '--'
        }
      })
    }
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
