<template>
  <div >
    <el-dialog
      width="700px"
      title="绑定设备"
      :visible.sync="isVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="cancel"
    >
      <el-form ref="busForm" :model="busForm" :rules="formRules" label-width="110px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="所属机构" prop="busOrgUuid">
              <el-select v-model="busForm.busOrgUuid" @change="getLineList(busForm.busOrgUuid)">
                <el-option
                  v-for="item in lineOrgs"
                  :key="item.orgUuid"
                  :label="item.orgName"
                  :value="item.orgUuid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="所属线路" prop="busLineUuid">
              <el-select v-model="busForm.busLineUuid" filterable >
                <el-option
                  v-for="item in lines"
                  :key="item.lineUuid"
                  :label="item.lineName"
                  :value="item.lineUuid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="车牌号" prop="busPlateNumber">
              <el-input v-model="busForm.busPlateNumber" placeholder="请输入车牌号"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="车辆自编号" prop="busSelfCode">
              <el-input v-model="busForm.busSelfCode" placeholder="请输入车辆自编号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="启禁状态" prop="busIsvalid">
              <el-radio-group v-model="busForm.busIsvalid">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-for="(item, index) in busForm.deviceArr" :key="index">
          <el-col :span="10">
            <el-form-item label="设备类型">
              <el-select v-model="item.devClass" @blur="getDevUuidList(index)">
                <el-option
                  v-for="devtype in devices"
                  :key="devtype.code"
                  :label="devtype.value"
                  :value="devtype.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="设备编号" prop="busDevUuids">
              <el-select v-model="item.busDevUuids" placeholder="请选择" @focus="getbusDevUuidList(item.devClass)">
                <el-option
                  v-for="devUuids in devicesNum"
                  :key="devUuids.devUuid"
                  :label="devUuids.devCode"
                  :value="devUuids.devUuid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="text" icon="el-icon-plus" @click="add()" style="margin-left:10px;"></el-button>
            <el-button type="text" icon="el-icon-minus" @click="deleteDev(index)" v-if="index >= 1"></el-button>
          </el-col>
        </el-row>
        <el-row>
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
// import { getAllOrgList, linesList, deviceList, deviceClassList } from '@/api/common'
// import { createBus } from '@/api/management'
// 校验车牌号
// import ruleVehicleNumber from '@/utils/extendValidate/extendValidate'

export default {
  name: 'BusCreate',
  data () {
    return {
      lineOrgs: [], // 机构
      lines: [], // 线路
      devices: [], // 设备类型
      devicesNum: [], // 设备编号
      devUuid: '',
      isVisible: false,
      busForm: {
        busOrgUuid: '',
        busLineUuid: '',
        busPlateNumber: '',
        busSelfCode: '',
        busIsvalid: 1,
        busDevUuids: [],
        deviceArr: [
          {
            devClass: '',
            busDevUuids: ''
          }
        ]
      },
      formRules: {
        busOrgUuid: [{ required: true, message: '请选择所属机构', trigger: 'change' }],
        busLineUuid: [{ required: true, message: '请选择线路', trigger: 'change' }],
        busSelfCode: [{ required: true, message: '请输入车辆自编号', trigger: 'blur' }],
        busPlateNumber: [{
          required: true,
          message: '请输入车牌号',
          trigger: 'blur'
        }, { required: true, message: '车牌号格式有误', trigger: 'blur' }]
        // busDevUuids: [{required: true, message: '请选择设备编号', trigger: 'change'}]
      }
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show (isShow) {
      this.busForm.busLineUuid = ''
      this.busForm.busDevUuids = []
      this.busForm.deviceArr = [
        {
          devClass: '',
          busDevUuids: ''
        }
      ]
      this.lines = []
      this.isVisible = isShow
    }
  },
  mounted () {
    this.lineOrgs = this.$store.state.globel.comData
    this.$api['wholeInformation.deviceClassList']({
      pageSize: '',
      pageNumber: '',
      isValid: '1'
    }).then(res => {
      res.forEach(item => {
        this.devices.push({
          value: item.display,
          code: item.typeValue
        })
      })
    })
  },
  methods: {
    getDevUuidList (index) {
      this.busForm.deviceArr[index].busDevUuids = ''
    },
    getbusDevUuidList (data) {
      if (data === '') {
        this.$message({
          message: `请选择设备类型!`,
          type: 'warning'
        })
      } else {
        this.$api['wholeInformation.deviceList']({ devClass: data }).then(res => {
          if (res.length < 1) {
            this.$message({
              message: `暂无可用设备!`,
              type: 'warning'
            })
            this.devicesNum = res
          } else {
            for (var i = 0; i < this.busForm.deviceArr.length; i++) {
              for (var j = 0; j < res.length; j++) {
                if (res[j].devUuid === this.busForm.deviceArr[i].busDevUuids) {
                  res.splice(j, 1)
                  this.devicesNum = res
                } else {
                  this.devicesNum = res
                }
              }
            }
          }
        })
      }
    },
    convertSearchParams () {
      // if (this.busForm.deviceArr[0].devClass === '' || this.busForm.deviceArr[0].busDevUuids === '') {
      //   this.busForm.busDevUuids = []
      // } else {
      this.busForm.deviceArr.forEach(element => {
        if (element.busDevUuids !== '') {
          this.busForm.busDevUuids.push(element.busDevUuids)
        }
      })
      // }
      const searchParams = {
        busOrgUuid: this.busForm.busOrgUuid,
        busLineUuid: this.busForm.busLineUuid,
        busNumber: this.busForm.busPlateNumber,
        busSelfCode: this.busForm.busSelfCode,
        busIsvalid: this.busForm.busIsvalid,
        busDevUuids: this.busForm.busDevUuids
      }
      return searchParams
    },
    save () {
      this.$refs.busForm.validate(isValid => {
        if (isValid) {
          const params = Object.assign({}, this.convertSearchParams())
          this.$api['wholeInformation.createBus'](params).then(res => {
            if (!res.error) {
              this.$message({
                message: `新增车辆成功!`,
                type: 'success'
              })
              this.cancel()
              this.$emit('updateList')
            }
          })
        }
      })
    },
    cancel () {
      this.busForm.busLineUuid = ''
      this.busForm.busDevUuids = []
      this.busForm.deviceArr = [
        {
          devClass: '',
          busDevUuids: ''
        }
      ]
      this.lines = []
      this.$refs.busForm.resetFields()
      this.$emit('update:show', false)
      this.isVisible = false
    },
    // 通过组织机构的id和启用，是否删除来获取当前线路
    getLineList (lineOrgUuid) {
      this.busForm.busLineUuid = ''
      this.lines = []
      const params = { orgId: lineOrgUuid === '1' ? '' : lineOrgUuid, lineIsvalid: '1', lineDropFlag: 0 }
      this.$api['wholeInformation.getLine'](params).then(res => {
        this.lines = res
      })
    },
    add () {
      let obj = {
        devClass: '',
        busDevUuids: ''
      }
      this.devicesNum = []
      this.busForm.deviceArr.push(obj)
    },
    deleteDev (index) {
      this.busForm.deviceArr.splice(index, 1)
    }
  }
}
</script>
