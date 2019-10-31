<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :polar="polar" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" :angleAxis="angleAxis" :tooltip="tooltip"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
// import { max } from '../../../../utils/max.js'
import lineEcharts from '@/components/echarts/brokenLineDiagram'
export default {
  name: 'passengerHome',
  props: {
    selectData: {
      type: Object
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
      maxNum: [],
      tooltip: {},
      id: 'lineRepeatabilityDown',
      grid: {},
      angleAxis: {},
      loading: true,
      polar: {}
    }
  },
  created () {
    // let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._getrepeatPieData({
      company: '',
      lineID: ''
    })
  },
  mounted () {
  },
  watch: {
    'selectData.lineLineId': {
      handler (newV) {
        let str = newV.split('+')[0]
        this._getrepeatPieData({
          lineID: str
        })
      }
    }
  },
  methods: {
    _getrepeatPieData (params) {
      this.loading = true
      this.$api['lineNet.getrepeatPieData'](params).then(res => {
        console.log(res)
        this.loading = false
        // this.maxMum = max(data)
        this.title = {
          text: '线路重复度',
          left: 'center',
          top: 0,
          textStyle: {
            'color': '#000',
            'fontSize': '22'
          }
        }
        this.grid = {}
        this.angleAxis = {
          type: 'category',
          data: res.radarNames
        }
        this.tooltip = {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (params) => {
            return `重复度：${params[0].data}%`
          }
        }
        this.polar = {
          radius: '120'
        }
        this.lineData = [
          {
            type: 'bar',
            top: 100,
            data: res.datas[0],
            coordinateSystem: 'polar',
            name: '线路',
            stack: 'a'
          }
        ]
        this.legend = [
          {
            data: ['线路'],
            right: 10,
            top: 10,
            textStyle: {
              color: '#000'
            }
          }
        ]
        this.xData = []
        this.yData = []
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
