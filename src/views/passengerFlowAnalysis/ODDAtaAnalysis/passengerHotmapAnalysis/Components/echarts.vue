<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="ids" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" :bgColor="bgColor"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
// import moment from 'moment'
export default {
  name: 'passengerHome',
  props: {
    datas: {
      type: Array
    },
    ids: {
      type: String
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
      id: 'kobe',
      grid: {},
      loading: true,
      lineName: '',
      lineType: '',
      bgColor: 'rgba(255,255,255,0.8)'
    }
  },
  created () {
  },
  mounted () {
  },
  watch: {
    datas (newV) {
      this._getStationCharts(newV)
    },
    ids (newV) {
      console.log(newV)
    }
  },
  methods: {
    async _getStationCharts (params) {
      let xDatas = []
      let datas = []
      if (this.ids === 'line') {
        xDatas = params.map(item => item.lineName)
        datas = params.map(item => item.upPayNumber)
      } else {
        xDatas = params.map(item => item.staName)
        datas = params.map(item => item.upPayNumber)
      }
      let result = await {
        xDatas,
        datas
      }
      setTimeout(() => {
        this.loading = false
      }, 1000)
      this.title = {
        text: this.ids === 'line' ? `线路登降量TOP10` : `站点登降量TOP10`,
        left: 'center',
        top: 10,
        textStyle: {
          'color': '#000',
          'fontSize': '16'
        }
      }
      this.grid = {
        x: 45,
        y: 10,
        x2: 5,
        y2: 25,
        borderWidth: 1
      }
      this.lineData = [
        {
          name: '刷卡人次(登量)',
          type: 'bar',
          data: result.datas,
          barWidth: 20,
          itemStyle: {
            normal: {
              color: this.ids === 'line' ? 'rgba(116,207,209, 0.7)' : 'rgba(140, 192, 229, 0.7)'
            }
          }
        }
      ]
      this.dataLength = 2
      this.legend = [
        {
          data: ['刷卡人次(登量)'],
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
          data: result.xDatas,
          axisPointer: {
            type: 'shadow'
          },
          splitLine: {
            show: false
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
