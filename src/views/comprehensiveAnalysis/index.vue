<template>
  <div class="comprehensive-analysis">
    <div class="top-title">
      <el-row :gutter="20">
        <el-col :offset="7" :span="10">
          <div class="title-wrapper">公交集团运营监控</div>
        </el-col>
        <el-col :span="7">
          <weather></weather>
        </el-col>
      </el-row>
    </div>
    <div class="main"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import weather from './Components/weather'
export default {
  components: {
    weather
  }
}
</script>

<style lang="scss" scoped>
.comprehensive-analysis {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: #00082d;
  .top-title {
    width: 100%;
    height: 80px;
    .title-wrapper {
      height: 100%;
      text-align: center;
      line-height: 80px;
      color: #fff;
      font-weight: bold;
      font-size: 26px;
      font-family:fantasy
    }
  }
  .main {
    width: 100%;
    height: 75%
  }
}
</style>
