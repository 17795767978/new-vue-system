
<template>
  <div class="person-detail-content">
    <h3 class="demonstration">报警详情
      <span style="display:inline-block; float: right; margin-right: 2vw;">
        <el-button type="success" size="mini" @click="handleCheck" :disabled="overspeedDetails.handleResult !== '0' && busDetails.handleResult !== '0'">处理</el-button>
      </span>
    </h3>
    <el-row :gutter="24"  class="pic">
       <el-col :span="6">
        <i class="fa fa-credit-card"></i>
        <span>车牌号：</span>
        <span>{{busDetails.busPlateNumber || overspeedDetails.busPlateNumber}}</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-drivers-license-o"></i>
        <span>自编号：</span>
        <span>{{busDetails.busSelfCode || overspeedDetails.busSelfCode}}</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-arrows-h"></i>
        <span>所属线路：</span>
        <span>{{busDetails.lineName || overspeedDetails.lineName}}</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-building"></i>
        <span>所属公司：</span>
        <span>{{busDetails.orgName || overspeedDetails.orgName}}</span>
       </el-col>
    </el-row>
    <el-row :gutter="24" class="pic">
       <el-col :span="6" v-if="busDetails.warnLevel">
        <i class="fa fa-code-fork"></i>
        <span>报警级别：</span>
        <span>{{busDetails.warnLevel}}级</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-exclamation-triangle"></i>
        <span>报警类型：</span>
        <span>{{busDetails.warnTypeName || overspeedDetails.warnTypeName}}</span>
       </el-col>
       <el-col :span="6" v-if="overspeedDetails.warnStartTime">
        <i class="fa fa-clock-o"></i>
        <span>报警开始时间：</span>
        <span>{{timeFormatStart}}</span>
       </el-col>
       <el-col :span="6" v-if="overspeedDetails.warnEndTime">
        <i class="fa fa-clock-o"></i>
        <span>报警结束时间：</span>
        <span>{{timeFormatEnd}}</span>
       </el-col>
       <el-col :span="6" v-if="busDetails.warnTime">
        <i class="fa fa-clock-o"></i>
        <span>报警时间：</span>
        <span>{{timeFormat}}</span>
       </el-col>
       <el-col :span="6" v-if="busDetails.speed">
        <i class="fa fa-flash"></i>
        <span>速度：</span>
        <span>{{busDetails.speed}}KM/H</span>
       </el-col>
    </el-row>
    <el-row :gutter="24" v-if="overspeedDetails !== {}">
      <el-col :span="6" v-if="Object.keys(overspeedDetails).length > 0">
        <i class="fa fa-clock-o"></i>
        <span>持续时间：</span>
        <span>{{overspeedDetails.duration}}</span>
       </el-col>
       <el-col :span="6" v-if="overspeedDetails.speed">
        <i class="fa fa-flash"></i>
        <span>最高速度：</span>
        <span>{{overspeedDetails.speed}}KM/H</span>
       </el-col>
       <el-col :span="6" v-if="position !== ''">
        <i class="fa fa-flash"></i>
        <span>当前位置：{{position}}</span>
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
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
export default {
  name: 'alarmContent',
  props: {
    busDetails: {
      type: Object
    },
    overspeedDetails: {
      type: Object
    },
    position: {
      type: String
    }
  },
  data () {
    let markSuggestion = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length && value.length > 150) {
        return callback(new Error('输入最大100字'))
      } else {
        callback()
      }
    }
    return {
      checkDialog: false,
      auditDialog: false,
      ruleForm: {
        status: '',
        suggestion: ''
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
      rules: {
        status: [
          { required: true, message: '请选择处理状态', trigger: 'blur' }
        ],
        suggestion: [
          { validator: markSuggestion, trigger: 'blur' }
        ],
        selectCheckContent: [
          {
            required: true, message: '请选择处理内容', trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    timeFormat () {
      return moment(this.busDetails.warnTime).format('YYYY-MM-DD HH:mm:ss')
    },
    timeFormatStart () {
      return moment(this.overspeedDetails.warnStartTime).format('YYYY-MM-DD HH:mm:ss')
    },
    timeFormatEnd () {
      return moment(this.overspeedDetails.warnEndTime).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  watch: {
    'overspeedDetails': {
      deep: true,
      handler (newV) {
      }
    },
    'ruleForm.status': {
      handler (newV) {
        if (newV === '1') {
          this.ruleForm.suggestion = '属实'
        } else if (newV === '2') {
          this.ruleForm.suggestion = '误报'
        } else {
          this.ruleForm.suggestion = ''
        }
      }
    }
  },
  methods: {
    handleCheck (row) {
      this.checkDialog = true
      this.ruleForm = {
        status: '',
        suggestion: ''
      }
    },
    upDateCheck (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api['tiredMonitoring.wsUpdate']({
            warnUuid: this.busDetails.warnUuid || this.overspeedDetails.warnUuid,
            handleResult: this.ruleForm.status,
            handleSuggestion: this.ruleForm.suggestion
          }).then(res => {
            this.$message.success('已处理')
            this.checkDialog = false
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
    resetForm (formName) {
      this.checkDialog = false
      this.$refs[formName].resetFields()
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.person-detail-content {
  .pic {
    margin-bottom: .5vh;
  }
  .demonstration {
    margin-top: 0px;
  }
  .fa {
    width: 10px;
    margin-right: 10px;
  }
}
</style>
