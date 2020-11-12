<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <div class="wrapper-top">
        <div class="wrapper-top-top">
          <div>
            <span class="busNumberCon">
              <div class="selectBusNumber">
                <el-select popper-class="addSelectStyle" filterable size="small" v-model="busNumber" placeholder="请选择" @visible-change="focusSelect" @change="changeBusNumber">
                  <el-option
                    v-for="(item, index) in busNumberOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </span>
          </div>
          <div>
            <span>P</span>
            <span>R</span>
            <span>N</span>
            <span>D</span>
            <span>S</span>
          </div>
          <div>
            <span style="margin-left: 40px;">{{startStation}}</span>
            <span class="kaiwang-icon"></span>
            <span>{{endStation}}</span>
          </div>
        </div>
        <div class="wrapper-top-middle">
          <div class="middle-item">
            <div class="middle-item-chart">
              <car-speed
                ref="carSpeedChart"
                id="chart1"
                :title="{
                  text: '车速 km/h',
                  pos: ['48%', '36%']
                }"
                :center="['60%', '60%']"
                :titleNoRich="false"
                :rang="[0, 160]"
              />
            </div>
            <div class="progress1">
              <progress-bar
                style="margin-left: 20%;margin-top: 10px;"
                :dataNum="electricityQuantity"
              />
              <span style="
                margin-left: 70px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #8391B7;
                font-size: 16px;">剩余电量</span>
            </div>
          </div>
          <div class="middle-item middle-item-center">
            <indi-light
              ref="indiLight"
              style="margin-top: 40px;"/>
            <equipment-status
              :loopSpeed="loopSpeed"
              ref="equipmentStatus"
            />
          </div>
          <div class="middle-item">
            <div class="middle-item-chart">
              <car-speed
                ref="carRollSpeedChart"
                id="chart2"
                :title="{
                  text: '转速 r/min',
                  pos: ['28%', '36%']
                }"
                :center="['40%', '60%']"
                :titleNoRich="true"
                :rang="[0, 5000]"
              />
            </div>
            <div>
            <span class="progress2">
              <div>
                <progress-bar
                  style="margin-top: 10px;"
                  :dataNum="brakPedal"
                  :boxNum="[20, 40, 60, 80, 100]"
                  dataColor="#9E53DD"
                  noDataColor="#252A4E"
                  />
                  <span style="
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #8391B7;
                    font-size: 16px;">制动踏板</span>
                </div>
                <div>
                  <progress-bar
                    style="margin-top: 10px;"
                    :dataNum="tractionPedal"
                    :boxNum="[20, 40, 60, 80, 100]"
                    dataColor="#2FCD6C"
                    noDataColor="#0F4337"
                    />
                    <span style="
                      font-family: PingFang SC;
                      font-weight: 400;
                      color: #8391B7;
                      font-size: 16px;">牵引踏板</span>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div class="wrapper-top-bottom">
          <div class="wrapper-top-bottom-left">
            <div class="v-chart">
              <vol-currchart
                id="vchart"
                ref="vchartRef"
                :center="['58%', '50%']"
                title="电池总电流 /A"
                :titlePos="['34%', '16%']"
              />
            </div>
            <div class="a-chart">
              <vol-currchart
                id="achart"
                ref="achartRef"
                :rang="[-500, 500]"
                :center="['50%', '50%']"
                title="电池总电压 /V"
                :bgColor="['#FFEB65', '#394936']"
                :titlePos="['28%', '16%']"
              />
            </div>
          </div>
          <div class="wrapper-top-bottom-center">
            <div>
              <column-chart
                :val="inCarTemperature"
                unit="℃"
                label="车内温度"
                style="margin-left: 12px;"
              />
            </div>
            <div>
              <column-chart
                :val="socNum"
                :bgColor="['#2FCD6C', '#0F4337']"
                unit="%"
                label="SOC"
              />
            </div>
            <div>
              <info-panel
                style="margin-top: 20px;"
                ref="infoPanel"
              />
            </div>
            <div>
              <column-chart
                :val="batteryTemperatureMax"
                unit="℃"
                label="电池最高温"
                :bgColor="['#36DCF5', '#104653']"
                style="margin-left: 12px;"
              />
            </div>
            <div>
              <column-chart
                :val="batteryTemperatureMin"
                :bgColor="['#F8DC59', '#374633']"
                label="电池最低温"
                unit="℃"
              />
            </div>
          </div>
          <div class="wrapper-top-bottom-right">
            <div>
              <div>
                <tyre-info
                  ref="fortWhell1"
                  className="bgIcon-2"
                />
              </div>
              <div>
                <tyre-info
                  ref="fortWhell2"
                  style="margin-left: -80px;"
                  className="bgIcon-4"
                  title="前轮2"
                />
              </div>
            </div>
            <div>
              <div>
                <tyre-info
                  ref="rearWhell1"
                  style="margin-top: -30px;"
                  className="bgIcon-1"
                  title="后轮1"
                />
              </div>
              <div>
                <tyre-info
                  ref="rearWhell2"
                  style="margin-top: -30px;margin-left: -80px;"
                  className="bgIcon-3"
                  title="后轮2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper-bottom">
        <tab-view :busNumberProp="busNumber"/>
      </div>
    </div>
  </div>
