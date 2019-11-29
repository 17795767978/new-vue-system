<template>
  <div class="passenger-vol" ref="wrapper">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" :bgColor="bgColor"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
// import moment from 'moment'
export default {
  name: 'passengerHome',
  props: {
    datas: {
      type: Object
    },
    ids: {
      type: String
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
      id: 'kobe',
      grid: {},
      loading: true,
      lineName: '',
      lineType: '',
      bgColor: 'rgba(255,255,255,0.8)',
      bmap: {}
    }
  },
  created () {
  },
  mounted () {
    this._getStationCharts()
    setTimeout(() => {
      this.bmap = {
        center: [114.025453, 22.557998],
        zoom: 13,
        roam: true
      }
    }, 1000)
  },
  watch: {
    datas (newV) {
      this._getStationCharts(newV)
    },
    ids (newV) {
      console.log(newV)
    }
  },
  methods: {
    async _getStationCharts () {
      this.$jsonp('https://www.echartsjs.com/examples/data/asset/data/lines-bus.json').then(data => {
        console.log(data)
        this.loading = false
        let busLines = [].concat.apply([], data.map(function (busLine, idx) {
          let prevPt
          let points = []
          for (let i = 0; i < busLine.length; i += 2) {
            let pt = [busLine[i], busLine[i + 1]]
            if (i > 0) {
              pt = [
                prevPt[0] + pt[0],
                prevPt[1] + pt[1]
              ]
            }
            prevPt = pt

            points.push([pt[0] / 1e4, pt[1] / 1e4])
          }
          return {
            coords: points
          }
        }))
        console.log(busLines)
        this.bmap = {
          center: [116.46, 39.92],
          zoom: 10,
          roam: true
          // mapStyle: {
          //   styleJson: style
          // }
        }
        this.lineData = [{
          type: 'lines',
          coordinateSystem: 'bmap',
          polyline: true,
          data: busLines,
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
