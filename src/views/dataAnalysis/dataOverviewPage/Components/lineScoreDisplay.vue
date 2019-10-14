<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import { max } from '../../../../utils/max.js'
import lineEcharts from '@/components/echarts/brokenLineDiagram'
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
      id: 'lineScoreDisplay',
      grid: {},
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
        console.log(res)
        this.loading = false
        this.title = {
          text: '线路评分展示',
          left: 'center',
          top: 20,
          textStyle: {
            'color': '#000',
            'fontSize': '22'
          }
        }
        this.grid = {
          x: 50,
          y: 50,
          x2: 70,
          y2: 30,
          borderWidth: 1
        }
        this.lineData = [
          {
            name: '总得分',
            type: 'bar',
            data: res.datas[0],
            barWidth: 20,
            smooth: true
          },
          {
            name: '站点建设合理性',
            type: 'line',
            data: res.datas[0],
            smooth: false
          },
          {
            name: '舒适性',
            type: 'line',
            data: res.datas[0],
            smooth: false
          },
          {
            name: '便捷性',
            type: 'line',
            data: res.datas[0],
            smooth: false
          },
          {
            name: '快捷性',
            type: 'line',
            data: res.datas[0],
            smooth: false
          }
        ]
        this.maxNum = [max(res.datas[0]), max(res.datas[0])]
        this.dataLength = 2
        this.legend = [
          {
            data: ['总得分'],
            right: 450,
            top: 10,
            textStyle: {
              color: '#000'
            }
          },
          {
            data: ['站点建设合理性'],
            right: 300,
            top: 10,
            textStyle: {
              color: '#000'
            }
          },
          {
            data: ['舒适性'],
            right: 200,
            top: 10,
            textStyle: {
              color: '#000'
            }
          },
          {
            data: ['便捷性'],
            right: 100,
            top: 10,
            textStyle: {
              color: '#000'
            }
          },
          {
            data: ['快捷性'],
            right: 10,
            top: 10,
            textStyle: {
              color: '#000'
            }
          }
        ]
        this.xData = [
          {
            type: 'category',
            data: res.xAxisNames,
            axisPointer: {
              type: 'shadow'
            },
            splitLine: {
              show: true
            },
            axisLabel: {
              inside: false,
              // interval: 0,
              textStyle: {
                color: '#000',
                fontSize: '10',
                borderRadius: '6'
              }
            }
          }
        ]
        this.yData = [
          {
            min: 0,
            max: this.maxNum[0],
            interval: Math.ceil(this.maxNum[0] / 6),
            // axisLabel: {
            //     formatter: '{value} ml'
            // },
            splitLine: {
              show: false
            },
            axisLabel: {
              inside: false,
              interval: 0,
              textStyle: {
                color: '#000',
                fontSize: '10',
                borderRadius: '6'
              }
            }
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
