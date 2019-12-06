<template>
  <keep-alive :include="cachedViews">
      <router-view></router-view>
  </keep-alive>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dataAnalysis',
  computed: {
    ...mapGetters(['cachedViews'])
  },
  beforeMount () {
    this.$store.dispatch('addCachedView', 'dataAnalysis')
  },
  beforeDestroy () {
    this.$store.dispatch('removeCachedView', 'dataAnalysis')
  }
}
</script>

<style>
</style>
