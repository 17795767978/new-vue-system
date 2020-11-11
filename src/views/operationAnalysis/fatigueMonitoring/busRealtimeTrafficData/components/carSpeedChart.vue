<template>
  <div style="width: 100%; height: 100%" ref="topWrapper">
    <div ref="chart" :id="id" :style="{width: '100%', height: '100%', margin: '0 auto', boxSizing: 'border-box'}"
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: 'echart'
    },
    title: Object,
    center: Array,
    titleNoRich: Boolean,
    rang: Array
  },
  data () {
    return {
      charts: null
      // title: {
      //   text: '',
      //   pos: []
      // }
    }
  },
  mounted () {
    this.charts = this.$echarts.init(document.getElementById(this.id))
  },
  methods: {
    drawChart (normal = 0) {
      var all = this.rang[1]
      this.charts.setOption({
        title: {
          text: this.title.text,
          subtext: this.titleNoRich ? '' + normal : normal + ' {subtext|/限55}',
          left: this.title.pos[0],
          top: this.title.pos[1],
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          subtextStyle: {
            color: '#ff',
            fontSize: 30,
            fontFamily: 'PingFangSC-Regular',
            rich: {
              subtext: {
                fontSize: 12,
                color: '#fffff'
              }
            }
          },
          itemGap: 10 // 主副标题间距
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        series: [{
          name: '正常数',
          type: 'gauge',
          center: this.center,
          radius: '120%',
          min: this.rang[0], // 最小刻度
          max: this.rang[1], // 最大刻度
          startAngle: 220,
          endAngle: -40,
          axisLine: {
            lineStyle: {
              color: [
                [normal / all, new this.$echarts.graphic.LinearGradient(
                  0, 0, 1, 0, [{
                    offset: 0,
                    color: '#1479F6'
                  }, {
                    offset: 0.5,
                    color: '#1479F6'
                  },
                  {
                    offset: 1,
                    color: '#1479F6'
                  }
                  ]
                )],
                [1, '#18303F']
              ],
              width: 16
            }
          },
          axisLabel: {
            show: true,
            color: '#8391B7'
          },
          axisTick: {
            show: false

          },
          splitLine: {
            show: true,
            length: 16,
            lineStyle: {
              width: 5,
              color: '#2C3638'
            }
          },
          splitNumber: 4,
          detail: {
            show: false
          },
          pointer: {
            show: false
          },
          animationDuration: 4000
        }
        ]
      })
    }
  }

}
</script>
<style scoped>

</style>
