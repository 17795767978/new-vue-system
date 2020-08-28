<template>
  <div class="person-detail-content">
    <h3 class="demonstration">
      <span>报警详情</span>
      <div style="width: 20vw; float: right">
        <el-button type="primary" size="mini" @click="handlerCheck" :disabled="busDetails.handleResult !== '0'">处理</el-button>
        <!-- <el-button type="warning" size="mini" @click="handlerAudit"  v-else>审核</el-button> -->
        <el-button type="info" size="mini" @click="handlerPhone">IP下发</el-button>
        <el-button type="success" size="mini" @click="handlerMsg">语音下发</el-button>
      </div>
    </h3>
    <el-row :gutter="24">
       <el-col :span="6">
        <i class="fa fa-credit-card"></i>
        <span>车牌号：</span>
        <span>{{busDetails.busPlateNumber}}</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-drivers-license-o"></i>
        <span>自编号：</span>
        <span>{{busDetails.busSelfCode}}</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-arrows-h"></i>
        <span>所属线路：</span>
        <span>{{busDetails.lineName}}</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-building"></i>
        <span>所属公司：</span>
        <span>{{busDetails.orgName}}</span>
       </el-col>
    </el-row>
    <el-row :gutter="24">
       <el-col :span="6">
        <i class="fa fa-code-fork"></i>
        <span>报警级别：</span>
        <span>{{busDetails.warnLevel}}级</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-exclamation-triangle"></i>
        <span>报警类型：</span>
        <span>{{busDetails.warnTypeName}}</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-clock-o"></i>
        <span>报警时间：</span>
        <span>{{timeFormat}}</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-flash"></i>
        <span>速度：</span>
        <span>{{busDetails.speed}}KM/H</span>
       </el-col>
    </el-row>
    <el-dialog
      title="处理操作"
      :visible.sync="checkDialog"
      width="30%"
      center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="处理状态" prop="status">
          <el-select v-model="ruleForm.status">
            <el-option
              v-for="item in checkOptions.slice(1)"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理内容" prop="selectCheckContent">
          <el-select v-model="ruleForm.selectCheckContent">
            <el-option
              v-for="item in checkcontentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理意见" prop="suggestion">
          <el-input type="textarea" v-model="ruleForm.suggestion" maxlength="100"></el-input>
          <span>{{ruleForm.suggestion.length}}/100</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="upDateCheck('ruleForm')">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="语音下发"
      :visible.sync="msgDialog"
      width="30%"
      center>
      <el-form :model="ruleFormWarn" ref="ruleFormWarn" label-width="100px" class="demo-ruleForm">
        <el-form-item label="提醒类型" prop="status">
          <el-select v-model="ruleFormWarn.status">
            <el-option
              v-for="item in warnsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-button type="primary" style="margin-left: 5vw;" size="mini" v-if="isSafeSend" @click="gotoDetail">下发消息维护</el-button> -->
        </el-form-item>
        <el-form-item label="提醒内容" prop="msgContent">
          <el-select v-model="ruleFormWarn.msgContent">
            <el-option
              v-for="item in msgOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容描述" prop="suggestion">
          <el-input type="textarea" v-model="ruleFormWarn.suggestion" maxlength="100" size="mini"></el-input>
          <span>{{ruleFormWarn.suggestion.length ? ruleFormWarn.suggestion.length : 0}}/100</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetFormMsg('ruleFormWarn')">取 消</el-button>
        <el-button type="primary" @click="upDateMsg('ruleFormWarn')">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