</template>
<script>
import CarSpeed from './components/carSpeedChart'
import ProgressBar from './components/progressBar'
import IndiLight from './components/indiLight'
import EquipmentStatus from './components/equipmentStatus'
import VolCurrchart from './components/volCurrChart'
import ColumnChart from './components/columnChart'
import InfoPanel from './components/infoPanel'
import TyreInfo from './components/tyreInfo'
import TabView from './tabView/index'
import { WSAPISEC } from '@/config/settings'
export default {
  name: 'busRealtimeTrafficData',
  components: {
    CarSpeed,
    ProgressBar,
    IndiLight,
    EquipmentStatus,
    VolCurrchart,
    ColumnChart,
    InfoPanel,
    TyreInfo,
    TabView
  },
  mounted () {
    const bus = this.busNumber = this.$store.state.globel.carData[0].value
    this.busNumberOptions = this.$store.state.globel.carData
    // 初始化仪表盘数据
    this.initData()
    // connect ws
    this.initWebSocket(bus)
  },
  methods: {
    initData () {
      // 初始化仪表盘
      this.$refs.carSpeedChart.drawChart(0)
      this.$refs.carRollSpeedChart.drawChart(0)
      this.$refs.vchartRef.drawChart(0)
      this.$refs.achartRef.drawChart(0)
      // 初始化小图标
      for (let i = 0; i < 20; i++) {
        this.$refs.indiLight.setData(i, -1)
      }
      // 初始化轮胎
      this.$refs.fortWhell1.setData(0, 0)
      this.$refs.fortWhell2.setData(0, 0)
      this.$refs.rearWhell1.setData(0, 0)
      this.$refs.rearWhell2.setData(0, 0)
      // 初始化设备状态 arg1: id arg2: statusCode
      this.$refs.equipmentStatus.setData(0, 0)
      this.$refs.equipmentStatus.setData(1, 0)
      this.$refs.equipmentStatus.setData(2, 4)
      // 初始化底部信息框数据 infoPanel arg1: id arg2: val
      this.$refs.infoPanel.setData(0, '0 度')
      this.$refs.infoPanel.setData(1, '0 度')
      this.$refs.infoPanel.setData(2, '0 KM')
      this.$refs.infoPanel.setData(3, '0')
      this.$refs.infoPanel.setData(4, '0 度')
      // 其它参数
      this.electricityQuantity = 0 // 剩余电量
      this.brakPedal = 0 // 制动踏板
      this.tractionPedal = 0 // 牵引踏板
      this.inCarTemperature = 0 // 车内温度
      this.socNum = 0 // SOC
      this.batteryTemperatureMax = 0 // 电池最高温
      this.batteryTemperatureMin = 0 // 电池最低温
      this.loopSpeed = 0 // 电机转速
      this.startStation = '起点站'
      this.endStation = '终点站'
    },
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
          this.updata(data)
        }
      } else {
        this.$message.error('浏览器不支持websocket')
      }
    },
    /* 更新数据 */
    updata (data) {
      // 赋值车速
      if ('carSpeed' in data) { this.$refs.carSpeedChart.drawChart(data.carSpeed) }
      // 充电状态
      if ('chargingStatus' in data) {
        const chargingStatus = (data['chargingStatus'] === '未充电' && 0) || (data['chargingStatus'] === '充电中' && 2) || (data['chargingStatus'] === '充电完成' && 1) || '充电故障'
        this.$refs.equipmentStatus.setData(1, chargingStatus)
      }
      // 充电枪连接灯
      if ('dcChargingGunConnectionStatus' in data) {
        const typeName = data['dcChargingGunConnectionStatus']
        let statusCode = -1
        switch (typeName) {
          case '未连接':
            statusCode = -1
            break
          case '单枪连接':
            statusCode = 1
            break
          case '双枪连接':
            statusCode = 2
            break
          default:
            statusCode = 0
            break
        }
        this.$refs.indiLight.setData(14, statusCode, typeName)
      }
      // 电机状态
      if ('electricalMachinery1State' in data) {
        const electricalMachinery1StateName = data['electricalMachinery1State']
        let electricalMachinery1State = 4
        switch (electricalMachinery1StateName) {
          case '耗电':
            electricalMachinery1State = 1
            break
          case '发电':
            electricalMachinery1State = 2
            break
          case '关闭':
            electricalMachinery1State = 3
            break
          case '准备':
            electricalMachinery1State = 4
            break
          case '异常':
            electricalMachinery1State = 14
            break
          case '无效':
            electricalMachinery1State = 15
            break
          default:
            break
        }
        this.$refs.equipmentStatus.setData(2, electricalMachinery1State)
      }
      // 前轮1轮胎压力
      if ('fwoTirePressure' in data) {
        const fwoTirePressure = data['fwoTirePressure']
        this.$refs.fortWhell1.setData(fwoTirePressure, null)
      }
      // 前轮1轮胎温度
      if ('fwoTireTemperature' in data) {
        const fwoTireTemperature = data['fwoTireTemperature']
        this.$refs.fortWhell1.setData(null, fwoTireTemperature)
      }
      // 前轮2压力
      if ('fwtTirePressure' in data) {
        const fwtTirePressure = data['fwtTirePressure']
        this.$refs.fortWhell2.setData(fwtTirePressure, null)
      }
      // 前轮2温度
      if ('fwtTireTemperature' in data) {
        const fwtTireTemperature = data['fwtTireTemperature']
        this.$refs.fortWhell2.setData(null, fwtTireTemperature)
      }
      // 后轮1轮胎压力
      if ('rwoTirePressure' in data) {
        const rwoTirePressure = data['rwoTirePressure']
        this.$refs.rearWhell1.setData(rwoTirePressure, null)
      }
      // 后轮1轮胎温度
      if ('rwoTireTemperature' in data) {
        const rwoTireTemperature = data['rwoTireTemperature']
        this.$refs.rearWhell1.setData(null, rwoTireTemperature)
      }
      // 后轮2压力
      if ('rwtTirePressure' in data) {
        const rwtTirePressure = data['rwtTirePressure']
        this.$refs.rearWhell2.setData(rwtTirePressure, null)
      }
      // 后轮2温度
      if ('rwtTireTemperature' in data) {
        const rwtTireTemperature = data['rwtTireTemperature']
        this.$refs.rearWhell2.setData(null, rwtTireTemperature)
      }
      // 电机转速
      if ('motor1Speed' in data) {
        const motor1Speed = data['motor1Speed']
        this.loopSpeed = motor1Speed
        this.$refs.carRollSpeedChart.drawChart(motor1Speed)
      }
      // soc
      if ('soc' in data) {
        const soc = data['soc']
        this.socNum = soc
      }
      // 起点站、终点站
      if ('startStation' in data) {
        this.startStation = data['startStation']
      }
      if ('endStation' in data) {
        this.endStation = data['endStation']
      }
    },
    closeWs () {
      this.ws.close()
      this.ws = null
      console.log('===============推送关闭=============')
    },
    changeBusNumber (val) {
      this.busNumber = val
      this.closeWs()
      this.initData()
      this.initWebSocket(val)
    },
    focusSelect (flag) {
      // if (flag) {
      //   this.$nextTick(() => {
      //     const dropdown = document.getElementsByClassName('el-select-dropdown')[0]
      //     dropdown.classList.add('addSelectStyle')
      //   })
      // }
    },
    blurSelect () {}
  },
  data () {
    return {
      'ws': null,
      'busNumberOptions': [],
      'busNumber': '',
      'startStation': '起点站',
      'endStation': '终点站',
      'electricityQuantity': 0, // 剩余电量
      'brakPedal': 0, // 制动踏板
      'tractionPedal': 0, // 牵引踏板
      'inCarTemperature': 0, // 车内温度
      'socNum': 0, // SOC
      'batteryTemperatureMax': 0, // 电池最高温
      'batteryTemperatureMin': 0, // 电池最低温
      'loopSpeed': 0 // 电机转速
    }
  }
}
</script>
<style scoped lang="scss">
  .wrapper {
    width: 100%;
    height: 100%;
    background-color: #010B0E;
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow: auto;
    overflow-x: auto;
    // padding-top: 16px;
    // align-items: center;
  }
  .wrapper-content {
    margin-top: 16px;
    // width: calc(100% - 80px);
    // height: calc(100% - 20px);
    // min-width: 800px;
    // min-height: 600px;
    background-color: #010B0E;
    // padding: 10px 40px;
    display: flex;
    flex-direction: column;
    min-width: 1100px;
    max-width: 1300px;
    width: 90%;
  }
  .wrapper-top {
    // flex: 2;
    min-height: 520px;
    background-image: url('./assets/topBg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
  }
  .wrapper-bottom {
    // flex: 1;
  }
  .wrapper-top-top {
    flex: 0;
    display: flex;
    flex-direction: row;
    >div{
      color: #D5D6D7;
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-family: PingFang SC;
      font-weight: 400;
      span {
        margin-top: 10px;
        color: #A5A9AB;
        margin-left: 12px;
      }
    }
    >div:nth-child(1) {
      justify-content: flex-end!important;
      span {
        margin-right: 50px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        font-size: 18px;
      }
    }
    >div:nth-child(2) {
      span {
        font-family: PingFang SC;
        font-weight: Bold;
        color: rgba(76, 133, 254, 0.2);
        font-size: 28px;
        margin-left: 8px;
        margin-right: 8px;
      }
      span:nth-child(4) {
        color: #ffffff;
      }
    }
    >div:nth-child(3) {
      justify-content: flex-start!important;
    }
  }
  .wrapper-top-middle {
    flex: 5;
    display: flex;
    flex-direction: row;
    .middle-item {
      flex: 1;
      .middle-item-chart {
        height: 70%;
      }
    }
    .middle-item-center {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .middle-item:nth-child(2) {
      flex: 1.4!important;
    }
  }
  .wrapper-top-bottom {
    flex: 3.6;
    display: flex;
    flex-direction: row;
  }
  .wrapper-top-bottom-left {
    flex: 1;
    display: flex;
    flex-direction: row;
  }
  .wrapper-top-bottom-left>div {
    flex: 1;
  }
  .wrapper-top-bottom-center {
    flex: 1.4;
    display: flex;
    flex-direction: row;
  }
  .wrapper-top-bottom-center>div {
    &:nth-child(1),&:nth-child(2),&:nth-child(4),&:nth-child(5) {
      flex: 1;
    }
    &:nth-child(3) {
      flex: 3;
    }
  }
  .wrapper-top-bottom-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    >div {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      >div {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .progress1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .progress2 {
    display: flex;
    flex-direction: row;
    margin-left: 10px;
  }
  .progress2>div {
    margin-left: 20px;
  }
  .progress2>div:nth-child(1) {
    margin-left: 56px;
  }
  .kaiwang-icon {
    display: inline-block;
    width: 36px;
    height: 16px;
    margin-bottom: 12px;
    background-image: url('./assets/kaiwang.png');
    background-size: 100% 100%;
  }
  .busNumberCon {
    cursor: pointer;
  }
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar{
    width: 7px;
    height: 7px;
    background-color: #F5F5F5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
    background-color: #c8c8c8;
  }
</style>
<style>
  .addSelectStyle {
    background-image: url('./assets/dropDownBg.png');
    background-size: 100% 100%;
    background-color: transparent;
    border: 0;
    color: #ffffff;
  }
  .addSelectStyle .popper__arrow::after {
    border-bottom-color: #06498e !important;
    top: 1px;
    margin-left: -6px;
    border-top-width: 0;
  }
  .addSelectStyle .popper__arrow {
    border-bottom-color: #0c7af6!important;
  }
  .addSelectStyle .el-select-dropdown__item.hover, .addSelectStyle .el-select-dropdown__item:hover {
    background-color: #348ae1;
    color: #fff;
  }
  .selectBusNumber .el-select {
    background-image: url('./assets/dateInputBg.png');
    background-size: 100% 100%;
    background-color: transparent;
    border: 0;
    color: #ffffff;
    width: 130px;
  }
  .selectBusNumber .el-input--small .el-input__inner {
    background-color: transparent;
    border: 0;
    font-size: 16px;
  }
</style>
