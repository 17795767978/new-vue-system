<template>
  <div class="stream-wrapper">
    <header style="margin-bottom: 20px;">
     <el-row :gutter="20">
       <el-col :span="styleObj.spanBig" v-if="config !== 'fatigueAlarm'">
        <el-card class="bg-style" shadow="always" :class="skinType === 0 ? 'cardBg-white' : ''">
          <div class="stream-content">
            <div class="corner-1" v-show="skinType === 1">
              <img src="../../../assets/images/newScreen/card-tl.png"/>
            </div>
            <div class="corner-2" v-show="skinType === 1">
              <img src="../../../assets/images/newScreen/card-tr.png"/>
            </div>
            <div class="corner-3" v-show="skinType === 1">
              <img src="../../../assets/images/newScreen/card-bl.png"/>
            </div>
            <div class="corner-4" v-show="skinType === 1">
              <img src="../../../assets/images/newScreen/card-br.png"/>
            </div>
            <i class="el-icon-user-solid icon" :style="{color: skinType === 0 ? '#000' : '#fff' }"></i>
            <h3 class="title-style" :style="{color: skinType === 0 ? '#000' : '#fff' }">
              当日累计客流（人次）
            </h3>
            <p class="font-style" :style="{color: skinType === 0 ? '#F17700' : '#fffc1e' }">{{passengeFlowNum}}</p>
          </div>
        </el-card>
       </el-col>
       <el-col :span="styleObj.spanBig" v-if="config !== 'fatigueAlarm'">
        <el-card class="bg-style" shadow="always" :class="skinType === 0 ? 'cardBg-white' : ''">
          <div class="stream-content">
            <div class="corner-1" v-show="skinType === 1">
              <img src="../../../assets/images/newScreen/card-tl.png"/>
            </div>
            <div class="corner-2" v-show="skinType === 1">
              <img src="../../../assets/images/newScreen/card-tr.png"/>
            </div>
            <div class="corner-3" v-show="skinType === 1">
              <img src="../../../assets/images/newScreen/card-bl.png"/>
            </div>
            <div class="corner-4" v-show="skinType === 1">
              <img src="../../../assets/images/newScreen/card-br.png"/>
            </div>
            <i class="el-icon-s-custom icon" :style="{color: skinType === 0 ? '#000' : '#fff' }"></i>
            <h3 class="title-style" :style="{color: skinType === 0 ? '#000' : '#fff' }">实时载客（人）</h3>
            <p class="font-style" style="color: #F17700">{{totelPerson}}</p>
          </div>
        </el-card>
       </el-col>
       <el-col :span="config !== 'fatigueAlarm' ? 4 : 6 ">
        <el-card class="bg-style" shadow="always" :class="skinType === 0 ? 'cardBg-white' : ''">
          <div class="stream-content">
            <div class="corner-1" v-show="skinType === 1">
              <img src="../../../assets/images/newScreen/card-tl.png"/>
            </div>
            <div class="corner-2" v-show="skinType === 1">
              <img src="../../../assets/images/newScreen/card-tr.png"/>
            </div>
            <div class="corner-3" v-show="skinType === 1">
              <img src="../../../assets/images/newScreen/card-bl.png"/>
            </div>
            <div class="corner-4" v-show="skinType === 1">
              <img src="../../../assets/images/newScreen/card-br.png"/>
            </div>
             <i class="el-icon-s-unfold icon" :style="{color: skinType === 0 ? '#000' : '#fff' }"></i>
            <h3 class="title-style" :style="{color: skinType === 0 ? '#000' : '#fff' }">运营线路</h3>
            <p class="font-style" style="color: #acf50f">{{operLines}}/{{totalLines}}</p>
          </div>
        </el-card>
       </el-col>
       <el-col :span="config !== 'fatigueAlarm' ? 3 : 6 ">
        <el-card class="bg-style" shadow="always" :class="skinType === 0 ? 'cardBg-white' : ''">
          <div class="stream-content">
            <div class="corner-1" v-show="skinType === 1">
              <img src="../../../assets/images/newScreen/card-tl.png"/>
            </div>
            <div class="corner-2" v-show="skinType === 1">
              <img src="../../../assets/images/newScreen/card-tr.png"/>
            </div>
            <div class="corner-3" v-show="skinType === 1">
              <img src="../../../assets/images/newScreen/card-bl.png"/>
            </div>
            <div class="corner-4" v-show="skinType === 1">
              <img src="../../../assets/images/newScreen/card-br.png"/>
            </div>
             <i class="el-icon-data-line icon" :style="{color: skinType === 0 ? '#000' : '#fff' }"></i>
          <h3 class="title-style" :style="{color: skinType === 0 ? '#000' : '#fff' }">运营车辆数</h3>
          <p class="font-style" style="color: #ef9c05">{{onLineCarNum}}/{{totalBusNumber}}</p>
          </div>
        </el-card>
       </el-col>
       <el-col :span="styleObj.spanSmall" v-if="config !== 'fatigueAlarm'">
        <el-card class="bg-style" shadow="always" :class="skinType === 0 ? 'cardBg-white' : ''">
          <div class="stream-content">
              <div class="corner-1" v-show="skinType === 1">
                <img src="../../../assets/images/newScreen/card-tl.png"/>
              </div>
              <div class="corner-2" v-show="skinType === 1">
                <img src="../../../assets/images/newScreen/card-tr.png"/>
              </div>
              <div class="corner-3" v-show="skinType === 1">
                <img src="../../../assets/images/newScreen/card-bl.png"/>
              </div>
              <div class="corner-4" v-show="skinType === 1">
                <img src="../../../assets/images/newScreen/card-br.png"/>
              </div>
              <i class="el-icon-s-data icon" :style="{color: skinType === 0 ? '#000' : '#fff' }"></i>
              <h3 class="title-style" :style="{color: skinType === 0 ? '#000' : '#fff' }">实时满载率</h3>
              <p class="font-style" style="color: #ff30a0">{{totelFullLoadRate}}%</p>
          </div>
        </el-card>
       </el-col>
       <el-col :span="config !== 'fatigueAlarm' ? 3 : 6 ">
        <el-card class="bg-style" shadow="always" :class="skinType === 0 ? 'cardBg-white' : ''">
           <div class="stream-content">
              <div class="corner-1" v-show="skinType === 1">
                <img src="../../../assets/images/newScreen/card-tl.png"/>
              </div>
              <div class="corner-2" v-show="skinType === 1">
                <img src="../../../assets/images/newScreen/card-tr.png"/>
              </div>
              <div class="corner-3" v-show="skinType === 1">
                <img src="../../../assets/images/newScreen/card-bl.png"/>
              </div>
              <div class="corner-4" v-show="skinType === 1">
                <img src="../../../assets/images/newScreen/card-br.png"/>
              </div>
              <i class="el-icon-ship icon" :style="{color: skinType === 0 ? '#000' : '#fff' }"></i>
              <h3 class="title-style" :style="{color: skinType === 0 ? '#000' : '#fff' }">工作车数</h3>
              <p class="font-style" :style="{color: skinType === 0 ? '#E2051F' : '#acf50f' }">{{operateCarNum}}</p>
          </div>
        </el-card>
       </el-col>
       <el-col :span="config !== 'fatigueAlarm' ? 3 : 6 ">
        <el-card class="bg-style" shadow="hover" :class="skinType === 0 ? 'cardBg-white' : ''">
            <div class="stream-content">
              <div class="corner-1" v-show="skinType === 1">
                <img src="../../../assets/images/newScreen/card-tl.png"/>
              </div>
              <div class="corner-2" v-show="skinType === 1">
                <img src="../../../assets/images/newScreen/card-tr.png"/>
              </div>
              <div class="corner-3" v-show="skinType === 1">
                <img src="../../../assets/images/newScreen/card-bl.png"/>
              </div>
              <div class="corner-4" v-show="skinType === 1">
                <img src="../../../assets/images/newScreen/card-br.png"/>
              </div>
              <i class="el-icon-loading icon" :style="{color: skinType === 0 ? '#000' : '#fff' }"></i>
              <h3 class="title-style" :style="{color: skinType === 0 ? '#000' : '#fff' }">待发车辆数</h3>
              <p class="font-style" style="color: #F17700">{{outgoingCarNum}}</p>
          </div>
        </el-card>
       </el-col>
     </el-row>
    </header>
  </div>
