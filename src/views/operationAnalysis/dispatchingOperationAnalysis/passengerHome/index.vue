<template>
  <div class="passenger-home">
    <div class="top-wrapper">
      <div class="left-top-wrapper">
        <totalData />
      </div>
      <div class="right-top-wrapper">
        <passengerVol />
      </div>
      <div class="left-bottom-wrapper">
        <div class="title">客流热力图</div>
        <div class="map">
          <passengerHotmap />
        </div>
      </div>
      <div class="right-bottom-wrapper">
        <div class="station-wrapper" style="border-right: 1px solid #ccc;">
          <div class="title">客流最热站点TOP10</div>
          <div class="map">
            <station-echarts />
          </div>
        </div>
        <div class="line-wrapper">
          <div class="title">客流最热线路TOP10</div>
          <div class="map">
            <lineEchartsTop />
          </div>
        </div>
        <div class="month-wrapper">
          <monthEcharts></monthEcharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import totalData from './Components/totalData.vue'
import passengerVol from './Components/passengerVol.vue'
import passengerHotmap from './Components/passengerHotmap.vue'
import stationEcharts from './Components/stationEcharts.vue'
import lineEchartsTop from './Components/lineEchartsTop.vue'
import monthEcharts from './Components/month.vue'
export default {
  name: 'passengerHome',
  mounted () {
  },
  components: {
    totalData,
    passengerVol,
    passengerHotmap,
    stationEcharts,
    lineEchartsTop,
    monthEcharts
  }
}
</script>

<style lang="scss" scoped>
.passenger-home {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #ccc;
  padding: 0.5%;
  margin: 0.5%;
  box-sizing: border-box;
  border-radius: 6px;
  height: 98%;
  .top-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: 100%;
    .left-top-wrapper {
      width: 44.5%;
      border: 1px solid #ccc;
      padding: 10px;
      box-sizing: border-box;
      margin-right: 0.5%;
      margin-bottom: 10px;
      height: 27vh;
    }
    .right-top-wrapper {
      width: 55%;
      border: 1px solid #ccc;
      box-sizing: border-box;
      margin-bottom: 10px;
      height: 27vh;
    }
    .left-bottom-wrapper {
      width: 55%;
      border: 1px solid #ccc;
      box-sizing: border-box;
      margin-right: 0.5%;
      height: 69%;
      .title {
        width: 100%;
        border-bottom: 1px solid #ccc;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.5rem;
        padding-left: 1rem;
        box-sizing: border-box;
        font-weight: bold;
      }
      .map {
        width:100%;
        height: 96.7%;
      }
    }
    .right-bottom-wrapper {
      width: 44.5%;
      border: 1px solid #ccc;
      box-sizing: border-box;
      height: 69%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .station-wrapper, .line-wrapper {
        width: 50%;
        height: 60%;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        .title {
          width: 100%;
          border-bottom: 1px solid #ccc;
          height: 3rem;
          line-height: 3rem;
          font-size: 1.5rem;
          padding-left: 1rem;
          box-sizing: border-box;
          font-weight: bold;
        }
        .map {
          width: 100%;
          height: 90%;
        }
      }
      .month-wrapper {
        width: 100%;
        height: 40%;
      }
    }
  }
}
</style>
