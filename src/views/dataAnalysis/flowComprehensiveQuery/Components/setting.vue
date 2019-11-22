<template>
  <div class="bt-wrapper">
    <el-row>
      <el-button type="primary" size="mini" round :plain="isStation" @click="isStationTo">刷卡总量</el-button>
      <el-button type="success" size="mini" round :plain="isTime" @click="isTimeTo">周转量</el-button>
      <el-button type="warning" size="mini" round :plain="isRate" @click="isRateTo">平均运距</el-button>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'comprehensiveQuery',
  props: {
    selectData: {
      type: Object
    },
    isDefault: {
      type: Boolean
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
        this.isStationTo()
      }
    },
    isDefault (newV) {
      if (newV) {
        this.isStationTo()
        this.$emit('changeDefault')
      }
    }
  },
  methods: {
    isStationTo () {
      this.isStation = false
      this.isTime = true
      this.isRate = true
      this.$store.dispatch('getQuery', '1')
    },
    isTimeTo () {
      this.isStation = true
      this.isTime = false
      this.isRate = true
      this.$store.dispatch('getQuery', '2')
    },
    isRateTo () {
      this.isStation = true
      this.isTime = true
      this.isRate = false
      this.$store.dispatch('getQuery', '3')
    }
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
