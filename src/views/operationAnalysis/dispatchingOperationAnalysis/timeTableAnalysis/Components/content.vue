<template>
  <div class="content-wrapper">
    <el-row class="up-content">
      <h3 class="title">
        客流高峰时刻分析（上行）
      </h3>
      <div class="heat-chart-wrapper">
        <upChart :headerParams='headerParams' :isUpdateUp="isUpdateUp" @isUpdateToUp="isUpdateToUp"></upChart>
      </div>
    </el-row>
    <el-row class="down-content">
      <h3 class="title">
        客流高峰时刻分析（下行）
      </h3>
      <div class="heat-chart-wrapper">
        <downChart :headerParams="headerParams" :isUpdateDown="isUpdateDown" @isUpdateToDown="isUpdateToDown"></downChart>
      </div>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import upChart from './charts/upChart'
import downChart from './charts/downChart'
export default {
  props: {
    headerParams: {
      type: Object
    },
    isUpdateUp: {
      type: Boolean
    },
    isUpdateDown: {
      type: Boolean
    }
  },
  data () {
    return {
      busLine: '1路'
    }
  },
  components: {
    upChart,
    downChart
  },
  created () {},
  methods: {
    isUpdateToUp () {
      this.$emit('isUpdateFaUp', false)
    },
    isUpdateToDown () {
      this.$emit('isUpdateFaDown', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 100%;
  padding: 20px 20px;
  box-sizing: border-box;
  .title {
    color: #928f8d;
    text-align: center;
    margin: 10px 0;
  }
  .up-content {
    width: 100%;
    border-bottom: 1px solid #eee;
    margin-bottom: 0;
    // padding-bottom: 5%;
    .heat-chart-wrapper {
      width: 80%;
      margin: 0 auto;
      box-sizing: border-box;
    }
  }
  .down-content {
    width: 100%;
    margin-bottom: 0;
    margin-top: 10px;
    // padding-bottom: 10%;
    .heat-chart-wrapper {
      width: 80%;
      margin: 0 auto;
      box-sizing: border-box;
    }
  }
}
</style>
