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
      realTimeMileageMax: ''
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
        if (res && res.length > 0) {
          this.realTimeMileage = res.map(item => parseInt(item.realtimeMileage))
          this.planMileage = res.map(item => parseInt(item.planMileage))
          this.orgNameMileage = res.map(item => item.orgName)
          this.realTimeMileageMax = max([max(this.realTimeMileage), max(this.planMileage)])
        }
        setTimeout(() => {
          this._realTimeMileage(params)
        }, TIME)
      })
    },
    _realTimeTrips (params) {
      this.$api['dispatch.getRealtimeTrips'](params).then(res => {
        if (res && res.length > 0) {
          this.realTimeTrips = res.map(item => parseInt(item.realtimeTrips))
          this.planTrips = res.map(item => parseInt(item.planTrips))
          this.orgNameTrips = res.map(item => item.orgName)
          this.realTimeTripsMax = max([max(this.realTimeTrips), max(this.planTrips)])
        }
        setTimeout(() => {
          this._realTimeTrips(params)
        }, TIME)
      })
    },
    _realTimeShift (params) {
      this.$api['dispatch.getRealtimeClasses'](params).then(res => {
        if (res && res.length > 0) {
          this.realTimeShift = res.map(item => parseInt(item.realtimeClasses))
          this.planClasses = res.map(item => parseInt(item.planClasses))
          this.orgNameShift = res.map(item => item.orgName)
          this.realTimeShiftMax = max([max(this.realTimeShift), max(this.planClasses)])
        }
        setTimeout(() => {
          this._realTimeShift(params)
        }, TIME)
      })
    },
    drawLineLeft () {
      let leftChart = this.$echarts.init(document.getElementById('echart-left'))
      window.addEventListener('resize', () => { leftChart.resize() })
      // let dataAxis = ['一公司', '二公司', '三公司', '四公司', '五公司', '六公司', '七公司'];
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
            barWidth: '20',
            barGap: '-100%',
            data: this.planMileage,
            itemStyle: {
              emphasis: {
                barBorderRadius: 20
              },
              normal: {
                barBorderRadius: 20
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
                barBorderRadius: 20
              },
              normal: {
                barBorderRadius: 20
              }
            }
          }
        // {
        //     name: '实际完成',
        //     type: 'bar',
        //     barWidth: '20',
        //     data: [1300, 1200, 1400, 2000, 3000, 2100, 1000],
        //     itemStyle: {
        //       emphasis: {
        //         barBorderRadius: 20
        //       },
        //       normal: {
        //         barBorderRadius: 20
        //       }
        //     }
        // }
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
            barWidth: '20',
            data: this.planTrips,
            itemStyle: {
              emphasis: {
                barBorderRadius: 20
              },
              normal: {
                barBorderRadius: 20
              }
            }
          },
          {
            // name: '当日计划总趟次',
            name: '实际趟次',
            type: 'bar',
            barGap: '-100%',
            barWidth: '20',
            data: this.realTimeTrips,
            itemStyle: {
              emphasis: {
                barBorderRadius: 20
              },
              normal: {
                barBorderRadius: 20
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
          text: '排班完成情况',
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
          data: ['计划排班', '实际排班'],
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
            name: '计划排班',
            type: 'bar',
            barGap: '-100%',
            barWidth: '20',
            data: this.planClasses,
            itemStyle: {
              emphasis: {
                barBorderRadius: 20
              },
              normal: {
                barBorderRadius: 20
              }
            }
          },
          {
            name: '实际排班',
            type: 'bar',
            barWidth: '20',
            data: this.realTimeShift,
            itemStyle: {
              emphasis: {
                barBorderRadius: 20
              },
              normal: {
                barBorderRadius: 20
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
