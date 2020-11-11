<template>
  <div class="tab-view">
    <div class="tab-view-nav">
       <el-radio-group v-model="tabSelect" size="small">
        <el-radio-button label="0">SOC趋势</el-radio-button>
        <el-radio-button label="1">速度趋势</el-radio-button>
        <el-radio-button label="2">转速趋势</el-radio-button>
        <el-radio-button label="3">电流趋势</el-radio-button>
        <el-radio-button label="4">电压趋势</el-radio-button>
      </el-radio-group>
      <div>
        <div class="dateView">
          <el-date-picker
            v-model="dateVal"
            type="date"
            size="small"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="dateView timerView">
          <el-time-picker
            is-range
            value-format="HH:mm:ss"
            v-model="times"
            size="small"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
        </div>
        <div class="searchView">
          <el-button size="small" :round="false" @click="search">查询</el-button>
          <el-button size="small" :round="false" @click="reset">重置</el-button>
        </div>
      </div>
    </div>
    <div class="carousel-container">
      <el-carousel @change="change" ref="carousel" height="200px" :autoplay="false" :initial-index="initialIndex" indicator-position="none" arrow="nerver">
        <el-carousel-item name="0">
          <Echart :type="'SOC'" ref="SOC"/>
        </el-carousel-item>
        <el-carousel-item name="1">
          <Echart :type="'SPEED'" ref="SPEED"/>
        </el-carousel-item>
        <el-carousel-item name="2">
          <Echart :type="'SOTORSPEED'" ref="SOTORSPEED"/>
        </el-carousel-item>
        <el-carousel-item name="3">
          4
        </el-carousel-item>
        <el-carousel-item name="4">
          5
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
import Echart from './components/echarts'
import moment from 'moment'
export default {
  props: {
    busNumberProp: String
  },
  components: {
    Echart
  },
  methods: {
    reset () {
      this.dateVal = moment().format('YYYY-MM-DD')
      this.times = ['00:00:00', '23:59:59']
      this.search()
    },
    search (showAlerm = true) {
      if (this.dateVal && this.times) {
        const selectData = this.selectData = {
          'busNumber': this.busNumber,
          'onlyStartTime': `${this.dateVal} ${this.times[0]}`,
          'onlyEndTime': `${this.dateVal} ${this.times[1]}`
        }
        this._getFatAlarmSpeedStatistic({
          busNumber: selectData.busNumber,
          startTime: moment(selectData.onlyStartTime).format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment(selectData.onlyEndTime).format('YYYY-MM-DD HH:mm:ss'),
          isHistory: moment(selectData.onlyStartTime).format('YYYY-MM-DD') !== moment().format('YYYY-MM-DD')
        })
      } else {
        if (showAlerm) {
          this.$message({
            type: 'error',
            message: '请选择查询条件'
          })
        }
      }
    },
    change (val) {
      this.tabSelect = String(val)
    },
    _getFatAlarmSpeedStatistic (params) {
      this.$refs.SPEED.loading = true
      this.$refs.SOC.loading = true
      this.$refs.SOTORSPEED.loading = true
      // SPEED
      this.$api['tiredMonitoring.carSpeedEcharts'](params).then(res => {
        this.$refs.SPEED.initCharts(res)
        this.$refs.SPEED.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.$refs.SPEED.loading = false
      })
      // SOC
      this.$api['tiredMonitoring.socEcharts'](params).then(res => {
        this.$refs.SOC.initCharts(res)
        this.$refs.SOC.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.$refs.SOC.loading = false
      })
      // SOTORSPEED
      this.$api['tiredMonitoring.motor1Speed'](params).then(res => {
        this.$refs.SOTORSPEED.initCharts(res)
        this.$refs.SOTORSPEED.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.$refs.SOTORSPEED.loading = false
      })
    }
  },
  watch: {
    tabSelect (newVal) {
      this.$refs.carousel.setActiveItem(newVal)
    },
    busNumberProp (newVal) {
      this.busNumber = newVal
      this.search(false)
    }
  },
  mounted () {
    this.search()
  },
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      initialIndex: 0,
      tabSelect: '0',
      dateVal: moment().format('YYYY-MM-DD'),
      times: ['00:00:00', '23:59:59'],
      busNumber: '冀F08089D',
      selectData: {} // 每一项的查询条件
    }
  }
}
</script>
<style scoped>
  .tab-view {
    margin-top: 16px;
  }
  .tab-view-nav {
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .tab-view-nav>div {
    display: flex;
    flex-direction: row;
  }
  .dateView {
    vertical-align: middle;
    margin-right: 10px;
  }
</style>
<style>
  .tab-view .tab-view-nav .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    background-color: #1479F6;
  }
  .tab-view .el-radio-button, .tab-view .el-radio-button__inner {
    background-color: #010B0E;
    color: #ffffff;
    border-color: #1479F6;
  }
  .tab-view .tab-view-nav .el-date-editor {
    background-image: url('../assets/dateInputBg.png');
    background-size: 100% 100%;
    border: 0;
  }
  .tab-view .tab-view-nav .el-input--small .el-input__inner {
    background-color: transparent;
    border: 0;
  }
  .tab-view .tab-view-nav .el-range-editor--small .el-range-input {
    background-color: transparent;
    border: 0;
  }
  .tab-view .tab-view-nav .el-range-editor .el-range-input {
    background-color: transparent;
    border: 0;
  }
  .tab-view .tab-view-nav .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 130px;
    border: 0;
  }
  .tab-view .tab-view-nav .timerView .el-date-editor.el-input, .tab-view .tab-view-nav .timerView .el-date-editor.el-input__inner {
    width: 190px;
  }
  .tab-view .tab-view-nav .searchView .el-button--small {
    background-image: url('../assets/btnBg.png');
    background-size: 100% 100%;
    background-color: transparent;
    border: 0;
    color: #ffffff;
  }
  .tab-view .el-loading-mask {
    background-color: transparent;
  }
</style>
