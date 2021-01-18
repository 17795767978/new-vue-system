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
  name: 'fatigueMonitoring',
  data () {
    return {
      includeView: []
    }
  },
  computed: {
    ...mapGetters(['cachedViews'])
  },
  mounted () {}
}
</script>

<style>
</style>
