<template>
  <div class="passenger-wrapper">
    <div class="passenger-total-all">
      <div class="avatar avatar-passenger"></div>
      <div class="content">
        <div class="title">当日累计客流（人次）</div>
        <div class="num color-passenger">{{passengeFlowNum}}</div>
      </div>
    </div>
    <div class="passenger-total-all">
      <div class="avatar avatar-real-time"></div>
      <div class="content">
        <div class="title">实时载客（人）</div>
        <div class="num color-real-time">{{totelPerson}}</div>
      </div>
    </div>
    <div class="passenger-total-all">
      <div class="avatar avatar-operate"></div>
      <div class="content">
        <div class="title">运营线路</div>
        <div class="num color-operate">{{operLines}}/{{totalLines}}</div>
      </div>
    </div>
    <div class="passenger-total-all">
      <div class="avatar avatar-bus"></div>
      <div class="content">
        <div class="title">运营车辆数</div>
        <div class="num color-bus">{{operateCarNum}}</div>
      </div>
    </div>
    <div class="passenger-total-all">
      <div class="avatar avatar-rate"></div>
      <div class="content">
        <div class="title">实时满载率</div>
        <div class="num color-rate">{{totelFullLoadRate ? totelFullLoadRate : '--'}}%</div>
      </div>
    </div>
    <div class="passenger-total-all">
      <div class="avatar avatar-waiting"></div>
      <div class="content">
        <div class="title">待发车辆数</div>
        <div class="num color-waiting">{{outgoingCarNum}}</div>
      </div>
    </div>
  </div>
</template>

