<template>
  <div class="map">
    <HotMap />
  </div>
</template>

<script>
import HotMap from './Components/map'
export default {
  name: 'hotMap',
  data () {
    return {
    }
  },
  components: {
    HotMap
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 93vh;
  position: relative;
}
</style>
