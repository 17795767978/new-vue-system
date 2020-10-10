<template>
  <div>
    <el-dialog
      width="700px"
      title="设备绑定"
      :visible.sync="isVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="cancel"
    >
      <el-form ref="busForm" :model="busForm" :rules="formRules" label-width="110px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="所属机构" prop="busOrgUuid">
              <el-select v-model="busForm.busOrgUuid" disabled @change="getLineList(busForm.busOrgUuid)">
                <el-option
                  v-for="item in lineOrgs"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="所属线路" prop="busLineUuid">
              <el-select disabled v-model="busForm.busLineUuid">
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
          <el-row><el-col :span="10">
            <el-form-item label="车牌号" prop="busPlateNumber">
              <el-input v-model="busForm.busPlateNumber" disabled placeholder="请输入车牌号"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="车辆自编号" prop="busSelfCode">
              <el-input v-model="busForm.busSelfCode" disabled placeholder="请输入车辆自编号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row>-->
        <!--<el-col :span="12">-->
        <!--<el-form-item label="设备编号" prop="busDevUuid">-->
        <!--<el-select v-model="busForm.busDevUuid">-->
        <!--<el-option-->
        <!--v-for="item in devices"-->
        <!--:key="item.devUuid"-->
        <!--:label="item.devCode"-->
        <!--:value="item.devUuid">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <el-row v-for="(item, index) in busForm.deviceArr" :key="index">
          <el-col :span="10">
            <el-form-item label="设备类型">
              <el-select v-model="item.devClass" @change="getDevUuidList(item.devClass ,index)">
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
              <el-select clearable v-model="item.busDevUuids"  filterable placeholder="请选择" @visible-change="getBusDevUuidList($event, item.busDevUuids)" @change="handlerChange(item.busDevUuids, item.devClass)">
                <el-option
                  v-for="devUuids in afterAllDevOptions[item.devClass].options"
                  :disabled="devUuids.disabled"
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
// import { getAllOrgList, linesList, deviceList, busDeviceClassList } from '@/api/common'
// import { updateBus, busToDevGet } from '@/api/management'
// 校验车牌号
// import ruleVehicleNumber from '@/utils/extendValidate/extendValidate'

