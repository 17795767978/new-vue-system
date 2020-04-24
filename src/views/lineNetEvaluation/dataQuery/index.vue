<template>
  <div style="height: 100%">
    <keep-alive :include="cachedViews">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'lineDataQuery',
  data () {
    return {
      includeView: []
    }
  },
  computed: {
    ...mapGetters(['cachedViews'])
  },
  beforeMount () {
    this.$store.dispatch('addCachedView', 'lineDataQuery')
  },
  beforeDestroy () {
    this.$store.dispatch('removeCachedView', 'lineDataQuery')
  }
}
</script>

<style>
</style>
