<template>
  <div class="total-data">
    <!-- <header>
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
    </div> -->
    <div class="total-data-item">
      <div class="total-data-item-title">
        <span></span>
        <span :style="{color: skinType === 0 ? '#333333' : ''}">{{date}}</span>
      </div>
      <div class="total-data-item-content">
        <span :style="{color: skinType === 0 ? '#333333' : ''}">当日累计（人次）</span>
        <span :style="{color: skinType === 0 ? '#F17700' : ''}">{{toThousands(totalPassenger)}}</span>
      </div>
      <div class="splitLine"></div>
    </div>
    <div class="total-data-item" style="padding: 0 6px;">
      <div class="total-data-item-title">
        <span></span>
        <span :style="{color: skinType === 0 ? '#333333' : ''}">客流量</span>
      </div>
      <div class="total-data-item-content">
        <div>
          <ul>
            <li :style="{color: skinType === 0 ? '#333333' : ''}">周平均：<span class="bigTitle" :style="{color: skinType === 0 ? '#F17700' : ''}">{{toThousands(weekPersoncount)}}</span>人次</li>
            <li><span :style="leftTitle === '增加' ? 'color: #0f0' : 'color: #f00'"><img :src="leftTitle === '增加' ? upIcon : downIcon"/>{{leftTitle}}：{{reduce}}%</span></li>
          </ul>
          <ul>
            <li :style="{color: skinType === 0 ? '#333333' : ''}">昨日累计：<span class="bigTitle" :style="{color: skinType === 0 ? '#F17700' : ''}">{{toThousands(beforePersoncount)}}</span>人次</li>
            <li><span :style="rightTitle === '增加' ? 'color: #0f0' : 'color: #f00'"><img :src="leftTitle === '增加' ? upIcon : downIcon"/>{{rightTitle}}：{{increase}}%</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
const TIME = 60 * 5000
const downIcon = require('@/assets/images/down.png')
const upIcon = require('@/assets/images/up.png')
export default {
  name: 'passengerHome',
  data () {
    return {
      downIcon: downIcon,
      upIcon: upIcon,
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
  props: {
    skinType: {
      default: 1,
      type: Number
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
    setTimeout(() => {
      this._getTotalPassengerSimple({
        orgId
      })
      this._getWeekData({
        orgId
      })
    }, 1000)
    // this._getTotalPassengerSimple({
    //   orgId
    // })
    // this._getWeekData({
    //   orgId
    // })
  },
  methods: {
    toThousands (num) {
      let result = [ ]
      let counter = 0
      num = (num || 0).toString().split('')
      for (var i = num.length - 1; i >= 0; i--) {
        counter++
        result.unshift(num[i])
        if (!(counter % 3) && i !== 0) { result.unshift(',') }
      }
      return result.join('')
    },
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
  height: 100%;
  display: flex;
  flex-direction: row;
}
.total-data-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}
.splitLine {
  position: absolute;
  width:1px;
  height:100%;
  background:rgba(191,191,191,1);
  right: 0;
}
.total-data-item-title {
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
}
.total-data-item-title span:nth-child(1) {
  display: inline-block;
  width: 4px;
  height: 11px;
  border-radius: 1px;
  margin-right: 10px;
  background-color: rgb(236, 111, 0);
}
.total-data-item-content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}
.total-data-item-content {
  align-items: center;
  justify-content: center;
}
// .total-data-item-content:nth-child(2) {
//   align-items: center;
//   justify-content: flex-start;
// }
.total-data-item-content:nth-child(1) {
  border-right: 1px solid rgba(191,191,191,1);
}
.total-data-item-content span:nth-child(1) {
  font-size:12px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.total-data-item-content span:nth-child(2) {
  font-size:45px;
  font-family:DIN;
  font-weight:500;
  color:rgba(255,252,0,1);
}
.total-data-item-content ul li {
  font-size:12px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height: 30px;
}
.total-data-item-content ul li span.bigTitle {
   color:rgba(255,252,0,1);
   font-weight:500;
   font-size: 20px;
}
.total-data-item-content ul li img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-bottom: 4px;
  margin-right: 8px;
}
.total-data-item-content ul li span {
  vertical-align: middle;
}
// .total-data {
//   width: 100%;
//   .cul-wrapper {
//     width: 80%;
//     margin: 5% auto;
//     display: flex;
//     justify-content: center;
//     .left {
//       width: 48%;
//       background: #5d9ade;
//       height: 120px;
//       margin-right: 4%;
//       border-radius: 6px;
//       padding: 4.5%;
//       box-sizing: border-box;
//       font-size: 1.2rem;
//       font-weight: 700;
//       color: #fff;
//     }
//     .right {
//       width: 48%;
//       background: #43c6c3;
//       height: 120px;
//       border-radius: 6px;
//       padding: 4.5%;
//       box-sizing: border-box;
//       font-size: 1.2rem;
//       font-weight: 700;
//       color: #fff;
//     }
//   }
// }
</style>
