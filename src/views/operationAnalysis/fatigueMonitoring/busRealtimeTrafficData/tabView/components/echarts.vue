<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="type" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" :dataZoom="dataZoom"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
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
      loading: true,
      showTitle: true
    }
  },
  computed: {
    ...mapGetters(['formData', 'userId'])
  },
  created () {

  },
  mounted () {
    // console.log(this.$refs.wrapper.style)
    this.title = {
      show: this.showTitle, // 是否显示title
      text: '暂无数据',
      left: 'center',
      top: 'center',
      textStyle: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 400
      }
    }
  },
  watch: {

  },
  methods: {
    initCharts (res) {
      if (res.datas.length === 0) {
        this.showTitle = true
      } else {
        this.showTitle = false
      }
      this.$set(this.title, 'show', this.showTitle)
      this.lineData = [{
        name: (this.type === 'SOC' && '电池包(SOC)') || (this.type === 'SOTORSPEED' && '转速') || (this.type === 'ELECTRIC_CURRENT' && '电流') || (this.type === 'VOLTAGE' && '电压') || '车速',
        type: 'line',
        lineStyle: {
          width: 3
        },
        showSymbol: true,
        symbol: 'circle', // 设定为实心点
        symbolSize: 10, // 设定实心点的大小
        // radius: ['100%', '60%'],
        color: '#0F56AE',
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
                fontFamily: '微软雅黑',
                color: '#8391B7'
              },
              color: '#0F56AE' // 改变折线点的颜色
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
        top: 10,
        left: 30,
        borderWidth: 1
      }
      this.dataZoom = [{
        startValue: ''
      }, {
        type: 'inside'
      }]
      // this.maxNum = max(res.datas[0])
      this.dataLength = 2
      // this.legend = {
      //   data: [(this.type === 'SOC' && '电池包(SOC)') || '车速'],
      //   top: 10,
      //   right: 10,
      //   textStyle: {
      //     color: '#8391B7'
      //   }
      // }
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
              color: '#8391B7',
              fontSize: '10',
              borderRadius: '6'
            }
          },
          splitLine: { show: false }
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
              color: '#8391B7',
              fontSize: '10',
              borderRadius: '6'
            }
          },
          splitLine: { show: false }
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
