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
    <introduceWrapper :msg="msg"/>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from './Components/header'
import Chart from './Components/chart'
import introduceWrapper from '@/components/introduce/'
import mixinsTime from '@/mixins/global/'
// import contentWrapper from './Components/content';
// import moment from 'moment'
export default {
  name: 'sectionAnalysis',
  mixins: [mixinsTime],
  data () {
    return {
      busLine: '1路',
      checkData: {},
      chartData: {},
      isUpdate: false,
      nowTime: '',
      msg: {
        methods: '线路客流高峰断面分析将纵坐标将一天24小时以1小时为单位分为n个时间段，横坐标以线路上的站点为空间单位，通过散点图的圆的大小表示断面客流的人数多少，圆圈越大断面客流越多。',
        aim: '通过该分析直观掌握同一线路在不同时刻的最大最小断面，为线路配车，调度方案调整以及评价提供决策支持。'
      }
    }
  },
  components: {
    headerNav,
    Chart,
    introduceWrapper
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
