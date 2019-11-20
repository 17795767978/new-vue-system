<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import { max } from '../../../../../utils/max.js'
import lineEcharts from '@/components/echarts/brokenLineDiagram'
import { mapGetters } from 'vuex'
export default {
  name: 'passengerHome',
  props: {
    searchData: {
      type: Object
    },
    driverData: {
      type: Object,
      default: () => {
        return {
          driverName: '',
          driverNum: ''
        }
      }
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
      maxNum: 0,
      id: 'driver',
      grid: {},
      loading: true,
      drivers: {
        drivername: '',
        drivernum: ''
      },
      currentData: {}
    }
  },
  computed: {
    ...mapGetters(['formData'])
  },
  created () {
    this.currentData = this.formData
    this._getDriverWarnTimeTrend({
      orgId: this.currentData.orgId === '1' ? '' : this.currentData.orgId,
      lineId: this.currentData.lineId,
      startTime: this.currentData.dateArray[0],
      endTime: this.currentData.dateArray[1],
      warnTypes: this.currentData.warningArr,
      driverName: '',
      driverNum: ''
    })
  },
  mounted () {
  },
  watch: {
    searchData: {
      deep: true,
      handler (newV) {
        this.currentData = newV
        this.drivers = {
          drivername: '',
          drivernum: ''
        }
        this._getDriverWarnTimeTrend({
          orgId: this.currentData.orgId === '1' ? '' : this.currentData.orgId,
          lineId: this.currentData.lineId,
          startTime: this.currentData.dateArray[0] === undefined ? '' : this.currentData.dateArray[0],
          endTime: this.currentData.dateArray[1] === undefined ? '' : this.currentData.dateArray[1],
          warnTypes: this.currentData.warnTypeId.length === 0 ? this.formData.warningArr : this.currentData.warnTypeId,
          driverName: this.drivers.driverName,
          driverNum: this.drivers.driverNum
        })
      }
    },
    driverData: {
      deep: true,
      handler (newV) {
        console.log(newV)
        this.drivers = newV
        this._getDriverWarnTimeTrend({
          orgId: this.currentData.orgId === '1' ? '' : this.currentData.orgId,
          lineId: this.currentData.lineId,
          startTime: this.currentData.dateArray[0] === undefined ? '' : this.currentData.dateArray[0],
          endTime: this.currentData.dateArray[1] === undefined ? '' : this.currentData.dateArray[1],
          warnTypes: this.currentData.warnTypeId.length === 0 ? this.formData.warningArr : this.currentData.warnTypeId,
          driverName: this.drivers.drivername,
          driverNum: this.drivers.drivernum
        })
      }
    }
  },
  methods: {
    _getDriverWarnTimeTrend (params) {
      this.loading = true
      this.$api['tiredMonitoring.getDriverWarnTimeTrend'](params).then(res => {
        setTimeout(() => {
          this.loading = false
        }, 100)
        this.title = {
          text: `${this.drivers.drivername}司机报警时间趋势图`,
          left: 'center',
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
        this.lineData = [{
          name: '报警次数',
          type: 'line',
          data: res.datas[0],
          smooth: true
        }]
        this.maxNum = max(res.datas[0])
        this.dataLength = 2
        this.legend = {
          data: ['报警次数'],
          right: 10,
          top: 10,
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
