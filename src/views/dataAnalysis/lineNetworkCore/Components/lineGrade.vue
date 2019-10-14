<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" :tooltip="tooltip"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
export default {
  name: '',
  data () {
    return {
      lineData: [],
      // width: 100,
      title: {},
      height: '',
      legend: {},
      xData: [],
      yData: [],
      maxNum: [],
      id: 'lineGrade',
      grid: {},
      loading: true,
      tooltip: {}
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._getMonthData({
      orgId
    })
  },
  mounted () {
  },
  methods: {
    _getMonthData (params) {
      this.loading = true
      this.$api['passengerSimple.getMonthtrend'](params).then(res => {
        console.log(res)
        this.loading = false
        this.title = {
          text: '线路等级占比',
          left: 'center',
          top: 20,
          textStyle: {
            'color': '#000',
            'fontSize': '22'
          }
        }
        this.grid = {
          x: 50,
          y: 50,
          x2: 10,
          y2: 30,
          borderWidth: 1
        }
        this.legend = [
          {
            data: ['微', '普', '支', '快'],
            top: 50,
            textStyle: {
              color: '#000'
            }
          }
        ]
        this.tooltip = {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        }
        this.lineData = [
          {
            name: '线路等级占比',
            type: 'pie',
            center: ['50%', '60%'],
            label: {
              normal: {
                show: true,
                position: 'inside'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '微' },
              { value: 310, name: '普' },
              { value: 234, name: '支' },
              { value: 135, name: '快' }
            ]
          }
        ]
      })
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
