<template>
  <main class="main" id="contentMain">
    <!-- custom scroll bar for main area -->
    <!-- <VuePerfectScrollbar class="scroll-area" :settings="scrollOptions"> -->
      <keep-alive :include="cachedViews">
        <router-view />
      </keep-alive>
    <!-- </VuePerfectScrollbar> -->
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
// import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'Main',
  data () {
    return {
      scrollOptions: {
        // maxScrollbarLength: 500
      }
    }
  },
  computed: {
    ...mapGetters(['cachedViews'])
  },
  components: {
    // VuePerfectScrollbar
  }
}
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  width:100%;
  height:100%;
  padding:0;
  min-width:800px;
  overflow: hidden;

  .scroll-area{
      width:100%;
      height:100%;
      position: relative;

    > div {
      width:100%;
    }

  }

}

</style>
