<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading" >
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
export default {
  data () {
    return {
      lineData: [],
      // width: 100,
      title: {},
      height: '',
      legend: {},
      xData: [],
      yData: [],
      maxNum: 0,
      id: 'speedStatistics',
      grid: {},
      loading: true
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._getDriver({
      orgId
    })
  },
  mounted () {
    // console.log(this.$refs.wrapper.style)
  },
  methods: {
    _getDriver (params) {
      this.loading = true
      this.$api['homeTired.getStatisticDatasByWarnType'](params).then(res => {
        console.log(res)
        this.loading = false
        let data = []
        let dataArrValue = res.map(item => item.warnLabel)
        let dataArrNumber = res.map(item => item.warnNumber)
        for (let i = 0; i < dataArrValue.length; i++) {
          data[i] = {
            name: dataArrValue[i],
            value: dataArrNumber[i]
          }
        }
        this.title = {
          text: '各报警速度占比统计',
          left: 'center'
        }
        this.lineData = [{
          name: '各报警速度占比统计',
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '50%'],
          label: {
            formatter: '{b}: {@2012} ({d}%)'
          },
          // roseType: 'area',
          data
        }]
        this.grid = {
        }
      })
    }
  },
  components: {
    lineEcharts
  }
}
</script>

<style lang="scss" scoped>
.passenger-vol {
  width:100%;
  box-sizing: border-box;
  height: 100%;
}
</style>
