<template>
    <div>
      <el-dialog
      width="700px"
      :title="(isCreate ? '新增' : '编辑') + '设备信息'"
      :visible.sync="isVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="cancel"
      >
        <el-form ref="deviceForm" :model="deviceForm" :rules="formRules" label-width="110px">
          <el-row>
            <el-col :span="12">
               <el-form-item label="设备编号" prop="devCode">
                  <el-input v-model="deviceForm.devCode" placeholder="请输入设备编号" />
               </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备类型" prop="devClass">
                <el-select style="width: 220px" v-model="deviceForm.devClass">
                  <el-option
                    v-for="item in devices"
                    :key="item.code"
                    :label="item.value"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="SIM卡号" prop="devSimNum">
                <el-input v-model="deviceForm.devSimNum" placeholder="请输入SIM卡号" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label="型号" prop="devModelNum">
                  <el-input v-model="deviceForm.devModelNum" placeholder="请输入型号" />
               </el-form-item>
             </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="版本" prop="devVersion">
                <el-input v-model="deviceForm.devVersion" placeholder="请输入版本" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备电话" prop="devPhone">
                <el-input v-model="deviceForm.devPhone" placeholder="请输入设备电话" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!-- <el-col :span="12">
                <el-form-item label="车牌号" prop="busPlateNumber">
                  <el-select style="width: 220px" v-model="deviceForm.busPlateNumber" filterable>
                  <el-option
                    v-for="item in busList"
                    :key="item.code"
                    :label="item.value"
                    :value="item.code">
                  </el-option>
                </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item label="启禁状态" prop="devIsvalid">
                  <el-radio-group v-model="deviceForm.devIsvalid">
                    <el-radio label="1">启用</el-radio>
                    <el-radio label="0">禁用</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="18">
                  <el-button type="primary" @click="save">保存</el-button>
                  <el-button @click="cancel">取消</el-button>
              </el-col>
          </el-row>
       </el-form>
      </el-dialog>
    </div>
</template>
<script>
// api
// import { createDevice, updateDevice } from '@/api/management'
// import { deviceClassList } from '@/api/common'

// import isvalidPhone from '@/utils/extendValidate/extendValidate'
const initDevicesForm = {
  devCode: '', // 设备编号
  devSimNum: '', // 设备sim卡号
  devModelNum: '', // 型号
  devVersion: '', // 版本号
  devPhone: '', // 设备电话
  devIsvalid: '1', // 启用禁用状态：1 启用 0 禁用
  devClass: '' // 设备类型,
  // busPlateNumber: '' // 车牌号
}
export default {
  name: 'DeviceUpdate',
  data () {
    return {
      lineOrgs: [],
      lines: [],
      devices: [],
      busList: [],
      isVisible: false,
      deviceForm: Object.assign({}, initDevicesForm),
      formRules: {
        devCode: [{ required: true, message: '请输入设备编号', trigger: 'blur' }],
        devClass: [{ required: true, message: '请选择设备类型', trigger: 'change' }],
        devPhone: [{ required: true, message: '手机号应为11位数字', trigger: 'blur' }],
        busPlateNumber: [{ required: true, message: '请选择车牌号', trigger: 'blur' }]
      }
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    roleData: {
      type: Object
    },
    isCreate: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    show (isShow) {
      if (isShow) {
        if (this.isCreate) {
          this.deviceForm = Object.assign({}, initDevicesForm)
        } else {
          this.deviceForm = Object.assign({}, this.roleData)
        }
      }
      this.isVisible = isShow
    }
  },
  created () {
    // this._getBusList()
  },
  mounted () {
    const pageSize = ''
    this.$api['wholeInformation.deviceClassList']({
      pageSize,
      pageNumber: '',
      isvalid: '1'
    }).then(res => {
      // res.list = res.list.for

      res.forEach(item => {
        this.devices.push({
          value: item.display,
          code: item.typeValue
        })
      })
      console.log(this.devices)
    })
  },
  methods: {
    // _getBusList () {
    //   busesList({org: ''}).then(res => {
    //     this.busList = []
    //     res.forEach(item => {
    //       this.busList.push({
    //         value: item.busPlateNumber,
    //         code: item.busPlateNumber
    //       })
    //     })
    //   })
    // },
    save () {
      this.$refs.deviceForm.validate(isValid => {
        if (isValid) {
          const params = Object.assign({}, this.deviceForm)
          const submitType = this.isCreate ? 'createDevice' : 'updateDevice'
          const submitText = this.isCreate ? '新增' : '编辑'
          this.$api[`wholeInformation.${submitType}`](params).then(res => {
            this.$message({
              message: `${submitText}设备成功!`,
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
      this.deviceForm = Object.assign({}, initDevicesForm)
      this.$refs.deviceForm.resetFields()
      this.$emit('update:show', false)
      this.isVisible = false
    }
  }
}
</script>
