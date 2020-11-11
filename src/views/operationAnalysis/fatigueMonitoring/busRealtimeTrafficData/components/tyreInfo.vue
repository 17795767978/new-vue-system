<template>
  <div class="tyre-info">
    <div :class="className">{{title}}</div>
    <div>
      <div style="width: 80px;">
        <span style="display: inline-block;width: 28px">压力:</span>
        <span>{{tyreData.pressure}}</span>
      </div>
      <div style="width: 80px;">
        <span style="display: inline-block;width: 28px">温度:</span>
        <span>{{tyreData.temperature}}℃</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    className: {
      type: String,
      default: 'bgIcon-1'
    },
    title: {
      type: String,
      default: '前轮1'
    }
  },
  methods: {
    setData (arg1 = 0, arg2 = 0) {
      if (arg1 !== null) {
        this.$set(this.tyreData, 'pressure', arg1)
      }
      if (arg2 !== null) {
        this.$set(this.tyreData, 'temperature', arg2)
      }
    }
  },
  data () {
    return {
      tyreData: {
        'pressure': 0,
        'temperature': 0
      }
    }
  }
}
</script>
<style scoped>
  .tyre-info {
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .tyre-info>div {
    width: 60px;
    height: 60px;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    line-height: 18px;
  }
  .tyre-info>div:nth-child(1) {
    justify-content: center;
    align-items: center;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #FFFFFF;
    font-size: 12px;
  }
  .tyre-info>div span {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #B9BCBD;
    margin-left: 6px;
  }
  .bgIcon-1 {
    background-image: url('../assets/tyre1.png');
  }
  .bgIcon-2 {
    background-image: url('../assets/tyre2.png');
  }
  .bgIcon-3 {
    background-image: url('../assets/tyre3.png');
  }
  .bgIcon-4 {
    background-image: url('../assets/tyre4.png');
  }
</style>
