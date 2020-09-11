<template>
  <div class="new-big-screen" id="full-wrapper" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- <div style="position: fixed; left: 0; right: 0; top: 0;bottom: 0; z-index: 899; box-shadow: 0px 1px 20px #0c4e69 inset;

                -1px 0px 20px #0c4e69 inset;

                1px 0px 3px #0c4e69 inset;

                0px 1px 3px #0c4e69 inset;"></div> -->
    <div class="top-design">
      <div class="left-button" @click="handlerFullScreen">{{fullScreen}}</div>
      <div class="title">{{title}}</div>
      <div class="right-button" @click="handlerToHome">{{backHome}}</div>
    </div>
    <div class="left-banner"></div>
    <div class="right-banner"></div>
    <!-- <div class="bottom-top-banner"></div> -->
    <div class="bottom-banner"></div>
    <!-- 客流数据 -->
    <div class="passenger-index">
      <passenger-index></passenger-index>
    </div>
    <!-- online -->
    <div class="online-bus">
      <div class="title" style="height: 4vh; color: #ffffff;line-height:4vh;font-weight: bold;font-size: .7vw; margin-right: 6vw;margin-top: 5vh;">在线车辆数</div>
      <div style="margin-right: 3vw; color: #03f6ff;line-height:4vh;font-weight: bold;font-size: 1.5vw;">{{onLineCarNum}}/{{totalBusNumber}}</div>
    </div>
    <!-- 里程完成情况 -->
    <div class="melige-complete">
      <div class="title">
        <div class="left"></div>
        <div class="center">里程完成情况</div>
        <div class="right">
          <div class="line"></div>
        </div>
      </div>
      <div style="width: 100%; height: 100%;">
        <MeligeComplete></MeligeComplete>
      </div>
    </div>
    <!-- 趟次完成 -->
    <div class="trips-complete">
      <div class="title">
        <div class="left"></div>
        <div class="center">趟次完成情况</div>
        <div class="right">
          <div class="line"></div>
        </div>
      </div>
      <div style="width: 100%; height: 100%;">
        <TripComplete></TripComplete>
      </div>
    </div>
    <!-- 实时满载率 -->
    <div class="rate-complete">
      <div class="title">
        <div class="left"></div>
        <div class="center">实时满载率</div>
        <div class="right">
          <div class="line"></div>
        </div>
      </div>
      <div style="width: 100%; height: 100%;">
        <RateEcharts></RateEcharts>
      </div>
    </div>
    <!-- 不良驾驶行为统计 -->
    <div class="bad-driver-complete">
      <div class="title">
        <div class="left"></div>
        <div class="center">不良驾驶行为统计</div>
        <div class="right">
          <div class="line"></div>
        </div>
      </div>
      <div style="width: 100%; height: 100%;">
        <BadDriver></BadDriver>
      </div>
    </div>
    <!-- 司机不良驾驶行为实时报警 -->
    <div class="bad-driver-alarm-complete">
      <div class="title">
        <div class="left"></div>
        <div class="center">司机不良驾驶行为实时报警</div>
        <div class="right">
          <div class="line"></div>
        </div>
      </div>
      <div style="width: 100%; height: 85%; padding: 0.7vh 0.3vw 0 0.3vw; box-sizing:border-box;">
        <BadDriverReal></BadDriverReal>
      </div>
    </div>
    <!-- 地图 -->
    <div class="map">
      <Map
        :isSearchLine="true"
        :isCarsDetail="true"
        :isFlv="true"></Map>
    </div>
    <Dialog :marker="marker"/>
  </div>
</template>

<script>
import PassengerIndex from './Components/passengerIndex'
import Map from './Components/map'
import MeligeComplete from './Components/meligeComplete'
import TripComplete from './Components/tripComplete'
import RateEcharts from './Components/rateEcharts'
import BadDriver from './Components/badDriver'
import Dialog from './Components/dialog'
import BadDriverReal from './Components/badDriverReal'
// import { isNullOrUndefined } from 'util';
const TIME = 0.5 * 60 * 1000
export default {
  data () {
    return {
      title: '公交运营综合分析系统',
      backHome: '返回首页',
      fullScreen: '全屏展示',
      loading: false,
      onlineBus: 100,
      marker: {},
      onLineCarNum: null,
      totalBusNumber: null
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 3000)
    this._onLineCarNum({
      orgId
    })
  },
  methods: {
    handlerToHome () {
      this.$router.push({
        name: 'Homepage'
      })
      this.noCache()
    },
    handlerMarker (point) {
      this.marker = point
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
    handlerFullScreen () {
      if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen()
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen()
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        }
      }
    },
    noCache () {
      this.$router.replace('/homepage/home')
      let viewsArr = this.$store.state.views.visitedViews.filter(item => item.name !== 'chartAnalysis')
      let cachedViews = this.$store.state.views.cachedViews.filter(item => item !== 'chartAnalysis')
      this.$store.state.views.visitedViews = viewsArr
      this.$store.state.views.cachedViews = cachedViews
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  },
  components: {
    PassengerIndex,
    Map,
    MeligeComplete,
    TripComplete,
    RateEcharts,
    BadDriver,
    BadDriverReal,
    Dialog
  }
}
</script>

