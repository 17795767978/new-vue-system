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
  name: 'dataQuery',
  data () {
    return {
      includeView: []
    }
  },
  computed: {
    ...mapGetters(['cachedViews'])
  },
  beforeMount () {
    this.$store.dispatch('addCachedView', 'dataQuery')
  },
  beforeDestroy () {
    this.$store.dispatch('removeCachedView', 'dataQuery')
  }
}
</script>

<style>
</style>
