<template>
  <div class="map-wrapper" v-loading="show">
    <!-- <el-button v-if="path && path.length > 0" type="primary" size="small" style="position: absolute; z-index: 999; top: 3vh; left: 2vw;" @click="go">重播</el-button> -->
    <div class="no-data" v-if="path && path.length === 0">暂无报警轨迹数据</div>
    <baidu-map class="map" :center="path && path.length > 0 ? {lng: path[0].lng, lat: path[0].lat} : {lng: 104.61947, lat: 28.76593}" :zoom="16" :style="{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0, 0.5)'} " :ak="'7vVOlMOKr03PaWX82WajF6m'"
      :mapClick="false"
      :scroll-wheel-zoom="true"
      @ready="handler">
      <div v-for="(item, index) in path" :key="item.lng + item.lat + index" >
        <bm-marker  :position="{lng: item.lng, lat: item.lat}"  @click="handleInfo"  :title="`${item.lng}-${item.lat}`">
          <bm-label v-if="index === 0 || index === path.length - 1" :content="index === 0 ? '起点' : '终点'" :labelStyle="{color: 'black', fontSize : '14px', border: '1px solid #fff'}" :offset="{width: 20, height: 5}"/>
          <!-- <bm-info-window :show="isShowWindow" @close="infoWindowClose" @open="infoWindowOpen">位置: {{address}}</bm-info-window> -->
        </bm-marker>
      </div>
      
      <!-- <bm-driving v-if="path && path.length > 0" v-loading="show" :start="path && path[0]" :end="path && path[path.length - 1]" :panel="false" :autoViewport="false"></bm-driving> -->
      <!-- <bml-lushu
        v-if="path && path.length > 0"
        @stop="reset"
        :path="path"
        :icon="icon"
        :play="play"
        :speed="500"
        :content="content"
        :autoView="true"
        :rotation="true">
      </bml-lushu> -->
    </baidu-map>
  </div>
</template>

<script>
import { BaiduMap, BmlLushu, BmDriving, BmMarker, BmLabel } from 'vue-baidu-map'
export default {
  props: {
    warnTrails: {
      type: Array
    }
  },
  components: {
    BaiduMap,
    BmlLushu,
    BmDriving,
    BmMarker,
    BmLabel
  },
  inject: ['parent'],
  data () {
    return {
      center: {},
      address: '',
      show: true,
      isShowWindow: true,
      content: '车',
      play: true,
      dataTo: [],
      path: [],
      icon: {
        url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
        size: { width: 50, height: 26 },
        opts: { anchor: { width: 27, height: 13 } }
      }
    }
  },
  created () {
    this.show = true
    setTimeout(() => {
      if (this.warnTrails) {
        this.path = this.warnTrails
        this.dataTo = this.warnTrails
      } else {
        this.path = []
        this.dataTo = []
      }
      this.content = this.parent.overspeedDetails.busPlateNumber
      this.show = false
    }, 1000)
  },
  activated () {
  },
  watch: {
    warnTrails (newV) {
      this.show = true
      setTimeout(() => {
        if (newV) {
          this.path = newV
          this.dataTo = newV
        } else {
          this.path = []
          this.dataTo = []
        }
        this.content = this.parent.overspeedDetails.busPlateNumber
        this.show = false
      }, 1000)
    }
  },
  methods: {
    handler ({ BMap, map }) {
      this.zoom = 15
      this.geocoder = new BMap.Geocoder()
    },
    reset () {
      this.play = false
    },
    go () {
      this.play = true
    },
    infoWindowClose () {
      this.isShowWindow = false
    },
    infoWindowOpen () {
      this.isShowWindow = true
    },
    handleInfo (e) {
      console.log(e.point)
      this.isShowWindow = true
      this.geocoder.getLocation(e.point, res => {
        this.address = res.address
        this.$emit('getLocation', this.address)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.map-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .map {
    width: 100%;
    height: 100%;
  }
  .no-data {
    width: 10vw;
    height: 5vh;
    text-align: center;
    line-height: 5vh;
    font-size: 1vw;
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -5vw;
    margin-top: -2.5vh;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000
  }
}
</style>
