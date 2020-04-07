<template>
  <div class="day-log">
    <Title :name="name" @getDetail="getDetail"/>
    <div class="echart" v-loading="loading">
      <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid"></lineEcharts>
    </div>
  </div>
</template>

<script>
import Title from './titleSearch'
import lineEcharts from '@/components/echarts/brokenLineDiagram'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  data () {
    return {
      name: '分公司用户操作频次统计',
      loading: true,
      lineData: [],
      // width: 100,
      title: {},
      height: '',
      legend: {},
      xData: [],
      yData: [],
      maxNum: 0,
      id: 'companyBar',
      grid: {}
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted () {
    const endTime = moment().format('YYYY-MM-DD')
    const startTime = moment(moment().valueOf() - 6 * 3600 * 24 * 1000).format('YYYY-MM-DD')
    this._getAccessLogStatisticAnalysis({
      orgId: this.userId === '1' ? '' : this.userId,
      startTime,
      endTime
    })
  },
  methods: {
    _getAccessLogStatisticAnalysis (params) {
      this.loading = true
      this.$api['wholeInformation.accessLogStatisticAnalysis'](params).then(res => {
        this.loading = false
        this.title = {}
        this.lineData = [{
          name: '操作次数',
          type: 'bar',
          data: res.datas[0],
          color: '#1985d8',
          barWidth: '20',
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
          }
        }]
        this.grid = {
          x: 50,
          y: 50,
          x2: 30,
          y2: 30,
          borderWidth: 1
        }
        this.dataLength = 2
        this.legend = {
          data: [''],
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
            // axisLabel: {
            //     formatter: '{value} ml'
            // },
            splitNumber: (() => {
              // return 10
              if (res.datas[0].length > 0) {
                let maxData = Math.max(res.datas[0])
                if (maxData >= 10) {
                  return ''
                } else if (maxData % 2 === 0) {
                  return maxData / 2
                } else {
                  return maxData
                }
              } else {
                return ''
              }
            })(),
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
    getDetail (time) {
      const startTime = moment(time[0]).format('YYYY-MM-DD')
      const endTime = moment(time[1]).format('YYYY-MM-DD')
      this._getAccessLogStatisticAnalysis({
        orgId: this.userId === '1' ? '' : this.userId,
        startTime,
        endTime
      })
    }
  },
  components: {
    Title,
    lineEcharts
  }
}
</script>

<style lang="scss" scoped>
.day-log {
  width: 100%;
  height: 100%;
  .echart {
    width: 95%;
    height: 80%;
    margin: 0 auto;
  }
}
</style>
