<template>
   <div style="width: 100%; height: 100%" ref="topWrapper">
    <div ref="chart" :id="id" :style="{width: '100%', height: '100%', margin: '0 auto', boxSizing: 'border-box'}"
      >
    </div>
  </div>
</template>
<script>
// 电压电流仪表盘组件
export default {
  props: {
    id: {
      type: String,
      default: 'echart'
    },
    center: {
      type: Array,
      default: () => {
        return ['50%', '50%']
      }
    },
    rang: {
      type: Array,
      default: () => {
        return [0, 800]
      }
    },
    title: {
      type: String,
      default: ''
    },
    titlePos: {
      type: Array,
      default: () => {
        return ['28%', '30%']
      }
    },
    bgColor: {
      type: Array,
      default: () => {
        return ['#2DBAD5', '#104655']
      }
    }
  },
  mounted () {
    this.charts = this.$echarts.init(document.getElementById(this.id))
  },
  methods: {
    drawChart (normal = 0) {
      let normalVal = null
      if (normal < 0) {
        normalVal = -normal
      }
      if (normal >= 0) {
        normalVal = normal + (-this.rang[0])
      }
      if (normal < this.rang[0] || normal === this.rang[0]) {
        normalVal = 0
      }
      this.charts.setOption({
        title: {
          text: this.title,
          left: this.titlePos[0],
          bottom: this.titlePos[1],
          textStyle: {
            fontSize: 12,
            fontFamily: 'PingFang SC',
            color: '#C9CBCD',
            fontWeight: 100
          }
        },
        series: [{
          name: '',
          type: 'gauge',
          splitNumber: 2, // 刻度数量
          min: this.rang[0],
          max: this.rang[1],
          radius: '90%', // 图表尺寸
          center: this.center,
          startAngle: 220,
          endAngle: -40,
          axisLine: {
            show: false,
            lineStyle: {
              width: 10,
              shadowBlur: 0,
              color: [
                [normalVal / ((-this.rang[0]) + this.rang[1]), this.bgColor[0]],
                [1, this.bgColor[1]]
              ]
            }
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: 'auto',
              width: 2
            },
            length: 20,
            splitNumber: 5
          },
          splitLine: {
            show: true,
            length: 12,
            lineStyle: {
              color: 'auto'
            }
          },
          axisLabel: {
            show: true,
            color: '#8391B7',
            lineHeight: 60
          },
          pointer: { // 仪表盘指针
            show: 0
          },
          detail: {
            show: 0
          }
        },
        {
          name: '',
          type: 'gauge',
          splitNumber: 10, // 刻度数量
          min: this.rang[0],
          max: this.rang[1],
          radius: '76%', // 图表尺寸
          center: this.center,
          startAngle: 220,
          endAngle: -40,
          axisLine: {
            show: false,
            lineStyle: {
              width: 0,
              color: [
                [normalVal / ((-this.rang[0]) + this.rang[1]), this.bgColor[0]],
                [1, this.bgColor[1]]
              ]
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              width: 2,
              shadowBlur: 0,
              color: 'auto'
            },
            length: 16,
            splitNumber: 3
          },
          splitLine: {
            show: false,
            length: 20,
            lineStyle: {
              color: 'auto'
            }
          },
          axisLabel: {
            show: false
          },
          pointer: { // 仪表盘指针
            show: 0
          },
          detail: {
            show: 0
          },
          data: [{
            name: '',
            value: 400
          }]
        },
        {
          name: '',
          type: 'gauge',
          splitNumber: 10, // 刻度数量
          min: this.rang[0],
          max: this.rang[1],
          radius: '52%', // 图表尺寸
          center: this.center,
          startAngle: 220,
          endAngle: -40,
          axisLine: {
            show: false,
            lineStyle: {
              width: 0,
              color: [
                [normalVal / ((-this.rang[0]) + this.rang[1]), this.bgColor[0]],
                [1, this.bgColor[1]]
              ]
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              width: 1,
              shadowBlur: 0,
              color: 'auto'
            },
            length: 4,
            splitNumber: 3
          },
          splitLine: {
            show: false,
            length: 20,
            lineStyle: {
              color: 'auto'
            }
          },
          axisLabel: {
            show: false
          },
          pointer: { // 仪表盘指针
            show: 0
          },
          detail: {
            borderColor: '#fff',
            shadowColor: '#fff', // 默认透明
            shadowBlur: 2,
            offsetCenter: [0, '-20%'], // x, y，单位px
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              color: '#fff',
              fontSize: 16
            },
            formatter: '{value}'
          },
          data: [{
            name: '',
            value: normal
          }]
        }
        ]
      })
    }
  },
  data () {
    return {
      charts: null
    }
  }
}
</script>
<style scoped>

</style>
