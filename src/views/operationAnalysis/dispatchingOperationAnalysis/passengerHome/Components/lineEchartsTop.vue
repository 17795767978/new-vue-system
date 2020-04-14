<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading" >
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import { max } from '../../../../../utils/max.js'
import lineEcharts from '@/components/echarts/brokenLineDiagram'
export default {
  props: {
    sendLineIds: {
      type: Array
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
      id: 'line',
      grid: {},
      loading: true,
      skinType: null
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._getLines({
      orgId,
      lineUuids: []
    })
    this.$store.state.views.activeNight ? this.skinType = 1 : this.skinType = 0
  },
  mounted () {
  },
  watch: {
    sendLineIds (newV) {
      let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
      this._getLines({
        orgId,
        lineUuids: newV
      })
    },
    '$store.state.views.activeNight': {
      handler (newV) {
        let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
        this.skinType = +newV
        this._getLines({
          orgId,
          lineUuids: this.sendLineIds
        })
      }
    }
  },
  methods: {
    _getLines (params) {
      this.loading = true
      this.$api['passengerSimple.getHotlines'](params).then(res => {
        this.loading = false
        this.title = {}
        this.lineData = [{
          name: '上车客流',
          // type: 'line',
          data: res.datas[0],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(0, 0, 0, 0.8)'
          },
          barWidth: 13,
          itemStyle: {
            // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
            // emphasis: {
            //   barBorderRadius: 30
            // },

            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [0, 10, 10, 0],
              label: {
                show: true, // 是否展示
                textStyle: {
                  fontWeight: 'bolder',
                  fontSize: 9,
                  fontFamily: '微软雅黑',
                  color: '#093000'
                }
              },
              color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 1, [{
                offset: 0,
                color: '#F0DA1C'
              }, {
                offset: 1,
                color: '#F0DA1C'
              }])
            }
          }
        }]
        this.grid = {
          x: 50,
          y: 70,
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
            color: '#8995CB'
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
                color: (() => {
                  if (this.skinType === 1) {
                    return '#fff'
                  } else {
                    return '#000'
                  }
                })(),
                fontSize: '10',
                borderRadius: '6'
              }
            },
            splitLine: {
              show: false
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
            // show: false,
            splitLine: {
              show: false
            },
            axisLabel: {
              inside: false,
              interval: 0,
              textStyle: {
                color: (() => {
                  if (this.skinType === 1) {
                    return '#fff'
                  } else {
                    return '#000'
                  }
                })(),
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
