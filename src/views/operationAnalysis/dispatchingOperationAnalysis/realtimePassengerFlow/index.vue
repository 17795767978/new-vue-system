<template>
  <div class="passenger-flow-stat">
    <div class="title">
      <h1 class="content">客流实时统计</h1>
    </div>
    <div class="scroll-num">
      <div class="top-scroll">
        <div class="left-flow">
          <h2 class="real-flow">实施累计客流（人次）</h2>
          <ul class="scroll-wrapper">
            <li class="item" v-for="(item, index) in passenger" :key="item">
              {{realtimeFlow1[index]}}
            </li>
          </ul>
        </div>
        <div class="right-flow">
          <h2 class="real-num">实施载客（人）</h2>
          <ul class="scroll-wrapper">
            <li  class="item" v-for="(item, index) in passenger" :key="item">
              {{realtimeFlow2[index]}}
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom-scroll">
        <el-button type="primary" @click="getCont">点击</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'realtimePassengerFlow',
  data () {
    return {
      passenger: ['k', 'o', 'b', 'e', 'd', 'r', 'g'],
      realtimeFlow1: [2, 5, 4, 7, 1, 2, 5],
      realtimeFlow2: [0, 0, 0, 7, 6, 5, 0],
      numArr1: [2547125, 2547234, 2547456, 2576575, 2541111, 2541213, 2547111, 2547235],
      numArr2: [7650, 7541, 7213, 8421, 7650, 7333, 7222, 7111],
      num1: 2547125,
      num2: 7650
    }
  },
  methods: {
    getCont () {
      let str1 = ''
      let str2 = ''
      // let random = Math.random()
      // if (random < 0.3) {
      //   this.num1 += 1
      //   this.num2 += 1
      // } else if (random >= 0.3 && random <= 0.5) {
      //   this.num1 += 100
      //   this.num2 += 100
      // } else if (random > 0.5 && random < 0.7) {
      //   this.num1 += 1000
      //   this.num2 += 1000
      // } else {
      //   this.num1 += 258
      //   this.num2 += 258
      // }
      for (let i = 0; i < this.numArr1.length; i++) {
        setTimeout(() => {
          console.log(i)
          str1 = String(this.numArr1[i])
          if (str1.length === 7) {
            this.realtimeFlow1 = str1.split('')
          } else {
            let len = 7 - str1.length
            for (let i = 0; i < len; i++) {
              str1 = 0 + str1
            }
            this.realtimeFlow1 = str1.split('')
          }
        }, 3000 * i)
      }
      for (let i = 0; i < this.numArr2.length; i++) {
        setTimeout(() => {
          str2 = String(this.numArr2[i])
          if (str2.length === 7) {
            this.realtimeFlow2 = str2.split('')
          } else {
            let len = 7 - str2.length
            for (let i = 0; i < len; i++) {
              str2 = 0 + str2
            }
            this.realtimeFlow2 = str2.split('')
          }
        }, 3000 * i)
      }
    }
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
    margin: 5vh auto;
    height: 45vh;
    border: 1px solid #08325f;
    box-shadow: 1px 1px 10px 4px #08325f inset;
    box-sizing: border-box;
    .top-scroll {
      width: 100%;
      height: 30vh;
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
            font-size: 2.7vw;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
