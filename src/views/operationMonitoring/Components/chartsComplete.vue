<template>
  <div class="chart-complete-wrapper" :class="skinType === 0 ? 'cardBg-white' : ''">
    <div class="corner-1" v-show="skinType === 1">
      <img src="../../../assets/images/newScreen/card-tl.png"/>
    </div>
    <div class="corner-2" v-show="skinType === 1">
      <img src="../../../assets/images/newScreen/card-tr.png"/>
    </div>
    <div class="corner-3" v-show="skinType === 1">
      <img src="../../../assets/images/newScreen/card-bl.png"/>
    </div>
    <div class="corner-4" v-show="skinType === 1">
      <img src="../../../assets/images/newScreen/card-br.png"/>
    </div>
    <el-row style="height: 170px" :gutter="5">
      <el-col style="height: 100%; position: relative;display:flex;flex-direction: row;" :span="12">
        <div class="el-row-left-con">
          <ul>
            <li class="el-row-li-item el-row-li-item-title" :class="skinType === 0 ? 'el-row-li-white' : ''"><span></span>里程完成情况</li>
            <li class="el-row-li-item" :class="skinType === 0 ? 'el-row-li-white' : ''"><span>计划公里数：</span><span>{{totalPlanMileage}}km</span></li>
            <li class="el-row-li-item" :class="skinType === 0 ? 'el-row-li-white' : ''"><span>实际完成公里数：</span><span>{{totalRealMileage}}km</span></li>
            <li class="el-row-li-item" :class="skinType === 0 ? 'el-row-li-white' : ''"><span>完成率：</span><span>{{totalPlanMileage > 0 ? (totalRealMileage / totalPlanMileage * 100).toFixed(2) : '--' || '--'}}%</span></li>
          </ul>
        </div>
        <div class="echarts-wrapper" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0)" id="echart-left" :style="{width: '60%', height: '200px',margin: '0 auto'}"></div>
        <!-- <noEcharts v-show="realTimeMileage.length === 0" :eChartsTitle="'-'"></noEcharts> -->
      </el-col>
      <el-col :span="12" style="border-left: 1px #987DC0 solid;height: 100%; position: relative;display:flex;flex-direction: row;">
        <div class="el-row-left-con" style="margin-left: 10px">
          <ul>
            <li class="el-row-li-item el-row-li-item-title" :class="skinType === 0 ? 'el-row-li-white' : ''"><span></span>趟次完成情况</li>
            <li class="el-row-li-item" :class="skinType === 0 ? 'el-row-li-white' : ''"><span>计划完成趟次：</span><span>{{totalPlanTrips}}次</span></li>
            <li class="el-row-li-item" :class="skinType === 0 ? 'el-row-li-white' : ''"><span>实际完成趟次：</span><span>{{totalRealTrips}}次</span></li>
            <li class="el-row-li-item" :class="skinType === 0 ? 'el-row-li-white' : ''"><span>完成率：</span><span>{{ totalPlanTrips > 0 ?  (totalRealTrips / totalPlanTrips * 100).toFixed(2) : '--' || '--'}}%</span></li>
          </ul>
        </div>
        <div class="echarts-wrapper" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0)" id="echart-middle" :style="{width: '60%', height: '200px', margin: '0 auto'}">
        </div>
        <!-- <div v-show="realTimeMileage.length === 0" class="warning">
          <h2 style="text-align:center; color: #fff">暂无数据</h2>
        </div> -->
        <!-- <noEcharts v-show="realTimeTrips.length === 0" :eChartsTitle="'-'"></noEcharts> -->
      </el-col>
      <!-- <el-col style="height: 100%" :span="8">
        <div class="echarts-wrapper" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0)" id="echart-right" :style="{width: '95%', height: '200px', margin: '0 auto'}"></div>
        <noEcharts v-show="realTimeShift.length === 0" :eChartsTitle="'-'"></noEcharts>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import { max } from '../../../utils/max.js'
