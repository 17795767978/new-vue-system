<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" :bmap="bmap"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
// import { max } from '../../../../utils/max.js'
import lineEcharts from '@/components/echarts/brokenLineDiagram'
import style from '../utils/style.js'
export default {
  name: 'passengerHome',
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
      id: 'lineMap',
      grid: {},
      bmap: {},
      loading: true
    }
  },
  computed: {
  },
  created () {
    this._getStationData()
  },
  mounted () {
    this._getStationData()
  },
  watch: {
  },
  methods: {
    _getStationData () {
      this.loading = false
      this.bmap = {
        center: [116.46, 39.92],
        zoom: 10,
        roam: true,
        mapStyle: {
          styleJson: style
        }
      }
      this.lineData = [{
        type: 'lines',
        coordinateSystem: 'bmap',
        polyline: true,
        data: [],
        silent: true,
        lineStyle: {
          normal: {
            color: '#c23531',
            opacity: 0.2,
            width: 1
          }
        },
        progressiveThreshold: 500,
        progressive: 200
      }]
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
