<template>
  <div class="header">
    <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
      <el-row>
      <el-form-item label="选择机构">
        <el-select class="font-style" v-model="formInline.orgUuid" :disabled="disabled" placeholder="请选择">
          <el-option
            v-for="item in comOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择线路">
        <el-select class="font-style" filterable v-model="formInline.lineUuid" placeholder="请选择">
          <el-option
            v-for="item in lineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择车辆">
        <el-select class="font-style"
        filterable
        remote
        v-model="formInline.car"
        :remote-method="remoteCarMethod"
        placeholder="请搜索">
          <el-option
            v-for="item in carSearchOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select class="font-style"
        filterable
        remote
        v-model="formInline.devModel"
        placeholder="请选择">
          <el-option
            v-for="item in devModelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item label="选择自编号">
        <el-select class="font-style"
        filterable
        remote
        v-model="formInline.carSelf"
        :remote-method="remoteSelfMethod"
        placeholder="请搜索">
          <el-option
            v-for="item in selfSearchOpt"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备编号">
        <el-input v-model="formInline.devCode" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="设备在线状态">
        <el-radio v-model="formInline.devOnlineStatus" label="1">在线</el-radio>
        <el-radio v-model="formInline.devOnlineStatus" label="0">离线</el-radio>
      </el-form-item>
      <el-form-item label="车辆在线状态" style="margin-left: 2vw;">
        <el-radio v-model="formInline.busOnlineStatus" label="1">在线</el-radio>
        <el-radio v-model="formInline.busOnlineStatus" label="0">离线</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="warning" @click="onclear">重置</el-button>
        <el-button type="success" @click="onDownload" :loading="downLoadLoading">导出</el-button>
      </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
// import moment from 'moment';
import { mapGetters } from 'vuex'
import Bus from './bus.js'
export default {
  data () {
    return {
      formInline: {
        lineUuid: '',
        orgUuid: '',
        car: '',
        carSelf: '',
        devOnlineStatus: '',
        busOnlineStatus: '',
        pageSize: 1,
        pageNumber: 15,
        devCode: '',
        devModel: 'ADAS'
      },
      devModelOptions: [
        {
          label: '客流',
          value: '客流'
        },
        {
          label: 'ADAS',
          value: 'ADAS'
        }
      ],
      comOptions: [],
      lineOptions: [],
      carOptions: [],
      carSearchOptions: [],
      selfOpt: [],
      selfSearchOpt: [],
      disabled: false,
      downLoadLoading: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
  },
  mounted () {
    this.$store.dispatch('getLineList').then(res => {
      this.lineOptions = res
    })
    this.$store.dispatch('getComList').then(res => {
      this.comOptions = res
    })
    this._getCarList({
      orgId: this.userId === '1' ? '' : this.userId
    })
    if (this.userId !== '1') {
      this.formInline.orgUuid = this.userId
      this.disabled = true
    } else {
      this.formInline.orgUuid = ''
      this.disabled = false
    }
    Bus.$on('getOnlineDev', this.getOnlineDev)
    Bus.$on('getOfflineDev', this.getOfflineDev)
    Bus.$on('getAlllineDev', this.getAlllineDev)
  },
  watch: {
    'formInline.orgUuid': {
      handler (newValue) {
        this.formInline.lineUuid = ''
        let orgId = newValue === '1' ? '' : newValue
        this.$api['wholeInformation.getLine']({
          lineId: '',
          lineName: '',
          orgId: orgId
        }).then(res => {
          let list = []
          res.forEach(item => {
            list.push({
              label: item.lineName,
              value: item.lineUuid
            })
          })
          this.lineOptions = list
        }).catch(() => {
          this.lineOptions = []
        })
      }
    }
  },
  methods: {
    // 获取车辆信息
    _getCarList (params) {
      this.$api['wholeInformation.getCar'](params).then(res => {
        res.forEach(item => {
          this.carOptions.push({
            label: item.busPlateNumber,
            value: item.busPlateNumber
          })
          this.selfOpt.push({
            label: item.busSelfCode,
            value: item.busSelfCode
          })
        })
      })
    },
    // 远程搜索车的方法
    remoteCarMethod (query) {
      this.queryMethods(query, 'car')
    },
    remoteSelfMethod (query) {
      this.queryMethods(query, 'self')
    },
    getOnlineDev () {
      this.formInline.devOnlineStatus = '1'
    },
    getOfflineDev () {
      this.formInline.devOnlineStatus = '0'
    },
    getAlllineDev () {
      this.formInline.devOnlineStatus = ''
    },
    queryMethods (query, type) {
      if (query !== '') {
        setTimeout(() => {
          if (type === 'car') {
            this.carSearchOptions = this.carOptions.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1
            })
          } else {
            this.selfSearchOpt = this.selfOpt.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1
            })
          }
        }, 200)
      } else {
        this.options = []
      }
    },
    onSubmit () {
      this.$emit('selectConfig', this.formInline)
    },
    onclear () {
      this.formInline = {
        lineUuid: '',
        car: '',
        carSelf: '',
        devOnlineStatus: '',
        pageSize: 1,
        pageNumber: 15,
        orgUuid: this.userId === '1' ? '' : this.userId,
        devCode: '',
        busOnlineStatus: '',
        devModel: 'ADAS'
      }
      this.$emit('selectConfig', this.formInline)
    },
    onDownload () {
      this.downLoadLoading = true
      this.$api['tiredMonitoring.export']({
        orgId: this.formInline.orgUuid || '',
        lineId: this.formInline.lineUuid || '',
        busPlateNumber: this.formInline.car || '',
        busSelfCode: this.formInline.carSelf || '',
        devOnlineStatus: this.formInline.devOnlineStatus || '',
        devCode: this.formInline.devCode,
        busState: this.formInline.busOnlineStatus,
        devModel: this.formInline.devModel
      }).then(res => {
        window.open(res.url)
        this.downLoadLoading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.downLoadLoading = false
      })
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  border-bottom: 1px solid #eee;
  padding: 20px 20px;
  box-sizing: border-box;
  box-shadow: 0 1px 10px rgba(0,0,0, 0.5);
  .form-inline {
   height: 70px;
   .font-style {
     width: 200px;
   }
  }
}
</style>
