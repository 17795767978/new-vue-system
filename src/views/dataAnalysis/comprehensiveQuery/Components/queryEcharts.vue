<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
// import { max } from '../../../../utils/max.js'
import { mapGetters } from 'vuex'
import lineEcharts from '@/components/echarts/brokenLineDiagram'
const GRID = {
  x: 50,
  y: 50,
  x2: 10,
  y2: 30,
  borderWidth: 1
}
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
      id: 'lineLength',
      grid: {},
      loading: true
    }
  },
  computed: {
    ...mapGetters(['renderId'])
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._getStationData({
      orgId
    })
  },
  mounted () {
    console.log(this.renderId)
  },
  watch: {
    'renderId': {
      handler (newV) {
        let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
        if (newV === '1') {
          this._getStationData({
            orgId
          })
        } else if (newV === '2') {
          this._getTimeData({
            orgId
          })
        } else if (newV === '3') {
          this._getRateData({
            orgId
          })
        }
      }
    }
  },
  methods: {
    _getStationData (params) {
      this.loading = true
      this.$api['passengerSimple.getMonthtrend'](params).then(res => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
        this.title = {
          text: '线路站点登降量',
          left: 'center',
          top: 0,
          textStyle: {
            'color': '#000',
            'fontSize': '22'
          }
        }
        this.grid = GRID
        this.lineData = [
          {
            name: '登量（人次）',
            type: 'bar',
            data: [100, 200, 210, 90, 100, 200, 300, 300, 240, 210, 140, 150, 190, 30, 10],
            barWidth: 15,
            smooth: true
          },
          {
            name: '降量（人次）',
            type: 'bar',
            data: [-100, -200, -210, -90, -100, -200, -300, -300, -240, -210, -140, -150, -190, -30, -10],
            barWidth: 15,
            smooth: false
          }
        ]
        // this.maxNum = []
        this.dataLength = 2
        this.legend = [
          {
            data: ['登量（人次）'],
            right: 150,
            top: 10,
            textStyle: {
              color: '#000'
            }
          },
          {
            data: ['降量（人次）'],
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
            data: ['站点1', '站点2', '站点3', '站点4', '站点11', '站点21', '站点31', '站点41', '站点21', '站点32', '站点43', '站点54', '站点61', '站点72', '站点83'],
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
    },
    _getTimeData (params) {
      this.loading = true
      this.$api['passengerSimple.getMonthtrend'](params).then(res => {
        console.log(res)
        setTimeout(() => {
          this.loading = false
        }, 1000)
        this.title = {
          text: '线路时段登降量',
          left: 'center',
          top: 0,
          textStyle: {
            'color': '#000',
            'fontSize': '22'
          }
        }
        this.grid = GRID
        this.lineData = [
          {
            name: '登量',
            type: 'bar',
            data: [100, 200, 300, 400, 240, 333, 331, 125, 312, 132, 156, 123, 90, 100, 30, 50, 300, 100, 123, 100, 200, 300, 400, 240],
            barWidth: 15,
            smooth: true
          },
          {
            name: '降量',
            type: 'bar',
            data: [100, 200, 300, 400, 240, 333, 331, 125, 312, 132, 156, 123, 90, 100, 30, 50, 300, 100, 123, 100, 200, 300, 400, 240],
            barWidth: 15,
            smooth: false
          }
        ]
        // this.maxNum = [max(res.datas[0]), max(res.datas[0])]
        this.dataLength = 2
        this.legend = [
          {
            data: ['登量'],
            right: 100,
            top: 10,
            textStyle: {
              color: '#000'
            }
          },
          {
            data: ['降量'],
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
            data: ['6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'],
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
    },
    _getRateData (params) {
      this.loading = true
      this.$api['passengerSimple.getMonthtrend'](params).then(res => {
        // console.log(res)
        setTimeout(() => {
          this.loading = false
        }, 1000)
        this.title = {
          text: '线路时段满载率',
          left: 'center',
          top: 0,
          textStyle: {
            'color': '#000',
            'fontSize': '22'
          }
        }
        this.grid = GRID
        this.lineData = [
          {
            name: '满载率',
            type: 'line',
            data: [0.05, 0.1, 0.15, 0.35, 0.33, 0.35, 0.45, 0.76, 0.70, 0.71, 0.435, 0.50, 0.41, 0.41, 0.36, 0.5, 0.3, 0.26, 0.22, 0.16, 0.13, 0.11, 0.1, 0.05],
            barWidth: 15,
            smooth: true,
            areaStyle: {}
          }
        ]
        // this.maxNum = [max(res.datas[0]), max(res.datas[0])]
        this.dataLength = 2
        this.legend = [
          {
            data: ['满载率'],
            right: 15,
            top: 10,
            textStyle: {
              color: '#000'
            }
          }
        ]
        this.xData = [
          {
            type: 'category',
            data: ['6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'],
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
