<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import { max } from '../../../../../utils/max.js'
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
      maxNum: 0,
      id: 'month',
      grid: {},
      loading: true,
      skinType: null
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._getMonthData({
      orgId
    })
    this.$store.state.views.activeNight ? this.skinType = 1 : this.skinType = 0
  },
  mounted () {
  },
  watch: {
    '$store.state.views.activeNight': {
      handler (newV) {
        let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
        this.skinType = +newV
        this._getMonthData({
          orgId
        })
      }
    }
  },
  methods: {
    _getMonthData (params) {
      this.loading = true
      this.$api['passengerSimple.getMonthtrend'](params).then(res => {
        this.loading = false
        // this.title = {
        //   text: '客流月趋势图',
        //   left: 10,
        //   top: 10,
        //   textStyle: {
        //     'color': '#000'
        //   }
        // }
        this.grid = {
          x: 50,
          y: 50,
          x2: 30,
          y2: 30,
          borderWidth: 1
        }
        this.lineData = [{
          name: '日客流人次',
          type: 'line',
          smooth: true,
          data: res.datas[0],
          itemStyle: {
            normal: {
              color: '#FAA61B',
              lineStyle: {
                width: 4,
                color: '#FAA61B'
              }
            }
          }
        }]
        this.maxNum = max(res.datas[0])
        this.dataLength = 2
        this.legend = {
          data: ['日客流人次'],
          right: 10,
          top: 10,
          textStyle: {
            color: (() => {
              if (this.skinType === 1) {
                return '#fff'
              } else {
                return '#000'
              }
            })()
          }
        }
        this.xData = [
          {
            type: 'category',
            data: res.xAxisNames,
            axisPointer: {
              type: 'shadow'
            },
            splitLine: {
              show: false
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
