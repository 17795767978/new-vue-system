<template>
  <div class="stream-wrapper">
    <header style="margin-bottom: 20px;">
     <el-row :gutter="10">
       <el-col :span="4">
        <el-card class="bg-style" shadow="always">
          <h3 class="title-style">
            当日累计客流（人数）
          </h3>
          <p class="font-style" style="color: #e9e404">{{passengeFlowNum}}</p>
        </el-card>
       </el-col>
       <el-col :span="4">
        <el-card class="bg-style" shadow="always">
          <h3 class="title-style">实时载客（人）</h3>
          <p class="font-style" style="color: #00f4f5">{{totelPerson}}</p>
        </el-card>
       </el-col>
       <el-col :span="3">
        <el-card class="bg-style" shadow="always">
          <h3 class="title-style">运营路线</h3>
          <p class="font-style" style="color: #acf50f">{{operLines}}/{{totalLines}}</p>
        </el-card>
       </el-col>
       <el-col :span="4">
        <el-card class="bg-style" shadow="always">
          <h3 class="title-style">在线车辆数</h3>
          <p class="font-style" style="color: #ef9c05">{{onLineCarNum}}</p>
        </el-card>
       </el-col>
       <el-col :span="3">
        <el-card class="bg-style" shadow="always">
          <h3 class="title-style">实时满载率</h3>
          <p class="font-style" style="color: #d52d8c">{{totelFullLoadRate}}%</p>
        </el-card>
       </el-col>
       <el-col :span="3">
        <el-card class="bg-style" shadow="always">
          <h3 class="title-style">运营车辆数</h3>
          <p class="font-style" style="color: #d5d40c">{{operateCarNum}}</p>
        </el-card>
       </el-col>
       <el-col :span="3">
        <el-card class="bg-style" shadow="always">
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
      outgoingCarNum: ''
    }
  },
  created () {
    this._passengeFlow({
      orgId: ''
    })
    this._realTimePassengeFlow({
      orgId: ''
    })
    this._operateLines({
      orgId: ''
    })
    this._onLineCarNum({
      orgId: ''
    })
    this._realTimeFullRate({
      orgId: ''
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
        setTimeout(() => {
          this._passengeFlow(params)
        }, TIME)
      })
    },
    _realTimePassengeFlow (params) {
      this.$api['passengerFlow.getRealTimePersoncountAndFullLoadRate'](params).then(res => {
        if (res && res.personCount && res.fullLoadRate) {
          this.totelPerson = res.personCount
          this.totelFullLoadRate = res.fullLoadRate
        } else {
          this.totelPerson = '--'
          this.totelFullLoadRate = '--'
        }
        setTimeout(() => {
          this._realTimePassengeFlow(params)
        }, TIME)
      })
    },
    _operateLines (params) {
      this.$api['passengerFlow.getRealTimeOperLines'](params).then(res => {
        if (res && res.operLines && res.totalLines) {
          this.operLines = res.operLines
          this.totalLines = res.totalLines
        } else {
          this.operLines = '--'
          this.totalLines = '--'
        }
        setTimeout(() => {
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
        setTimeout(() => {
          this._onLineCarNum(params)
        }, TIME)
      })
    },
    _realTimeFullRate (params) {
      this.$api['passengerFlow.getRealTimeFullLoadRate'](params).then(res => {
        console.log(res)
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
        setTimeout(() => {
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
        setTimeout(() => {
          this._outgoingCarNum()
        }, TIME)
      })
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.stream-wrapper {
  width: 100%;
  .bg-style {
    background-color: rgba(0,0,0, 0.6);
    box-shadow: -4px -5px 10px #409EFF;
    .title-style {
      margin-top: 0px;
      font-size: 14px;
      color: #fff;
    }
    .font-style {
      margin: 0;
      font-size: 20px;
      font-weight: bold;
      height: 30px;
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
</style>
