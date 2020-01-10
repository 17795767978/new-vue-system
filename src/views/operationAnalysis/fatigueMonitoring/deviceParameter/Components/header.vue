<template>
  <div class="header">
    <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
      <el-form-item label="任务名称" v-if="isDeviceParameter">
        <el-input class="font-style" v-model="formInline.taskName" filterable></el-input>
      </el-form-item>
      <el-form-item label="下发状态" v-else>
        <el-radio v-model="formInline.taskStatus" label="1">成功</el-radio>
        <el-radio v-model="formInline.taskStatus" label="0">失败</el-radio>
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
        taskName: '',
        taskStatus: ''
      }
    }
  },
  props: {
    tableData: {
      type: Array,
      default: function () {
        return []
      }
    },
    isDeviceParameter: {
      type: Boolean
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
      if ((this.isDeviceParameter && !this.formInline.taskName) || (!this.isDeviceParameter && !this.formInline.taskStatus)) {
        this.$message.error('请添加完整的查询条件')
        return
      }
      this.$emit('configCheck', this.formInline)
    },
    onClear () {
      this.formInline.taskName = ''
      this.formInline.taskStatus = ''
      this.$emit('configCheck', this.formInline)
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
