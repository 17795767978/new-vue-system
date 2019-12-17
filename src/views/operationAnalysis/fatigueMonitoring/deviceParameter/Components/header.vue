<template>
  <div class="header">
    <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
      <el-form-item label="任务名称">
        <el-input class="font-style" v-model="formInline.taskName" filterable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onCheck">查询</el-button>
        <el-button type="warning" @click="onClear">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      formInline: {
        taskName: ''
      }
    }
  },
  computed: {
  },
  mounted () {
  },
  watch: {
    'formInline.taskName': {
      handler (newValue) {
      }
    }
  },
  methods: {
    onCheck () {
      if (this.formInline.taskName === '') {
        this.$message.error('请添加完整的查询条件')
        return
      }
      this.$emit('configCheck', this.formInline)
    },
    onClear () {
      this.formInline.taskName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  .form-inline {
    min-height: 4vh;
    .font-style {
      width: 130px;
    }
  }
}
</style>
<style lang="scss">
.header {
  .el-input__suffix-inner {
    display: none;
  }
}
</style>
