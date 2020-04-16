<template>
  <div class="alarm-dialog">
    <el-dialog title="报警处理" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="30%">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="操作类型" prop="hStatus">
          <el-select v-model="form.operType" placeholder="请选择操作类型">
            <el-option label="审核" value="2"></el-option>
            <el-option label="处理" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理类型" prop="hStatus">
          <el-select v-model="form.hStatus" placeholder="请选择处理类型">
            <el-option label="已处理" value="1"></el-option>
            <el-option label="误报" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否禁用" prop="hIsvalid">
          <el-select v-model="form.hIsvalid" placeholder="请选择处理状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="form.operType === '2' ? '审核意见' : '处理意见'" prop="hContext">
          <el-input type="textarea" v-model="form.hContext" style="width: 70%;" maxlength="100" :autosize="{ minRows: 2, maxRows: 7}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="handleOperation('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    rowData: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        hStatus: '',
        hContext: '',
        hIsvalid: '',
        operType: '1'
      },
      trigger: 'change',
      rules: {
        hStatus: [
          { required: true, message: '请选择意见类型', trigger: 'blur' }
        ],
        hContext: [
          { required: true, message: '请填写意见内容', trigger: 'blur' }
        ],
        hIsvalid: [
          { required: true, message: '请填写意见状态', trigger: 'blur' }
        ],
        operType: [
          {
            required: true, message: '请选择操作类型', trigger: 'blur'
          }
        ]
      },
      dialogFormVisible: false
    }
  },
  components: {
  },
  mounted () {
  },
  updated () {
    this.$refs['ruleForm'].clearValidate()
  },
  watch: {
    rowData: {
      deep: true,
      handler (newValue) {
        this.form = newValue
      }
    }
  },
  methods: {
    handleOperation (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          if (!this.form.uuid) {
            this.$api['tiredMonitoring.addAlarmResult'](this.form).then(res => {
              this.$message.success('创建成功')
              this.$emit('updateTable')
              this.dialogFormVisible = false
            }).catch(err => {
              this.$message.error(err.message)
            })
          } else {
            this.$api['tiredMonitoring.updateAlarmResult'](this.form).then(res => {
              this.$message.success('修改成功')
              this.$emit('updateTable')
              this.dialogFormVisible = false
            }).catch(err => {
              this.$message.error(err.message)
            })
          }
        } else {
          return false
        }
      })
    },
    onCancel (ruleForm) {
      this.dialogFormVisible = false
      this.$emit('updateTable')
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}
</style>
