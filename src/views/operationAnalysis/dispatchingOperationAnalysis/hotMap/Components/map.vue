<template>
 <div class="map">
   <baidu-map
      ref="baiduMapWrapper"
      :style="{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0, 0.5)', borderRadius: '6px'}"
      :zoom="zoom"
      :ak="ak"
      :mapClick="false"
      :center="center"
      :scroll-wheel-zoom="true"
      @ready="handler"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0)"
    >
      <bml-heatmap :data="hotdata" :max="400" :radius="15">
      </bml-heatmap>
    </baidu-map>
 </div>
</template>

<script type="text/ecmascrip-6">
import { BaiduMap, BmlHeatmap } from 'vue-baidu-map'
import { mapStyle } from '../utils/mapStyle'
// import { setTimeout } from 'timers'
// const TIME = 1000 * 60 * 60
export default {
  props: {
    datas: {
      type: Object
    }
  },
  data () {
    return {
      isLoading: true,
      center: { lng: 0, lat: 0 },
      lineOptions: [],
      zoom: 3,
      ak: '7vVOlMOKr03PaWX82WajF6m',
      loading: true,
      timer: null,
      hotdata: [],
      max: 0
    }
  },
  watch: {
    datas: {
      deep: true,
      handler (newV) {
        this.hotdata = []
        newV.heatMapDataLists.forEach(item => {
          this.loading = false
          this.hotdata.push({
            lat: item.staLnt,
            lng: item.staLng,
            count: item.upPayNumber * 5
          })
        })
      }
    }
  },
  methods: {
    _getOps () {
      this.$api['wholeInformation.getCityCoordinatePoints']().then(res => {
        this.center.lat = res.lat
        this.center.lng = res.lng
      })
    },
    _hotDataLine () {
    },
    handler ({ BMap, map }) {
      this._getOps()
      this.zoom = 15
      this.loading = false
      map.setMapStyle(mapStyle)
    }
  },
  components: {
    BaiduMap,
    BmlHeatmap
  },
  destroyed () {
    clearTimeout(this.timer)
    this.timer = null
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
