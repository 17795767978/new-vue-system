<template>
  <div>
    <keep-alive :include="cachedViews">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dispatchingOperationAnalysis',
  computed: {
    ...mapGetters(['cachedViews'])
  },
  beforeMount () {
    this.$store.dispatch('addCachedView', 'dispatchingOperationAnalysis')
  },
  beforeDestroy () {
    this.$store.dispatch('removeCachedView', 'dispatchingOperationAnalysis')
  }
}
</script>

<style>
</style>
