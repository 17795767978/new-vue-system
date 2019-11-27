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
      <bml-heatmap :data="hotdata" :max="max" :radius="20">
      </bml-heatmap>
    </baidu-map>
 </div>
</template>

<script type="text/ecmascrip-6">
import { BaiduMap, BmlHeatmap } from 'vue-baidu-map'
import { mapStyle } from '../utils/mapStyle'
import { setTimeout } from 'timers'
const TIME = 1000 * 60 * 60
export default {
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
  methods: {
    _getOps () {
      this.$api['wholeInformation.getCityCoordinatePoints']().then(res => {
        this.center.lat = res.lat
        this.center.lng = res.lng
      })
    },
    _hotDataLine () {
      let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
      this.loading = true
      this.hotdata = []
      this.$api['homeMap.getBusHeatmapDatas']({ orgId }).then(res => {
        this.hotdata = res
        this.max = 100
        this.loading = false
        this.timer = setTimeout(() => {
          this._hotDataLine()
        }, TIME)
      })
    },
    handler ({ BMap, map }) {
      this._getOps()
      this.zoom = 12
      this.isLoading = false
      map.setMapStyle(mapStyle)
      this._hotDataLine()
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
