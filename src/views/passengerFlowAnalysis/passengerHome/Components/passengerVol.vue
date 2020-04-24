<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" :tooltip="tooltip"></lineEcharts>
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
      maxNum: 0,
      id: 'vol',
      grid: {},
      loading: true,
      tooltip: {}
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._fullRateAnalysisUp({
      orgId
    })
  },
  mounted () {
  },
  methods: {
    _fullRateAnalysisUp (params) {
      this.loading = true
      this.$api['passengerSimple.getUpanddown'](params).then(res => {
        // let datas = []
        // if (res.datas[1].length > 0 && res.datas[0].length > 0) {
        //   datas = res.datas
        // } else {
        //   datas = [[], []]
        // }
        this.loading = false
        this.title = {
          text: '实时客流时间趋势分析',
          left: 10,
          top: 10,
          textStyle: {
            'color': '#000'
          }
        }
        this.grid = {
          x: 50,
          y: 50,
          x2: 30,
          y2: 30,
          borderWidth: 1
        }
        this.tooltip = {
          formatter: (params) => {
            return params.seriesName + ':' + params.value
          }
        }
        this.lineData = [{
          name: '实时',
          type: 'line',
          data: res.datas[0],
          smooth: true,
          itemStyle: {
            normal: {
              color: '#f00',
              lineStyle: {
                width: 2,
                color: '#f00'
              }
            }
          }
        }, {
          name: '昨日',
          type: 'line',
          data: res.datas[1],
          smooth: true,
          itemStyle: {
            normal: {
              color: '#00f',
              lineStyle: {
                width: 2,
                color: '#00f'
              }
            }
          }
        }]
        this.maxNum = max([max(res.datas[0]), max(res.datas[1])])
        this.dataLength = 2
        this.legend = {
          data: ['实时', '昨日'],
          top: 10,
          right: 10,
          textStyle: {
            color: '#000'
          }
        }
        this.xData = [
          {
            type: 'category',
            data: res.xAxisNames,
            axisPointer: {
              type: 'shadow'
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
            max: this.maxNum,
            interval: Math.ceil(this.maxNum / 6),
            // axisLabel: {
            //     formatter: '{value} ml'
            // },
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
