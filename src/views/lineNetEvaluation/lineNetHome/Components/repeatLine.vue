<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading" >
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
export default {
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
      id: 'repeatLine',
      grid: {},
      loading: true
    }
  },
  created () {
    this._getLineRepeatTOP10ListData()
  },
  mounted () {
    // console.log(this.$refs.wrapper.style)
  },
  methods: {
    _getLineRepeatTOP10ListData (params) {
      this.loading = true
      this.$api['lineNet.getLineRepeatTOP10ListData'](params).then(res => {
        let xAxisNames = res.map(item => item.lineNumber)
        let data = res.map(item => item.repeatability)
        this.loading = false
        this.title = {
          text: '线路重复度TOP10',
          left: 'center',
          top: 10,
          textStyle: {
            'color': '#000',
            'fontSize': '22'
          }
        }
        this.lineData = [{
          name: '线路重复度TOP10',
          type: 'bar',
          radius: ['100%', '60%'],
          data,
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
            data: xAxisNames,
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
