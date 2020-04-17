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
    selectEcharts: {
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
      maxNum: 0,
      id: 'trend',
      grid: {},
      loading: true,
      echartsData: '',
      selectData: {},
      alarmName: ''
    }
  },
  computed: {
    ...mapGetters(['formData', 'userId'])
  },
  created () {
    this.selectData = this.formData
    this.selectData.orgId = this.userId
    this._getFatigueDrivingWarnTimeTrendAnalysis({
      orgId: this.userId === '1' ? '' : this.userId,
      lineId: this.selectData.lineId,
      startTime: this.selectData.dateArray[0],
      endTime: this.selectData.dateArray[1],
      warnTypes: [],
      auditStatus: [],
      handleResults: []
    })
  },
  mounted () {
    console.log(this.$refs.wrapper.style)
  },
  watch: {
    searchData: {
      deep: true,
      handler (newV) {
        this.selectData = newV
        this.echartsData = ''
        this.alarmName = ''
        this._getFatigueDrivingWarnTimeTrendAnalysis({
          orgId: this.selectData.orgId === '1' ? '' : this.selectData.orgId,
          lineId: this.selectData.lineId,
          startTime: this.selectData.dateArray[0],
          endTime: this.selectData.dateArray[1],
          warnTypes: this.selectData.warnTypeId,
          auditStatus: this.selectData.auditStatus,
          handleResults: this.selectData.checkList
        })
      }
    },
    'selectEcharts.data.label': {
      handler (newV) {
        this.echartsData = newV
        this.alarmName = this.selectEcharts.name
        this._getFatigueDrivingWarnTimeTrendAnalysis({
          orgId: this.selectData.orgId === '1' ? '' : this.selectData.orgId,
          lineId: this.selectData.lineId,
          startTime: this.selectData.dateArray[0],
          endTime: this.selectData.dateArray[1],
          warnTypes: this.echartsData === '' ? [] : [this.echartsData],
          auditStatus: this.selectData.auditStatus,
          handleResults: this.selectData.checkList
        })
      }
    }
  },
  methods: {
    _getFatigueDrivingWarnTimeTrendAnalysis (params) {
      this.loading = true
      this.$api['tiredMonitoring.getFatigueDrivingWarnTimeTrendAnalysis'](params).then(res => {
        console.log(res)
        this.loading = false
        this.title = {
          text: `${this.alarmName}报警时间趋势分析`,
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
          areaStyle: {
            normal: {
              // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(25,133,216,0.39)'
              }, {
                offset: 0.34,
                color: 'rgba(25,133,216,0.25)'
              }, {
                offset: 1,
                color: 'rgba(25,133,216,0.00)'
              }])
            }
          },
          smooth: false
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
      }).catch(err => {
        this.loading = false
        this.$message.error(err.message)
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
