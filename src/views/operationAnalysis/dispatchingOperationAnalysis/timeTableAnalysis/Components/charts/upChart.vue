<template>
  <div>
    <div class="up-chart-wrapper"
      ref="upChartWrapper"
      id="up-chart-wrapper"
      :style="{width: '100%', height: '330px'}"
      element-loading-background="rgba(255, 255, 255, 0.5)"
    >
    </div>
    <div v-show="echartsData.length === 0" style="width: 100%; height: 300px; line-height:300px;text-align:center">
      暂无数据
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import elementResizeDetector from 'element-resize-detector'
import { max } from '../../../../../../utils/max'
import moment from 'moment'
export default {
  props: {
    headerParams: {
      type: Object
    },
    isUpdateUp: {
      type: Boolean
    }
  },
  data () {
    return {
      loading: true,
      xAxisData: [],
      yAxisData: [],
      echartsData: [],
      maxNum: ''
    }
  },
  created () {
    this._timeTableAnalysisUp({
      lineId: '',
      month: '',
      type: '1'
    })
  },
  mounted () {
    // let listenResize = elementResizeDetector()
    // listenResize.listenTo(this.$refs.upChartWrapper, (el) => {
    //   this.$echarts.init(document.getElementById('up-chart-wrapper')).resize()
    // })
  },
  watch: {
    // headerParams: {
    // handler () {
    //   let month = ''
    //   if (this.headerParams.date && this.headerParams.date === 'Invalid date') {
    //     month = ''
    //   } else if (this.headerParams.date && this.headerParams.date !== 'Invalid date') {
    //     month = moment(this.headerParams.date).format('YYYY-MM')
    //   }
    //   this._timeTableAnalysisUp({
    //     lineId: this.headerParams.value,
    //     // lineId: '0103',
    //     month,
    //     type: '1'
    //   })
    // }
    // },
    isUpdateUp () {
      if (this.isUpdateUp) {
        let month = ''
        if (this.headerParams.date && this.headerParams.date === 'Invalid date') {
          month = ''
        } else if (this.headerParams.date && this.headerParams.date !== 'Invalid date') {
          month = moment(this.headerParams.date).format('YYYY-MM')
        }
        this._timeTableAnalysisUp({
          lineId: this.headerParams.value,
          // lineId: '0103',
          month,
          type: '1'
        })
        this.$emit('isUpdateToUp', false)
      }
    }
  },
  methods: {
    _timeTableAnalysisUp (params) {
      this.$api['schedulingAnalysis.getUpRushHourLinePassengerChartDatas'](params).then(res => {
        this.xAxisData = res.xAxisNames
        this.yAxisData = res.yAxisNames
        this.echartsData = res.datas
        this.maxNum = max(this.echartsData.map(item => item[2]))
        if (this.echartsData.length > 0) {
          this.$message.success('数据已更新')
          this.drawLine()
          this.loading = false
          this.$refs.upChartWrapper.style.display = 'block'
        } else {
          this.$refs.upChartWrapper.style.display = 'none'
          this.$message.warning('暂无数据')
        }
      })
    },
    drawLine () {
      let upChart = this.$echarts.init(document.getElementById('up-chart-wrapper'))
      window.addEventListener('resize', () => { upChart.resize() })
      let data = this.echartsData.map(function (item) {
        return [item[1], item[0], item[2] || '-']
      })
      window.addEventListener('resize', () => { upChart.resize() })
      upChart.setOption({
        tooltip: {
          position: 'top'
        },
        animation: false,
        grid: {
          height: '50%',
          y: '10%'
        },
        xAxis: {
          type: 'category',
          data: this.xAxisData,
          splitArea: {
            show: true
          },
          splitLine: {
            show: false
          },
          axisTick: { // y轴刻度线
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: this.yAxisData,
          splitArea: {
            show: true
          },
          splitLine: {
            show: false
          },
          axisTick: { // y轴刻度线
            show: false
          },
          axisLine: {
            show: false
          }
        },
        visualMap: {
          min: 0,
          max: this.maxNum,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '5%'
          // inRange: {
          //   color: ['#8ccdff', '#004579']
          // }
        },
        series: [{
          name: '热力值',
          type: 'heatmap',
          data: data,
          label: {
            normal: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            normal: {
              label: {
                textStyle: {
                  fontSize: 9
                }
              }
            }
          }
        }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
