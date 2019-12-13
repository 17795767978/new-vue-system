<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" :tooltip="tooltip" @getEchartsData="getEchartsData"></lineEcharts>
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
      id: 'lineRepeatability',
      grid: {},
      tooltip: {},
      loading: true
    }
  },
  created () {
    // let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._getlineRepeat({
      company: '',
      lineID: ''
    })
  },
  mounted () {
  },
  methods: {
    getEchartsData (data) {
      this.$emit('changeRightEcharts', data)
    },
    _getlineRepeat (params) {
      this.loading = true
      this.$api['lineNet.getRepeatData'](params).then(res => {
        this.loading = false
        this.title = {
          text: '分公司线路重复度',
          left: 'center',
          top: 10,
          textStyle: {
            'color': '#000',
            'fontSize': '22'
          }
        }
        this.grid = {
          x: 50,
          y: 50,
          x2: 50,
          y2: 30,
          borderWidth: 1
        }
        this.tooltip = {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (params) => {
            return `站对数: ${params[0].data}<br/>重复站位数：${params[1].data}<br/>重复比: ${(params[2].data * 100).toFixed(2)}%`
          }
        }
        this.lineData = [
          {
            name: '站对数',
            type: 'bar',
            barGap: '-100%',
            data: res.datas[0],
            barWidth: 25,
            color: '#fbb8a1',
            legendHoverLink: true,
            smooth: true,
            itemStyle: {
              borderColor: '#000'
            }
            // label: {
            //   normal: {
            //     show: true,
            //     position: 'center',
            //     color: 'black',
            //     rotate: '90',
            //     padding: [3, 0, 10, 6]
            //   }
            // }
          },
          {
            name: '重复站位数',
            type: 'bar',
            data: res.datas[1],
            barWidth: 25,
            color: '#d53a35',
            smooth: false
            // label: {
            //   normal: {
            //     show: true,
            //     position: 'center',
            //     color: 'black',
            //     rotate: '90',
            //     padding: [3, 0, 10, 6]
            //   }
            // }
          },
          {
            name: '重复比',
            type: 'line',
            yAxisIndex: 1,
            data: res.datas[2],
            barWidth: 15,
            smooth: false,
            label: {
              normal: {
                show: true,
                position: 'center',
                formatter: (params) => {
                  return `${(params.data * 100).toFixed(2)}%`
                },
                color: 'black',
                padding: [-10, 0, 0, 0]
              }
            }
          }
        ]
        this.maxNum = [max(res.datas[0]), max(res.datas[0])]
        this.dataLength = 2
        this.legend = [
          {
            data: ['站对数'],
            right: 200,
            top: 10,
            textStyle: {
              color: '#000'
            }
          },
          {
            data: ['重复站位数'],
            right: 85,
            top: 10,
            textStyle: {
              color: '#000'
            }
          },
          {
            data: ['重复比'],
            right: 0,
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
          },
          {
            splitLine: {
              show: false
            },
            axisLabel: {
              inside: false,
              interval: 0,
              formatter: (params) => {
                return `${params * 100}%`
              },
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
