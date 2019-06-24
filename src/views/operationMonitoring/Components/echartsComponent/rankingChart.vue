<template>
  <div id="ranking-chart" :style="{width: '100%', height: '100%',padding: '10px', margin: '0 auto', boxSizing: 'border-box'}"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0)">
  </div>
</template>

<script>
const TIME = 5 * 60 * 1000
export default {
  data () {
    return {
      loading: true,
      lineName: [],
      fullLoadRate: []
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._lineRateTen({
      orgId
    })
  },
  mounted () {
  },
  activated () {
    this.drawLine()
  },
  methods: {
    _lineRateTen (params) {
      this.$api['passengerFlow.getRealTimeFullRateTop10'](params).then(res => {
        // let dataArr = res.data.data.sort((a, b) => {
        //   return b.fullLoadRate - a.fullLoadRate;
        // });
        this.lineName = res.map(item => item.lineName)
        this.fullLoadRate = res.map(item => item.fullLoadRate)
        setTimeout(() => {
          this._lineRateTen(params)
        }, TIME)
      })
    },
    drawLine () {
      let rankingLine = this.$echarts.init(document.getElementById('ranking-chart'))
      window.addEventListener('resize', () => { rankingLine.resize() })
      rankingLine.setOption({
        title: {
          text: '线路满载率排行TOP10',
          left: 'center',
          textStyle: {
            'color': '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [
          {
            type: 'value',
            min: 0,
            max: 100,
            interval: 10,
            axisPointer: {
              type: 'shadow'
            },
            offset: 30,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              inside: false,
              interval: 0,
              formatter: '{value}%',
              textStyle: {
                color: '#fff',
                fontSize: '10',
                borderRadius: '6'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: this.lineName,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              inside: false,
              interval: 0,
              textStyle: {
                color: '#fff',
                fontSize: '10',
                borderRadius: '6'
              }
            }
          }
        ],
        series: [
          {
            type: 'bar',
            name: '线路满载率',
            data: this.fullLoadRate,
            barWidth: 7,
            itemStyle: {
              emphasis: {
                barBorderRadius: 20
              },
              normal: {
                color: '#03abd0',
                barBorderRadius: 20
              }
            }
          }
        ]
      })
    }
  },
  watch: {
    fullLoadRate () {
      this.drawLine()
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.ranking-chart {
  width: 100%;
}
</style>
