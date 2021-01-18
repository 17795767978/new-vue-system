<template>
    <div ref="cornerBox" class="corner-box-container" :style="{width: boxWidth, height: boxHeight}" :class="skinType === 0 ? 'normalBg' : ''">
        <div class="corner-1" v-show="skinType === 1">
            <img :src="cardImg.cardtl"/>
        </div>
        <div class="corner-2" v-show="skinType === 1">
            <img :src="cardImg.cardtr"/>
        </div>
        <div class="corner-3" v-show="skinType === 1">
            <img :src="cardImg.cardbl"/>
        </div>
        <div class="corner-4" v-show="skinType === 1">
            <img :src="cardImg.cardbr"/>
        </div>
        <div class="corner-box-content">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
/* CornerBox 一个好看的容器组件 */
const cardtl = require('../../assets/images/newScreen/card-tl.png')
const cardtr = require('../../assets/images/newScreen/card-tr.png')
const cardbl = require('../../assets/images/newScreen/card-bl.png')
const cardbr = require('../../assets/images/newScreen/card-br.png')
export default {
  name: 'CornerBox',
  props: {
    boxWidth: {
      type: String
    },
    boxHeight: {
      type: String
    },
    skinType: {
      default: 1,
      type: Number
    }
  },
  methods: {
    // 计算容器宽高
    calculationHW () {
    //   const cornerBox = this.$refs.cornerBox
    //   const boxH = cornerBox.clientHeight
    //   const boxW = cornerBox.clientWidth
    //   cornerBox.style.height = `${boxH - 20}px`
    //   cornerBox.style.width = `${boxW - 20}px`
    }
  },
  mounted () {
    this.calculationHW()
  },
  data () {
    return {
      cardImg: {
        cardtl: cardtl,
        cardtr: cardtr,
        cardbl: cardbl,
        cardbr: cardbr
      }
    }
  }
}
</script>
<style scoped>
    .normalBg {
      background-color: #ffffff!important;
      box-shadow:0px 0px 15px 0px rgba(4,56,161,0.2);
    }
    .corner-box-container {
        background-color: rgba(42,47,85,0.5);
        border-radius: 5px;
        position: relative;
        padding: 10px 10px;
    }
    .corner-1 {
        position: absolute;
        top: -2px;
        left: 0;
    }
    .corner-2 {
        position: absolute;
        top: -2px;
        right: 0;
    }
    .corner-3 {
        position: absolute;
        bottom: -4px;
        left: 0;
    }
    .corner-4 {
        position: absolute;
        bottom: -4px;
        right: 0;
    }
    .corner-box-content {
        height: 100%;
        width: 100%;
    }
</style>
