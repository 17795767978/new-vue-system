<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
import moment from 'moment'
import { mapGetters } from 'vuex'
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
      id: 'dataStationsFlow',
      grid: {},
      loading: true,
      lineName: '',
      lineType: ''
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
    let date = moment().valueOf()
    date = date - 24 * 60 * 60 * 1000
    date = moment(date).format('YYYY-MM-DD')
    this._getStationCharts({
      orgUuid: this.userId === '1' ? '' : this.userId,
      lineUuid: '',
      lineType: '1',
      date
    })
  },
  mounted () {
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.lineName = ''
        this.lineType = ''
        this._getStationCharts({
          orgUuid: newV.orgId,
          lineUuid: newV.lineId,
          lineName: '',
          lineType: newV.lineType,
          date: moment(newV.dataCurrent).format('YYYY-MM-DD')
        })
      }
    },
    echartsData (newV) {
      this.lineName = newV.lineName
      this.lineType = newV.lineType === '1' ? '上行' : '下行'
      // if () {}
      console.log(this.selectData.dataCurrent)
      if (Object.keys(this.selectData).length === 0) {
        let date = moment().valueOf()
        date = date - 24 * 60 * 60 * 1000
        date = moment(date).format('YYYY-MM-DD')
        this._getStationCharts({
          orgUuid: this.selectData.orgId,
          lineName: newV.lineName,
          lineType: newV.lineType,
          date: date
        })
      } else {
        this._getStationCharts({
          orgUuid: this.selectData.orgId,
          lineName: newV.lineName,
          lineType: newV.lineType,
          date: moment(this.selectData.dataCurrent).format('YYYY-MM-DD')
        })
      }
    }
  },
  methods: {
    _getStationCharts (params) {
      this.loading = true
      this.$api['lineNet.getMidLinePFGridData'](params).then(res => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
        this.title = {
          text: `${this.lineName}${this.lineType}各时间段客流详情`,
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
            name: '刷卡总量',
            type: 'line',
            data: res.datas,
            barWidth: 20
          }
        ]
        this.dataLength = 2
        this.legend = [
          {
            data: ['刷卡总量'],
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
