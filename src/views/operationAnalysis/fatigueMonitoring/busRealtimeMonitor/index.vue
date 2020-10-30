<template>
  <div class="diary-table">
    <Search
      :isBus="true"
      :isOnlyOneDay="true"
      :isEmpty="true"
      :isDefaultBus="true"
      @configCheck="getSearch" />
      <div class="content">
        <el-row :gutter="24">
          <el-col :span="6" class="col">
            <i class="el-icon-setting" style="font-size: 1vw;"></i>
            <span style="font-size: .8vw; margin-left: .5vw;">充电状态:</span>
            <span style="font-size: .8vw; margin-left: .5vw; font-weight: bold; color: #409eff">{{busInfo.chargingStatus}}</span>
          </el-col>
          <el-col :span="6" class="col">
            <i class="el-icon-tickets" style="font-size: 1vw;"></i>
            <span style="font-size: .8vw; margin-left: .5vw;">档位信息:</span>
            <span style="font-size: .8vw; margin-left: .5vw; font-weight: bold;color: #409eff">{{busInfo.gear}}</span>
          </el-col>
          <el-col :span="6" class="col">
            <i class="el-icon-coordinate" style="font-size: 1vw;"></i>
            <span style="font-size: .8vw; margin-left: .5vw;">电机1:</span>
            <span style="font-size: .8vw; margin-left: .5vw; font-weight: bold;color: #409eff">{{busInfo.motor1Speed}}R转速</span>
          </el-col>
          <el-col :span="6" class="col">
            <i class="el-icon-coordinate" style="font-size: 1vw;"></i>
            <span style="font-size: .8vw; margin-left: .5vw;">电机2:</span>
            <span style="font-size: .8vw; margin-left: .5vw; font-weight: bold;color: #409eff">{{busInfo.motor2Speed}}R转速</span>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6" class="col">
            <i class="el-icon-s-ticket" style="font-size: 1vw;"></i>
            <span style="font-size: .8vw; margin-left: .5vw;">SOC:</span>
            <span style="font-size: .8vw; margin-left: .5vw; font-weight: bold;color: #409eff">{{busInfo.soc}}</span>
          </el-col>
          <el-col :span="6" class="col">
            <i class="el-icon-wind-power" style="font-size: 1vw;"></i>
            <span style="font-size: .8vw; margin-left: .5vw;">车速:</span>
            <span style="font-size: .8vw; margin-left: .5vw; font-weight: bold;color: #409eff">{{busInfo.carSpeed}} KM/H</span>
          </el-col>
          <el-col :span="6" class="col">
            <i class="el-icon-help" style="font-size: 1vw;"></i>
            <span style="font-size: .8vw; margin-left: .5vw;">轮胎状况:</span>
            <span style="font-size: .8vw; margin-left: .5vw; font-weight: bold;color: #409eff">(状态)-{{busInfo.tireStatus}}   (压力)-{{busInfo.tirePressure}}  (温度)-{{busInfo.tireTemperature}}</span>
          </el-col>
          <el-col :span="6" class="col">
            <i class="el-icon-warning-outline" style="font-size: 1vw;"></i>
            <span style="font-size: .8vw; margin-left: .5vw;">报警:</span>
            <span style="font-size: .8vw; margin-left: .5vw; font-weight: bold;color: #409eff">{{busInfo.pressureValveStatus}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="echarts-style">
        <Echart :type="'SOC'" :selectData="selectData"/>
      </div>
      <div class="echarts-style">
        <Echart :type="'SPEED'" :selectData="selectData"/>
      </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Echart from './Components/echarts'
import { WSAPISEC } from '@/config/settings'
import mixinsTime from '@/mixins/global/'
export default {
  name: 'busRealtimeMonitor',
  mixins: [mixinsTime],
  data () {
    return {
      selectData: {},
      ws: {},
      busInfo: {}
    }
  },
  mounted () {
    const bus = this.$store.state.globel.carData[0].value
    this.initWebSocket(bus)
  },
  methods: {
    initWebSocket (bus) {
      if ('WebSocket' in window) {
        let url = WSAPISEC + '/' + bus
        this.ws = new WebSocket(url)
        this.ws.onopen = () => {
          console.log('===============推送开始=============')
          // Web Socket 已连接上，使用 send() 方法发送数据
          this.ws.send('发送数据')
        }
        this.ws.onmessage = (evt) => {
          let data = JSON.parse(evt.data)
          this.busInfo = data
          console.log(data)
        }
      } else {
        this.$message.error('浏览器不支持websocket')
      }
    },
    closeWs () {
      this.ws.close()
      console.log('===============推送关闭=============')
    },
    getSearch (data) {
      this.selectData = data
      this.closeWs()
      this.initWebSocket(data.busNumber)
    }
  },
  beforeDestroy () {
    this.closeWs()
  },
  components: {
    Search,
    Echart
  }
}
</script>

<style lang="scss" scoped>
.diary-table {
  .content {
    width: 95%;
    height: 10vh;
    padding: 1vh 1vw;
    box-sizing: border-box;
    margin-top: 2vh;
    margin-left: 2.5%;
    border: 1px solid #e5e5e5;
    .col {
      height: 4vh;
      padding: .5vh .5vw;
      box-sizing: border-box;
    }
  }
  .echarts-style {
    width: 100%;
    height: 36vh;
    padding: 2vh 2vw;
    box-sizing: border-box;
    border-bottom: 1px solid #e5e5e5;
  }
}
</style>
