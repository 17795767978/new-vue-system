<template>
  <div style="width: 100%;height: 100%;">
    <mapChart
     :isHotMap="false"
     :isSearchLine="true"
     :isCarsDetail="true"
     :isLineMap="false"
     :isSelect="false"
     :isFlv="true"
    ></mapChart>
  </div>
</template>

<script>
import mapChart from '@/components/map/'
export default {
  components: {
    mapChart
  },
  mounted () {
    this.$store.state.views.activeNight ? this.skinType = 1 : this.skinType = 0
  },
  data () {
    return {
      skinType: 0 // 皮肤 0 白色 1 黑色
    }
  }
}
</script>

<style>

</style>
