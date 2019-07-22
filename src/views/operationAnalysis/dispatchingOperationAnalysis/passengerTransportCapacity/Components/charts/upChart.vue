<template>
  <div ref="topWrapper">
    <div
      ref="upChartWrapper"
      id="up-chart-wrapper"
      :style="{width: '100%', height: '300px'}"
      v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.5)"
    >
    </div>
    <div
      v-cloak
      ref="animationDom"
      v-show="echartsData.length === 0"
      class="anim"
      style="width: 100%; height: 330px; line-height:300px;text-align:center">
      暂无数据
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import elementResizeDetector from 'element-resize-detector'
import { max } from '../../../../../../utils/max'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  props: {
    selectData: {
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
      echartsData: [],
      legendNames: [],
      echartsDataMax: ''
    }
  },
  computed: {
    ...mapGetters(['initLineId'])
  },
  created () {
    let date = new Date() - 3600 * 1000 * 24
    date = moment(date).format('YYYY-MM-DD')
    this._numberAnalysisUp({
      lineId: this.initLineId,
      dateTime: date,
      type: '1'
    })
  },
  mounted () {
    let listenResize = elementResizeDetector()
    listenResize.listenTo(this.$refs.topWrapper, (el) => {
      this.$echarts.init(document.getElementById('up-chart-wrapper')).resize()
    })
  },
  watch: {
    // selectData: {
    //   deep: true,
    //   handler () {
    //     if (this.selectData.value !== '' && this.selectData.date !== '') {
    //       this._numberAnalysisUp({
    //         lineId: this.selectData.value,
    //         dateTime: moment(this.selectData.date).format('YYYY-MM-DD'),
    //         type: '1'
    //       })
    //     }
    //   }
    // },
    isUpdateUp () {
      if (this.isUpdateUp) {
        if (this.selectData.value !== '' && this.selectData.date !== '') {
          this._numberAnalysisUp({
            lineId: this.selectData.value,
            dateTime: moment(this.selectData.date).format('YYYY-MM-DD'),
            type: '1'
          })
          this.$emit('isUpdateToUp', false)
        }
      }
    }
  },
  methods: {
    _numberAnalysisUp (params) {
      this.$api['schedulingAnalysis.getUpLineCapacityChartDatas'](params).then(res => {
        this.xAxisData = res.xAxisNames
        this.echartsData = res.datas
        this.legendNames = res.legendNames
        if (this.echartsData.length > 0) {
          this.echartsDataMax = max([max(this.echartsData[0]), max(this.echartsData[1]), max(this.echartsData[2])])
        }
        if (this.echartsData.length > 0) {
          this.$refs.upChartWrapper.style.display = 'block'
          setTimeout(() => {
            this.drawLine()
          }, 100)
          // this.drawLine()
          this.loading = false
          this.$message.success('数据已更新')
        } else {
          this.$message.warning('暂无数据')
          this.$refs.upChartWrapper.style.display = 'none'
          this.echartsDataMax = ''
        }
      })
    },
    drawLine () {
      let upChart = this.$echarts.init(document.getElementById('up-chart-wrapper'))
      window.addEventListener('resize', () => upChart.resize())
      upChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.legendNames
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        color: ['#1985d8', '#fdb628', '#67e0e3'],
        // 250,138,150
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        xAxis: {
          type: 'category',
          // axisLine: {
          //   show: false
          // },
          // axisTick: {
          //   show: false
          // },
          // splitLine: {
          //   show: false
          // },
          boundaryGap: false,
          data: this.xAxisData
        },
        yAxis: {
          type: 'value',
          max: this.echartsDataMax + 100,
          min: 0,
          splitLine: {
            show: false
          },
          interval: Math.ceil(this.echartsDataMax / 6)
        },
        series: [
          {
            name: '运力',
            type: 'line',
            data: this.echartsData[0],
            areaStyle: {
              normal: {
              // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(25,133,216,0.39)'
                }, {
                  offset: 0.34,
                  color: 'rgba(25,133,216,0.25)'
                }, {
                  offset: 1,
                  color: 'rgba(25,133,216,0.00)'
                }])
              }
            }
          },
          {
            name: '运量',
            type: 'line',
            data: this.echartsData[1],
            areaStyle: {
              normal: {
              // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(253,182,40,0.39)'
                }, {
                  offset: 0.34,
                  color: 'rgba(253,182,40,0.25)'
                }, {
                  offset: 1,
                  color: 'rgba(253,182,40,0.00)'
                }])
              }
            }
          },
          {
            name: '车内人数',
            type: 'line',
            data: this.echartsData[2],
            areaStyle: {
              normal: {
              // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(103,224,227,0.39)'
                }, {
                  offset: 0.34,
                  color: 'rgba(103,224,227,0.25)'
                }, {
                  offset: 1,
                  color: 'rgba(103,224,227,0.00)'
                }])
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
[v-cloak]
{
display: none;
}
.anim {
  animation: zy 2.5s .15s linear forwards;
}
@keyframes zy {
  0%   { transform: rotate(15deg);}
  25%  {transform: rotate(-10deg);}
  50%  { transform: rotate(5deg);}
  75%  {transform: rotate(-5deg);}
  100% { transform: rotate(0deg);}
}
</style>