</template>

<script>
const TIME = 0.5 * 60 * 1000
export default {
  props: {
    config: {
      type: String
    }
  },
  data () {
    return {
      skinType: 0, // 皮肤 0 白色 1 黑色
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
    this._onLineCarNum({
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
    this.$store.state.views.activeNight ? this.skinType = 1 : this.skinType = 0
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

<style lang="scss" scoped>
.cardBg-white {
  background-color: #FFFFFF!important;
  color: #000000!important;
  box-shadow: 0px 0px 15px 0px rgba(4,56,161,0.2);
}
.stream-content {
  // width: 100%;
  height:100%;
  position: relative;
  padding: 10px 20px;
}
.corner-1 {
  position: absolute;
  top: 0;
  left: 0px;
}
.corner-2 {
  position: absolute;
  top: 0;
  right: 0px;
}
.corner-3 {
  position: absolute;
  bottom: 0;
  left: 0;
}
.corner-4 {
  position: absolute;
  bottom: 0;
  right: 0;
}
.stream-wrapper {
  width: 100%;
  .bg-style {
    background-color: rgba(42,47,85,0.5);
    // box-shadow: 2px 2px 10px 2px #066898;
    height: auto;
    .icon {
      font-size: 1vw;
      float: left;
      margin-right: 7px;
      color: #fff;
    }
    .title-style {
      margin-top: 0px;
      font-size: 0.85vw;
      margin-bottom: 10px;
      color: #fff;
    }
    .font-style {
      margin: 0;
      line-height: 1;
      font-size: 1.2vw !important;
      font-weight: bold;
    }
  }
}
</style>
<style lang="scss">
.bg-style {
  .el-card__body {
    padding: 0;
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
