<template>
  <div>
    <div id="chart-wrapper"
      ref="chartWrapper"
      :style="{width: '100%', height: '700px'}"
      v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.5)"
    >
    </div>
    <div v-show="echartsData.length === 0" style="width: 100%; height: 300px; line-height:300px;text-align:center">
      暂无数据
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import { sectionAnalysis } from 'server/interface'
import moment from 'moment'
import { setTimeout } from 'timers'
import { max } from '../../../../../utils/max'
export default {
  name: 'sectionAnalysis',
  props: {
    checkData: {
      type: Object
    },
    isUpdate: {
      type: Boolean
    }
  },
  data () {
    return {
      loading: true,
      yAxisData: [],
      echartsData: [],
      valueNum: []
    }
  },
  created () {
    // this.echartsData = [];
    this.xAxisData = []
    this._sectionAnalysis({
      lineId: '0103',
      type: '1',
      month: ''
    })
  },
  mounted () {
  },
  watch: {
    checkData: {
      deep: true,
      handler (newData) {
        newData.date = moment(this.checkData.date).format('YYYY-MM')
        if (newData.value !== '') {
          this._sectionAnalysis({
            lineId: newData.value,
            type: newData.turn,
            month: newData.date
          })
        }
      }
    },
    isUpdate () {
      if (this.isUpdate) {
        this._sectionAnalysis({
          lineId: this.checkData.value,
          type: this.checkData.turn,
          month: moment(this.checkData.date).format('YYYY-MM')
        })
        this.$emit('isUpdateTo')
      }
    }
  },
  methods: {
    _sectionAnalysis (params) {
      this.$api['schedulingAnalysis.getAnalysisDatasByWarnLeave'](params).then(res => {
        // console.log(res);
        this.xAxisData = res.xAxisNames
        this.yAxisData = res.yAxisNames
        this.echartsData = res.datas
        if (this.echartsData.length > 0) {
          setTimeout(() => {
            this.valueNum = []
            this.drawLine()
            this.$message.success('数据已更新')
          }, 1000)
          this.loading = false
          this.$refs.chartWrapper.style.display = 'block'
        } else {
          this.$refs.chartWrapper.style.display = 'none'
          this.$message.warning('暂无数据')
        }
      })
    },
    drawLine () {
      let chartLine = this.$echarts.init(document.getElementById('chart-wrapper'))
      window.addEventListener('resize', () => chartLine.resize())
      let positions = this.xAxisData
      let times = this.yAxisData
      // let index = this.yAxisData.length;
      // (每个数组中的第一项是多少条数据的索引（相当于Y轴的数），第二项是每条数据对应的X轴的数，第三项数是数据多少也就是圆的大小)
      let data = this.echartsData
      data = data.map(function (item) {
        return [item[1], item[0], item[2]]
      })
      this.valueNum = max(data.map(item => item[2]))
      let options = {
        tooltip: {
          position: 'top',
          formatter: function (params) {
            return params.name + '---客流高峰值:' + params.value[2]
          }
        },
        grid: {
          left: 2,
          bottom: 10,
          right: 18,
          containLabel: true
        },
        // color: ['#61bff0', '#4ddefd', '#bcfbd3', '#fdf182', '#fdbca0', '#fd95b2', '#fcd6fd'],
        xAxis: {
          type: 'category',
          data: positions,
          boundaryGap: false,
          categoryAxis: {
            autoGridCount: false
          },
          axisLabel: {
            interval: 0,
            rotate: 40
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'dashed'
            }
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: times,
          axisLine: {
            show: false
          }
        },
        series: [{
          // name: 'Punch Card',
          type: 'scatter',
          // type: 'effectScatter',
          symbolSize: (val) => {
            if (this.valueNum < 50) {
              return val[2] * 0.5
            } else if (this.valueNum > 50 && this.valueNum < 100) {
              return val[2] * 0.4
            } else if (this.valueNum > 100 && this.valueNum < 150) {
              return val[2] * 0.3
            } else if (this.valueNum > 150 && this.valueNum < 200) {
              return val[2] * 0.2
            } else {
              return val[2] * 0.1
            }
          },
          data: data,
          animationDelay: function (idx) {
            return idx * 5
          },
          itemStyle: {
            normal: {
              color: function (val) {
                if (val.dataIndex % 2 === 0) {
                  return '#1985D8'
                } else if (val.dataIndex % 2 === 1) {
                  return '#1985D8'
                }
              }
            }
          }
        }]
      }
      chartLine.setOption(options)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
