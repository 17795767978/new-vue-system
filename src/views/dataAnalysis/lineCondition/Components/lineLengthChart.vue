<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" @getEchartsData="getEchartsData"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import { max } from '../../../../utils/max.js'
import lineEcharts from '@/components/echarts/brokenLineDiagram'
export default {
  name: 'passengerHome',
  props: {
    selectData: {
      type: Object
    },
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
      id: 'lineLength',
      grid: {},
      loading: true
    }
  },
  created () {
    this._getMonthData({
      company: '一总站',
      lineID: ''
    }, '一总站')
  },
  mounted () {
  },
  watch: {
    'selectData.lineLineId': {
      handler (newV) {
        if (newV !== '') {
          let strArr = newV.split('+')
          this._getMonthData({
            company: '',
            lineID: strArr[0]
          }, strArr[1])
        }
      }
    },
    'echartsData.name': {
      handler (newV) {
        this._getMonthData({
          company: newV,
          lineID: ''
        }, newV)
      }
    }
  },
  methods: {
    getEchartsData (data) {
      this.$emit('changeStation', data)
    },
    _getMonthData (params, str) {
      this.loading = true
      this.$api['lineNet.getLineOnOrDownEchartData'](params).then(res => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
        this.title = {
          text: str === undefined ? '线路长度' : `${str}线路长度`,
          left: 'center',
          top: 0,
          textStyle: {
            'color': '#000',
            'fontSize': '22'
          }
        }
        this.grid = {
          x: 50,
          y: 50,
          x2: 10,
          y2: 30,
          borderWidth: 1
        }
        this.lineData = [
          {
            name: '上行线路长度',
            type: 'bar',
            data: res.datas[0],
            barWidth: 15,
            smooth: true
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
            name: '下行线路长度',
            type: 'bar',
            data: res.datas[1],
            barWidth: 15,
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
          }
        ]
        this.maxNum = [max(res.datas[0]), max(res.datas[0])]
        this.dataLength = 2
        this.legend = [
          {
            data: ['上行线路长度'],
            right: 150,
            top: 10,
            textStyle: {
              color: '#000'
            }
          },
          {
            data: ['下行线路长度'],
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
