<template>
  <div class="data-wrapper">
    <el-button type="success" @click="closeWrapper" style="position: absolute; right: 10px; top: 20px; z-index: 1003">关闭</el-button>
    <div class="content-wrapper">
     <TopTitleMsg></TopTitleMsg>
     <StreamNum></StreamNum>
     <chartsComplete></chartsComplete>
     <chartsMain></chartsMain>
     <bottomChart></bottomChart>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TopTitleMsg from './Components/topTitleMsg.vue'
import StreamNum from './Components/streamNum.vue'
import chartsComplete from './Components/chartsComplete.vue'
import chartsMain from './Components/chartsMain.vue'
import bottomChart from './Components/bottomChart.vue'
import { Button } from 'element-ui'
export default {
  name: 'chartAnalysis',
  data () {
    return {
    }
  },
  methods: {
    closeWrapper () {
      this.$router.push('/homepage/home')
    }
  },
  components: {
    TopTitleMsg,
    StreamNum,
    chartsComplete,
    chartsMain,
    bottomChart,
    'el-button': Button
  }
}
</script>

<style lang="scss" scoped>
.data-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  min-height: calc(100vh);
  overflow: auto;
  background: url(../../assets/images/space.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 1002;
  padding: 10px;
  box-sizing: border-box;
  .content-wrapper {
    padding: 0;
    box-sizing: border-box;
  }
}
</style>
