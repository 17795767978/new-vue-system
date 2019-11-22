<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
export default {
  name: 'passengerHome',
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
      id: 'lineScoreDisplay',
      grid: {},
      loading: true
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._getDeaLineScoreGrid({
      orgId
    })
  },
  mounted () {
  },
  methods: {
    _getDeaLineScoreGrid (params) {
      this.loading = true
      this.$api['lineNet.getDeaLineScoreGrid'](params).then(res => {
        this.loading = false
        this.title = {
          text: '线路评分展示',
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
            name: res.legendNames[0],
            type: 'bar',
            data: res.datas[0],
            barWidth: 20,
            smooth: true
          },
          {
            name: res.legendNames[1],
            type: 'line',
            data: res.datas[1],
            smooth: false
          },
          {
            name: res.legendNames[2],
            type: 'line',
            data: res.datas[2],
            smooth: false
          },
          {
            name: res.legendNames[3],
            type: 'line',
            data: res.datas[3],
            smooth: false
          },
          {
            name: res.legendNames[4],
            type: 'line',
            data: res.datas[4],
            smooth: false
          }
        ]
        this.dataLength = 2
        this.legend = {
          data: res.legendNames,
          left: 'left',
          top: 10,
          textStyle: {
            color: '#000'
          },
          selected: (() => {
            let selected = {}
            res.legendNames.forEach((item, index) => {
              if (index === 0) {
                selected[item] = true
              } else {
                selected[item] = false
              }
            })
            return selected
          })()
        }
        // [
        //   {
        //     data: [res.legendNames[0]],
        //     right: 450,
        //     top: 10,
        //     textStyle: {
        //       color: '#000'
        //     }
        //   },
        //   {
        //     data: [res.legendNames[1]],
        //     right: 300,
        //     top: 10,
        //     textStyle: {
        //       color: '#000'
        //     }
        //   },
        //   {
        //     data: [res.legendNames[2]],
        //     right: 200,
        //     top: 10,
        //     textStyle: {
        //       color: '#000'
        //     }
        //   },
        //   {
        //     data: [res.legendNames[3]],
        //     right: 100,
        //     top: 10,
        //     textStyle: {
        //       color: '#000'
        //     }
        //   },
        //   {
        //     data: [res.legendNames[4]],
        //     right: 10,
        //     top: 10,
        //     textStyle: {
        //       color: '#000'
        //     }
        //   }
        // ]
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
