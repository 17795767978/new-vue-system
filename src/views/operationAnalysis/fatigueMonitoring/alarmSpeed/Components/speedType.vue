<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading" >
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" @getEchartsData="getEchartsData"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import Bus from './bus'
import { max } from '../../../../../utils/max.js'
import lineEcharts from '@/components/echarts/brokenLineDiagram'
import { mapGetters } from 'vuex'
export default {
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
      id: 'speedType',
      grid: {},
      loading: true,
      echartsData: '',
      selectData: {}
    }
  },
  computed: {
    ...mapGetters(['formData', 'userId'])
  },
  created () {
    this.selectData = this.formData
    this.selectData.orgId = this.userId
    this._getAlarmTypeRatioAnalysis({
      orgId: this.selectData.orgId === '1' ? '' : this.selectData.orgId,
      lineId: this.selectData.lineId,
      startTime: this.selectData.dateArray[0],
      endTime: this.selectData.dateArray[1],
      warnLevel: '',
      auditStatus: [],
      handleResults: []
    })
  },
  mounted () {
    // console.log(this.$refs.wrapper.style)
  },
  watch: {
    searchData: {
      deep: true,
      handler (newV) {
        console.log(12312312313)
        this.selectData = newV
        this.echartsData = ''
        this._getAlarmTypeRatioAnalysis({
          orgId: this.selectData.orgId === '1' ? '' : this.selectData.orgId,
          lineId: this.selectData.lineId,
          startTime: this.selectData.dateArray[0],
          endTime: this.selectData.dateArray[1],
          warnLevel: this.echartsData,
          auditStatus: this.selectData.auditStatus,
          handleResults: this.selectData.checkList
        })
      }
    },
    'selectEcharts.name': {
      handler (newV) {
        this.echartsData = newV
        this._getAlarmTypeRatioAnalysis({
          orgId: this.selectData.orgId === '1' ? '' : this.selectData.orgId,
          lineId: this.selectData.lineId,
          startTime: this.selectData.dateArray[0],
          endTime: this.selectData.dateArray[1],
          warnLevel: this.echartsData,
          auditStatus: this.selectData.auditStatus,
          handleResults: this.selectData.checkList
        })
      }
    }
  },
  // hahahaha
  methods: {
    _getAlarmTypeRatioAnalysis (params) {
      this.loading = true
      this.$api['tiredMonitoring.getAlarmTypeRatioAnalysis'](params).then(res => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
        this.title = {
          text: `报警速度${this.echartsData}报警类型`,
          left: 'center'
        }
        this.lineData = [{
          name: '报警次数',
          type: 'bar',
          radius: ['100%', '60%'],
          data: res.datas[0],
          barWidth: 20,
          itemStyle: {
            // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
            emphasis: {
              barBorderRadius: 30
            },

            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [10, 10, 10, 10],
              label: {
                show: true, // 是否展示
                textStyle: {
                  fontWeight: 'bolder',
                  fontSize: '12',
                  fontFamily: '微软雅黑'
                }
              },
              color: '#ed8237'
            }
          }
        }]
        this.grid = {
          x: 90,
          y: 50,
          x2: 30,
          y2: 30,
          borderWidth: 1
        }
        this.maxNum = max(res.datas[0])
        this.dataLength = 2
        this.legend = {
          data: ['报警次数'],
          top: 10,
          right: 10,
          textStyle: {
            color: '#000'
          }
        }
        this.yData = [
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
        this.xData = [
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
    },
    getEchartsData (data) {
      Bus.findWarnType(data.name)
      Bus.$emit('handlerChange')
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
