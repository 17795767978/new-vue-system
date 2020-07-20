<template>
  <div class="msgSendDialogCard">
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @close="close"
      width="30%">
      <div style="margin-bottom: 2vh;width: 280px;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span style="font-size: 14px;font-weight: 900;">提醒内容</span>
          <el-button @click="addContent" style="float: right; padding: 3px 0" type="text" icon="el-icon-circle-plus-outline">新增</el-button>
        </div>
        <div v-if="config !== null">
          <inside-table :insideParams="config"></inside-table>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
import InsideTable from './insideTable'
export default {
  name: 'popDialog',
  components: {
    InsideTable
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  computed: {
    dialogTitle () {
      const config = this.config
      return config === null ? '新增提醒类型' : '编辑提醒类型'
    }
  },
  watch: {
    dialogVisible (val) {
      if (val) {
        if (this.config !== null) {
          this.ruleForm.name = this.config.name
        } else {
          this.ruleForm.name = ''
        }
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    addContent () {
      this.$prompt('请编辑内容', '新增提醒内容', {
        inputValue: '',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你调整后的值为: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
  },
  data () {
    return {
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入提醒类型名称', trigger: 'blur' },
          { min: 2, message: '长度不得低于2个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
<style>
  .msgSendDialogCard .el-card__header {
    border-bottom: none!important;
  }
  .msgSendDialogCard .el-card__header {
    padding: 10px 4px!important;
  }
  .msgSendDialogCard .el-card__body {
    padding: 6px!important;
  }
  .msgSendDialogCard .el-dialog__body {
    padding: 10px!important;
  }
</style>
