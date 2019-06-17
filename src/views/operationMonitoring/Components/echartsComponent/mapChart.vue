<template>
  <div class="map-chart">
    <baidu-map
      ref="baiduMapWrapper"
      :style="{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0, 0.5)', borderRadius: '6px'}"
      :zoom="zoom"
      :ak="ak"
      :center="center"
      :scroll-wheel-zoom="true"
      @ready="handler"
    >
      <!-- animation="BMAP_ANIMATION_DROP" -->
      <!-- animation="BMAP_ANIMATION_BOUNCE" -->
      <bm-marker
        v-for="marker in markers"
        :key="marker.busId"
        :position="{lng: marker.lng, lat: marker.lat}"
        @click="handleMarkerClick(marker)"
        :title="`${marker.lineName}-${marker.busNumber}`"
        :icon="getIcon(marker)"
        class="arrow_box"
        animation="BMAP_ANIMATION_DROP"
        >
      </bm-marker>
      <bml-heatmap :data="hotdata" :max="max" :radius="20">
      </bml-heatmap>
    </baidu-map>
  </div>
</template>

<script type="text/ecmascript-6">
import { BaiduMap, BmMarker, BmlHeatmap } from 'vue-baidu-map'
import iconCarOrange from '../../../../assets/images/bus-orange.png'
import iconCarRed from '../../../../assets/images/bus-red.png'
import iconCarYellow from '../../../../assets/images/bus-yellow.png'
import iconCarGreen from '../../../../assets/images/bus-green.png'
const TIME = 5 * 60 * 1000
export default {
  data () {
    return {
      isLoading: true,
      center: { lng: 0, lat: 0 },
      zoom: 3,
      ak: '7vVOlMOKr03PaWX82WajF6m',
      mapStyle: {
        styleJson: [
          {
            'featureType': 'water',
            'elementType': 'all',
            'stylers': {
              'color': '#021019'
            }
          },
          {
            'featureType': 'highway',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'highway',
            'elementType': 'geometry.stroke',
            'stylers': {
              'color': '#147a92'
            }
          },
          {
            'featureType': 'arterial',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'arterial',
            'elementType': 'geometry.stroke',
            'stylers': {
              'color': '#0b3d51'
            }
          },
          {
            'featureType': 'local',
            'elementType': 'geometry',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'land',
            'elementType': 'all',
            'stylers': {
              'color': '#08304b'
            }
          },
          {
            'featureType': 'railway',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'railway',
            'elementType': 'geometry.stroke',
            'stylers': {
              'color': '#08304b'
            }
          },
          {
            'featureType': 'subway',
            'elementType': 'geometry',
            'stylers': {
              'lightness': -70
            }
          },
          {
            'featureType': 'building',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.fill',
            'stylers': {
              'color': '#857f7f'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.stroke',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'building',
            'elementType': 'geometry',
            'stylers': {
              'color': '#022338'
            }
          },
          {
            'featureType': 'green',
            'elementType': 'geometry',
            'stylers': {
              'color': '#062032'
            }
          },
          {
            'featureType': 'boundary',
            'elementType': 'all',
            'stylers': {
              'color': '#1e1c1c'
            }
          },
          {
            'featureType': 'manmade',
            'elementType': 'geometry',
            'stylers': {
              'color': '#022338'
            }
          },
          {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.icon',
            'stylers': {
              'visibility': 'off'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.fill',
            'stylers': {
              'color': '#2da0c6',
              'visibility': 'on'
            }
          }
        ]
      },
      markers: [],
      hotdata: [],
      max: 100
    }
  },
  components: {
    BaiduMap,
    BmlHeatmap,
    BmMarker
  },
  created () {
    this._positionRating({
      orgId: ''
    })
    this._hotDataLine({
      orgId: ''
    })
  },
  mounted () {
  },
  computed: {
    getIcon () {
      return function (marker) {
        if (Number(marker.fullLoadRate) < 25) {
          return { url: `${iconCarGreen}`, size: { width: 30, height: 30 } }
        } else if (Number(marker.fullLoadRate) >= 25 && Number(marker.fullLoadRate) < 50) {
          return { url: `${iconCarYellow}`, size: { width: 30, height: 30 } }
        } else if (Number(marker.fullLoadRate) >= 50 && Number(marker.fullLoadRate) < 75) {
          return { url: `${iconCarOrange}`, size: { width: 30, height: 30 } }
        } else if (Number(marker.fullLoadRate) >= 75 && Number(marker.fullLoadRate) < 100) {
          return { url: `${iconCarRed}`, size: { width: 30, height: 30 } }
        }
      }
    }
  },
  methods: {
    _positionRating (params) {
      this.$api['homeMap.getBusPositionAndFullLoadRate'](params).then(res => {
        this.markers = res
        setTimeout(() => {
          this._positionRating(params)
        }, TIME)
      })
    },
    _hotDataLine (params) {
      this.$api['homeMap.getBusHeatmapDatas'](params).then(res => {
        let dataArrCount = res.map(item => parseInt(item.getOnNumber))
        let dataArrLat = res.map(item => item.lat)
        let dataArrLng = res.map(item => item.lng)
        for (let i = 0; i < dataArrCount.length; i++) {
          this.hotdata[i] = {
            lng: +dataArrLng[i],
            lat: +dataArrLat[i],
            count: dataArrCount[i]
          }
        }
        this.max = 4000
        setTimeout(() => {
          this._hotDataLine(params)
        }, TIME)
      })
    },
    handler ({ BMap, map }) {
      this.center.lng = '114.520486813'
      this.center.lat = '37.0695311969'
      this.zoom = 13
      this.isLoading = false
      map.setMapStyle(this.mapStyle)
      this.$refs.baiduMapWrapper.$el.children[0].style.borderRadius = '6px'
    },
    handleMarkerClick () {
    }
  }
}
</script>

<style lang="scss" scoped>
.map-chart {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}
.arrow_box{animation: glow 800ms ease-out infinite alternate; }
@keyframes glow {
    0% {
        border-color: #393;
        box-shadow: 0 0 5px rgba(0,255,0,.2), inset 0 0 5px rgba(0,255,0,.1), 0 1px 0 #393;
    }
    100% {
        border-color: #6f6;
        box-shadow: 0 0 20px rgba(0,255,0,.6), inset 0 0 10px rgba(0,255,0,.4), 0 1px 0 #6f6;
    }
}
</style>