<script>
const TIME = 0.5 * 60 * 1000
export default {
  data () {
    return {
      passengeFlowNum: '',
      totelPerson: '',
      operLines: '',
      totalLines: '',
      realTimePassengeFlow: '',
      onLineCarNum: '',
      totalBusNumber: '',
      totelFullLoadRate: '',
      realTimeFullRate: '',
      operateCarNum: '',
      outgoingCarNum: '',
      timerTotalPassage: null,
      timerFullRate: null,
      timerLine: null,
      timerOnlineCar: null,
      timerLoadRate: null,
      timerGetOnCar: null,
      timerGetOffCar: null,
      styleObj: {
        spanBig: 4,
        spanSmall: 3
      }
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._passengeFlow({
      orgId
    })
    this._realTimePassengeFlow({
      orgId
    })
    this._operateLines({
      orgId
    })
    this._realTimeFullRate({
      orgId
    })
    this._operateCarNum({
      orgId
    })
    this._outgoingCarNum({
      orgId
    })
  },
  mounted () {
    setTimeout(() => {
      if (this.config === 'all') {
        return this.styleObj
      } else if (this.config === 'fatigueAlarm') {
        this.styleObj.spanBig = 6
      }
    })
  },
  methods: {
    _passengeFlow (params) {
      this.$api['passengerFlow.getTotalPassengerFlow'](params).then(res => {
        if (res.personCount) {
          this.passengeFlowNum = res.personCount
        } else {
          this.passengeFlowNum = '--'
        }
        this.timerTotalPassage = setTimeout(() => {
          this._passengeFlow(params)
        }, TIME)
      })
    },
    _realTimePassengeFlow (params) {
      this.$api['passengerFlow.getRealTimePersoncountAndFullLoadRate'](params).then(res => {
        if (res) {
          this.totelPerson = res.personCount
          this.totelFullLoadRate = res.fullLoadRate
        } else {
          this.totelPerson = '--'
          this.totelFullLoadRate = '--'
        }
        this.timerFullRate = setTimeout(() => {
          this._realTimePassengeFlow(params)
        }, TIME)
      })
    },
    _operateLines (params) {
      this.$api['passengerFlow.getRealTimeOperLines'](params).then(res => {
        if (res) {
          this.operLines = res.operLines
          this.totalLines = res.totalLines
        } else {
          this.operLines = '--'
          this.totalLines = '--'
        }
        this.timerLine = setTimeout(() => {
          this._operateLines(params)
        }, TIME)
      })
    },
    _onLineCarNum (params) {
      this.$api['dispatch.getOnlineCarNumber'](params).then(res => {
        // let dataArr = res.data.data;
        // let numArr = dataArr.map(item => item.onlineBusNumber);
        // numArr.forEach(item => {
        //   let num = parseInt(item);
        //   this.onLineCarNum += num;
        // });
        if (res) {
          this.onLineCarNum = res.onlineBusNumber
          this.totalBusNumber = res.totalBusNumber
        } else {
          this.onLineCarNum = '--'
        }
        this.timerOnlineCar = setTimeout(() => {
          this._onLineCarNum(params)
        }, TIME)
      })
    },
    _realTimeFullRate (params) {
      this.$api['passengerFlow.getRealTimeFullLoadRate'](params).then(res => {
        // console.log(res)
      })
    },
    _operateCarNum (params) {
      this.$api['dispatch.getOnCarNumber'](params).then(res => {
        // let dataArr = res.data.data;
        // let numArr = dataArr.map(item => item.operateBusNumber);
        // numArr.forEach(item => {
        //   let num = parseInt(item);
        //   this.operateCarNum += num;
        // });
        if (res && res.operateBusNumber) {
          this.operateCarNum = res.operateBusNumber
        } else {
          this.operateCarNum = '--'
        }
        this.timerGetOnCar = setTimeout(() => {
          this._operateCarNum()
        }, TIME)
      })
    },
    _outgoingCarNum (params) {
      this.$api['dispatch.getOffCarNumber'](params).then(res => {
        if (res && res.nooperateBusNumber) {
          this.outgoingCarNum = res.nooperateBusNumber
        } else {
          this.outgoingCarNum = '--'
        }
        this.timerGetOffCar = setTimeout(() => {
          this._outgoingCarNum()
        }, TIME)
      })
    }
  },
  components: {
  },
  destroyed () {
    clearTimeout(this.timerTotalPassage)
    clearTimeout(this.timerFullRate)
    clearTimeout(this.timerLine)
    clearTimeout(this.timerOnlineCar)
    clearTimeout(this.timerGetOnCar)
    clearTimeout(this.timerGetOffCar)
    this.timerTotalPassage = null
    this.timerFullRate = null
    this.timerLine = null
    this.timerOnlineCar = null
    this.timerGetOnCar = null
    this.timerGetOffCar = null
  }
}
</script>

<style scoped lang="scss">
.passenger-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.passenger-total-all {
  width: 14%;
  height: 7vh;
  display: flex;
  // 0c3172
  border: 1px solid #0c3172;
  box-sizing: border-box;
  .avatar {
    width: 30%;
    background-position: center;
    background-repeat: no-repeat;
    &.avatar-passenger {
      width: 30%;
      background-color: #092e47;
      background-image: url('../../../assets/images/passenger.png');
    }
    &.avatar-real-time {
      background-color: #06334e;
      background-image: url('../../../assets/images/real-time.png');
    }
    &.avatar-operate {
      background-color: #06334e;
      background-image: url('../../../assets/images/line-operate.png');
    }
    &.avatar-bus {
      background-color: #0a241a;
      background-image: url('../../../assets/images/new-bus.png');
    }
    &.avatar-rate {
      background-color: #331c42;
      background-image: url('../../../assets/images/rate.png');
    }
    // &.avatar-rate {
    //   background-color: #331c42;
    //   background-image: url('../../../assets/images/rate.png');
    // }
    &.avatar-waiting {
      background-color: #0a2f49;
      background-image: url('../../../assets/images/waiting-bus.png');
    }
  }

  .content {
    width: 70%;
    background-color: #0d2036;
    padding: .5vh 0 .5vh 1vw;
    box-sizing: border-box;
    .title {
      width: 100%;
      height: 2vh;
      margin-bottom: .5vh;
      line-height: 2vh;
      font-size: .8vw;
      color: #ffffff
    }
    .num {
      width: 100%;
      height: 3vh;
      line-height: 3vh;
      font-size: 1.4vw;
      font-weight: bold;
      &.color-passenger {
        color: #1694ff;
      }
      &.color-real-time {
        color: #12f6fa
      }
      &.color-operate {
        color: #1df0f9
      }
      &.color-bus {
        color: #11e692
      }
      &.color-rate {
        color: #fc3c57
      }
      &.color-waiting {
        color: #17f4f7
      }
    }
  }
}
</style>