<style lang="scss" scoped>
.new-big-screen {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 888;
  background-image: url('../../assets/images/new-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .left-banner {
    width: 1vw;
    height: 70%;
    position: absolute;
    top: 15%;
    left: 0;
    background-image: url('../../assets/images/left-banner.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: #06161c;
    z-index: 900
  }
  .right-banner {
    width: 1vw;
    height: 70%;
    position: absolute;
    top: 15%;
    right: 0;
    background-image: url('../../assets/images/left-banner.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transform: rotate(180deg);
    background-color: #06161c;
    z-index: 900
  }
  .bottom-top-banner {
    width: 100%;
    height: 20vh;
    position: absolute;
    bottom: 2vh;
    right: 0%;
    left: 0%;
    position: absolute;
    background-image: url('../../assets/images/bottom-top-banners.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transform: rotate(180deg);
    background-color: #06161c;
    z-index: 900
  }
  .bottom-banner {
    width: 100%;
    height: 5vh;
    position: absolute;
    bottom: 0;
    right: 0%;
    left: 0%;
    position: absolute;
    background-image: url('../../assets/images/bottom-banner.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transform: rotate(180deg);
    background-color: #06161c;
    z-index: 900
  }
  .top-design {
    width: 100%;
    height: 10vh;
    box-sizing: border-box;
    background-image: url('../../assets/images/new-bg-title.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    display: flex;
    position: relative;
    z-index: 900;
    background-color: #06161c;
    .left-button {
      width: 6%;
      height: 6vh;
      line-height: 4.2vh;
      color: #00feff;
      font-weight: 900;
      font-size: .8vw;
      padding: 1vh 0;
      box-sizing: border-box;
      padding-left: 1vw;
      cursor: pointer;
      background-image: url('../../assets/images/new-full-screen.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 60%;
    }
    .right-button {
      width: 6%;
      height: 6vh;
      line-height: 4.2vh;
      color: #00feff;
      font-weight: 900;
      font-size: .8vw;
      padding: 1vh 0;
      box-sizing: border-box;
      padding-left: 2vw;
      cursor: pointer;
      background-image: url('../../assets/images/new-back.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 60%;
    }
    .title {
      width: 88%;
      text-align: center;
      line-height: 5vh;
      color: #ffffff;
      font-size: 1.5vw;
      font-weight: bold;
    }
  }
  .passenger-index {
    width: 100%;
    height: 7vh;
    position: relative;
    top: -2vh;
    padding: 0 3vw;
    box-sizing: border-box;
    z-index: 900;
    background-color: #06161c;
  }
  .map {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0vh;
    z-index: 898
  }
  .online-bus {
    width: 25%;
    height: 20vh;
    position: absolute;
    z-index: 900;
    left: 1.5vw;
    top: 13vh;
    background-image: url('../../assets/images/online-bus.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 95% auto;
    text-align: right;
  }
  .melige-complete {
    width: 25%;
    height: 30vh;
    position: absolute;
    z-index: 900;
    left: 1.5vw;
    top: 32vh;
    background-image: linear-gradient(left, rgba(13,47,76, 1) 55%, rgba(13,47,76, 0) 100%);
    box-shadow: 0px 1px 20px #0c4e69 inset,   /*上边阴影  红色*/

                -1px 0px 20px #0c4e69 inset,   /*左边阴影  绿色*/

                1px 0px 3px #0c4e69 inset,    /*右边阴影  蓝色*/

                0px 1px 3px #0c4e69 inset;
    .title {
      width: 100%;
      height: 2vh;
      line-height: 2vh;
      display: flex;
      margin-top: 2vh;
      padding: 0 2vw;
      box-sizing: border-box;
      justify-content: space-between;
      .left {
        width: 7%;
        background-image: url('../../assets/images/new-title.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
      }
      .center {
        width: 23%;
        text-align: center;
        line-height: 2vh;
        font-weight: bold;
        color: #ffffff;
        font-size: .8vw;
      }
      .right {
        width: 65%;
        .line {
          margin-top: .95vh;
          width: 100%;
          height: .1vh;
          background-color: #12f6fa
        }
      }
    }
  }
  .trips-complete {
    width: 25%;
    height: 30vh;
    position: absolute;
    z-index: 900;
    left: 1.5vw;
    top: 65vh;
    background-image: linear-gradient(left, rgba(13,47,76, 1) 55%, rgba(13,47,76, 0) 100%);
    box-shadow: 0px 1px 20px #0c4e69 inset,   /*上边阴影  红色*/

                -1px 0px 20px #0c4e69 inset,   /*左边阴影  绿色*/

                1px 0px 3px #0c4e69 inset,    /*右边阴影  蓝色*/

                0px 1px 3px #0c4e69 inset;
    .title {
      width: 100%;
      height: 2vh;
      line-height: 2vh;
      display: flex;
      margin-top: 2vh;
      padding: 0 2vw;
      box-sizing: border-box;
      justify-content: space-between;
      .left {
        width: 7%;
        background-image: url('../../assets/images/new-title.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
      }
      .center {
        width: 23%;
        text-align: center;
        line-height: 2vh;
        font-weight: bold;
        color: #ffffff;
        font-size: .8vw;
      }
      .right {
        width: 65%;
        .line {
          margin-top: .95vh;
          width: 100%;
          height: .1vh;
          background-color: #12f6fa
        }
      }
    }
  }
  .rate-complete {
    width: 46vw;
    height: 25vh;
    position: absolute;
    z-index: 900;
    left: 27vw;
    right: 27vw;
    bottom: 5vh;
    background-image: linear-gradient(bottom, rgba(13,47,76, 1) 35%, rgba(13,47,76, 0) 100%);
    box-shadow: 0px 1px 20px #0c4e69 inset,   /*上边阴影  红色*/

                -1px 0px 20px #0c4e69 inset,   /*左边阴影  绿色*/

                1px 0px 3px #0c4e69 inset,    /*右边阴影  蓝色*/

                0px 1px 3px #0c4e69 inset;
    .title {
      width: 100%;
      height: 2vh;
      line-height: 2vh;
      display: flex;
      margin-top: 2vh;
      padding: 0 2vw;
      box-sizing: border-box;
      justify-content: space-between;
      .left {
        width: 5%;
        background-image: url('../../assets/images/new-title.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
      }
      .center {
        width: 12%;
        text-align: center;
        line-height: 2vh;
        font-weight: bold;
        color: #ffffff;
        font-size: .8vw;
      }
      .right {
        width: 83%;
        .line {
          margin-top: .95vh;
          width: 100%;
          height: .1vh;
          background-color: #12f6fa
        }
      }
    }
  }
  .bad-driver-complete {
    width: 25%;
    height: 38vh;
    position: absolute;
    z-index: 900;
    right: 1.5vw;
    top: 17vh;
    background-image: linear-gradient(left, rgba(13,47,76, 0) 15%, rgba(13,47,76, 1) 50%);
    box-shadow: 0px 1px 20px #0c4e69 inset,   /*上边阴影  红色*/

                -1px 0px 20px #0c4e69 inset,   /*左边阴影  绿色*/

                1px 0px 3px #0c4e69 inset,    /*右边阴影  蓝色*/

                0px 1px 3px #0c4e69 inset;
    .title {
      width: 100%;
      height: 2vh;
      line-height: 2vh;
      display: flex;
      margin-top: 2vh;
      padding: 0 2vw;
      box-sizing: border-box;
      justify-content: space-between;
      .left {
        width: 7%;
        background-image: url('../../assets/images/new-title.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
      }
      .center {
        width: 35%;
        text-align: center;
        line-height: 2vh;
        font-weight: bold;
        color: #ffffff;
        font-size: .8vw;
      }
      .right {
        width: 56%;
        .line {
          margin-top: .95vh;
          width: 100%;
          height: .1vh;
          background-color: #12f6fa
        }
      }
    }
  }
  .bad-driver-alarm-complete {
    width: 25%;
    height: 38vh;
    position: absolute;
    z-index: 900;
    right: 1.5vw;
    top: 57vh;
    background-image: linear-gradient(left, rgba(13,47,76, 0) 15%, rgba(13,47,76, 1) 50%);
    box-shadow: 0px 1px 20px #0c4e69 inset,   /*上边阴影  红色*/

                -1px 0px 20px #0c4e69 inset,   /*左边阴影  绿色*/

                1px 0px 3px #0c4e69 inset,    /*右边阴影  蓝色*/

                0px 1px 3px #0c4e69 inset;
    .title {
      width: 100%;
      height: 2vh;
      line-height: 2vh;
      display: flex;
      margin-top: 2vh;
      padding: 0 2vw;
      box-sizing: border-box;
      justify-content: space-between;
      .left {
        width: 7%;
        background-image: url('../../assets/images/new-title.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
      }
      .center {
        width: 50%;
        text-align: center;
        line-height: 2vh;
        font-weight: bold;
        color: #ffffff;
        font-size: .8vw;
      }
      .right {
        width: 42%;
        .line {
          margin-top: .95vh;
          width: 100%;
          height: .1vh;
          background-color: #12f6fa
        }
      }
    }
  }
}
</style>
