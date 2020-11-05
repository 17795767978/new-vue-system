<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading" >
    <lineEcharts :id="type" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" :dataZoom="dataZoom"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
// import { max } from '../../../../../utils/max.js'
import lineEcharts from '@/components/echarts/brokenLineDiagram'
import { mapGetters } from 'vuex'
export default {
  props: {
    selectData: {
      type: Object
    },
    type: {
      type: String,
      default: 'SOC'
    }
  },
  data () {
    return {
      lineData: [],
      // width: 100,
      title: {},
      height: '',
      legend: {},
      xData: [],
      yData: [],
      maxNum: 0,
      dataZoom: [],
      grid: {},
      loading: true
    }
  },
  computed: {
    ...mapGetters(['formData', 'userId'])
  },
  created () {
    let startTime = moment().format('YYYY-MM-DD 00:00:00')
    let endTime = moment().format('YYYY-MM-DD 23:59:59')
    this._getFatAlarmSpeedStatistic({
      busNumber: this.$store.state.globel.carData[0].value,
      startTime,
      endTime,
      isHistory: false
    }, this.type)
  },
  mounted () {
    // console.log(this.$refs.wrapper.style)
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this._getFatAlarmSpeedStatistic({
          busNumber: newV.busNumber,
          startTime: moment(newV.onlyStartTime).format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment(newV.onlyEndTime).format('YYYY-MM-DD HH:mm:ss'),
          isHistory: moment(newV.onlyStartTime).format('YYYY-MM-DD') !== moment().format('YYYY-MM-DD')
          // isHistory: true
        }, this.type)
      }
    }
  },
  methods: {
    _getFatAlarmSpeedStatistic (params, type) {
      this.loading = true
      if (type === 'SPEED') {
        this.$api['tiredMonitoring.carSpeedEcharts'](params).then(res => {
          this.loading = false
          this.initCharts(res)
        }).catch(err => {
          this.loading = false
          this.$message.error(err.message)
        })
      } else {
        this.$api['tiredMonitoring.socEcharts'](params).then(res => {
          this.loading = false
          this.initCharts(res)
        }).catch(err => {
          this.loading = false
          this.$message.error(err.message)
        })
      }
    },
    initCharts (res) {
      this.title = {
        text: this.type === 'SOC' ? 'SOC历史趋势' : '车速历史趋势',
        left: 'center'
      }
      this.lineData = [{
        name: this.type === 'SOC' ? '电池包(SOC)' : '车速',
        type: 'line',
        // radius: ['100%', '60%'],
        color: '#409eff',
        data: res.datas[0],
        itemStyle: {
          // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
          emphasis: {
            barBorderRadius: 30
          },

          normal: {
            // 柱形图圆角，初始化效果
            barBorderRadius: [10, 10, 10, 10],
            label: {
              show: false, // 是否展示
              textStyle: {
                fontWeight: 'bolder',
                fontSize: '12',
                fontFamily: '微软雅黑'
              }
            }
            // color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 1, [{
            //   offset: 0,
            //   color: '#fdc14d'
            // }, {
            //   offset: 1,
            //   color: '#ed8237'
            // }])
          }
        }
      }]
      this.grid = {
        x: 50,
        y: 50,
        x2: 30,
        y2: 30,
        borderWidth: 1
      }
      this.dataZoom = [{
        startValue: ''
      }, {
        type: 'inside'
      }]
      // this.maxNum = max(res.datas[0])
      this.dataLength = 2
      this.legend = {
        data: [this.type === 'SOC' ? '电池包(SOC)' : '车速'],
        top: 10,
        right: 10,
        textStyle: {
          color: '#000'
        }
      }
      this.xData = [
        {
          type: 'category',
          data: res.xAxisNames,
          axisPointer: {
            type: 'shadow'
          },
          axisLabel: {
            inside: false,
            // interval: 0,
            textStyle: {
              color: '#000',
              fontSize: '10',
              borderRadius: '6'
            }
          }
        }
      ]
      this.yData = [
        {
          // axisLabel: {
          //     formatter: '{value} ml'
          // },
          axisLabel: {
            inside: false,
            interval: 0,
            textStyle: {
              color: '#000',
              fontSize: '10',
              borderRadius: '6'
            }
          }
        }
      ]
    }
  },
  components: {
    lineEcharts
  }
}
</script>

<style lang="scss" scoped>
.passenger-vol {
  width:100%;
  box-sizing: border-box;
  height: 100%;
}
</style>