export default {
  name: 'alarmContent',
  props: {
    busDetails: {
      type: Object
    }
  },
  data () {
    let markSuggestion = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length && value.length > 100) {
        return callback(new Error('输入最大100字'))
      } else {
        callback()
      }
    }
    return {
      checkDialog: false,
      ruleForm: {
        status: '',
        suggestion: '',
        selectCheckContent: '' // 选择处理的内容
      },
      ruleFormWarn: {
        status: '',
        msgContent: '',
        suggestion: ''
      },
      rules: {
        status: [
          { required: true, message: '请选择处理状态', trigger: 'blur' }
        ],
        suggestion: [
          { validator: markSuggestion, trigger: 'blur' }
        ]
      },
      checkcontentOptions: [],
      checkOptions: [
        {
          value: '0',
          label: '未处理'
        },
        {
          value: '1',
          label: '已处理'
        },
        {
          value: '2',
          label: '误报'
        }
      ],
      msgDialog: false,
      warnsOptions: [],
      msgOptions: []
    }
  },
  mounted () {
  },
  computed: {
    timeFormat () {
      return moment(this.busDetails.warnTime).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  watch: {
    'ruleForm.status': {
      handler (newV) {
        this.ruleForm.selectCheckContent = ''
        this.ruleForm.suggestion = ''
        if (newV === '1') {
          this._getCheckOptions({
            handleStatus: '1',
            handleType: '1',
            handleIsvalid: '1'
          })
        } else if (newV === '2') {
          this._getCheckOptions({
            handleStatus: '2',
            handleType: '1',
            handleIsvalid: '1'
          })
        } else {
          this._getCheckOptions({
            handleStatus: '',
            handleType: '1',
            handleIsvalid: '1'
          })
        }
      }
    },
    'ruleForm.selectCheckContent': {
      handler (newV) {
        this.ruleForm.suggestion = newV
      }
    },
    'ruleFormWarn.status': {
      handler (newV) {
        this.ruleFormWarn.msgContent = ''
        this.ruleFormWarn.suggestion = ''
        this._contentType({
          voicetempTypeUuid: newV,
          pageNum: 1,
          pageSize: 100000
        })
      }
    },
    'ruleFormWarn.msgContent': {
      handler (newV) {
        const selectData = this.msgOptions.filter(item => item.value === newV)
        this.ruleFormWarn.suggestion = selectData.length ? selectData[0].label : ''
      }
    }
  },
  methods: {
    handlerCheck () {
      this.checkDialog = true
      this._getCheckOptions({
        handleStatus: '',
        handleType: '1',
        handleIsvalid: '1'
      })
    },
    handlerPhone () {
      this.$api['tiredMonitoring.getBuslsOnLine']({ busPlateNumber: this.busDetails.busPlateNumber }).then(res => {
        if (res.busState === '0') {
          this.$message.warning('车辆不在线，不能IP通话')
          return
        }
        this.$message.success('正在准备中...')
        const param = {
          loginname: 'admin',
          pwd: '120223',
          PlateNO: this.busDetails.busPlateNumber,
          locip: this.ip,
          locport: '5555',
          number: this.busDetails.devRefId,
          svrip: '111.62.52.35',
          svrport: '5556'
        }
        const event = document.createEvent('CustomEvent')
        event.initCustomEvent('myCustomEvent', true, false, param)
        document.dispatchEvent(event)
      })
    },
    handlerMsg () {
      this.msgDialog = true
      this._alarmType({
        pageNum: 1,
        pageSize: 100000
      })
      this._contentType({
        voicetempTypeUuid: '',
        pageNum: 1,
        pageSize: 100000
      })
    },
    upDateCheck (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api['tiredMonitoring.wsUpdate']({
            warnUuid: this.busDetails.warnUuid,
            handleResult: this.ruleForm.status,
            handleSuggestion: this.ruleForm.suggestion
          }).then(res => {
            this.$message.success('已处理')
            this.resetForm(formName)
            this.$emit('update')
          }).catch(err => {
            this.$message.error(err.msg)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    upDateMsg (formName) {
      this.$api['tiredMonitoring.getBuslsOnLine']({ busPlateNumber: this.busDetails.busPlateNumber }).then(res => {
        if (res.busState === '0') {
          this.$message.warning('车辆不在线，不能下发语音')
          return
        }
        if (this.ruleFormWarn.status !== '') {
          this.$api['tiredMonitoring.Voiceprompt']({
            devType: '1',
            sendType: this.ruleFormWarn.status,
            busUuid: this.busDetails.busUuid,
            content: this.ruleFormWarn.suggestion
          }).then(res => {
            this.msgDialog = false
            this.ruleFormWarn = { status: '', suggestion: '', msgContent: '' }
            this.$message.success('下发消息成功')
          }).catch(() => {
            this.$message.error('接口错误')
            this.msgDialog = false
          })
        } else {
          this.$message.warning('请填选完整的下发信息')
        }
      })
    },
    _getCheckOptions (params) {
      this.$api['tiredMonitoring.getByStatus'](params).then(res => {
        let dataArr = res
        this.checkcontentOptions = []
        if (params.handleType === '1') {
          dataArr.forEach((list, index) => {
            this.checkcontentOptions[index] = {
              label: list.handleContext.length > 13 ? `${list.handleContext.substring(0, 13)}...` : list.handleContext,
              value: list.handleContext
            }
          })
          this.checkcontentOptions.push({
            label: '其他',
            value: ''
          })
        }
      })
    },
    _alarmType (params) {
      this.$api['msgsend.getVoicetempTypeData'](params).then(res => {
        let dataArr = res.list
        this.warnsOptions = []
        dataArr.forEach((list, index) => {
          this.warnsOptions.push({
            label: list.voicetempContent,
            value: list.voicetempTypeUuid
          })
        })
      })
    },
    _contentType (params) {
      this.$api['msgsend.getVmContentsByVtUuid'](params).then(res => {
        let dataArr = res.list
        this.msgOptions = []
        dataArr.forEach((list, index) => {
          this.msgOptions.push({
            label: list.voicetempMessageContent,
            value: list.voicetempUuid
          })
        })
      })
    },
    resetForm (formName) {
      this.checkDialog = false
      this.$refs[formName].resetFields()
    },
    resetFormMsg (formName) {
      this.msgDialog = false
      this.$refs[formName].resetFields()
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.person-detail-content {
  .demonstration {
    margin-top: 0px;
  }
  .fa {
    width: 10px;
    margin-right: 10px;
  }
}
</style>
