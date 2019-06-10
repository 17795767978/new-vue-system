<template>
  <div>
    <div id="echart-wrapper" ref="echartWrapper" :style="{width: '100%', height: '500px'}"></div>
    <div v-show="echartData.length === 0" class="anim" style="width: 100%; height: 300px; line-height:300px;text-align:center">
      暂无数据
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import { runtimeAnalysis } from 'server/interface'
import { max } from '../../../../../utils/max'
import moment from 'moment'
export default {
  props: {
    selectData: {
      type: Object
    },
    isUpdate: {
      type: Boolean
    }
  },
  data () {
    return {
      echartData: [],
      legendNames: [],
      xAxisNames: [],
      maxData: ''
    }
  },
  created () {
    this._runtimeAnalysis({
      lineId: '0103',
      type: '1',
      month: '2019-05'
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler () {
        if (this.selectData.value !== '' && this.selectData.turn !== '' && this.selectData.month !== '') {
          this._runtimeAnalysis({
            lineId: this.selectData.value,
            type: this.selectData.turn,
            month: moment(this.selectData.date).format('YYYY-MM')
          })
        }
      }
    },
    isUpdate () {
      if (this.isUpdate) {
        if (this.selectData.value !== '' && this.selectData.turn !== '' && this.selectData.month !== '') {
          this._runtimeAnalysis({
            lineId: this.selectData.value,
            type: this.selectData.turn,
            month: moment(this.selectData.date).format('YYYY-MM')
          })
        }
        this.$emit('isUpdateTo')
      }
    }
  },
  methods: {
    _runtimeAnalysis (params) {
      this.$api['schedulingAnalysis.getLineBetweenStationsRunningTimeChartDatas'](params).then(res => {
        this.echartData = res.datas
        this.legendNames = res.legendNames
        this.xAxisNames = res.xAxisNames
        if (this.echartData.length > 0) {
          let maxBefore = []
          this.echartData.forEach(item => {
            maxBefore.push(max(item))
          })
          this.maxData = max(maxBefore) * this.echartData.length / 3.5
          this.$refs.echartWrapper.style.display = 'block'
          this.dawnLine()
        } else {
          this.$message.warning('暂无数据')
          this.$refs.echartWrapper.style.display = 'none'
          this.maxData = ''
        }
      })
    },
    dawnLine () {
      let chart = this.$echarts.init(document.getElementById('echart-wrapper'))
      window.addEventListener('resize', () => { chart.resize() })
      let series = []
      this.echartData.forEach((item, index) => {
        series.push({
          name: this.legendNames[index],
          data: item,
          type: 'bar',
          stack: '总量',
          barWidth: '20',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          itemStyle: {
            normal: {
              label: {
                formatter: function (params) {
                  if (params.value) {
                    // 图表中的数据格式化
                    let num = params.value / 60
                    return `${num.toFixed(2)}`
                  } else {
                    return 0
                  }
                }
              }
            }
          }
        })
      })
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          extraCssText: 'width:350px; white-space:pre-wrap',
          formatter: function (params, ticket, callback) {
            let res = params[0].axisValue + '时' + '<br/>'
            let index = params[0].dataIndex
            let myseries = series
            console.log(params)
            for (var i = 0; i < params.length; i++) {
              for (var j = 0; j < myseries.length; j++) {
                if (params[i].seriesName === myseries[j].name) {
                  if (myseries[j].data[index] !== null) {
                    let num = myseries[j].data[index] / 60
                    num = num.toFixed(2)
                    res += `<span style="width: 10px; height: 10px; border-radius: 50%;display:inline-block; background: ${params[i].color}; margin:0 5px;"></span>` + params[i].seriesName + '：' + num + 'min' + ';'
                  } else {
                    res += `<span style="width: 10px; height: 10px; border-radius: 50%;display:inline-block; background: ${params[i].color};margin:0 5px;"></span>` + params[i].seriesName + '：' + '无数据' + ';'
                  }
                }
              }
            }
            return res
          }
        },
        legend: {
          data: this.legendNames
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          max: this.maxData,
          min: 0,
          interval: Math.floor(this.maxData / 20)
        },
        yAxis: {
          type: 'category',
          data: this.xAxisNames
        },
        series
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