// import noEcharts from './echartsComponent/noEcharts'
const TIME = 30 * 1000
export default {
  data () {
    return {
      skinType: 0, // 皮肤 0 白色 1 黑色
      loading: true,
      orgNameTrips: [],
      realTimeTrips: [],
      planTrips: [],
      totalRealTrips: 0,
      totalPlanTrips: 0,
      realTimeTripsMax: '',
      orgNameShift: [],
      realTimeShift: [],
      planClasses: [],
      totalRealShift: 0,
      totalPlanShift: 0,
      realTimeShiftMax: '',
      realTimeMileage: [],
      planMileage: [],
      orgNameMileage: [],
      realTimeMileageMax: '',
      totalRealMileage: 0,
      totalPlanMileage: 0,
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
    // this._realTimeShift({
    //   orgId
    // })
    this.$store.dispatch('getLineList').then(res => {
    })
  },
  mounted () {
    // setTimeout(() => {
    // }, 1000);
    this.$store.state.views.activeNight ? this.skinType = 1 : this.skinType = 0
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
    // _realTimeShift (params) {
    //   this.$api['dispatch.getRealtimeClasses'](params).then(res => {
    //     this.loading = false
    //     if (res && res.length > 0) {
    //       this.realTimeShift = res.map(item => Number(item.realtimeClasses))
    //       // totalRealShift: 0,
    //       // totalPlanShift: 0,
    //       this.totalRealShift = this.realTimeShift.reduce((a, b) => a + b)
    //       this.planClasses = res.map(item => Number(item.planClasses))
    //       this.totalPlanShift = this.planClasses.reduce((a, b) => a + b)
    //       this.orgNameShift = res.map(item => item.displyLabel)
    //       this.realTimeShiftMax = max([max(this.realTimeShift), max(this.planClasses)])
    //     }
    //     this.timerRight = setTimeout(() => {
    //       this._realTimeShift(params)
    //     }, TIME)
    //     this.drawLineRight()
    //   })
    // },
    drawLineLeft () {
      let leftChart = this.$echarts.init(document.getElementById('echart-left'))
      window.addEventListener('resize', () => { leftChart.resize() })
      leftChart.setOption({
        // title: {
        //   text: '里程完成情况',
        //   left: 'center',
        //   textStyle: {
        //     'color': this.skinType === 0 ? '#000000' : '#ffffff',
        //     'fontSize': 14
        //   },
        //   // subtext: `总计划里程：${this.totalPlanTrips}   总实际里程：${this.totalRealTrips}   总百分比：${(this.totalRealTrips / this.totalPlanTrips).toFixed(2) * 100}%`
        //   subtext: `${this.totalRealMileage}km / ${this.totalPlanMileage}km  完成率：${this.totalPlanMileage > 0 ? (this.totalRealMileage / this.totalPlanMileage * 100).toFixed(2) : '-'}%`,
        //   subtextStyle: {
        //     'color': this.skinType === 0 ? '#000000' : '#ffffff',
        //     'fontSize': 13
        //   }
        // },
        color: ['#17D5FF', '#FBCF00'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['计划里程', '实际里程'],
          top: 0,
          right: 10,
          textStyle: {
            color: this.skinType === 0 ? '#000000' : '#8995CB'
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
                color: this.skinType === 0 ? '#000000' : '#8995CB',
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
              color: this.skinType === 0 ? '#000000' : '#8995CB'
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
      }, true)
    },
    drawLineMiddle () {
      let middleChart = this.$echarts.init(document.getElementById('echart-middle'))
      window.addEventListener('resize', () => { middleChart.resize() })
      middleChart.setOption({
        // title: {
        //   text: '趟次完成情况',
        //   left: 'center',
        //   textStyle: {
        //     'color': this.skinType === 0 ? '#000000' : '#ffffff',
        //     'fontSize': 14
        //   },
        //   subtext: `${this.totalRealTrips}次 / ${this.totalPlanTrips}次  完成率：${this.totalPlanTrips > 0 ? (this.totalRealTrips / this.totalPlanTrips * 100).toFixed(2) : '-'}%`,
        //   subtextStyle: {
        //     'color': this.skinType === 0 ? '#000000' : '#ffffff',
        //     'fontSize': 13
        //   }
        // },
        color: [ '#ff2bd0', '#fedd00' ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['计划趟次', '实际趟次'],
          top: 0,
          right: 10,
          textStyle: {
            color: this.skinType === 0 ? '#000000' : '#8995CB'
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
                color: this.skinType === 0 ? '#000000' : '#8995CB',
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
              color: this.skinType === 0 ? '#000000' : '#8995CB'
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
      }, true)
    },
    drawLineRight () {
      let rightChart = this.$echarts.init(document.getElementById('echart-right'))
      window.addEventListener('resize', () => { rightChart.resize() })
      rightChart.setOption({
        title: {
          text: '班次完成情况',
          left: 'center',
          textStyle: {
            'color': this.skinType === 0 ? '#000000' : '#ffffff',
            'fontSize': 14
          },
          subtext: `${this.totalRealShift}次 / ${this.totalPlanShift}次  完成率：${this.totalPlanShift > 0 ? (this.totalRealShift / this.totalPlanShift * 100).toFixed(2) : '-'}%`,
          subtextStyle: {
            'color': this.skinType === 0 ? '#000000' : '#ffffff',
            'fontSize': 13
          }
        },
        color: [ '#ff840b', '#00ffff', '#f39800' ],
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
            color: this.skinType === 0 ? '#000000' : '#8995CB'
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
                color: this.skinType === 0 ? '#000000' : '#8995CB',
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
              color: this.skinType === 0 ? '#000000' : '#8995CB'
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
      }, true)
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
    // noEcharts
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
.el-row-left-con {
  min-width: 200px;
}
.el-row-li-white.el-row-li-item-title {
  color: #000!important;
}
.el-row-li-white {
  color: #000!important;
}
.el-row-li-item.el-row-li-item-title {
  color: #ffffff;
  font-size: 14px;
  margin-left: 0;
}
.el-row-li-item.el-row-li-item-title span {
  display: inline-block;
  width: 4px;
  height: 11px;
  background-color: #EC6F00;
  margin-right: 6px;
}
.el-row-li-item {
  color: #ffffff;
  line-height: 30px;
  margin-left: 10px;
}
.el-row-li-white span:nth-child(2) {
  color: #F17700!important;
  font-size: 16px;
}
.el-row-li-item span:nth-child(2) {
  color: #FFFC1E;
  font-size: 16px;
}
.el-row-li-item:nth-child(4) span:nth-child(2) {
  color: #7FFF0D!important;
}
.corner-1 {
  position: absolute;
  top: 0;
  left: 0px;
}
.corner-2 {
  position: absolute;
  top: 0;
  right: 0px;
}
.corner-3 {
  position: absolute;
  bottom: 0;
  left: 0;
}
.corner-4 {
  position: absolute;
  bottom: 0;
  right: 0;
}
.cardBg-white {
  background-color: #FFFFFF!important;
  color: #000000!important;
  box-shadow:0px 0px 15px 0px rgba(4,56,161,0.2);
}
.chart-complete-wrapper {
  width: 100%;
  padding: 10px 10px;
  box-sizing: border-box;
  background-color: rgba(42,47,85,0.5);
  border-radius: 6px;
  position: relative;
}
</style>
