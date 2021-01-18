<template>
  <div ref="topWrapper">
    <div class="down-chart-wrapper"
      ref="downChartWrapper"
      id="down-chart-wrapper"
      :style="{width: '100%', height: '320px'}"
      element-loading-background="rgba(255, 255, 255, 0.5)"
    >
    </div>
    <div v-show="echartsData.length === 0" style="width: 100%; height: 300px; line-height:300px;text-align:center">
      暂无数据
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import elementResizeDetector from 'element-resize-detector'
import { max } from '../../../../../../utils/max'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  props: {
    headerParams: {
      type: Object
    },
    isUpdateDown: {
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
  computed: {
    ...mapGetters(['initLineId'])
  },
  created () {
    let date = new Date() - 3600 * 24 * 30 * 1000
    date = moment(date).format('YYYY-MM')
    this._timeTableAnalysisDown({
      lineId: this.initLineId,
      month: date,
      type: '2'
    })
  },
  mounted () {
    let listenResize = elementResizeDetector()
    listenResize.listenTo(this.$refs.topWrapper, (el) => {
      this.$echarts.init(document.getElementById('down-chart-wrapper')).resize()
    })
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
    //   this._timeTableAnalysisDown({
    //     lineId: this.headerParams.value,
    //     // lineId: '0103',
    //     month,
    //     type: '2'
    //   })
    // }
    // },
    isUpdateDown () {
      if (this.isUpdateDown) {
        let month = ''
        if (this.headerParams.date && this.headerParams.date === 'Invalid date') {
          month = ''
        } else if (this.headerParams.date && this.headerParams.date !== 'Invalid date') {
          month = moment(this.headerParams.date).format('YYYY-MM')
        }
        this._timeTableAnalysisDown({
          lineId: this.headerParams.value,
          // lineId: '0103',
          month,
          type: '2'
        })
        this.$emit('isUpdateToDown', false)
      }
    }
  },
  methods: {
    _timeTableAnalysisDown (params) {
      this.$api['schedulingAnalysis.getDownRushHourLinePassengerChartDatas'](params).then(res => {
        this.xAxisData = res.xAxisNames
        this.yAxisData = res.yAxisNames
        this.echartsData = res.datas
        this.maxNum = max(this.echartsData.map(item => item[2]))
        if (this.echartsData.length > 0) {
          this.$refs.downChartWrapper.style.display = 'block'
          setTimeout(() => {
            this.drawLine()
          }, 100)
          this.loading = false
        } else {
          this.$refs.downChartWrapper.style.display = 'none'
          this.$message.warning('暂无数据')
        }
      })
    },
    drawLine () {
      let downChart = this.$echarts.init(document.getElementById('down-chart-wrapper'))
      window.addEventListener('resize', () => { downChart.resize() })
      let data = this.echartsData.map(function (item) {
        return [item[1], item[0], item[2] || '-']
      })
      window.addEventListener('resize', () => { downChart.resize() })
      downChart.setOption({
        tooltip: {
          position: 'top'
        },
        animation: false,
        grid: {
          height: '65%',
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
      }, true)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
