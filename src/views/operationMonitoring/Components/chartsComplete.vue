<template>
  <div class="chart-complete-wrapper">
    <el-row style="height: 200px" :gutter="5">
      <el-col style="height: 100%;" :span="8">
        <div class="echarts-wrapper" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0)" id="echart-left" :style="{width: '95%', height: '200px',margin: '0 auto'}"></div>
        <noEcharts v-show="realTimeMileage.length === 0" :eChartsTitle="'-'"></noEcharts>
        <!-- <div v-show="realTimeMileage.length === 0" class="warning">
          <h2 style="text-align:center; color: #fff">暂无数据</h2>
        </div> -->
      </el-col>
      <el-col :span="8" style="border-left: 1px #fff solid;border-right: 1px #fff solid;height: 100%">
        <div class="echarts-wrapper" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0)" id="echart-middle" :style="{width: '95%', height: '200px', margin: '0 auto'}">
        </div>
        <!-- <div v-show="realTimeMileage.length === 0" class="warning">
          <h2 style="text-align:center; color: #fff">暂无数据</h2>
        </div> -->
        <noEcharts v-show="realTimeTrips.length === 0" :eChartsTitle="'-'"></noEcharts>
      </el-col>
      <el-col style="height: 100%" :span="8">
        <div class="echarts-wrapper" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0)" id="echart-right" :style="{width: '95%', height: '200px', margin: '0 auto'}"></div>
        <noEcharts v-show="realTimeShift.length === 0" :eChartsTitle="'-'"></noEcharts>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { max } from '../../../utils/max.js'
import noEcharts from './echartsComponent/noEcharts'
const TIME = 5 * 60 * 1000
export default {
  data () {
    return {
      loading: true,
      orgNameTrips: [],
      realTimeTrips: [],
      planTrips: [],
      realTimeTripsMax: '',
      orgNameShift: [],
      realTimeShift: [],
      planClasses: [],
      realTimeShiftMax: '',
      realTimeMileage: [],
      planMileage: [],
      orgNameMileage: [],
      realTimeMileageMax: '',
      timerLeft: null,
      timerMiddle: null,
      timerRight: null,
      maxLineNum: 0
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._realTimeMileage({
      orgId
    })
    this._realTimeTrips({
      orgId
    })
    this._realTimeShift({
      orgId
    })
    this.$store.dispatch('getLineList').then(res => {
      console.log(res.length)
    })
  },
  mounted () {
    // setTimeout(() => {
    // }, 1000);
  },
  activated () {
    this.drawLineLeft()
    this.drawLineMiddle()
    this.drawLineRight()
  },
  methods: {
    _realTimeMileage (params) {
      this.$api['dispatch.getRealtimeMileage'](params).then(res => {
        this.loading = false
        if (res && res.length > 0) {
          this.realTimeMileage = res.map(item => Number(item.realtimeMileage))
          this.planMileage = res.map(item => Number(item.planMileage))
          this.orgNameMileage = res.map(item => item.displyLabel)
          this.realTimeMileageMax = max([max(this.realTimeMileage), max(this.planMileage)])
        }
        this.timerLeft = setTimeout(() => {
          this._realTimeMileage(params)
        }, TIME)
        this.drawLineLeft()
      })
    },
    _realTimeTrips (params) {
      this.$api['dispatch.getRealtimeTrips'](params).then(res => {
        this.loading = false
        if (res && res.length > 0) {
          this.realTimeTrips = res.map(item => Number(item.realtimeTrips))
          this.planTrips = res.map(item => Number(item.planTrips))
          this.orgNameTrips = res.map(item => item.displyLabel)
          this.realTimeTripsMax = max([max(this.realTimeTrips), max(this.planTrips)])
        }
        this.timerMiddle = setTimeout(() => {
          this._realTimeTrips(params)
        }, TIME)
        this.drawLineMiddle()
      })
    },
    _realTimeShift (params) {
      this.$api['dispatch.getRealtimeClasses'](params).then(res => {
        this.loading = false
        if (res && res.length > 0) {
          this.realTimeShift = res.map(item => Number(item.realtimeClasses))
          this.planClasses = res.map(item => Number(item.planClasses))
          this.orgNameShift = res.map(item => item.displyLabel)
          this.realTimeShiftMax = max([max(this.realTimeShift), max(this.planClasses)])
        }
        this.timerRight = setTimeout(() => {
          this._realTimeShift(params)
        }, TIME)
        this.drawLineRight()
      })
    },
    drawLineLeft () {
      let leftChart = this.$echarts.init(document.getElementById('echart-left'))
      window.addEventListener('resize', () => { leftChart.resize() })
      leftChart.setOption({
        title: {
          text: '里程完成情况',
          left: 'center',
          textStyle: {
            'color': '#fff'
          }
        },
        color: ['#ff30a0', '#03abd0'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['计划里程', '实际里程'],
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
            barWidth: '15',
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
            barWidth: '15',
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
      })
    },
    drawLineMiddle () {
      let middleChart = this.$echarts.init(document.getElementById('echart-middle'))
      window.addEventListener('resize', () => { middleChart.resize() })
      middleChart.setOption({
        title: {
          text: '趟次完成情况',
          left: 'center',
          textStyle: {
            'color': '#fff'
          }
        },
        color: [ '#fedd00', '#8fc31f', '#03abd0' ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['计划趟次', '实际趟次'],
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
            // name: '当日计划总趟次',
            name: '计划趟次',
            type: 'bar',
            barGap: '-100%',
            barWidth: '15',
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
            barWidth: '15',
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
      })
    },
    drawLineRight () {
      let rightChart = this.$echarts.init(document.getElementById('echart-right'))
      window.addEventListener('resize', () => { rightChart.resize() })
      rightChart.setOption({
        title: {
          text: '班次完成情况',
          left: 'center',
          textStyle: {
            'color': '#fff'
          }
        },
        color: [ '#00ffff', '#8957a1', '#f39800' ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['计划班次', '实际班次'],
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
            data: this.orgNameShift,
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
          max: this.realTimeShiftMax,
          min: 0,
          interval: Math.floor(this.realTimeShiftMax / 2),
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
            name: '计划班次',
            type: 'bar',
            barGap: '-100%',
            barWidth: '15',
            data: this.planClasses,
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
            name: '实际班次',
            type: 'bar',
            barWidth: '15',
            data: this.realTimeShift,
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
      })
    }
  },
  watch: {
    realTimeMileageMax () {
      this.drawLineLeft()
      this.loading = false
    },
    realTimeTripsMax () {
      this.drawLineMiddle()
      this.loading = false
    },
    realTimeShiftMax () {
      this.drawLineRight()
      this.loading = false
    }
  },
  components: {
    noEcharts
  },
  destroyed () {
    clearTimeout(this.timerLeft)
    clearTimeout(this.timerMiddle)
    clearTimeout(this.timerRight)
    this.timerLeft = null
    this.timermiddle = null
    this.timerRight = null
  }
}
</script>

<style lang="scss" scoped>
.chart-complete-wrapper {
  width: 100%;
  padding: 10px 10px;
  box-sizing: border-box;
  background-color: rgba(0,0,0, 0.65);
  border-radius: 6px;
}
</style>
