<template>
  <div>
    <BigScreen>
      <Map></Map>
      <div class="content">
        <h1 style="font-size: 2vw; color: #fff;margin-bottom: 0">公交运营全景</h1>
        <h4 style="font-size1vw;color: #fff;margin-bottom: 0; margin-top: 0.5vh">Panorama of Bus Operation</h4>
      </div>
    </BigScreen>
  </div>
</template>

<script type="text/ecmascript-6">
import BigScreen from '@/components/bigScreen/index'
import Map from './Components/L7'
export default {
  name: 'bigHomeScreen',
  data () {
    return {
      isSee: false
    }
  },
  components: {
    BigScreen,
    Map
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 20vw;
  height: 12vh;
  position: absolute;
  left: 5vw;
  top: 1vh;
  z-index: 1002;
  padding: 1vh 2vw;
  box-sizing: border-box;
  text-align: center;
}
</style>
