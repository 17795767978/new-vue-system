<template>
<div class="header">
  <el-form :model="searchForm" ref="searchForm"  label-width="80px" :inline="true">
    <el-form-item label="报警类型"  prop="paramName">
      <el-input v-model="searchForm.paramName" style="width: 200px;" size="mini"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native="search" size="mini">查询</el-button>
      <el-button @click="resetForm('searchForm')" size="mini">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
export default {
  name: 'ParamsConfSearch',
  data () {
    return {
      searchForm: {
        paramName: ''
      }
    }
  },
  mounted () {
    this.search()
  },
  methods: {
    // 检索
    search: function () {
      this.$emit('search', Object.assign({}, this.searchForm))
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$emit('rest', Object.assign({}, this.searchForm))
    }
  }

}
</script>
<style lang="scss" scoped>
.header{
  width: 100%;
  // min-height: 10vh;
  border-bottom: 1px solid #eee;
  padding: 10px 20px 0px 20px;
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  margin-bottom: 4vh;
  .el-form-item{
    margin-bottom:10px;
  }
}

</style>
