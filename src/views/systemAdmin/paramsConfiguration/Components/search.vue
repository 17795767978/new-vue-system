<template>
<div class="header">
  <el-form :model="searchForm" ref="searchForm"  label-width="80px" :inline="true">
    <el-form-item label="报警类型"  prop="paramName">
      <el-select
        size="mini"
        v-model="searchForm.paramName"
        filterable
        placeholder="请选择"
        collapse-tags>
        <el-option
          v-for="item in warnOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
      },
      warnOptions: []
    }
  },
  mounted () {
    this.search()
    this._initWarn()
  },
  watch: {
    '$store.state.globel.warnTypeList': {
      handler (newV) {
        this.warnOptions = newV
      }
    }
  },
  methods: {
    _initWarn () {
      this.warnOptions = this.$store.state.globel.warnTypeList
    },
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
