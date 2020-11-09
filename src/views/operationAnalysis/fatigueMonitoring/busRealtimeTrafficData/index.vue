<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <div class="wrapper-top">
        <div class="wrapper-top-top">
          <div>
            <span>京BZ000001</span>
          </div>
          <div>
            <span>P</span>
            <span>R</span>
            <span>N</span>
            <span>D</span>
            <span>S</span>
          </div>
          <div>起点</div>
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
                :center="['66%', '55%']"
                :titleNoRich="false"
                :rang="[0, 160]"
              />
            </div>
            <div class="progress1">
              <progress-bar
                style="margin-left: 100px;"
                :dataNum="30"
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
          </div>
          <div class="middle-item">
            <div class="middle-item-chart">
              <car-speed
                ref="carRollSpeedChart"
                id="chart2"
                :title="{
                  text: '转速 r/min',
                  pos: ['20%', '36%']
                }"
                :center="['36%', '55%']"
                :titleNoRich="true"
                :rang="[0, 120]"
              />
            </div>
            <div>
            <span class="progress2">
              <div>
                <progress-bar
                  :dataNum="70"
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
                    :dataNum="60"
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

        </div>
      </div>
      <div class="wrapper-bottom">

      </div>
    </div>
  </div>
</template>
<script>
import CarSpeed from './components/carSpeedChart'
import ProgressBar from './components/progressBar'
import IndiLight from './components/indiLight'
export default {
  name: 'busRealtimeTrafficData',
  components: {
    CarSpeed,
    ProgressBar,
    IndiLight
  },
  mounted () {
    this.$refs.carSpeedChart.drawChart(44)
    this.$refs.carRollSpeedChart.drawChart(56)

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
  }
  .wrapper-top {
    // flex: 2;
    min-height: 460px;
    background-image: url('./assets/topBg.png');
    background-repeat: no-repeat;
    background-size: cover;
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
      color: #FFFFFF;
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      span {
        margin-top: 10px;
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
        height: 80%;
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
    flex: 3;
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
</style>
