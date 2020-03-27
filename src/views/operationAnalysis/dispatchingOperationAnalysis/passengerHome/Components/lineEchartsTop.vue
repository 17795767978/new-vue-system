<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading" >
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" @getEchartsData="getEchartsData"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import { max } from '../../../../../utils/max.js'
import lineEcharts from '@/components/echarts/brokenLineDiagram'
import moment from 'moment'
export default {
  props: {
    sendType: {
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
      id: 'lineHotDate',
      grid: {},
      loading: true
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._getLines({
      orgId,
      lineUuids: [],
      date: moment().format('YYYY-MM-DD')
    })
  },
  mounted () {
    // console.log(this.$refs.wrapper.style)
  },
  watch: {
    sendType: {
      handler (newV) {
        let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
        this._getLines({
          orgId,
          lineUuids: newV.lineIds,
          date: moment(newV.date).format('YYYY-MM-DD')
        })
      },
      deep: true
    }
  },
  methods: {
    _getLines (params) {
      this.loading = true
      this.$api['passengerSimple.getHotlines'](params).then(res => {
        this.loading = false
        this.title = {}
        this.lineData = [{
          name: '上车人数',
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
        this.maxNum = max(res.datas[0])
        this.dataLength = 2
        this.legend = {
          data: [''],
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
      })
    },
    getEchartsData (data) {
      this.$emit('getLineData', data.name)
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
