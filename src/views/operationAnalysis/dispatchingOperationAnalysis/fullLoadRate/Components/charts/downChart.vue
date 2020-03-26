<template>
  <div ref="topWrapper">
    <div
      v-cloak
      ref="downChartWrapper"
      id="down-chart-wrapper"
      :style="{width: '100%', height: '330px'}"
      v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.5)"
      v-show="xAxisData.length > 0"
    >
    </div>
    <div v-cloak v-show="xAxisData.length === 0" class="anim" style="width: 100%; height: 330px; line-height:300px;text-align:center">
      暂无数据
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import { fullRateAnalysisDown } from 'server/interface'
// import elementResizeDetector from 'element-resize-detector'
import moment from 'moment'
import { max } from '../../../../../../utils/max'
import { mapGetters } from 'vuex'
export default {
  props: {
    checkData: {
      type: Object
    },
    tabTypeData: {
      type: Array
    },
    isUpdateDown: {
      type: Boolean
    }
  },
  data () {
    return {
      loading: true,
      dataSource: [],
      upPersonNum: [],
      downPersonNum: [],
      passengerFlow: [],
      fullRate: [],
      xAxisData: [],
      tabType: '',
      maxNum: '',
      maxRate: '',
      defaultData: ['登量', '降量', '断面客流', '满载率']
    }
  },
  computed: {
    ...mapGetters(['initLineId'])
  },
  created () {
    let dataNow = new Date()
    let dataBefore = moment(new Date(dataNow.getTime() - 24 * 60 * 60 * 1000)).format('YYYY-MM-DD')
    window.addEventListener('resize', () => {
      this.$refs.downChartWrapper.style.width = window.innerWidth - 220 + 'px'
    })
    this._fullRateAnalysisDown({
      lineUuid: this.initLineId,
      lineType: '2',
      date: dataBefore,
      payTimeIntervalMin: '07',
      payTimeIntervalMax: '08'
    })
  },
  mounted () {
    this.$refs.downChartWrapper.style.width = window.innerWidth - 220 + 'px'
  },
  watch: {
    tabTypeData (newVal) {
      this.defaultData = newVal
      this.seeType()
    },
    isUpdateDown () {
      if (this.isUpdateDown) {
        if (this.checkData.value.length !== 0 && this.checkData.date.length !== 0 && this.checkData.startTime.length !== 0 && this.checkData.endTime.length !== 0) {
          this._fullRateAnalysisDown({
            lineUuid: this.checkData.value,
            lineType: '1',
            date: moment(this.checkData.date).format('YYYY-MM-DD'),
            payTimeIntervalMin: this.checkData.startTime.substring(0, 2),
            payTimeIntervalMax: this.checkData.endTimeFormatter
            // lineId: this.checkData.value,
            // type: '2',
            // dateTime: moment(this.checkData.date).format('YYYY-MM-DD'),
            // startHour: this.checkData.startTime.substring(0, 2),
            // endHour: this.checkData.endTimeFormatter
          })
        }
        this.$emit('isUpdateToDown', false)
      }
    }
  },
  methods: {
    _fullRateAnalysisDown (params) {
      this.$api['schedulingAnalysis.getDownLineStationChartDatas'](params).then(res => {
        this.dataSource = res.datas
        this.xAxisData = res.stations.map(item => item.staName)
        this.seeType()
        this.loading = false
        if (this.xAxisData.length > 0) {
          this.$refs.downChartWrapper.style.display = 'block'
          this.drawLine()
        } else {
          this.$message.warning('暂无数据')
          this.$refs.downChartWrapper.style.display = 'none'
        }
      })
    },
    seeType () {
      if (this.defaultData.length === 0) {
        this.tabType = []
        this.upPersonNum = []
        this.downPersonNum = []
        this.passengerFlow = []
        this.fullRate = []
      } else {
        this.tabType = []
        let isTypeUp = this.defaultData.some(item => item === '登量')
        let isTypeDown = this.defaultData.some(item => item === '降量')
        let isPassFlow = this.defaultData.some(item => item === '断面客流')
        let isFullRate = this.defaultData.some(item => item === '满载率')
        if (isTypeUp) {
          this.upPersonNum = this.dataSource[0]
          this.tabType.push('登量（人次）')
        } else {
          this.upPersonNum = []
        }
        if (isTypeDown) {
          this.downPersonNum = this.dataSource[1]
          this.tabType.push('降量（人次）')
        } else {
          this.downPersonNum = []
        }
        if (isPassFlow) {
          this.passengerFlow = this.dataSource[2]
          this.tabType.push('断面客流')
        } else {
          this.passengerFlow = []
        }
        if (isFullRate) {
          if (this.dataSource[3] && this.dataSource[3].length > 0) {
            this.fullRate = this.dataSource[3].map(item => Number(item * 100).toFixed(2))
          } else {
            this.fullRate = this.dataSource[3]
          }
          this.tabType.push('满载率')
        } else {
          this.fullRate = []
        }
      }
      if (this.dataSource.length > 0) {
        this.maxNum = max([max(this.upPersonNum), max(this.downPersonNum), max(this.passengerFlow)])
        this.maxRate = max(this.fullRate)
      }
      setTimeout(() => {
        this.drawLine()
      }, 100)
    },
    drawLine () {
      // this.$refs.downChartWrapper.style.width = window.innerWidth - 220 + 'px'
      let downChart = this.$echarts.init(document.getElementById('down-chart-wrapper'))
      let timeInterval = this.xAxisData
      window.addEventListener('resize', () => { downChart.resize() })
      downChart.setOption({
        // title: {
        //   text: '实时满载率',
        //   left: 'center',
        //   textStyle: {
        //     'color': '#000'
        //   }
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
          // formatter: function (params, ticket, callback) {
          //   let valueRate = params[3].value
          //   let valueUpPersonNum = params[0].value
          //   let valueDownPersonNum = params[1].value
          //   let passengerFlow = params[2].value
          //   return params[0].name + '<br>' + '上车人数：' + valueUpPersonNum + '<br>' + '下车人数：' + valueDownPersonNum + '<br>' + '断面客流：' + passengerFlow + '<br>' + '满载率：' + valueRate + '%'
          // }
        },
        color: ['#249cf9', '#fdb628', '#67e0e3', '#eb6f49'],
        legend: {
          data: this.tabType,
          selectedMode: false,
          bottom: 10,
          textStyle: {
            color: '#000'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: timeInterval,
            axisPointer: {
              type: 'shadow'
            },
            splitLine: {
              show: true
            },
            axisLine: {
              show: true
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              inside: false,
              showMaxLabel: true,
              interval: 2,
              textStyle: {
                color: '#000',
                fontSize: '10',
                borderRadius: '6'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            // name: '水量',
            min: 0,
            max: this.maxNum + this.maxNum / 5,
            interval: Math.floor(this.maxNum / 5),
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
                color: '#000',
                fontSize: '16',
                borderRadius: '6'
              }
            }
          },
          {
            type: 'value',
            interval: 20,
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: '{value}%',
              color: '#000',
              fontSize: '16',
              borderRadius: '6'
            }
          }
        ],
        series: [
          {
            name: '登量（人次）',
            type: 'bar',
            barWidth: '10',
            // barGap: '-100%',
            yAxisIndex: 0,
            itemStyle: {
              emphasis: {
                barBorderRadius: 20
              },
              normal: {
                barBorderRadius: 20
              }
            },
            data: this.upPersonNum
          },
          {
            name: '降量（人次）',
            type: 'bar',
            barWidth: '10',
            yAxisIndex: 0,
            itemStyle: {
              emphasis: {
                barBorderRadius: 20
              },
              normal: {
                barBorderRadius: 20
              }
            },
            data: this.downPersonNum
          },
          {
            name: '断面客流',
            type: 'line',
            yAxisIndex: 0,
            barWidth: '10',
            data: this.passengerFlow
          },
          {
            name: '满载率',
            type: 'line',
            yAxisIndex: 1,
            barWidth: '10',
            data: this.fullRate
          }
        ]
      }, true)
    }
  }
}
</script>

<style lang="scss" scoped>
.anim {
  animation: zy 2.5s .15s linear forwards;
// -moz-animation: zy 2.5s .15s linear infinite; /* Firefox */
// -webkit-animation: zy 2.5s .15s linear infinite; /* Safari and Chrome */
// -o-animation: zy 2.5s .15s linear infinite; /* Opera */
}
@keyframes zy {
  0%   { transform: rotate(15deg);}
  25%  {transform: rotate(-10deg);}
  50%  { transform: rotate(5deg);}
  75%  {transform: rotate(-5deg);}
  100% { transform: rotate(0deg);}
}
</style>
