<template>
  <div ref="topWrapper">
    <div id="chart-wrapper"
     ref="chartWrapper"
     :style="{width: '100%', height: '600px'}"></div>
    <div
      v-cloak
      ref="animationDom"
      v-show="echartDatas.length === 0"
      class="anim"
      style="width: 100%; height: 330px; line-height:300px;text-align:center">
      暂无数据
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import { tripOrder } from 'server/interface'
import elementResizeDetector from 'element-resize-detector'
import moment from 'moment'
import { max, min } from '../../../../../utils/max.js'
import { mapGetters } from 'vuex'
const COLOR_ARR = ['#33B5E5', '#0099CC', '#AA66CC', '#9933CC', '#99CC00', '#669900', '#FFBB33', '#FF8800', '#FF4444', '#CC0000', '#33B5E5', '#0099CC', '#AA66CC', '#9933CC', '#99CC00', '#669900', '#FFBB33', '#FF8800', '#FF4444', '#CC0000', '#33B5E5', '#0099CC', '#AA66CC', '#9933CC', '#99CC00', '#669900', '#FFBB33', '#FF8800', '#FF4444', '#CC0000', '#33B5E5', '#0099CC', '#AA66CC', '#9933CC', '#99CC00', '#669900', '#FFBB33', '#FF8800', '#FF4444', '#CC0000', '#33B5E5', '#0099CC', '#AA66CC', '#9933CC', '#99CC00', '#669900', '#FFBB33', '#FF8800', '#FF4444', '#CC0000', '#33B5E5', '#0099CC', '#AA66CC', '#9933CC', '#99CC00', '#669900', '#FFBB33', '#FF8800', '#FF4444', '#CC0000', '#33B5E5', '#0099CC', '#AA66CC', '#9933CC', '#99CC00', '#669900', '#FFBB33', '#FF8800', '#FF4444', '#CC0000', '#33B5E5', '#0099CC', '#AA66CC', '#9933CC', '#99CC00', '#669900', '#FFBB33', '#FF8800', '#FF4444', '#CC0000']
export default {
  props: {
    selectData: {
      type: Object
    },
    isUpdate: {
      type: Boolean
    }
  },
  data () {
    return {
      echartDatas: [],
      legendNames: [],
      xAxisNames: [],
      maxDate: '',
      minDate: '',
      beforeDate: false,
      carData: []
    }
  },
  computed: {
    ...mapGetters(['initLineId'])
  },
  created () {
    let date = new Date()
    date = moment(date).subtract(1, 'day').format('YYYY-MM-DD')
    this._tripOrder({
      lineId: this.initLineId,
      dateTime: date,
      type: '1',
      startHour: '07',
      endHour: '07',
      busPlateNumbers: [],
      isHistory: '0'
    })
  },
  mounted () {
    let listenResize = elementResizeDetector()
    listenResize.listenTo(this.$refs.topWrapper, (el) => {
      this.$echarts.init(document.getElementById('chart-wrapper')).resize()
    })
  },
  watch: {
    isUpdate () {
      if (this.isUpdate) {
        this._tripOrder({
          lineId: this.selectData.lineId,
          dateTime: this.selectData.dateTime,
          type: this.selectData.type,
          startHour: this.selectData.startHour.substring(0, 2),
          endHour: this.selectData.endHourFormatter,
          busPlateNumbers: this.selectData.busPlateNumbers,
          isHistory: this.selectData.radio
        })
      }
      this.$emit('isUpdateTo', false)
    }
  },
  methods: {
    _tripOrder (params) {
      this.$api['schedulingAnalysis.getSequenceChartDatas'](params).then(res => {
        let abs = []
        this.beforeDate = false
        this.echartDatas = res.datas
        this.carData = res.legendNames
        // Object.freeze(this.echartDatas)
        this.echartDatas.forEach((date, index) => {
          // this.echartDatas[index] = date.map(num => {
          //   if (num !== null && num !== undefined) {
          //     return num * 1000
          //   }
          // })
          date.forEach(item => {
            if (item[1]) {
              item[1] = item[1] * 1000
            }
          })
        })
        console.log(this.echartDatas)
        if (this.echartDatas.length > 0 && this.echartDatas[0][0] === undefined) {
          this.beforeDate = true
          this.echartDatas[0][0] = moment(this.selectData.date + ' ' + this.selectData.startTime + '00').valueOf()
        }
        this.legendNames = res.legendNames
        this.xAxisNames = res.xAxisNames
        this.echartDatas.forEach(item => {
          item.forEach(item => {
            abs.push(item[1])
          })
        })
        abs = abs.filter(num => !isNaN(num))
        // console.log(abs.map((a) => moment(a).format('YYYY-MM-DD HH:mm:ss')))
        this.maxDate = max(abs)
        this.minDate = min(abs)
        // console.log(this.maxDate)
        // console.log(this.minDate)
        if (this.minDate === this.maxDate) {
          const date = moment(this.maxDate).format('YYYY-MM-DD 06:00:00')
          this.minDate = moment(date).valueOf()
        }
        if (this.echartDatas.length > 0) {
          this.$refs.chartWrapper.style.display = 'block'
          setTimeout(() => {
            this.drawLine()
          }, 100)
          this.loading = false
          this.$message.success('数据已更新')
        } else {
          // this.$refs.animationDom.addClassList('anim');
          this.$message.warning('暂无数据')
          this.$refs.chartWrapper.style.display = 'none'
        }
      })
    },
    drawLine () {
      let chart = this.$echarts.init(document.getElementById('chart-wrapper'))
      window.addEventListener('resize', () => {
        chart.resize()
      })
      let series = []
      for (var i = 0; i < this.echartDatas.length; i++) {
        series.push({
          type: 'line',
          name: this.carData[i],
          data: this.echartDatas[i]
        })
      }
      chart.setOption({
        title: {
          text: ''
        },
        grid: {
          left: '1%',
          right: '10%',
          bottom: '3%',
          containLabel: true
        },
        // dataZoom: [{
        //   show: true,
        //   type: 'slider',
        //   start: 0,
        //   end: '100%'
        // }, {
        //   show: true,
        //   type: 'inside',
        //   start: 10,
        //   end: ' 100%'
        // }],
        tooltip: {
          trigger: 'item',
          // trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (params) => {
            return `${moment(params.data[1]).format('YYYY-MM-DD HH:mm:ss')}<br />${params.name}<br />${params.data[3]}<br />上车人数：${params.data[2]}`
          }
        },
        xAxis: {
          type: 'category',
          data: this.xAxisNames,
          splitLine: { // y轴刻度线
            'show': true
          },
          axisTick: {
            interval: 0,
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value',
          min: this.minDate,
          max: this.maxDate,
          splitLine: { // y轴刻度线
            'show': true
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            inside: false, // 刻度值卸载y轴右侧
            textStyle: {
              fontSize: 14,
              color: '#666'
            },
            formatter: function (val) {
              return moment(val).format('YYYY-MM-DD HH:mm:ss')
            }
          }
        },
        series: (() => {
          let series = []
          this.echartDatas.forEach((item, index) => {
            series.push({
              data: item,
              type: 'scatter',
              symbolSize: function (data) {
                return Math.sqrt(data[2]) * 10
              },
              // label: {
              //   emphasis: {
              //     show: true,
              //     formatter: function (param) {
              //       console.log(param)
              //       let date = param.data[1] && moment(param.data[1]).format('YYYY-MM-DD HH:mm:ss')
              //       return `${param.data[0]}<br/>${date}<br/>上车人数：${param.data[2]}`
              //     },
              //     position: 'top'
              //   }
              // },
              itemStyle: {
                normal: {
                  shadowBlur: 10,
                  shadowColor: COLOR_ARR[index],
                  shadowOffsetY: 5,
                  color: new this.$echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: COLOR_ARR[index]
                  }, {
                    offset: 1,
                    color: COLOR_ARR[index + 1]
                  }])
                }
              }
            })
          })
          return series
        })()
      }, true)
    }
  }
}
</script>

<style lang="scss" scoped>
[v-cloak]
{
display: none;
}
.anim {
  animation: zy 2.5s .15s linear forwards;
}
@keyframes zy {
  0%   { transform: rotate(15deg);}
  25%  {transform: rotate(-10deg);}
  50%  { transform: rotate(5deg);}
  75%  {transform: rotate(-5deg);}
  100% { transform: rotate(0deg);}
}
</style>
