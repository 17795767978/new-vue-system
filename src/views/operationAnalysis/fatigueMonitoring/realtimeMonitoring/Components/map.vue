<template>
  <div class="all-map" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :bmap="bmap" :isMap="true" :tooltip="tooltip" @getEchartsData="getEchartsData"></lineEcharts>
  </div>
</template>

<script>
import lineEcharts from '@/components/echarts/brokenLineDiagram'
import icon from '../../../../../assets/images/map_icon.png'
import iconSec from '../../../../../assets/images/map_icon_pre.png'
import { mapGetters } from 'vuex'
export default {
  props: {
    datas: {
      type: Array
    },
    pointDatas: {
      type: Array
    }
  },
  data () {
    return {
      loading: false,
      lineData: [],
      id: 'mapStations',
      bmap: {},
      tooltip: {},
      stations: []
    }
  },
  computed: {
    ...mapGetters(['center'])
  },
  created () {
    // this.stations = [{
    //   name: '新有中路',
    //   value: [113.30554, 22.764464, 80, 0]
    // }]
  },
  mounted () {
    this.loading = true
    setTimeout(() => {
      this.loading = false
      this._getLineMap()
    }, 2000)
  },
  watch: {
    pointDatas: {
      deep: true,
      handler (newV) {
        console.log(iconSec)
        const dataArr = newV.filter(item => item.levelsType === '3' && item.busPosition)
        this.stations = dataArr.map(item => ({
          name: item.name,
          content: item,
          value: [item.busPosition.lng, item.busPosition.lat, 80, 0]
        }))
        this._getLineMap()
      }
    }
  },
  methods: {
    _getLineMap () {
      console.log(this.stations)
      this.bmap = {
        center: this.center,
        zoom: 14,
        roam: true
      }
      // setTimeout(() => {
      //   this.lineData = [{
      //     type: 'lines',
      //     coordinateSystem: 'bmap',
      //     polyline: true,
      //     data: this.stations,
      //     lineStyle: {
      //       normal: {
      //         // color: '#c23531',
      //         // color: 'rgb(200, 35, 45)',
      //         opacity: 1,
      //         width: 5,
      //         emphasis: {
      //           width: 6
      //         }
      //       }
      //     }
      //   }]
      // }, 20)
      this.tooltip = {
        formatter: function (params, ticket, callback) {
          if (params.seriesType === 'lines') {
            return '线路名：' + params.name
          } else {
            return '车：' + params.name
          }
        },
        trigger: 'item'
      }
      this.lineData = [
        {
          name: '站点',
          type: 'scatter',
          data: this.stations,
          coordinateSystem: 'bmap',
          symbolSize: [40, 25],
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              show: false
            }
          },
          // itemStyle: {
          //   normal: {
          //     color: '#13d5e8'
          //   }
          // },
          symbol: (params, data) => {
            if (data.data.content.busStatus === '0') {
              return `image://${iconSec}`
            } else {
              return `image://${icon}`
            }
          }
        }
      ]
    },
    getEchartsData (data) {
      this.$emit('getContent', data.data)
    }
  },
  components: {
    lineEcharts
  }
}
</script>

<style lang="scss" scoped>
.all-map {
  width: 100%;
  height: 100%;
}
</style>
