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
      beforeDate: false
    }
  },
  computed: {
    ...mapGetters(['initLineId'])
  },
  created () {
    let date = new Date()
    date = moment(date).format('YYYY-MM-DD')
    this._tripOrder({
      lineId: this.initLineId,
      dateTime: date,
      type: '1',
      startHour: '07',
      endHour: '09',
      busPlateNumbers: []
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
          endHour: this.selectData.endHour.substring(0, 2),
          busPlateNumbers: this.selectData.busPlateNumbers
        })
      }
      this.$emit('isUpdateTo', false)
    }
  },
  methods: {
    _tripOrder (params) {
      this.$api['schedulingAnalysis.getSequenceChartDatas'](params).then(res => {
        this.beforeDate = false
        this.echartDatas = res.datas
        this.echartDatas.forEach((date, index) => {
          this.echartDatas[index] = date.map(num => {
            if (num !== null && num !== undefined) {
              return num * 1000
            }
          })
        })
        if (this.echartDatas.length > 0 && this.echartDatas[0][0] === undefined) {
          this.beforeDate = true
          this.echartDatas[0][0] = moment(this.selectData.date + ' ' + this.selectData.startTime + '00').valueOf()
        }
        this.legendNames = res.legendNames
        this.xAxisNames = res.xAxisNames
        let abs = []
        this.echartDatas.forEach(item => {
          item.forEach(item => {
            abs.push(item)
          })
        })
        abs = abs.filter(num => !isNaN(num))
        // console.log(abs.map((a) => moment(a).format('YYYY-MM-DD HH:mm:ss')))
        this.maxDate = max(abs)
        this.minDate = min(abs)
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
      for (var i = 0; i < this.echartDatas.length - 1; i++) {
        series.push({
          type: 'line',
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
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (params) => {
            console.log(params)
            // station = params[0].axisValueLabel + '<br />' + '发车时序:' + '<br />'
            return `${params.name}<br />${moment(params.value).format('YYYY-MM-DD HH:mm:ss')}`
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
              return moment(val).format('HH:mm:ss')
            }
          }
        },
        series
      })
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
