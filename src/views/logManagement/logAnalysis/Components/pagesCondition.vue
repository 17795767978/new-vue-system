<template>
  <div class="day-log">
    <Title :name="name"/>
    <div class="echart"></div>
  </div>
</template>

<script>
import Title from './titleSearch'
export default {
  data () {
    return {
      name: '页面操作频次统计'
    }
  },
  components: {
    Title
  }
}
</script>

<style lang="scss" scoped>
.day-log {
  width: 100%;
  height: 100%;
}
</style>
