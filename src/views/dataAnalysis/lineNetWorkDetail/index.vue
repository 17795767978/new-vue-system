<template>
  <div>
    <Search
      :isOrg='true'
      :isLine="true"
      :isBus="false"
      :isDate="false"
      :isTime="false"
      :isTurn="false"
      :isDownload="false"
      :isWarntype="false"
      @configCheck="getSearch"
    />
    <div class="content-wrapper">
      <div class="title">线网评分详情</div>
      <div class="content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="站点建设合理性" name="first">站点建设合理性</el-tab-pane>
        <el-tab-pane label="舒适性" name="second">舒适性</el-tab-pane>
        <el-tab-pane label="便捷性" name="third">便捷性</el-tab-pane>
        <el-tab-pane label="快捷性" name="fourth">快捷性</el-tab-pane>
      </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
export default {
  name: 'lineNetWorkDetail',
  data () {
    return {
      selectData: {},
      echartsData: {},
      activeName: 'first'
    }
  },
  methods: {
    getSearch (data) {
      this.selectData = data
    },
    handleClick (tab, event) {
      console.log(tab)
      console.log(event)
    }
  },
  mounted () {
  },
  components: {
    Search
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 100%;
  height: calc(100vh - 16vh);
  padding: 2vh 2vw;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .title {
    width: 100%;
    height: 4vh;
    line-height: 4vh;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    border-bottom: 2px solid #E4E7ED;
    box-sizing: border-box;
  }
  .content {
    width: 100%;
    height: calc(100vh - 22vh)
  }
}
</style>
