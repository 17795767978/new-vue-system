<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
// import { max } from '../../../../utils/max.js'
import moment from 'moment'
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
  props: {
    selectData: {
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
  computed: {
    ...mapGetters(['renderId'])
  },
  created () {
  },
  mounted () {
    setTimeout(() => {
      let arr = this.$store.getters.defaultSearch
      const time = new Date() - 24 * 3600 * 2000
      if (arr.lineId !== '' && arr.lineType !== '' && arr.dataCurrent !== '') {
        this._getPfBaseUpDownGrid({
          orgUuid: arr.orgId,
          lineUuid: arr.lineId,
          lineType: arr.lineType,
          date: moment(time).format('YYYY-MM-DD')
        })
      } else {
        this.$message.error('请添加完整的查询条件')
      }
    }, 1000)
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        if (newV.lineId !== '' && newV.lineType !== '' && newV.dataCurrent !== '') {
          this._getPfBaseUpDownGrid({
            orgUuid: newV.orgId,
            lineUuid: newV.lineId,
            lineType: newV.lineType,
            date: moment(newV.dataCurrent).format('YYYY-MM-DD')
          })
        }
      }
    },
    'renderId': {
      handler (newV) {
        let data = {}
        if (Object.keys(this.selectData).length > 0) {
          // console.log(this.selectData.lineLineId)
          // lineArr = this.selectData.lineLineId.split('+')
          data = this.selectData
        } else {
          // lineArr = this.$store.getters.defaultSearch.lineLineId.split('+')
          data = this.$store.getters.defaultSearch
        }
        if (newV === '1') {
          this._getPfBaseUpDownGrid({
            orgUuid: data.orgId,
            lineUuid: data.lineId,
            lineType: data.lineType,
            date: moment(data.dataCurrent).format('YYYY-MM-DD')
          })
        } else if (newV === '2') {
          this._getTimeData({
            orgUuid: data.orgId,
            lineUuid: data.lineId,
            lineType: data.lineType,
            date: moment(data.dataCurrent).format('YYYY-MM-DD')
          })
        } else if (newV === '3') {
          this._getRateData({
            orgUuid: data.orgId,
            lineUuid: data.lineId,
            lineType: data.lineType,
            date: moment(data.dataCurrent).format('YYYY-MM-DD')
          })
        }
      }
    }
  },
  methods: {
    _getPfBaseUpDownGrid (params) {
      this.loading = true
      this.$api['lineNet.getPfStationDayListGridData'](params).then(res => {
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
            data: res.datas[0],
            barWidth: 15,
            smooth: true
          },
          {
            name: '降量（人次）',
            type: 'bar',
            data: res.datas[1],
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
    },
    _getTimeData (params) {
      this.loading = true
      this.$api['lineNet.getPfBaseUpDownGrid'](params).then(res => {
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
            name: '登量（人次）',
            type: 'bar',
            data: res.datas[0],
            barWidth: 15,
            smooth: true
          },
          {
            name: '降量（人次）',
            type: 'bar',
            data: res.datas[1],
            barWidth: 15,
            smooth: false
          }
        ]
        // this.maxNum = [max(res.datas[0]), max(res.datas[0])]
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
    },
    _getRateData (params) {
      this.loading = true
      this.$api['lineNet.getPfBaseApprovalGrid'](params).then(res => {
        console.log(res)
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
            data: res.datas[0],
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
