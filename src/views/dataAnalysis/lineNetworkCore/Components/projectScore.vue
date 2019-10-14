<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" :tooltip="tooltip" :radar="radar"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
export default {
  name: '',
  props: {
    echartsData: {
      type: Object
    }
  },
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
      id: 'projectScore',
      grid: {},
      loading: true,
      tooltip: {},
      radar: []
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
  watch: {
    echartsData: {
      deep: true,
      handler (newV) {
        console.log(newV.line)
      }
    }
  },
  methods: {
    _getMonthData (params) {
      this.loading = true
      this.$api['passengerSimple.getMonthtrend'](params).then(res => {
        this.loading = false
        this.title = {
          text: '项目得分情况',
          left: 'center',
          top: 20,
          textStyle: {
            'color': '#000',
            'fontSize': '22'
          }
        }
        this.grid = {
          x: 200,
          y: 50,
          x2: 10,
          y2: 30
        }
        this.tooltip = {
          trigger: 'axis'
        }
        this.radar = [
          {
            indicator: [
              { text: '站点建设合理性', max: 100 },
              { text: '舒适性', max: 100 },
              { text: '便捷性', max: 100 },
              { text: '快捷性', max: 100 },
              { text: '总得分', max: 100 }
            ],
            center: ['50%', '60%'],
            radius: 120
          }
        ]
        this.lineData = [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            itemStyle: { normal: { areaStyle: { type: 'default' } } },
            data: [
              {
                value: [60, 73, 85, 40, 70],
                name: '项目得分情况'
              }
            ]
          }
        ]
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