export default {
  name: 'BusUpdate',
  data () {
    return {
      lineOrgs: [], // 机构
      lines: [], // 线路
      devices: [], // 设备类型
      devicesNum: [], // 设备编号
      mountDevice: [],
      mark: 0,
      addbusDevUuids: [],
      addbusDev: '',
      busdev: '',
      addbus: [],
      devUuid: '',
      isVisible: false,
      beforeCurrentData: '',
      beforeAllDevOptions: [],
      afterAllDevOptions: {},
      busForm: {
        busOrgUuid: '',
        busLineUuid: '',
        busPlateNumber: '',
        busSelfCode: '',
        busDevUuids: [],
        deviceArr: []
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
    },
    roleData: {
      type: Object
    }
  },
  watch: {
    show (isShow) {
      if (isShow) {
        this.getBus()
        this._getCurrentOptions()
        this.addbus = []
        this.busForm = {
          busUuid: this.roleData.busUuid,
          busOrgUuid: this.roleData.busOrgUuid,
          busLineUuid: this.roleData.busLineUuid,
          busPlateNumber: this.roleData.busPlateNumber,
          busSelfCode: this.roleData.busSelfCode,
          busIsvalid: this.roleData.busIsvalid,
          busDevUuids: this.roleData.busDevUuid,
          deviceArr: []
        }
      }
      this.isVisible = isShow
      const params = { lineOrgUuid: this.busForm.busOrgUuid, lineIsvalid: '1', lineDropFlag: 0 }
      this._getLine(params)
    }
  },
  mounted () {
    this.lineOrgs = this.$store.state.globel.comData
  },
  methods: {
    _getLine (params) {
      this.$api['wholeInformation.getLine'](params).then(res => {
        this.lines = res
      })
    },
    getBus () {
      this.devices = []
      this.$api['wholeInformation.busDeviceClassList']({
        pageSize: '',
        pageNumber: '',
        isvalid: '1'
      }).then(res => {
        res.forEach(item => {
          this.devices.push({
            value: item.display,
            code: item.typeValue
          })
        })
      })
    },
    _getCurrentOptions () {
      this.$api['wholeInformation.deviceList']({ devClass: '' }).then(res => {
        this.beforeAllDevOptions = res
        setTimeout(() => {
          this.getAllDevOptions()
        }, 20)
      })
    },
    getAllDevOptions () {
      // allDevOptions
      this.afterAllDevOptions = {}
      this.devices.forEach((dev, index) => {
        let currentDev = this.beforeAllDevOptions.filter(item => item.devClass === dev.code)
        this.afterAllDevOptions[dev.code] = { code: dev.code, options: [] }
        currentDev.forEach(item => {
          this.afterAllDevOptions[dev.code].options.push({
            disabled: false,
            devCode: item.devCode,
            devUuid: item.devUuid,
            devClass: item.devClass
          })
        })
      })
      this.$api['wholeInformation.busToDevGet']({ busUuid: this.roleData.busUuid }).then(res => {
        this.mountDevice = res
        if (this.mountDevice.length > 0) {
          this.mountDevice.forEach(element => {
            this.afterAllDevOptions[element.devClass].options.push({
              disabled: true,
              devCode: element.devCode,
              devUuid: element.devUuid,
              devClass: element.devClass
            })
            this.busForm.deviceArr.push({ devClass: element.devClass, busDevUuids: element.devUuid })
          })
        } else {
          this.busForm.deviceArr.push({ devClass: this.devices[0].code, busDevUuids: '' })
        }
      })
    },
    handlerChange (value, devClass) {
      this.afterAllDevOptions[devClass].options.forEach(item => {
        if (item.devUuid === this.beforeCurrentData) {
          item.disabled = false
        } else if (item.devUuid === value) {
          item.disabled = true
        }
      })
    },
    getDevUuidList (data, index) {
      const isDataTo = index < this.mountDevice.length ? this.mountDevice[index].devClass === data : false
      if (isDataTo) {
        this.busForm.deviceArr[index].busDevUuids = this.mountDevice[index].devUuid
      } else {
        for (let item in this.afterAllDevOptions) {
          this.afterAllDevOptions[item].options.forEach(item => {
            if (item.devUuid === this.busForm.deviceArr[index].busDevUuids) {
              item.disabled = false
            }
          })
        }
        this.busForm.deviceArr[index].busDevUuids = ''
      }
    },
    getBusDevUuidList (bo, data) {
      if (bo) {
        this.beforeCurrentData = data
      }
    },
    convertSearchParams () {
      if (this.busForm.deviceArr[0].devClass === '' && this.busForm.deviceArr[0].busDevUuids === '') {
        this.busForm.busDevUuids = []
      } else {
        const devArr = []
        this.busForm.deviceArr.forEach(element => {
          if (element.busDevUuids !== '') {
            devArr.push({
              devUuid: element.busDevUuids,
              devClass: element.devClass
            })
          }
        })
        this.busForm.busDevUuids = devArr
      }
      const searchParams = {
        busUuid: this.busForm.busUuid,
        busOrgUuid: this.busForm.busOrgUuid,
        busLineUuid: this.busForm.busLineUuid,
        busNumber: this.busForm.busPlateNumber,
        busSelfCode: this.busForm.busSelfCode,
        busIsvalid: this.busForm.busIsvalid,
        deviceList: this.busForm.busDevUuids
      }
      return searchParams
    },
    save () {
      this.$refs.busForm.validate(isValid => {
        if (isValid) {
          const params = Object.assign({}, this.convertSearchParams())
          this.$api['wholeInformation.updateBus'](params).then(res => {
            this.$message({
              message: `编辑路线成功!`,
              type: 'success'
            })
            this.cancel()
            this.$emit('updateList')
          })
        }
      })
    },
    cancel () {
      this.$refs.busForm.resetFields()
      this.$emit('update:show', false)
      this.isVisible = false
    },
    // 通过组织机构的id和启用，是否删除来获取当前线路
    getLineList (lineOrgUuid) {
      this.busForm.busLineUuid = ''
      this.lines = []
      const params = { lineOrgUuid: lineOrgUuid, lineIsvalid: '1', lineDropFlag: 0 }
      this.$api['wholeInformation.getLine'](params).then(res => {
        this.lines = res
      })
    },
    add () {
      let obj = {
        devClass: this.devices[0].code,
        busDevUuids: ''
      }
      this.busForm.deviceArr.push(obj)
    },
    deleteDev (index) {
      // console.log(this.busForm.deviceArr[index].busDevUuids)
      for (let item in this.afterAllDevOptions) {
        this.afterAllDevOptions[item].options.forEach(item => {
          if (item.devUuid === this.busForm.deviceArr[index].busDevUuids) {
            item.disabled = false
          }
        })
      }
      this.busForm.deviceArr.splice(index, 1)
    }
  }
}
</script>
