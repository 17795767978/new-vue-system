<template>
  <div class="log-manangement" style="height:100%">
    <keep-alive :include="cachedViews">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'logManagement',
  data () {
    return {
      includeView: []
    }
  },
  computed: {
    ...mapGetters(['cachedViews'])
  },
  beforeMount () {
    this.$store.dispatch('addCachedView', 'logManagement')
  },
  beforeDestroy () {
    this.$store.dispatch('removeCachedView', 'logManagement')
  }
}
</script>

<style>

</style>
