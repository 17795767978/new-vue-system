<template>
  <div class="column-chart">
    <span>{{val}}{{unit}}</span>
    <div>
      <div class="chartLabel"><span>{{label}}</span></div>
      <div class="chartContent" :style="{backgroundColor: bgColor[1]}">
        <div class="chartContent-insert" :style="{backgroundColor: bgColor[0], height: valH}"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    unit: String, // 单位
    label: String,
    rang: {
      type: Array,
      default: () => {
        return [0, 100]
      }
    },
    bgColor: {
      type: Array,
      default: () => {
        return ['#EB61FF', '#352D55']
      }
    },
    val: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  computed: {
    valH () {
      let normal = this.val
      let normalVal = null
      if (normal < 0) {
        normalVal = -normal
      }
      if (normal >= 0) {
        normalVal = normal + (-this.rang[0])
      }
      if (normal < this.rang[0] || normal === this.rang[0]) {
        normalVal = 0
      }
      let data = `${(normalVal / ((-this.rang[0]) + this.rang[1])) * 100}%`
      return data
    }
  }
}
</script>
<style scoped>
  .column-chart {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
  }
  .column-chart span {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #BDC0C2;
    text-align: center;
    /* margin-bottom: 6px; */
  }
  .column-chart>div {
    display: flex;
    flex-direction: row;
  }
  .chartLabel {
    width: 10px;
    color: #54637D;
    display: flex;
    flex-direction: column-reverse;
    line-height: 16px;
    word-wrap: break-word;
  }
  .chartContent {
    width: 24px;
    height: 90px;
    background-color: #352D55;
    margin-left: 6px;
    display: flex;
    flex-direction: column-reverse;
  }
  .chartContent-insert {
    width: 100%;
  }
</style>
