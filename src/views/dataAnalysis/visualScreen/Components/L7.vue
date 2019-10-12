<template>
  <div id="map">
  </div>
</template>

<script type="text/ecmascript-6">
import L7 from '@antv/l7'
export default {
  data () {
    return {
      scene: null
    }
  },
  mounted () {
    const scene = new L7.Scene({
      id: 'map',
      mapStyle: 'amap://styles/grey', // 样式URL
      center: [120.1648267, 30.258134],
      pitch: 0,
      zoom: 15,
      hash: false
    })
    this.scene = scene
    // console.log(this.scene.setMapStyle('amap://styles/a92c23c68ca519ec235825c3be99462b'))
    this.scene.on('loaded', () => {
      this.$axios.get('https://gw.alipayobjects.com/os/basement_prod/40ef2173-df66-4154-a8c0-785e93a5f18e.json').then(res => {
        console.log(res)
        scene.LineLayer({
          zIndex: 2
        }).source(res.data).size(1).shape('line').color('#fff').animate({
          enable: true,
          interval: 1,
          duration: 1,
          trailLength: 1
        }).render()
      })
    })
  }
}
</script>

<style scoped lang="scss">
#map {
  width: 100%;
  height: 100%;
}
</style>
<style>
  .l7-control-container .l7-control-attribution {
    display: none
  }
</style>
