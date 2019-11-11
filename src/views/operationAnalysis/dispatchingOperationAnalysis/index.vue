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
  }
}
</script>

<style>
</style>
