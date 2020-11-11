<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <div class="wrapper-top">
        <div class="wrapper-top-top">
          <div>
            <span>闽SZ2231</span>
          </div>
          <div>
            <span>P</span>
            <span>R</span>
            <span>N</span>
            <span>D</span>
            <span>S</span>
          </div>
          <div>
            <span style="margin-left: 40px;">起点</span>
            <span class="kaiwang-icon"></span>
            <span>终点</span>
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
                  pos: ['54%', '36%']
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
                  pos: ['26%', '36%']
                }"
                :center="['40%', '60%']"
                :titleNoRich="true"
                :rang="[0, 120]"
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
        <tab-view/>
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
    const bus = this.$store.state.globel.carData[0].value
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
      // 初始化轮胎
      this.$refs.fortWhell1.setData(0, 0)
      this.$refs.fortWhell2.setData(0, 0)
      this.$refs.rearWhell1.setData(0, 0)
      this.$refs.rearWhell2.setData(0, 0)
      // 初始化设备状态 arg1: id arg2: statusCode
      this.$refs.equipmentStatus.setData(0, 0)
      this.$refs.equipmentStatus.setData(1, 0)
      this.$refs.equipmentStatus.setData(2, 0)
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
      console.log(data)
    }
  },
  data () {
    return {
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
    // height: 100%;
    background-color: #010B0E;
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow: auto;
    overflow-x: auto;
    padding-top: 16px;
    // align-items: center;
  }
  .wrapper-content {
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
</style>
