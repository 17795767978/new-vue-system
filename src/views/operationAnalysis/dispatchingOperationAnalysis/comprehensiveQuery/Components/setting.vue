<template>
  <div class="bt-wrapper">
    <el-row>
      <el-button type="primary" size="mini" round :plain="isStation" @click="isStationTo">线路站点登降量</el-button>
      <el-button type="success" size="mini" round :plain="isTime" @click="isTimeTo">线路时段登降量</el-button>
      <!-- <el-button type="warning" size="mini" round :plain="isRate" @click="isRateTo">线路站点满载率</el-button> -->
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'comprehensiveQuery',
  props: {
    selectData: {
      type: Object
    }
  },
  data () {
    return {
      isStation: true,
      isTime: true,
      isRate: true
    }
  },
  created () {
    this.isStation = false
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.isStation = false
        this.isTime = true
        this.isRate = true
        this.$store.dispatch('getStation', '1')
      }
    }
  },
  methods: {
    isStationTo () {
      this.isStation = false
      this.isTime = true
      this.isRate = true
      this.$store.dispatch('getStation', '1')
    },
    isTimeTo () {
      this.isStation = true
      this.isTime = false
      this.isRate = true
      this.$store.dispatch('getStation', '2')
    }
    // isRateTo () {
    //   this.isStation = true
    //   this.isTime = true
    //   this.isRate = false
    //   this.$store.dispatch('getStation', '3')
    // }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.bt-wrapper {
  width: calc(100% - 220px);
  height: 3vh;
  margin-top: 1vh;
}
</style>
