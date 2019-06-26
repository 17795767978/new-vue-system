<template>
  <div class="stream-wrapper">
    <header style="margin-bottom: 20px;">
     <el-row :gutter="20">
       <el-col :span="4">
        <el-card class="bg-style" shadow="always">
          <i class="el-icon-user-solid icon"></i>
          <h3 class="title-style">
            当日累计客流（人次）
          </h3>
          <p class="font-style" style="color: #e9e404">{{passengeFlowNum}}</p>
        </el-card>
       </el-col>
       <el-col :span="4">
        <el-card class="bg-style" shadow="always">
          <i class="el-icon-s-custom icon"></i>
          <h3 class="title-style">实时载客（人）</h3>
          <p class="font-style" style="color: #00f4f5">{{totelPerson}}</p>
        </el-card>
       </el-col>
       <el-col :span="3">
        <el-card class="bg-style" shadow="always">
          <i class="el-icon-s-unfold icon"></i>
          <h3 class="title-style">运营线路</h3>
          <p class="font-style" style="color: #acf50f">{{operLines}}/{{totalLines}}</p>
        </el-card>
       </el-col>
       <el-col :span="4">
        <el-card class="bg-style" shadow="always">
          <i class="el-icon-data-line icon"></i>
          <h3 class="title-style">在线车辆数</h3>
          <p class="font-style" style="color: #ef9c05">{{onLineCarNum}}</p>
        </el-card>
       </el-col>
       <el-col :span="3">
        <el-card class="bg-style" shadow="always">
          <i class="el-icon-s-data icon"></i>
          <h3 class="title-style">实时满载率</h3>
          <p class="font-style" style="color: #d52d8c">{{totelFullLoadRate}}%</p>
        </el-card>
       </el-col>
       <el-col :span="3">
        <el-card class="bg-style" shadow="always">
          <i class="el-icon-ship icon"></i>
          <h3 class="title-style">运营车辆数</h3>
          <p class="font-style" style="color: #d5d40c">{{operateCarNum}}</p>
        </el-card>
       </el-col>
       <el-col :span="3">
        <el-card class="bg-style" shadow="hover">
          <i class="el-icon-loading icon"></i>
          <h3 class="title-style">待发车辆数</h3>
          <p class="font-style" style="color: #a308b2">{{outgoingCarNum}}</p>
        </el-card>
       </el-col>
     </el-row>
    </header>
  </div>
</template>

<script>
const TIME = 1 * 60 * 1000
export default {
  data () {
    return {
      passengeFlowNum: '',
      totelPerson: '',
      operLines: '',
      totalLines: '',
      realTimePassengeFlow: '',
      onLineCarNum: 0,
      totelFullLoadRate: '',
      realTimeFullRate: '',
      operateCarNum: 0,
      outgoingCarNum: '',
      timerTotalPassage: null,
      timerFullRate: null,
      timerLine: null,
      timerOnlineCar: null,
      timerLoadRate: null,
      timerGetOnCar: null,
      timerGetOffCar: null
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
    this._onLineCarNum({
      orgId
    })
    this._realTimeFullRate({
      orgId
    })
    this._operateCarNum()
    this._outgoingCarNum()
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
        if (res && res.onlineBusNumber) {
          this.onLineCarNum = res.onlineBusNumber
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
    _operateCarNum () {
      this.$api['dispatch.getOnCarNumber']().then(res => {
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
    _outgoingCarNum () {
      this.$api['dispatch.getOffCarNumber']().then(res => {
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

<style lang="scss" scoped>
.stream-wrapper {
  width: 100%;
  .bg-style {
    background-color: rgba(0,0,0, 0.8);
    box-shadow: 2px 2px 10px 2px #066898;
    height: 80px;
    .icon {
      font-size: 21px;
      float: left;
      margin-right: 7px;
      color: #fff;
    }
    .title-style {
      margin-top: 0px;
      font-size: 16px;
      margin-bottom: 10px;
      color: #fff;
    }
    .font-style {
      margin: 0;
      font-size: 22px !important;
      font-weight: bold;
    }
  }
}
</style>
<style lang="scss">
.bg-style {
  .el-card__body {
    padding: 10px 20px;
    box-sizing: border-box;
    .font-style {
      height: 20px !important;
      font-size: 15px !important;
    }
  }
}
.el-card {
  border: hidden;
  border-radius: 6px;
}
</style>
