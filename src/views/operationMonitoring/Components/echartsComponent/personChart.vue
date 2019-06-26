<template>
  <div>
    <div id="person-chart" :style="{width: '100%', height: '240px',padding: '10px', margin: '0 auto'}"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0)"
    >
    </div>
    <noEcharts style="display: none" :eChartsTitle="'实施客流人数'"></noEcharts>
  </div>
</template>

<script>
import noEcharts from './noEcharts.vue'
import { max } from '../../../../utils/max.js'
const TIME = 5 * 60 * 1000
export default {
  data () {
    return {
      loading: true,
      timeInterval: [],
      personCount: [],
      personCountMax: '',
      timer: null
    }
  },
  components: {
    noEcharts
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._realTimePassengeFlow({
      orgId
    })
  },
  mounted () {
  },
  activated () {
    this.drawLine()
  },
  methods: {
    _realTimePassengeFlow (params) {
      this.$api['passengerFlow.getRealTimePassengerFlow'](params).then(res => {
        this.loading = false
        this.timeInterval = res.map(item => item.timeInterval)
        this.personCount = res.map(item => parseInt(item.personCount))
        this.personCountMax = max(this.personCount)
        this.drawLine()
        this.timer = setTimeout(() => {
          this._realTimePassengeFlow(params)
        }, TIME)
      })
    },
    drawLine () {
      let brokenLine = this.$echarts.init(document.getElementById('person-chart'))
      window.addEventListener('resize', () => { brokenLine.resize() })
      brokenLine.setOption({
        title: {
          text: '实时客流人次',
          left: 'center',
          textStyle: {
            'color': '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: this.timeInterval,
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
              color: '#fff',
              fontSize: '10',
              borderRadius: '6'
            }
          }
        },
        yAxis: {
          max: this.personCountMax + 10,
          min: 0,
          splitNumber: 6,
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
        series: [{
          name: '实时客流人次',
          data: this.personCount,
          type: 'line',
          color: '#e2be08'
        }]
      })
    }
  },
  watch: {
    personCountMax () {
    }
  },
  destroyed () {
    clearTimeout(this.timer)
    this.timer = null
  }
}
</script>

<style lang="scss" scoped>
.person-chart {
  width: 100%;
}
</style>
