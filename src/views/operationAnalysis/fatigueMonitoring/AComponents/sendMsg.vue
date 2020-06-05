<template>
  <div class="send-msg">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="下发设备" prop="dev">
        <el-select v-model="ruleForm.dev" placeholder="请选择下发设备">
          <el-option
            v-for="item in devOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提醒类型" prop="msgType">
        <el-select v-model="ruleForm.msgType" placeholder="请选择提醒类型">
          <el-option
            v-for="item in warnsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="提醒内容" prop="msgContent">
        <el-select v-model="ruleForm.msgContent" placeholder="请选择提醒内容">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="内容描述" prop="desc">
        <el-input type="textarea" :rows="5" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即下发</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    warnDetails: {
      type: Object
    }
  },
  data () {
    let markSuggestion = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写内容描述'))
      } else if (value.length && value.length > 150) {
        return callback(new Error('输入最大100字'))
      } else {
        callback()
      }
    }
    return {
      warnsOptions: [],
      devOptions: [{
        label: '调度主机',
        value: '1'
      }],
      ruleForm: {
        dev: '',
        msgType: '',
        // msgContent: '',
        desc: ''
      },
      rules: {
        dev: [{ required: true, message: '请选择下发设备', trigger: 'change' }],
        msgType: [{ required: true, message: '请选择提醒类型', trigger: 'change' }],
        desc: [{ validator: markSuggestion, trigger: 'change' }]
      }
    }
  },
  mounted () {
    this._alarmType({
      warnLevel: ''
    })
  },
  methods: {
    _alarmType (params) {
      this.$api['tiredMonitoring.getWarntypes'](params).then(res => {
        let dataArr = res
        this.warnsOptions = []
        dataArr.forEach((list, index) => {
          this.warnsOptions.push({
            label: list.value,
            value: list.code
          })
        })
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api['tiredMonitoring.Voiceprompt']({
            devType: this.ruleForm.dev,
            sendType: this.ruleForm.msgType,
            busUuid: this.warnDetails.busUuid,
            content: this.ruleForm.desc
          }).then(res => {
            this.$message.success('下发消息成功')
            this.ruleForm = {
              dev: '',
              msgType: '',
              // msgContent: '',
              desc: ''
            }
            this.resetForm('ruleForm')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.send-msg {
  width: 50%;
  height: 60vh;
  margin: 5vh auto;
}
</style>
