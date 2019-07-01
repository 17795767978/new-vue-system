<template>
  <div class="section-table-analysis">
    <header>
      <headerNav @configCheck="configCheck"></headerNav>
    </header>
    <div class="content">
      <!-- <contentWrapper></contentWrapper> -->
      <h2 class="title">客流高峰断面分析</h2>
      <Chart :chartData="chartData"></Chart>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from './Components/header'
import Chart from './Components/chart'
// import contentWrapper from './Components/content';
// import moment from 'moment'
export default {
  name: 'sectionAnalysis',
  data () {
    return {
      busLine: '1路',
      checkData: {},
      chartData: {},
      isUpdate: false,
      nowTime: ''
    }
  },
  components: {
    headerNav,
    Chart
    // contentWrapper
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    configCheck (data) {
      this.$store.dispatch('getSectionData', data).then((res) => {
        this.chartData = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.section-table-analysis {
  width: 100%;
  .content {
    width: 100%;
    padding: 10px 50px;
    box-sizing: border-box;
    animation: trans 2s linear; /*linear匀速行驶*/
    animation-fill-mode: forwards; /*保持最后一帧状态*/
    .title {
      text-align: center;
      margin-bottom: -20px;
    }
  }
  @keyframes trans {
    0% {margin-left: -800px;}
    25% {margin-left: -600px;}
    50% {margin-left: -400px;}
    75% {margin-left: -200px;}
    100% {margin-left: 0px;}
  }
}
</style>
