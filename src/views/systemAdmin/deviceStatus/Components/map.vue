<template>
  <div>
    <baidu-map
    ref="bdMap"
    :style="{width: '500px', height: '400px', backgroundColor: 'rgba(0,0,0, 0.5)'}"
    :zoom="zoom"
    :center="center"
    :ak="ak"
    :scroll-wheel-zoom="true"
    @ready="handler"
    >
    <!-- animation="BMAP_ANIMATION_DROP" -->
    <bm-marker
      :dragging="true"
      :position="position"
      animation="BMAP_ANIMATION_BOUNCE"
      >
    </bm-marker>
    </baidu-map>
</div>
</template>

<script type="text/ecmascript-6">
import { BaiduMap, BmMarker } from 'vue-baidu-map'
export default {
  props: {
    rowData: {
      type: Object
    },
    isReload: {
      type: Boolean
    }
  },
  data () {
    return {
      data: {},
      center: { lat: 0, lng: 0 },
      position: { lat: 0, lng: 0 },
      zoom: 10,
      ak: '7vVOlMOKr03PaWX82WajF6m'
    }
  },
  components: {
    BaiduMap,
    BmMarker
  },
  watch: {
    rowData: {
      deep: true,
      handler (newValue) {
        setTimeout(() => {
          this.data = this.rowData
          this.center.lat = this.data.lat
          this.center.lng = this.data.lng
          this.position.lat = this.data.lat
          this.position.lng = this.data.lng
          this.zoom = 15
        }, 500)
      }
    }
  },
  mounted () {
  },
  methods: {
    handler ({ BMap, map }) {
      if (this.isReload) {
        setTimeout(() => {
          this.data = this.rowData
          this.center.lat = this.data.lat
          this.center.lng = this.data.lng
          this.position.lat = this.data.lat
          this.position.lng = this.data.lng
          this.zoom = 15
        }, 500)
      }
    }
  }
}
</script>

<style>
</style>
