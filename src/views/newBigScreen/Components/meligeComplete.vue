<template>
    <div class="echarts-wrapper" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)" id="echart-left" :style="{width: '95%', height: '27vh',margin: '0 auto'}"></div>
</template>

<script>
import { max } from '../../../utils/max.js'
// import noEcharts from './echartsComponent/noEcharts'
const TIME = 3 * 60 * 1000
export default {
  data () {
    return {
      realTimeMileage: null,
      totalRealMileage: null,
      planMileage: null,
      totalPlanMileage: null,
      orgNameMileage: null,
      realTimeMileageMax: null,
      loading: false
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._realTimeMileage({
      orgId
    })
  },
  methods: {
    _realTimeMileage (params) {
      this.$api['dispatch.getRealtimeMileage'](params).then(res => {
        this.loading = false
        if (res && res.length > 0) {
          this.realTimeMileage = res.map(item => Number(item.realtimeMileage))
          this.totalRealMileage = this.realTimeMileage.reduce((a, b) => a + b).toFixed(2)
          this.planMileage = res.map(item => Number(item.planMileage))
          this.totalPlanMileage = this.planMileage.reduce((a, b) => a + b).toFixed(2)
          this.orgNameMileage = res.map(item => item.displyLabel)
          this.realTimeMileageMax = max([max(this.realTimeMileage), max(this.planMileage)])
        }
        this.timerLeft = setTimeout(() => {
          this._realTimeMileage(params)
        }, TIME)
        this.drawLineLeft()
      })
    },
    drawLineLeft () {
      let leftChart = this.$echarts.init(document.getElementById('echart-left'))
      window.addEventListener('resize', () => { leftChart.resize() })
      leftChart.setOption({
        title: {
          text: '',
          left: 'center',
          textStyle: {
            'color': '#fff'
          },
          subtext: `总计划里程：${this.totalPlanMileage ? this.totalPlanMileage : 0}   总实际里程：${this.totalRealMileage ? this.totalRealMileage : 0}   总百分比：${this.totalPlanMileage ? ((this.totalRealMileage / this.totalPlanMileage) * 100).toFixed(2) : '--'}%`,
          // subtext: `总里程：${this.totalRealMileage}km `,
          subtextStyle: {
            'color': '#fff',
            'fontSize': 12
          }
        },
        color: ['#03f6ff', '#1290ff'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['计划里程', '实际里程'],
          // data: ['实际里程'],
          bottom: 10,
          textStyle: {
            color: '#fff'
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            axisLine: {
              show: false
            },
            data: this.orgNameMileage,
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
        yAxis: {
          max: this.realTimeMileageMax,
          min: 0,
          interval: Math.floor(this.realTimeMileageMax / 2),
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
            textStyle: {
              color: '#fff'
            }
          }
        },
        series: [
          {
            name: '计划里程',
            type: 'bar',
            barWidth: '20',
            barGap: '-100%',
            data: this.planMileage,
            itemStyle: {
              emphasis: {
                barBorderRadius: 15
              },
              normal: {
                barBorderRadius: 15
              }
            }
          },
          {
            name: '实际里程',
            type: 'bar',
            barWidth: '20',
            barGap: '-100%',
            data: this.realTimeMileage,
            itemStyle: {
              emphasis: {
                barBorderRadius: 15
              },
              normal: {
                barBorderRadius: 15
              }
            }
          }
        ]
      }, true)
    }
  }
}
</script>

<style scoped lang="scss">
.echarts-wrapper {
  width: 100%;
  height: 100%;
}
</style>
