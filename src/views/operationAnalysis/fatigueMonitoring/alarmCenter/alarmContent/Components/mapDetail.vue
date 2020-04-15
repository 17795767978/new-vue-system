<template>
  <div class="person-detail-content">
    <baidu-map
      ref="baiduMap"
      :style="{width: '100%', height: '310px', backgroundColor: 'rgba(0,0,0, 0.5)'}"
      :zoom="zoom"
      :center="center"
      :ak='ak'
      :scroll-wheel-zoom="true"
      @ready="handler"
    >
      <!-- animation="BMAP_ANIMATION_DROP" -->
      <bm-marker
        :position="position"
        animation="BMAP_ANIMATION_BOUNCE"
        >
      </bm-marker>
      <bm-info-window :position="center" title="位置信息" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen" v-show="isErrorPosition">
        <p class="font-style" style="margin-bottom: 5px;">位置：{{address}}</p>
      </bm-info-window>
      <bm-overlay
        v-show="isErrorPosition"
        ref="customOverlay"
        :class="{sample: true, active}"
        pane="labelPane"
        @draw="draw">
        <div v-text="text"></div>
      </bm-overlay>
    </baidu-map>
  </div>
</template>

<script type="text/ecmascript-6">
import { BaiduMap, BmMarker, BmInfoWindow, BmOverlay } from 'vue-baidu-map'
const ERROR_ARR = ['0', '-1', null, undefined, 'null', 'undefined']
export default {
  name: 'alarmContent',
  props: {
    busDetails: {
      type: Object
    },
    active: {
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
      geocoder: {},
      map: {},
      cityPosition: {},
      text: '',
      isErrorPosition: false,
      currentPoint: {}
    }
  },
  components: {
    BaiduMap,
    BmMarker,
    BmInfoWindow,
    BmOverlay
  },
  mounted () {
    this.$api['wholeInformation.getCityCoordinatePoints']().then(res => {
      this.cityPosition = res
    })
    setTimeout(() => {
      this.getPoint(this.currentPoint)
    }, 1000)
  },
  // updated () {
  // this.mapData = this.busDetails
  // this.center.lng = this.mapData.lng
  // this.center.lat = this.mapData.lat
  // this.position.lng = this.mapData.lng
  // this.position.lat = this.mapData.lat
  // this.zoom = 18
  // },
  activated () {
    setTimeout(() => {
      this.getPoint(this.currentPoint)
    }, 1000)
  },
  watch: {
    busDetails: {
      deep: true,
      handler (newValue) {
        this.mapData = newValue
        // this.center.lng = this.mapData.lng
        // this.center.lat = this.mapData.lat
        // this.position.lng = this.mapData.lng
        // this.position.lat = this.mapData.lat
        // this.zoom = 18
        // console.log(this.map)
        if (Object.keys(this.map).length > 0) {
          this.handler(this.map)
        }
      }
    }
  },
  methods: {
    handler ({ BMap, map }) {
      this.map = { BMap: BMap, map: map }
      if (ERROR_ARR.some(item => item === this.mapData.lng) || ERROR_ARR.some(item => item === this.mapData.lat)) {
        this.text = `当前城市未找到对应的点，经度：${this.mapData.lng}，纬度：${this.mapData.lat}`
        this.center.lng = this.cityPosition.lng
        this.center.lat = this.cityPosition.lat
        this.zoom = 18
        // this.position.lng = this.cityPosition.lng
        // this.position.lat = this.cityPosition.lat
        this.isErrorPosition = true
      } else {
        setTimeout(() => {
          this.center.lng = this.mapData.lng
          this.center.lat = this.mapData.lat
          this.zoom = 18
          this.position.lng = this.mapData.lng
          this.position.lat = this.mapData.lat
          this.isErrorPosition = false
        }, 100)
        this.geocoder = new BMap.Geocoder()
        this.currentPoint = new BMap.Point(this.busDetails.lng, this.busDetails.lat)
      }
    },
    getPoint (point) {
      this.infoWindow.show = true
      if (!this.isErrorPosition) {
        this.geocoder.getLocation(point, res => {
          this.address = res.address
        })
      } else {
        this.address = ''
      }
    },
    // handleClick () {
    //   this.$message.error(this.text)
    // },
    draw ({ el, BMap, map }) {
      const { lng, lat } = this.cityPosition
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 200 + 'px'
      el.style.top = pixel.y - 20 + 'px'
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
.sample {
  width: 400px;
  height: 40px;
  line-height: 40px;
  background: rgba(0,0,0,0.5);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
}
.sample .active {
  background: rgba(0,0,0,0.75);
  color: #fff;
}
</style>
