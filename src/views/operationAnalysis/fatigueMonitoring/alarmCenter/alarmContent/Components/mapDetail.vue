<template>
  <div class="person-detail-content">
    <baidu-map
      :style="{width: '100%', height: '310px', backgroundColor: 'rgba(0,0,0, 0.5)'}"
      :zoom="zoom"
      :center="center"
      :ak='ak'
      :scroll-wheel-zoom="true"
      @ready="handler"
      @click="getPoint"
    >
      <!-- animation="BMAP_ANIMATION_DROP" -->
      <bm-marker
        :position="position"
        animation="BMAP_ANIMATION_BOUNCE"
        >
      </bm-marker>
      <bm-info-window :position="center" title="位置信息" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">
        <p class="font-style" style="margin-bottom: 5px;">位置：{{address}}</p>
      </bm-info-window>
    </baidu-map>
  </div>
</template>

<script type="text/ecmascript-6">
import { BaiduMap, BmMarker, BmInfoWindow } from 'vue-baidu-map'
export default {
  name: 'alarmContent',
  props: {
    busDetails: {
      type: Object
    }
  },
  data () {
    return {
      mapData: {},
      center: { lng: 0, lat: 0 },
      zoom: 3,
      position: { lng: 0, lat: 0 },
      ak: '7vVOlMOKr03PaWX82WajF6m',
      infoWindow: {
        show: false
      },
      address: '',
      geocoder: {}
    }
  },
  components: {
    BaiduMap,
    BmMarker,
    BmInfoWindow
  },
  created () {
  },
  watch: {
    busDetails: {
      deep: true,
      handler () {
        this.mapData = this.busDetails
      }
    }
  },
  methods: {
    handler ({ BMap, map }) {
      setTimeout(() => {
        this.center.lng = this.mapData.lng
        this.center.lat = this.mapData.lat
        this.zoom = 20
        this.position.lng = this.mapData.lng
        this.position.lat = this.mapData.lat
      }, 100)
      this.geocoder = new BMap.Geocoder()
    },
    getPoint (e) {
      this.infoWindow.show = true
      this.geocoder.getLocation(e.point, res => {
        this.address = res.address
      })
    },
    infoWindowClose () {
      this.infoWindow.show = false
    },
    infoWindowOpen () {
      this.infoWindow.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
.alarm-content {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.btn {
  position: relative;
  .btn-content {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10;
  }
}
</style>
