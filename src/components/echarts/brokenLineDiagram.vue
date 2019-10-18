<template>
  <div style="width: 100%; height: 100%" ref="topWrapper">
    <div ref="chart" :id="id" :style="{width: '100%', height: '100%', margin: '0 auto', boxSizing: 'border-box'}"
      >
    </div>
    <!-- <noEcharts v-else :eChartsTitle="'实时满载率'"></noEcharts> -->
  </div>
</template>

<script>
import elementResizeDetector from 'element-resize-detector'
export default {
  props: {
    id: {
      type: String
    },
    width: {
      type: Number
    },
    title: {
      type: Object
    },
    legend: {
      type: [Object, Array]
    },
    XData: {
      type: Array
    },
    YData: {
      type: Array
    },
    maxNum: {
      type: [Number, Array]
    },
    data: {
      type: Array
    },
    grid: {
      type: Object
    },
    angleAxis: {
      type: Object
    },
    tooltip: {
      type: Object
    },
    radar: {
      type: Array
    },
    bmap: {
      type: Object
    },
    polar: {
      type: Object
    }
  },
  data () {
    return {
      lengthData: 1,
      xData: [],
      yData: [],
      series: [],
      timer: null,
      titleNew: '',
      max: 0,
      legendData: [],
      angleAxisData: {},
      tooltipData: {},
      gridData: {},
      radarData: [],
      bmapData: {}
    }
  },
  components: {
  },
  created () {
  },
  mounted () {
    let listenResize = elementResizeDetector()
    listenResize.listenTo(this.$refs.topWrapper, (el) => {
      this.$echarts.init(document.getElementById(this.id)).resize()
    })
  },
  activated () {
    // this.drawLine()
  },
  // watch: {
  //   height (newV) {
  //     console.log(newV)
  //   }
  // },
  watch: {
    title: {
      deep: true,
      handler (newV) {
        this.titleNew = newV
      }
    },
    grid: {
      deep: true,
      handler (newV) {
        this.gridData = newV
      }
    },
    legend: {
      deep: true,
      handler (newV) {
        this.legendData = newV
      }
    },
    XData: {
      deep: true,
      handler (newV) {
        this.xData = newV
      }
    },
    YData: {
      deep: true,
      handler (newV) {
        this.yData = newV
      }
    },
    maxNum (newV) {
      this.max = newV
    },
    angleAxis: {
      deep: true,
      handler (newV) {
        this.angleAxisData = newV
      }
    },
    tooltip: {
      deep: true,
      handler (newV) {
        this.tooltipData = newV
      }
    },
    radar: {
      deep: true,
      handler (newV) {
        this.radarData = newV
      }
    },
    bmap: {
      deep: true,
      handler (newV) {
        this.bmapData = newV
      }
    },
    data: {
      deep: true,
      handler (newV) {
        // console.log(newV.x)
        this.series = newV
        setTimeout(() => {
          this.drawLine()
        }, 1000)
      }
    }
  },
  methods: {
    drawLine () {
      let charts = this.$echarts.init(document.getElementById(this.id))
      window.addEventListener('resize', () => { charts.resize() })
      if (this.series.length > 0) {
        charts.setOption({
          title: this.titleNew,
          tooltip: Object.keys(this.tooltipData).length > 0
            ? this.tooltipData : {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
          grid: this.gridData,
          // color: ['#0490b3', '#6e9724', '#b22679'],
          color: ['#fedd00', '#00ffff', '#03adb0', '#ff2bd0', '#ff840b', '#ff30a0'],
          angleAxis: Object.keys(this.angleAxisData).length > 0 ? this.angleAxisData : null,
          radiusAxis: Object.keys(this.angleAxisData).length > 0 ? {} : null,
          polar: this.polar,
          legend: this.legendData,
          xAxis: this.xData,
          yAxis: this.yData,
          radar: this.radar,
          bmap: this.bmap,
          series: this.series
        }, true)
      }
      charts.on('click', (param) => {
        console.log(param.data.label)
        this.$emit('getEchartsData', param)
      })
    }
  },
  destroyed () {
    clearTimeout(this.timer)
    this.timer = null
  }
}
</script>

<style lang="scss" scoped>
.per-chart {
  width: 100%;
  height: 100%;
}
</style>
