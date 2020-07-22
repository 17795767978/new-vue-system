<template>
  <div class="msgSendDialogCard">
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @close="close"
      width="30%">
      <div style="margin-bottom: 2vh;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="名称" prop="voicetempContent">
                <el-input v-model="ruleForm.voicetempContent" size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="编码" prop="voicetempTypeCode">
                <el-input v-model="ruleForm.voicetempTypeCode" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-button @click="submitForm('ruleForm')" style="margin-top: 4px;" type="primary" size="small">确认修改</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span style="font-size: 14px;font-weight: 900;">提醒内容</span>
          <el-button @click="addContent" style="float: right; padding: 3px 0" type="text" icon="el-icon-circle-plus-outline">新增</el-button>
        </div>
        <div style="min-height: 100px;">
          <inside-table ref="insideTable" v-if="restTable" :insideParams="insideTableConf"></inside-table>
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
          this.insideTableConf = this.config
          this.ruleForm.voicetempContent = this.config.voicetempContent
          this.ruleForm.voicetempTypeCode = this.config.voicetempTypeCode
        } else {
          this.ruleForm.voicetempContent = ''
          this.ruleForm.voicetempTypeCode = ''
          // 新建一个提醒类型
          this.addNewVoicetempType()
        }
        this.reDrawTable()
      }
    }
  },
  methods: {
    /* 新建一个提醒类型 */
    addNewVoicetempType () {
      this.$api['msgsend.addNewVoicetempTypeData']().then(res => {
        this.$set(this.insideTableConf, 'voicetempTypeUuid', res.voicetempTypeUuid)
        this.reDrawTable()
      })
      // TODO: 测试数据 生产环境需注释==================
      // const res = {
      //   code: '200',
      //   msg: '成功',
      //   success: 'true',
      //   message: '成功',
      //   data: {
      //     voicetempTypeUuid: '88888888'
      //   }
      // }
      // this.$set(this.insideTableConf, 'voicetempTypeUuid', res.data.voicetempTypeUuid)
      // this.reDrawTable()
      // ================================================
    },
    close () {
      this.clearTip()
      this.$emit('close')
      // 如果是新增数据，在没有保存时，关闭后移除此数据
      if (this.config === null && !this.isSave) {
        this.$api['msgsend.delNewVoicetempTypeById']({
          voicetempTypeUuid: this.insideTableConf.voicetempTypeUuid
        })
      }
    },
    addContent () {
      this.$prompt('请编辑内容', '新增提醒内容', {
        inputValue: '',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value === '') {
          this.$message({
            type: 'error',
            message: '提交内容不可为空！'
          })
        } else {
          this.$api['msgsend.addVoicetempMessage']({
            voicetempTypeUuid: this.insideTableConf.voicetempTypeUuid,
            voicetempMessageContent: value
          }).then(res => {
            this.$message({
              type: 'success',
              message: '新增成功！'
            })
            // 刷新列表
            this.$refs.insideTable.updateTable(this.insideTableConf.voicetempTypeUuid)
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    reDrawTable () {
      this.restTable = false
      const timer = setTimeout(() => {
        this.restTable = true
        clearTimeout(timer)
      }, 500)
    },
    /* 保存修改 */
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api['msgsend.editNewVoicetempTypeById']({
            voicetempTypeUuid: this.insideTableConf.voicetempTypeUuid,
            voicetempContent: this.ruleForm.voicetempContent,
            voicetempTypeCode: this.ruleForm.voicetempTypeCode
          }).then(res => {
            this.$message({
              type: 'success',
              message: '保存成功！'
            })
            this.isSave = true
            this.$parent.resetTable()
          }).catch(error => {
            this.$message({
              type: 'error',
              message: `保存失败:${JSON.stringify(error)}，请联系管理员！`
            })
            this.clearTip()
          })
        } else {
          this.$message({
            type: 'error',
            message: '您的格式无法通过校验！'
          })
          return false
        }
      })
    },
    /* 清除校验提示语 */
    clearTip () {
      this.$refs.ruleForm.resetFields()
    }
  },
  data () {
    return {
      isSave: false,
      insideTableConf: {},
      restTable: true,
      ruleForm: {
        voicetempContent: '',
        voicetempTypeCode: ''
      },
      rules: {
        voicetempContent: [
          { required: true, message: '请输入提醒类型名称', trigger: 'blur' },
          { min: 2, message: '长度不得低于2个字符', trigger: 'blur' }
        ],
        voicetempTypeCode: [
          { required: true, message: '请输入提醒类型编码', trigger: 'blur' },
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
