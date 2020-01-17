<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :tooltip="tooltip" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
import moment from 'moment'
export default {
  name: 'passengerHome',
  props: {
    canDatas: {
      type: Array
    }
  },
  data () {
    return {
      echartDatas: [],
      lineData: [],
      // width: 100,
      title: {},
      height: '',
      legend: {},
      xData: [],
      yData: [],
      maxNum: [],
      id: 'can看线',
      grid: {},
      loading: false,
      defaultCom: '',
      tooltip: {}
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      this.loading = false
      this.echartDatas = this.canDatas
      let datas = this.echartDatas && this.echartDatas.length > 0 ? this.echartDatas.map(item => item.speed) : []
      let xDatas = this.echartDatas && this.echartDatas.length > 0 ? this.echartDatas.map(item => moment(item.sendtime).format('HH:mm:ss')) : []
      this._getMonthData(datas, xDatas)
    }, 1000)
  },
  watch: {
    canDatas: {
      deep: true,
      handler (newV) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.echartDatas = newV
          let datas = this.echartDatas.map(item => item.speed)
          let xDatas = this.echartDatas.map(item => moment(item.sendtime).format('HH:mm:ss'))
          this._getMonthData(datas, xDatas)
        }, 1000)
      }
    }
  },
  methods: {
    _getMonthData (datas, xDatas) {
      this.title = {
        text: 'CAN线速度（KM/H）',
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
      this.tooltip = {
        formatter: (params) => {
          return `CAN线速度：${params.data}km/h`
        }
      }
      this.lineData = [
        {
          name: 'CAN线速度',
          type: 'line',
          data: datas,
          itemStyle: { normal: { label: { show: true }, color: '#1682e8' } },
          lineStyle: {
            normal: {
              color: '#1682e8',
              width: 1.5
            }
          }
        }
      ]
      this.dataLength = 2
      this.legend = [
      ]
      this.xData = [
        {
          type: 'category',
          data: xDatas,
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
