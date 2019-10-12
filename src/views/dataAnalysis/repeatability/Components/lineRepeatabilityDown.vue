<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" :angleAxis="angleAxis" :tooltip="tooltip"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import { max } from '../../../../utils/max.js'
import lineEcharts from '@/components/echarts/brokenLineDiagram'
const orgs = ['北京', '上海', '深圳', '广州', '苏州', '杭州', '南京']
const data = ['1%', '2%', '3%', '4%', '3%', '5%', '1%']
export default {
  name: 'passengerHome',
  data () {
    return {
      lineData: [],
      // width: 100,
      title: {},
      height: '',
      legend: {},
      xData: [],
      yData: [],
      maxNum: [],
      tooltip: {},
      id: 'lineRepeatabilityDown',
      grid: {},
      angleAxis: {},
      loading: true
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._getMonthData({
      orgId
    })
  },
  mounted () {
  },
  methods: {
    _getMonthData (params) {
      this.loading = true
      this.$api['passengerSimple.getMonthtrend'](params).then(res => {
        this.loading = false
        this.maxMum = max(data)
        this.title = {
          text: '公交公司下的线路重复度',
          left: 'center',
          top: 0,
          textStyle: {
            'color': '#000',
            'fontSize': '22'
          }
        }
        this.grid = {
          x: 50,
          y: 100,
          x2: 50,
          y2: 30,
          borderWidth: 1
        }
        this.angleAxis = {
          type: 'category',
          data: orgs
        }
        this.tooltip = {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (params) => {
            return `重复度：${params[0].data}%`
          }
        }
        this.lineData = [
          {
            type: 'bar',
            data: [1, 2, 3, 4, 3, 5, 1],
            coordinateSystem: 'polar',
            name: '线路',
            stack: 'a'
          }
        ]
        this.legend = [
          {
            data: ['线路'],
            right: 10,
            top: 10,
            textStyle: {
              color: '#000'
            }
          }
        ]
        this.xData = []
        this.yData = []
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
