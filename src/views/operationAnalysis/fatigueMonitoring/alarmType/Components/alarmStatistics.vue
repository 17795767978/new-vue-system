<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading" >
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" @getEchartsData="getEchartsData"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
// import { max } from '../../../../../utils/max.js'
import lineEcharts from '@/components/echarts/brokenLineDiagram'
import { mapGetters } from 'vuex'
export default {
  props: {
    searchData: {
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
      id: 'statistics',
      grid: {},
      loading: true
    }
  },
  computed: {
    ...mapGetters(['formData', 'userId'])
  },
  created () {
    let formData = this.formData
    this._getAlarmLevelRatioAnalysis({
      orgId: this.userId === '1' ? '' : this.userId,
      lineId: formData.lineId,
      startTime: formData.dateArray[0],
      endTime: formData.dateArray[0]
    })
  },
  mounted () {
    // console.log(this.$refs.wrapper.style)
  },
  watch: {
    searchData: {
      deep: true,
      handler (newV) {
        this._getAlarmLevelRatioAnalysis({
          orgId: newV.orgId === '1' ? '' : newV.orgId,
          lineId: newV.lineId,
          startTime: newV.dateArray[0],
          endTime: newV.dateArray[0]
        })
      }
    }
  },
  methods: {
    _getAlarmLevelRatioAnalysis (params) {
      this.loading = true
      this.$api['homeTired.getStatisticDatasByWarnType'](params).then(res => {
        console.log(res)
        let yData = res.map(item => item.warnLabel)
        let series = res.map(item => ({
          value: item.warnNumber,
          label: item.warnType
        }))
        this.loading = false
        this.title = {
          text: '各报警类型统计',
          left: 'center'
        }
        this.lineData = [{
          name: '各报警类型统计',
          type: 'bar',
          radius: ['100%', '60%'],
          data: series,
          barWidth: 25,
          itemStyle: {
            // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
            emphasis: {
              barBorderRadius: 30
            },

            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [0, 10, 10, 0],
              label: {
                show: true, // 是否展示
                textStyle: {
                  fontWeight: 'bolder',
                  fontSize: '12',
                  fontFamily: '微软雅黑'
                }
              },
              color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 1, [{
                offset: 0,
                color: '#fdc14d'
              }, {
                offset: 1,
                color: '#ed8237'
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
        // this.maxNum = max(res.datas[0])
        this.dataLength = 2
        this.legend = {
          data: ['客流人次'],
          top: 10,
          right: 10,
          textStyle: {
            color: '#000'
          }
        }
        this.yData = [
          {
            type: 'category',
            data: yData,
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
        this.xData = [
          {
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
    getEchartsData (data) {
      // console.log(data)
      this.$emit('echartsSelected', data)
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
