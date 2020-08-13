<template>
  <el-dialog
    width="600px"
    :title="(isCreate ? '新增' : '编辑') + '参数'"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
  >
    <el-form ref="paramsForm" :model="paramsForm" :rules="formRules" label-width="80px">
      <el-row>
        <!-- <el-col :span="24">
          <el-form-item label="参数名称" prop="paramName">
            <el-input v-model="paramsForm.paramName" />
          </el-form-item>
        </el-col> -->
        <el-col :span="24">
          <el-form-item label="报警类型" prop="paramName">
             <el-select
              v-model="paramsForm.paramName"
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
        </el-col>
        <el-col :span="24">
          <el-form-item label="速度" prop="paramValue">
            <el-input v-model="paramsForm.paramValue" style="width: 220px"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="启/禁用">
            <el-select v-model="paramsForm.paramIsvalid" >
              <el-option v-for="item in paramIsvalids" :key="item.valuee" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="paramsForm.remark" style="width: 220px"/>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="24">
          <el-form-item label="备注" prop="spRemark">
            <el-input v-model="paramsForm.spRemark" />
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row>
        <el-col :span="12" :offset="12">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
// validate
// import Validator from '@/utils/extendValidate/extendValidate'
// api
// import { paramsCreate, paramsUpdate } from '@/api/systemparams'

//
const initParamsForm = {
  paramName: '',
  paramValue: '',
  paramIsvalid: '1',
  remark: ''
}

export default {
  name: 'ParmasUpdate',
  data () {
    let remarkTo = (rule, value, callback) => {
      if (value && value.length > 50) {
        return callback(new Error('50位以内任意字符'))
      } else {
        callback()
      }
    }
    return {
      disableSpCode: '',
      isVisible: false,
      paramsForm: Object.assign({}, initParamsForm),
      warnOptions: [],
      formRules: {
        paramName: [
          { required: true, message: '请输入参数编码', trigger: 'blur' },
          { required: true, message: '50位以内任意字符', trigger: 'blur' }
        ],
        paramValue: [{ required: true, message: '请输入参数值', trigger: 'blur' }],
        remark: [{ validator: remarkTo, trigger: 'blur' }]
      },
      paramIsvalids: [
        { label: '启用', value: '1' },
        { label: '禁用', value: '0' }
      ]
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    paramsData: {
      type: Object
    },
    isCreate: {
      type: Boolean,
      required: true
    }
  },
  created () {
    this._getWarnType()
  },
  watch: {
    show (isShow) {
      if (isShow) {
        if (this.isCreate) {
          this.disableSpCode = false
          this.paramsForm = Object.assign({}, initParamsForm)
        } else {
          this.disableSpCode = true
          this.paramsForm = Object.assign({}, this.paramsData)
        }
      }
      //
      this.isVisible = isShow
    }
  },
  methods: {
    _getWarnType () {
      this.$api['tiredMonitoring.getWarntypes']().then(res => {
        this.warnOptions = res.map(item => ({ label: item.value, value: item.code }))
      })
    },
    save () {
      this.$refs.paramsForm.validate(isValid => {
        if (isValid) {
          const params = Object.assign({}, this.paramsForm)
          console.log(params)
          const submitType = this.isCreate ? 'paramsCreate' : 'paramsUpdate'
          const submitText = this.isCreate ? '新增' : '编辑'
          this.$api[`wholeInformation.${submitType}`](params).then(res => {
            this.$message({
              message: `${submitText}参数成功!`,
              type: 'success'
            })
            this.cancel()
            this.$emit('updateList')
          }).catch(err => {
            this.$message.error(err.message)
          })
        }
      })
    },
    cancel () {
      this.paramsForm = Object.assign({}, initParamsForm)
      this.$refs.paramsForm.resetFields()
      this.$emit('update:show', false)
      this.$emit('update:paramsData', Object.create(null))
      this.isVisible = false
    }
  }
}
</script>
