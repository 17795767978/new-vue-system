<template>
  <div class="passenger-flow-stat">
    <div class="title">
      <h1 class="content">客流实时统计</h1>
    </div>
    <div class="scroll-num">
      <div class="top-scroll">
        <div class="left-flow">
          <h2 class="real-flow">实时累计客流（人次）</h2>
          <ul class="scroll-wrapper">
            <li class="item" ref="totalFlowWrapper" :class="[bfFlow1[index] !== realtimeFlow1[index] ? 'active' : 'kobe']" v-for="(item, index) in passenger" :key="item">
              {{realtimeFlow1[index]}}
            </li>
          </ul>
        </div>
        <div class="right-flow">
          <h2 class="real-num">实时载客（人）</h2>
          <ul class="scroll-wrapper">
            <li  class="item" ref="currentFlowWrapper" :class="[bfFlow2[index] !== realtimeFlow2[index] ? 'active' : 'kobe']" v-for="(item, index) in passenger" :key="item">
              {{realtimeFlow2[index]}}
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom-scroll">
        <ul class="every-org-flow-num">
          <li class="org-num-wrapper" v-for="(item,index) in orgFlowData" :style="getOrgWidth" :key="item.orgUuid"  @click="getEcharts(item)">
            <div class="org-title"  :class="[currentId === item.orgUuid ? 'down' : '']">
              {{item.orgName}}
              <span style="font-size: #eee; font-size:0.5vw;margin-left: 0.2vw;">(人次)</span>
            </div>
            <p :style="getColor(index)" class="org-num">{{item.personCount}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="echarts">
      <Echarts v-if="Object.keys(selectData).length > 0" :selectData="selectData"/>
    </div>
  </div>
</template>

<script>
import Echarts from './Components/echarts'
export default {
  name: 'realtimePassengerFlow',
  data () {
    return {
      passenger: ['k', 'o', 'b', 'e', 'd', 'r', 'g'], // vdom的key
      bfFlow1: ['0', '0', '0', '0', '0', '0', '0'], // 之前的客流
      bfFlow2: ['0', '0', '0', '0', '0', '0', '0'], // 之前的载客
      realtimeFlow1: ['0', '0', '0', '0', '0', '0', '0'], // 动画后的客流
      realtimeFlow2: ['0', '0', '0', '0', '0', '0', '0'], // 动画后的载客
      totalTimer: null,
      currentTimer: null,
      orgFlowData: [],
      colorful: ['#FEDD00', '#00F6F7', '#A1E716', '#FFBF35', '#FF30A0', '#FEDD00', '#00F6F7', '#A1E716', '#FFBF35', '#FF30A0'],
      currentId: '',
      selectData: ''
    }
  },
  components: {
    Echarts
  },
  computed: {
    getOrgWidth () {
      return {
        width: `${100 / this.orgFlowData.length - 2}%`,
        height: '10vh'
      }
    },
    getColor () {
      return (index) => {
        return {
          color: this.colorful[index]
        }
      }
    }
  },
  mounted () {
    this._getTotalFlow({
      orgId: ''
    })
    this._getCurrentFlow({
      orgId: ''
    })
    this._getCompanyTotalPassengerFlow()
  },
  methods: {
    _getTotalFlow (params) {
      this.bfFlow1 = JSON.parse(JSON.stringify(this.realtimeFlow1))
      this.$api['passengerFlow.getTotalPassengerFlow'](params).then((res) => {
        let str1 = String(res.personCount)
        let dom = this.$refs.totalFlowWrapper
        this.actionsType(str1, dom, true)
        this.totalTimer = setTimeout(() => {
          this._getTotalFlow({
            orgId: ''
          })
        }, 10000)
      })
    },
    _getCurrentFlow (params) {
      this.bfFlow2 = JSON.parse(JSON.stringify(this.realtimeFlow2))
      this.$api['passengerFlow.getRealTimePersoncountAndFullLoadRate'](params).then((res) => {
        let str2 = String(res.personCount)
        let dom = this.$refs.currentFlowWrapper
        this.actionsType(str2, dom, false)
        this.currentTimer = setTimeout(() => {
          this._getCurrentFlow({
            orgId: ''
          })
        }, 10000)
      })
    },
    _getCompanyTotalPassengerFlow () {
      this.$api['passengerFlow.getCompanyTotalPassengerFlow']().then(res => {
        if (Object.keys(this.selectData).length === 0) {
          this.selectData = res[0]
          this.currentId = res[0].orgUuid
        } else {
          this.selectData = res.filter(item => item.orgUuid === this.selectData.orgUuid)[0]
          this.currentId = res.filter(item => item.orgUuid === this.selectData.orgUuid)[0].orgUuid
        }
        this.orgFlowData = res
        this.orgFlow = setTimeout(() => {
          this._getCompanyTotalPassengerFlow()
        }, 10000)
      })
    },
    // 动画操作
    actionsType (str, dom, is) {
      if (str.length === 7) {
        if (is) {
          this.realtimeFlow1 = str.split('')
        } else {
          this.realtimeFlow2 = str.split('')
        }
      } else {
        let len = 7 - str.length
        for (let i = 0; i < len; i++) {
          str = 0 + str
        }
        if (is) {
          this.realtimeFlow1 = str.split('')
        } else {
          this.realtimeFlow2 = str.split('')
        }
      }
      setTimeout(() => {
        for (let i = 0; i < dom.length; i++) {
          dom[i].classList.remove('active')
        }
      }, 5000)
    },
    getEcharts (item) {
      this.currentId = item.orgUuid
      this.selectData = item
    }
  },
  destroyed () {
    clearTimeout(this.totalTimer)
    clearTimeout(this.currentTimer)
    this.totalTimer = null
    this.currentTimer = null
    console.log(123)
  }
}
</script>

<style lang="scss" scoped>
.passenger-flow-stat {
  width:100%;
  height: calc(100vh - 65px);
  background-image: url('../../../../assets/images/pg-flow-bg.png');
  background-size: 100% 100%;
  .title {
    width: 100%;
    height: 8vh;
    background-image: url('../../../../assets/images/pg-title.png');
    background-size: 100% 100%;
    position: relative;
    .content {
      width: 20vw;
      height: 8vh;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -10vw;
      margin-top: -4vh;
      text-align: center;
      color: #fff;
      line-height: 8vh;
      font-size: 1.5vw;
    }
  }
  .scroll-num {
    width: 90%;
    margin: 5vh auto 2vh;
    height: 40vh;
    border: 1px solid #08325f;
    box-shadow: 1px 1px 10px 4px #08325f inset;
    box-sizing: border-box;
    .top-scroll {
      width: 100%;
      height: 27vh;
      display: flex;
      box-sizing: border-box;
      justify-content: center;
      .left-flow,
      .right-flow {
        width: 45%;
        height: 25vh;
        padding: 3vh 5vw 1vh 5vw;
        box-sizing: border-box;
        .real-flow,.real-num {
          width: 100%;
          height: 5vh;
          font-size: 1.2vw;
          color: #fff;
          text-align: center;
        }
        .scroll-wrapper {
          width: 100%;
          height: 14vh;
          display: flex;
          justify-content: space-around;
          padding: 2vh 0vw;
          box-sizing: border-box;
          .item {
            width: 3vw;
            height: 10vh;
            line-height: 10vh;
            text-align: center;
            color: #e6bf35;
            border: 1px solid #08325f;
            box-shadow: 1px 1px 10px 4px #08325f inset;
            box-sizing: border-box;
            font-size: 4vw;
            font-weight: 500;
          }
        }
      }
    }
    .bottom-scroll {
      width: 100%;
      height: 10vh;
      .every-org-flow-num {
        width: 100%;
        display: flex;
        justify-content: space-around;
        .org-num-wrapper {
          width: 100%;
          cursor: pointer;
          .org-title {
            height: 4vh;
            color: #fff;
            font-size: 1vw;
            font-weight: 900;
            text-align: center;
            cursor: pointer;
            margin-bottom: 1vh;
          }
          .org-num {
            text-align: center;
            font-size: 2vw;
            margin: 0;
            letter-spacing: 0.1vw;
            cursor: pointer;
          }
        }
      }
    }
  }
  .echarts {
    width: 90%;
    margin: 0 auto;
    height: calc(45vh - 100px);
    border: 1px solid #08325f;
    box-shadow: 1px 1px 10px 4px #08325f inset;
    box-sizing: border-box;
    padding: 1vh 2vw;
  }
}
.active {
  animation: zy 5s 0s linear;
}
@keyframes zy{
  0% {transform: rotate(30deg); opacity: 0;}
  20% {transform: rotate(-30deg);  opacity: 0.25;}
  30% {transform: rotate(15deg);  opacity: 0.5;}
  40% {transform: rotate(-15deg);  opacity: 0.75;}
  50%,100% {transform: rotate(0deg);  opacity: 1;}
}
.down {
  border-bottom: 1px solid #ffffff;
  box-sizing: border-box;
}
</style>
