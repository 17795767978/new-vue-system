<template>
  <div>
    <div id="per-chart" :style="{width: '100%', height: '220px',padding: '10px', margin: '0 auto', boxSizing: 'border-box'}"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0)"
      >
    </div>
    <!-- <noEcharts v-else :eChartsTitle="'实时满载率'"></noEcharts> -->
  </div>
</template>

<script>
import { max } from '../../../../utils/max.js'
const TIME = 3 * 60 * 1000
export default {
  data () {
    return {
      loading: true,
      busLoadNumber: 0,
      fullLoadRate: '',
      personCount: 0,
      timeInterval: '',
      busLoadNumberMax: 0,
      fullLoadRateMax: '',
      timer: null
    }
  },
  components: {
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._realTimeFullRate({
      orgId
    })
  },
  mounted () {
  },
  activated () {
    this.drawLine()
  },
  methods: {
    _realTimeFullRate (params) {
      this.$api['passengerFlow.getRealTimeFullLoadRate'](params).then(res => {
        this.loading = false
        this.busLoadNumber = res.map(item => +item.busLoadNumber)
        this.fullLoadRate = res.map(item => +item.fullLoadRate)
        this.personCount = res.map(item => +item.personCount)
        this.timeInterval = res.map(item => item.timeInterval)
        this.busLoadNumberMax = max(this.busLoadNumber)
        this.fullLoadRateMax = max(this.fullLoadRate)
        this.drawLine()
        this.timer = setTimeout(() => {
          this._realTimeFullRate(params)
        }, TIME)
      })
    },
    drawLine () {
      let fullLoadRate = this.$echarts.init(document.getElementById('per-chart'))
      window.addEventListener('resize', () => { fullLoadRate.resize() })
      fullLoadRate.setOption({
        title: {
          text: '实时满载率',
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
        color: ['#0490b3', '#6e9724', '#b22679'],
        legend: {
          data: ['通过量', '定员数', '满载率'],
          bottom: 10,
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.timeInterval,
            axisPointer: {
              type: 'shadow'
            },
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
              // interval: 0,
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
            type: 'value',
            min: 0,
            max: this.busLoadNumberMax,
            interval: Math.ceil(this.busLoadNumberMax / 2),
            // axisLabel: {
            //     formatter: '{value} ml'
            // },
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
          },
          {
            type: 'value',
            min: 0,
            max: this.fullLoadRateMax + 2,
            interval: Math.floor(this.fullLoadRateMax / 2),
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: '{value}%',
              color: '#fff',
              fontSize: '10',
              borderRadius: '6'
            }
          }
        ],
        series: [
          {
            name: '定员数',
            type: 'bar',
            barWidth: '5  ',
            barGap: '-100%',
            itemStyle: {
              emphasis: {
                barBorderRadius: 5
              },
              normal: {
                barBorderRadius: 5
              }
            },
            data: this.busLoadNumber
          },
          {
            name: '通过量',
            type: 'bar',
            barWidth: '5',
            data: this.personCount
          },
          {
            name: '满载率',
            type: 'line',
            yAxisIndex: 1,
            data: this.fullLoadRate
          }
        ]
      }, true)
    }
  },
  watch: {
    busLoadNumberMax () {
    }
  },
  destroyed () {
    clearTimeout(this.timer)
    this.timer = null
  }
}
</script>

<style lang="scss" scoped>
.per-chart {
  width: 100%;
}
</style>
