<template>
  <div class="echarts-wrapper" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0)" id="echart-middle" :style="{width: '95%', height: '27vh', margin: '0 auto'}">
        </div>
</template>

<script>
import { max } from '../../../utils/max.js'
// import noEcharts from './echartsComponent/noEcharts'
const TIME = 3 * 60 * 1000
export default {
  data () {
    return {
      loading: false,
      realTimeTrips: null,
      totalRealTrips: null,
      planTrips: null,
      totalPlanTrips: null,
      orgNameTrips: null,
      realTimeTripsMax: null
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._realTimeTrips({
      orgId
    })
  },
  methods: {
    _realTimeTrips (params) {
      this.$api['dispatch.getRealtimeTrips'](params).then(res => {
        this.loading = false
        if (res && res.length > 0) {
          this.realTimeTrips = res.map(item => Number(item.realtimeTrips))
          this.totalRealTrips = this.realTimeTrips.reduce((a, b) => a + b).toFixed(2)
          this.planTrips = res.map(item => Number(item.planTrips))
          this.totalPlanTrips = this.planTrips.reduce((a, b) => a + b).toFixed(2)
          this.orgNameTrips = res.map(item => item.displyLabel)
          this.realTimeTripsMax = max([max(this.realTimeTrips), max(this.planTrips)])
        }
        this.timerMiddle = setTimeout(() => {
          this._realTimeTrips(params)
        }, TIME)
        this.drawLineMiddle()
      })
    },
    drawLineMiddle () {
      let middleChart = this.$echarts.init(document.getElementById('echart-middle'))
      window.addEventListener('resize', () => { middleChart.resize() })
      middleChart.setOption({
        title: {
          text: '',
          left: 'center',
          textStyle: {
            'color': '#fff'
          },
          // subtext: `总趟次${this.totalRealTrips}次`,
          subtext: `总计划趟次：${this.totalPlanTrips ? this.totalPlanTrips : 0}   总实际趟次：${this.totalRealTrips ? this.totalRealTrips : 0}   总百分比：${this.totalPlanTrips ? ((this.totalRealTrips / this.totalPlanTrips) * 100).toFixed(2) : '--'}%`,
          subtextStyle: {
            'color': '#fff',
            'fontSize': 12
          }
        },
        color: [ '#0488fa', '#00ff72' ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['计划趟次', '实际趟次'],
          // data: ['实际趟次'],
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
            data: this.orgNameTrips,
            axisLabel: {
              inside: false,
              // interval: 0,
              // formatter: function(value) {
              //   return value.split('').join('\n');
              // },
              textStyle: {
                color: '#fff',
                fontSize: '10',
                borderRadius: '6'
              }
            }
          }
        ],
        yAxis: {
          max: this.realTimeTripsMax,
          min: 0,
          interval: Math.floor(this.realTimeTripsMax / 2),
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
          //   // name: '当日计划总趟次',
            name: '计划趟次',
            type: 'bar',
            barGap: '-100%',
            barWidth: '25',
            data: this.planTrips,
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
            // name: '当日计划总趟次',
            name: '实际趟次',
            type: 'bar',
            barGap: '-100%',
            barWidth: '25',
            data: this.realTimeTrips,
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

<style>

</style>
