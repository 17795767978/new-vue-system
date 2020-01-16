<template>
  <div class="map-wrapper" v-loading="show">
    <!-- <el-button type="primary" style="position: absolute; z-index: 999; top: 1vh; left: 2vw;" @click="reset">暂停</el-button> -->
    <el-button type="primary" size="small" style="position: absolute; z-index: 999; top: 3vh; left: 2vw;" @click="go">重播</el-button>
    <baidu-map class="map" :center="path[3]" :zoom="15" :style="{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0, 0.5)'} " :ak="'7vVOlMOKr03PaWX82WajF6m'"
      :mapClick="false"
      :scroll-wheel-zoom="false"
      @click="getPoint"
      @ready="handler">
      <bm-marker style="z-index: 9999; position: absolute" v-for="(item, index) in dataTo" :position="{lng: item.lng, lat: item.lat}" :key="index"  @click="handleInfo"  :title="`${item.lng}-${item.lat}`">
      </bm-marker>
      <bm-driving :start="{
        lng: 104.654793,
        lat: 28.771449
      }" :end="{
        lng: 104.705663,
        lat: 28.802875
      }" :panel="false" :autoViewport="false"></bm-driving>
      <bml-lushu
        @stop="reset"
        :path="path"
        :icon="icon"
        :play="play"
        :speed="500"
        :content="content"
        :autoView="true"
        :rotation="true">
      </bml-lushu>
    </baidu-map>
  </div>
</template>

<script>
import { BaiduMap, BmlLushu, BmDriving, BmMarker } from 'vue-baidu-map'
import { setTimeout } from 'timers'
export default {
  components: {
    BaiduMap,
    BmlLushu,
    BmDriving,
    BmMarker
  },
  data () {
    return {
      address: '',
      show: true,
      content: '123',
      play: true,
      dataTo: [
        {
          lng: 104.654793,
          lat: 28.771449,
          bShow: false,
          html: `<div>123</div>`,
          pauseTime: 500
        },
        {
          lng: 104.653123,
          lat: 28.7654,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 10,
          bShow: false
        },
        {
          lng: 104.666257,
          lat: 28.774314,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.674613,
          lat: 28.781925,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.684964,
          lat: 28.791632,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.700523,
          lat: 28.796219,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.705989,
          lat: 28.797774,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.705663,
          lat: 28.802875,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        }
      ],
      path: [],
      kobe: [],
      icon: {
        url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
        size: { width: 50, height: 26 },
        opts: { anchor: { width: 27, height: 13 } }
      }
    }
  },
  mounted () {
    this.show = true
    setTimeout(() => {
      this.show = false
      this.path = [
        {
          lng: 104.654793,
          lat: 28.771449,
          bShow: false,
          html: `<div>123</div>`,
          pauseTime: 500
        },
        {
          lng: 104.653123,
          lat: 28.7654,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 10,
          bShow: false
        },
        {
          lng: 104.666257,
          lat: 28.774314,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.674613,
          lat: 28.781925,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.684964,
          lat: 28.791632,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.700523,
          lat: 28.796219,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.705989,
          lat: 28.797774,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.705663,
          lat: 28.802875,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        }
      ]
    }, 1000)
  },
  methods: {
    handler ({ BMap, map }) {
      this.zoom = 18
      this.geocoder = new BMap.Geocoder()
      // this.center = this.center
    },
    reset () {
      this.play = false
    },
    getPoint (e) {
      if (!this.isErrorPosition) {
        this.geocoder.getLocation(e.point, res => {
          this.address = res.address
          // console.log(this.address)
        })
      } else {
        this.address = ''
      }
    },
    go () {
      this.play = true
    },
    handleInfo (e) {
      console.log(event)
      if (!this.isErrorPosition) {
        this.geocoder.getLocation(e.point, res => {
          this.address = res.address
          console.log(this.address)
        })
      } else {
        this.address = ''
      }
      // this.$notify({
      //   title: item.lng,
      //   message: item.lat,
      //   duration: 0
      // })
    }
  }
}
</script>

<style scoped lang="scss">
.map-wrapper {
  width: 100%;
  height: 100%;
  .map {
    width: 100%;
    height: 100%;
  }
}
</style>
