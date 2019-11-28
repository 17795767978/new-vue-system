<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
import moment from 'moment'
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
      id: 'dataLineTop10',
      grid: {},
      loading: true,
      lineName: '',
      lineType: ''
    }
  },
  created () {
    // let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    let date = moment().subtract(30, 'days').format('YYYY-MM')
    this._getStationCharts({
      orgUuid: '',
      lineUuid: '',
      lineType: '1',
      date
    })
  },
  mounted () {
  },
  watch: {
    echartsData (newV) {
      this._getStationCharts(newV)
    }
  },
  methods: {
    _getStationCharts (params) {
      setTimeout(() => {
        this.loading = false
      }, 1000)
      this.title = {
        text: `线路登降量TOP10`,
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
        x2: 70,
        y2: 30,
        borderWidth: 1
      }
      this.lineData = [
        {
          name: '刷卡人次(登量)',
          type: 'bar',
          data: 111111111111111,
          barWidth: 20
        }
      ]
      this.dataLength = 2
      this.legend = [
        {
          data: ['刷卡人次(登量)'],
          right: 100,
          top: 10,
          textStyle: {
            color: '#000'
          }
        }
      ]
      this.xData = [
        {
          type: 'category',
          data: 111111111111111111111,
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
