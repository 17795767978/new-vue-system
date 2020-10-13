<template>
  <div class="header">
    <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
      <el-form-item label="选择机构:" v-if="isOrg">
        <el-select class="font-style" @visible-change="changed" v-model="formInline.orgId" :disabled="disabled" placeholder="请选择" filterable>
          <el-option
            v-for="item in comOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择线路:" v-if="isLine">
        <el-select class="font-style" filterable v-model="formInline.lineId" placeholder="请选择">
          <el-option
            v-for="item in lineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择线路:" v-if="islineIdRepeat">
        <el-select style="width: 200px" filterable v-model="formInline.lineIds" multiple collapse-tags placeholder="请选择">
          <el-option
            v-for="item in lineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择机构:" v-if="isOrgSec">
        <el-select class="font-style" @visible-change="changed" v-model="formInline.lineOrgId" placeholder="请选择" filterable>
          <el-option
            v-for="item in comOptionsSec"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择线路:" v-if="isLineSec">
        <el-select class="font-style" filterable v-model="formInline.lineLineId" placeholder="请选择">
          <el-option
            v-for="item in lineOptionsSec"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择车辆:" v-if="isBus">
        <el-select class="font-style" style="width: 200px" v-model="formInline.busNumber" :multiple="isBusMul" :collapse-tags="isBusMul" filterable placeholder="请选择">
          <el-option
            v-for="item in carOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车辆自编号:" v-if="isBusSelfCode">
        <el-input type="text" style="width: 12vw" v-model="formInline.busSelfCode" placeholder="车辆自编号"></el-input>
      </el-form-item>
      <el-form-item label="司机工号:" v-if="isDriverNum">
        <el-input class="font-style" v-model="formInline.driverNum"></el-input>
      </el-form-item>
      <el-form-item label="方向:" v-if="isTurn">
        <el-select class="font-style" v-model="formInline.lineType" placeholder="请选择">
          <el-option
            v-for="item in turnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="月份:" v-if="isMonth">
        <el-date-picker
          v-model="formInline.month"
          type="month"
          placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="站位A:" v-if="isStation">
        <el-select
          ref="elSelectWrapperUp"
          style="width:200px;"
          filterable
          collapse-tags
          clearable
          v-model="formInline.startStation"
          remote
          reserve-keyword
          :remote-method="remoteMethod"
          placeholder="请选择">
          <el-option
            v-for="item in searchStationOptions"
            :key="item.value"
            :label="item.label"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="站位B:" v-if="isStation">
        <el-select
          ref="elSelectWrapperUp"
          style="width:200px;"
          filterable
          collapse-tags
          clearable
          v-model="formInline.endStation"
          remote
          reserve-keyword
          :remote-method="remoteMethod"
          placeholder="请选择">
          <el-option
            v-for="item in searchStationOptions"
            :key="item.value"
            :label="item.label"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户:" v-if="isUser">
        <el-select style="width: 200px" filterable v-model="formInline.user" placeholder="请选择">
          <el-option
            v-for="item in userOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述:" v-if="isDesc">
        <el-select class="font-style" filterable v-model="formInline.desc" placeholder="请选择">
          <el-option
            v-for="item in descOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="IP:" v-if="isIp">
        <el-input v-model="formInline.ip"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="模块:" v-if="isModules">
        <el-select style="width: 300px" filterable v-model="formInline.modules" placeholder="请选择">
          <el-option
            v-for="item in modulesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面:" v-if="isPages">
        <el-select style="width: 300px" filterable v-model="formInline.pages" placeholder="请选择">
          <el-option
            v-for="item in pagesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备编号:" v-if="isDeviceCode">
        <el-input type="text" style="width: 12vw" v-model="formInline.deviceCode" placeholder="设备编号"></el-input>
      </el-form-item>
      <el-form-item label="设备类型:" v-if="isDevType">
        <el-select style="width: 200px" filterable v-model="formInline.devModel" placeholder="请选择">
          <el-option
            v-for="item in devModelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="自编号:" v-if="isSelfCode">
        <el-input type="text" style="width: 12vw" v-model="formInline.selfCode" placeholder="自编号"></el-input>
      </el-form-item>
      <el-form-item label="准确率:" v-if="isDiff">
        <el-select style="width: 200px" filterable v-model="formInline.diffStandard" placeholder="请选择">
          <el-option
            v-for="item in diffStandardOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择日期:" v-if="isDataCurrent">
        <el-date-picker
          :picker-options="pickerOptionsDataCurrent"
          v-model="formInline.dataCurrent"
          type="date"
          :editable="false"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="选择日期:" v-if="isDate">
         <el-date-picker
          :picker-options="pickerOptionsDate"
          v-model="formInline.valueTime"
          :default-time="['00:00:00', '23:59:59']"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="选择日期:" v-if="isDateTo">
        <el-date-picker
          :picker-options="pickerOptionsDateTo"
          :disabled="formInline.radio === '1' && isRadio"
          v-model="formInline.dateArray"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <!-- 日期选择器 单车周报 -->
      <el-form-item label="选择日期:" v-if="isDateWeek">
        <el-date-picker
          v-model="formInline.startDate"
          :picker-options="pickerOptionsStartDate"
          type="date"
          placeholder="选择开始日期">
        </el-date-picker>
        -
        <el-date-picker
          v-model="formInline.endDate"
          :picker-options="pickerOptionsEndDate"
          type="date"
          placeholder="选择结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="时间:" v-if="isTime">
        <el-time-select
          placeholder="起始时间"
          class="font-style"
          v-model="formInline.startHour"
          :picker-options="{
            start: '06:00',
            step: '01:00',
            end: '23:00'
          }">
        </el-time-select>
        -
        <el-time-select
          placeholder="结束时间"
          v-model="formInline.endHour"
          class="font-style"
          :picker-options="{
            start: '06:00',
            step: '01:00',
            end: '23:00',
            minTime: formInline.startHour
          }">
        </el-time-select>
      </el-form-item>
      <slot></slot>
      <el-form-item v-if="isRadio" label="查询时间:">
        <el-radio v-model="formInline.radio" label="1">当天</el-radio>
        <el-radio v-model="formInline.radio" label="2">历史</el-radio>
      </el-form-item>
      <el-form-item label="报警类型:" v-if="isWarntype">
        <el-select v-model="formInline.warnTypeId" multiple collapse-tags placeholder="请选择">
          <el-option
            v-for="item in warnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核状态"  v-if="isAudit">
        <el-select v-model="formInline.auditStatus" multiple collapse-tags placeholder="请选择">
          <el-option
            v-for="item in auditOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="isOnline" label="在线状态:">
        <el-radio v-model="formInline.onlineStatus" label="1">在线</el-radio>
          <el-radio v-model="formInline.onlineStatus" label="0">离线</el-radio>
      </el-form-item>
      <el-form-item label="处理结果:" v-if="isProcessingResult" size="mini">
        <el-checkbox-group v-model="formInline.checkList">
          <el-checkbox label="未处理" :disabled="formInline.auditStatus.length === 1 ? formInline.auditStatus[0] === '1' : false"></el-checkbox>
          <el-checkbox label="已处理"></el-checkbox>
          <el-checkbox label="误报"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="warning" @click="onclear" v-if="isEmpty">重置</el-button>
        <el-button type="success" @click="onSave" v-if="isDownload">导出</el-button>
        <slot name="download"></slot>
        <el-button type="success" @click="getTableData" v-if="isMul">批量设置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
       <p>导出只支持最大下载量为65536条，如果超过65536条默认下载前65536条</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getExcel"  :loading="downLoadLoading">确认</el-button>
        <!-- <downloadExcel
          :data= "excelData"
          type="xls"
          style="display: inline-block; margin-left: 10px;"
          name= "客流查询报表.xls"
        >

        </downloadExcel> -->
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
// import { lineList, comList } from 'server/interface';
// import downloadExcel from 'vue-json-excel'
import { mapGetters } from 'vuex'

export default {
  props: {
    excelData: {
      type: Array
    },
    totle: {
      type: Number
    },
    isClose: {
      type: Boolean
    },
    isOrg: {
      type: Boolean
    },
    isLine: {
      type: Boolean
    },
    isOrgSec: {
      type: Boolean
    },
    isLineSec: {
      type: Boolean
    },
    isBus: {
      type: Boolean
    },
    isBusMul: {
      type: Boolean
    },
    isTurn: {
      type: Boolean
    },
    isMonth: {
      type: Boolean
    },
    isDate: {
      type: Boolean
    },
    isDataCurrent: {
      type: Boolean
    },
    isTime: {
      type: Boolean
    },
    isStation: {
      type: Boolean
    },
    isDownload: {
      type: Boolean
    },
    isWarntype: {
      type: Boolean
    },
    isDateTo: {
      type: Boolean
    },
    isDefault: {
      type: Boolean
    },
    queryData: {
      type: Object
    },
    isMul: {
      type: Boolean
    },
    isEmpty: {
      type: Boolean
    },
    downLoadName: {
      type: String
    },
    islineIdRepeat: {
      type: Boolean
    },
    isRadio: {
      type: Boolean
    },
    isLineEmpty: {
      type: Boolean
    },
    isDriverNum: {
      type: Boolean
    },
    isDeviceCode: {
      type: Boolean
    },
    isSelfCode: {
      type: Boolean
    },
    isNotDateLimit: {
      type: Boolean
    },
    isUser: {
      type: Boolean
    },
    isDesc: {
      type: Boolean
    },
    isIp: {
      type: Boolean
    },
    isModules: {
      type: Boolean
    },
    isPages: {
      type: Boolean
    },
    isProcessingResult: {
      type: Boolean
    },
    isBusSelfCode: {
      type: Boolean
    },
    isAudit: {
      type: Boolean
    },
    select: {
      type: Object
    },
    isDiff: {
      type: Boolean
    },
    // 周报的时间限制用
    isDateToLimit: {
      type: Boolean
    },
    isDateWeek: {
      type: Boolean
    },
    isDevType: {
      type: Boolean
    },
    isOnline: {
      type: Boolean
    }
  },
  data () {
    return {
      pickerOptionsDateTo: {
        disabledDate (time) {
          const endTime = moment(moment().format('YYYY-MM-DD')).valueOf()
          return time.getTime() > endTime
        }
      },
      pickerOptionsDate: {
        disabledDate (time) {
          const endTime = moment(moment().format('YYYY-MM-DD  23:59:59')).valueOf()
          return time.getTime() > endTime
        }
      },
      pickerOptionsDataCurrent: {
        disabledDate (time) {
          const endTime = moment(moment().format('YYYY-MM-DD')).valueOf()
          return time.getTime() > endTime
        }
      },
      pickerOptionsStartDate: {
        disabledDate (time) {
          const endTime = moment(moment().format('YYYY-MM-DD')).valueOf()
          return time.getTime() >= endTime
        }
      },
      pickerOptionsEndDate: {
        disabledDate (time) {
          const endTime = moment(moment().format('YYYY-MM-DD')).valueOf()
          const startTime = moment(new Date() - 9 * 24000 * 3600).valueOf()
          return time.getTime() >= endTime || time.getTime() < startTime
        }
      },
      formInline: {
        orgId: '',
        lineOrgId: '',
        lineId: '',
        lineIds: [],
        lineLineId: '',
        busNumber: '',
        valueTime: [],
        lineType: '',
        startTime: '',
        month: '',
        endTime: '',
        dataCurrent: '',
        warnTypeId: [],
        startHour: '',
        endHour: '',
        endHourFormatter: '',
        startStation: {},
        endStation: {},
        dateArray: [],
        radio: '1',
        driverNum: '',
        deviceCode: '',
        selfCode: '',
        user: '',
        desc: '',
        ip: '',
        modules: '',
        pages: '',
        checkList: [],
        busSelfCode: '',
        auditStatus: [],
        diffStandard: '85',
        startDate: moment(new Date() - 8 * 24000 * 3600).format('YYYY-MM-DD'),
        endDate: moment(new Date() - 1 * 24000 * 3600).format('YYYY-MM-DD'),
        devModel: '',
        onlineStatus: '1'
      },
      searchStationOptions: [],
      stationOptions: [],
      comOptions: [],
      comOptionsSec: [],
      turnOptions: [{
        value: '1',
        label: '上行'
      }, {
        value: '2',
        label: '下行'
      }],
      userOptions: [
        {
          label: 'admin',
          value: '1'
        }
      ],
      devModelOptions: [
        {
          value: '10',
          label: '客流'
        },
        {
          value: '1',
          label: 'ADAS'
        }
      ],
      descOptions: [{
        label: '登录',
        value: '1'
      }, {
        label: '登出',
        value: '2'
      }],
      auditOptions: [
        {
          value: '0',
          label: '未审核'
        },
        {
          value: '1',
          label: '已审核'
        }
      ],
      diffStandardOptions: [
        { label: '100%', value: '100' }, { label: '95%', value: '95' },
        { label: '90%', value: '90' },
        { label: '85%', value: '85' }, { label: '80%', value: '80' },
        { label: '75%', value: '75' }, { label: '70%', value: '70' }, { label: '65%', value: '65' }, { label: '60%', value: '60' }, { label: '55%', value: '55' }, { label: '50%', value: '50' }, { label: '45%', value: '45' }, { label: '40%', value: '40' }, { label: '35%', value: '35' }, { label: '30%', value: '30' }
      ],
      modulesOptions: [],
      pagesOptions: [],
      lineOptions: [],
      lineOptionsSec: [],
      carOptions: [],
      warnOptions: [],
      centerDialogVisible: false,
      laoding: true,
      code: '加载中',
      disabled: false,
      isLinkage: false,
      downLoadStr: '',
      downLoadLoading: false
    }
  },
  created () {
    this.formInline.orgId = ''
    this.formInline.busNumber = ''
    this.formInline.lineId = ''
    if (!this.isDefault) {
      this.$store.dispatch('getComSecList').then(res => {
        this.comOptionsSec = res
      })
      this.$store.dispatch('getLineSecList').then(res => {
        this.lineOptionsSec = res
      })
    }
    this._alarmType({
      warnLevel: ''
    })
    let dataNow = new Date()
    let endTime = dataNow.getTime() - 24 * 3600 * 1000
    let timeStart = moment(endTime).format('YYYY-MM-DD 00:00:00')
    let timeEnd = moment().format('YYYY-MM-DD 23:59:59')
    setTimeout(() => {
      this.formInline.valueTime = [timeStart, timeEnd]
    }, 20)
    this._stationList()
  },
  computed: {
    ...mapGetters(['userId', 'formDown', 'formData'])
  },
  mounted () {
    let defaultForm = this.$store.getters.formData
    let globelData = this.$store.state.globel
    this.comOptions = globelData.comData
    this.lineOptions = globelData.lineData
    this.carOptions = globelData.carData
    this.userOptions = globelData.userList
    this.modulesOptions = globelData.modulesList
    this.pagesOptions = globelData.pagesList
    if (this.userId !== '1') {
      this.disabled = true
      this.formInline.orgId = this.userId
    } else {
      this.formInline.orgId = defaultForm.orgId
    }
    if (this.formInline.radio === '1' && this.isRadio) {
      let date = new Date()
      this.formInline.dateArray = [date, date]
    } else {
      this.formInline.dateArray = defaultForm.dateArray
    }
    this.formInline.lineOrgId = defaultForm.lineOrgId
    this.formInline.lineLineId = defaultForm.lineLineId
    this.formInline.lineId = defaultForm.lineId
    this.formInline.lineIds = defaultForm.lineIds
    this.formInline.lineType = defaultForm.lineType
    this.formInline.dataCurrent = defaultForm.currentDate
    this.formInline.startHour = defaultForm.startHour
    this.formInline.endHour = defaultForm.endHour
    this.formInline.warnTypeId = defaultForm.warningArr
    if (this.queryData && Object.keys(this.queryData).length > 0) {
      this.formInline.lineOrgId = this.queryData.company
      this.formInline.lineLineId = this.queryData.lineUuid + '+' + this.queryData.lineNumber
      this.formInline.lineType = this.queryData.arrow
    }
  },
  activated () {
    setTimeout(() => {
      if (this.queryData && Object.keys(this.queryData).length > 0) {
        this.formInline.lineOrgId = this.queryData.company
        this.formInline.lineLineId = this.queryData.lineUuid + '+' + this.queryData.lineNumber
        this.formInline.lineType = this.queryData.arrow
      }
    }, 500)
  },
  watch: {
    'formInline.orgId': {
      handler (newValue) {
        if (this.isLinkage) {
          this.formInline.lineId = ''
          this.formInline.lineIds = []
          this.formInline.busNumber = ''
          this.formInline.busSelfCode = ''
        }
        let orgId = newValue === '1' ? '' : newValue
        this.$api['permission.userSelectList']({
          orgId
        }).then(res => {
          this.formInline.user = ''
          let list = []
          res.forEach(item => {
            list.push({
              value: item.userId,
              label: item.userAccount
            })
          })
          this.userOptions = list
        })
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
        })
        this.$api['wholeInformation.getCar']({
          lineId: '',
          lineName: '',
          orgId: orgId
        }).then(res => {
          let list = []
          res.forEach(item => {
            list.push({
              value: item.busPlateNumber,
              label: item.busPlateNumber
            })
          })
          this.carOptions = list
        })
      }
    },
    'formInline.lineOrgId': {
      handler (newV) {
        this.$store.dispatch('getLineSecList', this.formInline.lineOrgId).then(res => {
          this.lineOptionsSec = res
        })
        if (this.isLinkage) {
          this.formInline.lineLineId = ''
        }
        // this.formInline.lineLineId = ''
      }
    },
    'formInline.lineId': {
      handler (newValue) {
        this.formInline.busNumber = ''
        this.formInline.busSelfCode = ''
        if (newValue !== '') {
          this.$api['wholeInformation.getCar']({
            lineId: newValue,
            lineName: '',
            orgId: ''
          }).then(res => {
            let list = []
            res.forEach(item => {
              list.push({
                value: item.busPlateNumber,
                label: item.busPlateNumber
              })
            })
            this.carOptions = list
          })
        }
      }
    },
    'formInline.startStation': {
      handler (newV) {
        if (newV !== '') {
          this.searchStationOptions = []
        }
      }
    },
    'formInline.endStation': {
      handler (newV) {
        if (newV !== '') {
          this.searchStationOptions = []
        }
      }
    },
    'isDefault': {
      immediate: true,
      handler (newV) {
        let date = new Date()
        date = moment(date).valueOf() - 3600 * 1000 * 24
        if (newV) {
          this.$store.dispatch('getComSecList').then(res => {
            this.comOptionsSec = res
            this.formInline.lineOrgId = this.comOptionsSec[0].value
            this.$store.dispatch('getLineSecList', this.formInline.lineOrgId).then(res => {
              this.lineOptionsSec = res
              this.formInline.lineLineId = this.lineOptionsSec[0].value
            })
          })
          this.formInline.lineType = this.turnOptions[0].value
          this.formInline.dataCurrent = date
          this.$store.dispatch('getDefaultSearch', this.formInline)
        }
      }
    },
    downLoadName (newV) {
      this.downLoadStr = newV
    },
    'formInline.radio': {
      handler (newV) {
        if (newV === '1') {
          this.formInline.dateArray = [this.formInline.dataCurrent, this.formInline.dataCurrent]
          this.pickerOptionsDateTo = {
            disabledDate (time) {
              const endTime = moment(moment().format('YYYY-MM-DD')).valueOf()
              return time.getTime() !== endTime
            }
          }
        } else {
          let yestody = new Date() - 24 * 3600 * 1000
          this.formInline.dateArray = [moment(yestody).format('YYYY-MM-DD'), moment(yestody).format('YYYY-MM-DD')]
          this.pickerOptionsDateTo = {
            disabledDate (time) {
              const endTime = moment(moment().format('YYYY-MM-DD')).valueOf()
              return time.getTime() >= endTime
            }
          }
        }
      }
    },
    isLineEmpty (newV) {
      if (newV) {
        this.formInline.lineLineId = ''
      }
    },
    'isNotDateLimit': {
      immediate: true,
      handler (newV) {
        if (!newV) {
          this.pickerOptionsDateTo = {
            disabledDate (time) {
              const endTime = moment(moment().format('YYYY-MM-DD')).valueOf()
              return time.getTime() > endTime
            }
          }
        } else {
          this.pickerOptionsDateTo = {}
        }
      }
    },
    'formInline.auditStatus': {
      handler (newV) {
        this.formInline.checkList = []
      }
    },
    'formInline.startDate': {
      handler (newV) {
        const date = moment(newV).valueOf()
        const dateYestoday = moment(moment().format('YYYY-MM-DD')).valueOf()
        const dayDec = (dateYestoday - date) / (24 * 3600 * 1000)
        if (!this.isClearTo) {
          this.formInline.endDate = ''
        }
        if (dayDec > 10) {
          const endTime = date + 10 * 24 * 3600 * 1000
          this.pickerOptionsEndDate = {
            disabledDate (time) {
              // const endTime = moment(moment().format('YYYY-MM-DD')).valueOf()
              return time.getTime() >= endTime || time.getTime() < date
            }
          }
        } else {
          this.pickerOptionsEndDate = {
            disabledDate (time) {
              // const endTime = moment(moment().format('YYYY-MM-DD')).valueOf()
              return time.getTime() >= dateYestoday || time.getTime() < date
            }
          }
        }
        // if (date === moment().format()) {}
      }
    },
    'formInline.modules': {
      handler (newV) {
        // console.log(newV)
        this.formInline.pages = ''
        if (newV === '') {
          this.pagesOptions = this.$store.state.globel.pagesList
          return
        }
        let id = this.$store.state.globel.modulesList.filter(item => item.value === newV)[0].id
        this.pagesOptions = this.$store.state.globel.pagesList.filter(item => item.parentId === id)
      }
    }
  },
  updated () {
  },
  methods: {
    _stationList () {
      this.$api['wholeInformation.getAllBaseStationNamesListData']().then(res => {
        let arr = res
        arr.forEach(item => {
          this.stationOptions.push({
            value: item.stationName,
            label: item.stationName
          })
        })
      })
    },
    _alarmType (params) {
      this.$api['tiredMonitoring.getWarntypes'](params).then(res => {
        let dataArr = res
        this.warnOptions = []
        this.formInline.warnTypeId = []
        dataArr.forEach((list, index) => {
          this.warnOptions[index] = {
            label: list.value,
            value: list.code
          }
        })
      })
    },
    changed (data) {
      this.isLinkage = data
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.searchStationOptions = this.stationOptions.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    onSubmit () {
      // 处理结果值
      let checkList = []
      // 审核结果值
      this.formInline.startTime = moment(this.formInline.valueTime[0]).format('YYYY-MM-DD HH:mm:ss')
      this.formInline.endTime = moment(this.formInline.valueTime[1]).format('YYYY-MM-DD HH:mm:ss')
      if (this.formInline.dateArray.length === 2) {
        this.formInline.dateArray = [moment(this.formInline.dateArray[0]).format('YYYY-MM-DD'), moment(this.formInline.dateArray[1]).format('YYYY-MM-DD')]
      }
      if (this.formInline.endHour !== '') {
        this.formInline.endHourFormatter = Number(this.formInline.endHour.substring(0, 2)) - 1
      }
      if (this.formInline.checkList.length > 0) {
        this.formInline.checkList.forEach(item => {
          if (item === '未处理') {
            checkList.push('0')
          } else if (item === '已处理') {
            checkList.push('1')
          } else {
            checkList.push('2')
          }
        })
      } else {
        checkList = []
      }
      let configData = {
        orgId: this.formInline.orgId === '1' ? '' : this.formInline.orgId,
        lineId: this.formInline.lineId,
        busNumber: this.formInline.busNumber,
        valueTime: this.formInline.valueTime,
        lineType: this.formInline.lineType,
        dataCurrent: this.formInline.dataCurrent,
        startTime: this.formInline.startTime,
        endTime: this.formInline.endTime,
        startHour: this.formInline.startHour,
        endHour: this.formInline.endHour,
        endHourFormatter: this.formInline.endHourFormatter,
        month: this.formInline.month,
        lineOrgId: this.formInline.lineOrgId,
        lineLineId: this.formInline.lineLineId,
        startStation: this.formInline.startStation,
        endStation: this.formInline.endStation,
        warnTypeId: this.formInline.warnTypeId,
        dateArray: this.formInline.dateArray,
        lineIds: this.formInline.lineIds,
        radio: this.formInline.radio,
        driverNum: this.formInline.driverNum,
        deviceCode: this.formInline.deviceCode,
        selfCode: this.formInline.selfCode,
        user: this.formInline.user,
        desc: this.formInline.desc,
        ip: this.formInline.ip,
        modules: this.formInline.modules,
        pages: this.formInline.pages,
        checkList,
        busSelfCode: this.formInline.busSelfCode,
        auditStatus: this.formInline.auditStatus,
        diffStandard: this.formInline.diffStandard,
        startDate: this.formInline.startDate,
        endDate: this.formInline.endDate,
        devModel: this.formInline.devModel,
        onlineStatus: this.formInline.onlineStatus
      }
      this.$emit('configCheck', configData)
    },
    onclear () {
      this.isClearTo = true
      setTimeout(() => {
        this.isClearTo = false
      }, 20)
      let date = moment().format('YYYY-MM-DD')
      this.formInline = {
        orgId: this.userId === '1' ? '' : this.userId,
        lineId: '',
        busNumber: '',
        valueTime: [],
        lineType: '',
        startTime: moment().format('YYYY-MM-DD 00:00:00'),
        endTime: moment().format('YYYY-MM-DD 23:59:59'),
        startHour: '',
        endHour: '',
        endHourFormatter: '',
        month: '',
        lineOrgId: '',
        lineLineId: '',
        startStation: {},
        endStation: {},
        dataCurrent: date,
        warnTypeId: [],
        dateArray: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        lineIds: [],
        radio: '1',
        driverNum: '',
        deviceCode: '',
        selfCode: '',
        user: '',
        desc: '',
        ip: '',
        modules: '',
        pages: '',
        checkList: [],
        busSelfCode: '',
        auditStatus: [],
        diffStandard: '85',
        startDate: moment(new Date() - 8 * 24000 * 3600).format('YYYY-MM-DD'),
        endDate: moment(new Date() - 1 * 24000 * 3600).format('YYYY-MM-DD'),
        devModel: '',
        onlineStatus: '1'
      }
      let configData = {
        orgId: this.userId === '1' ? '' : this.userId,
        lineId: this.formInline.lineId,
        busNumber: this.formInline.busNumber,
        valueTime: this.formInline.valueTime,
        lineType: this.formInline.lineType,
        startTime: this.formInline.startTime,
        endTime: this.formInline.endTime,
        startHour: this.formInline.startHour,
        endHour: this.formInline.endHour,
        endHourFormatter: this.formInline.endHourFormatter,
        month: this.formInline.month,
        lineOrgId: this.formInline.lineOrgId,
        lineLineId: this.formInline.lineLineId,
        startStation: this.formInline.startStation,
        endStation: this.formInline.endStation,
        warnTypeId: this.formInline.warnTypeId,
        dateArray: this.formInline.dateArray,
        dataCurrent: date,
        lineIds: this.formInline.lineIds,
        radio: this.formInline.radio,
        driverNum: this.formInline.driverNum,
        deviceCode: this.formInline.deviceCode,
        selfCode: this.formInline.selfCode,
        user: this.formInline.user,
        desc: this.formInline.desc,
        ip: this.formInline.ip,
        modules: this.formInline.modules,
        pages: this.formInline.pages,
        checkList: [],
        busSelfCode: this.formInline.busSelfCode,
        auditStatus: this.formInline.auditStatus,
        diffStandard: this.formInline.diffStandard,
        startDate: this.formInline.startDate,
        endDate: this.formInline.endDate,
        devModel: this.formInline.devModel,
        onlineStatus: this.formInline.onlineStatus
      }
      this.$emit('handlerClear')
      this.$emit('configCheck', configData)
      this.$store.dispatch('getLineList').then(res => {
        this.lineOptions = res
      })
      this.$store.dispatch('getComList').then(res => {
        this.comOptions = res
      })
      this.$api['wholeInformation.getCar']({
        lineId: '',
        lineName: '',
        orgId: this.userId === '1' ? '' : this.userId
      }).then(res => {
        let list = []
        res.forEach(item => {
          list.push({
            value: item.busPlateNumber,
            label: item.busPlateNumber
          })
        })
        this.carOptions = list
      })
      let dataNow = new Date()
      let endTime = dataNow.getTime()
      let timeStart = moment(endTime).format('YYYY-MM-DD 00:00:00')
      let timeEnd = moment(endTime).format('YYYY-MM-DD 23:59:59')
      setTimeout(() => {
        this.formInline.valueTime = [timeStart, timeEnd]
      }, 20)
    },
    onSave () {
      this.centerDialogVisible = true
    },
    getTableData () {
      this.formInline.startTime = moment(this.formInline.valueTime[0]).format('YYYY-MM-DD HH:mm:ss')
      this.formInline.endTime = moment(this.formInline.valueTime[1]).format('YYYY-MM-DD HH:mm:ss')
      if (this.formInline.dateArray.length === 2) {
        this.formInline.dateArray = [moment(this.formInline.dateArray[0]).format('YYYY-MM-DD'), moment(this.formInline.dateArray[1]).format('YYYY-MM-DD')]
      }
      if (this.formInline.endHour !== '') {
        this.formInline.endHourFormatter = Number(this.formInline.endHour.substring(0, 2)) - 1
      }
      if (this.formInline.busNumber.length === 0 && this.isBusMul && this.formInline.lineId !== '') {
        this.formInline.busNumber = this.carOptions.map(item => item.value)
      }
      let configData = {
        orgId: this.formInline.orgId === '1' ? '' : this.formInline.orgId,
        lineId: this.formInline.lineId,
        busNumber: this.formInline.busNumber,
        valueTime: this.formInline.valueTime,
        lineType: this.formInline.lineType,
        dataCurrent: this.formInline.dataCurrent,
        startTime: this.formInline.startTime,
        endTime: this.formInline.endTime,
        startHour: this.formInline.startHour,
        endHour: this.formInline.endHour,
        endHourFormatter: this.formInline.endHourFormatter,
        month: this.formInline.month,
        lineOrgId: this.formInline.lineOrgId,
        lineLineId: this.formInline.lineLineId,
        startStation: this.formInline.startStation,
        endStation: this.formInline.endStation,
        warnTypeId: this.formInline.warnTypeId,
        dateArray: this.formInline.dateArray,
        lineIds: this.formInline.lineIds,
        radio: this.formInline.radio,
        driverNum: this.formInline.driverNum,
        deviceCode: this.formInline.deviceCode,
        selfCode: this.formInline.selfCode,
        user: this.formInline.user,
        desc: this.formInline.desc,
        ip: this.formInline.ip,
        modules: this.formInline.modules,
        pages: this.formInline.pages,
        busSelfCode: this.formInline.busSelfCode,
        auditStatus: this.formInline.auditStatus,
        diffStandard: this.formInline.diffStandard,
        startDate: this.formInline.startDate,
        endDate: this.formInline.endDate,
        devModel: this.formInline.devModel
      }
      this.$emit('configCheckMul', configData)
    },
    getExcel () {
      let lineArr = []
      let checkList = []
      this.downLoadLoading = true
      let defaultForm = this.formData
      if (this.formInline.lineLineId && this.formInline.lineLineId !== '') {
        lineArr = this.formInline.lineLineId.split('+')
      }
      if (this.formInline.checkList.length > 0) {
        this.formInline.checkList.forEach(item => {
          if (item === '未处理') {
            checkList.push('0')
          } else if (item === '已处理') {
            checkList.push('1')
          } else {
            checkList.push('2')
          }
        })
      } else {
        checkList = []
      }
      if (this.select) {
        this.formInline.dateArray = [moment(this.select.date[0]).format('YYYY-MM-DD HH:mm:ss'), moment(this.select.date[1]).format('YYYY-MM-DD HH:mm:ss')]
      }
      console.log(this.select)
      let params = {
        company: this.formInline.lineOrgId,
        lineId: this.formInline.lineId,
        // 判断是否为单车查询页面的导出，后台spring不能区分lineID和lineId，默认取lineID，所以利用this.select做判断传值的问题
        lineID: this.select ? this.formInline.lineId : lineArr[0],
        orgId: this.formInline.orgId === '1' ? '' : this.formInline.orgId,
        arrow: this.isTurn ? this.formInline.lineType : '',
        startStation: this.isStation ? this.formInline.startStation : '',
        endStation: this.isStation ? this.formInline.endStation : '',
        pDate: this.isDataCurrent ? moment(this.formInline.dataCurrent).format('YYYY-MM-DD') : '',
        // startTime: this.isDateTo ? this.formInline.valueTime[0] : this.formInline.dateArray[0],
        // endTime: this.isDateTo ? this.formInline.valueTime[1] : this.formInline.dateArray[1],
        // startTime: this.isDateTo ? this.formInline.dateArray[0] : this.formInline.valueTime[0],
        // endTime: this.isDateTo ? this.formInline.dateArray[1] : this.formInline.valueTime[1],
        data: this.formDown,
        sStation: this.isStation ? this.formInline.startStation.value : '',
        eStation: this.isStation ? this.formInline.endStation.value : '',
        warnTypes: this.formInline.warnTypeId.length > 0 ? this.formInline.warnTypeId : defaultForm.warningArr,
        busNumber: this.formInline.busNumber,
        driverNum: this.formInline.driverNum,
        warnDate: moment(this.formInline.dataCurrent).format('YYYY-MM-DD'),
        deviceCode: this.formInline.deviceCode,
        devCode: this.formInline.deviceCode,
        selfCode: this.formInline.selfCode,
        handleResults: checkList,
        warnTypeId: ['ADASSNAP', 'DMSTOSNAP'],
        busSelfCode: this.formInline.busSelfCode,
        auditStatus: this.formInline.auditStatus,
        isHistory: this.select ? this.select.isHistory : '1',
        cale: this.formInline.diffStandard,
        startDate: moment(this.formInline.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.formInline.endDate).format('YYYY-MM-DD'),
        pfrGetOnNumberStart: this.select && this.select.getOnNumMin ? Number(this.select.getOnNumMin) : null,
        pfrGetOnNumberEnd: this.select && this.select.getOnNumMax ? Number(this.select.getOnNumMax) : null,
        pfrGetOffNumberStart: this.select && this.select.getOffNumMin ? Number(this.select.getOffNumMin) : null,
        pfrGetOffNumberEnd: this.select && this.select.getOffNumMax ? Number(this.select.getOffNumMax) : null
      }
      if (this.isDate) {
        params.startTime = this.formInline.valueTime[0]
        params.endTime = this.formInline.valueTime[1]
      }
      if (this.isDateTo) {
        params.startTime = this.formInline.dateArray[0]
        params.endTime = this.formInline.dateArray[1]
        params.startDate = this.formInline.dateArray[0]
        params.endDate = this.formInline.dateArray[1]
      }
      // 延安需求
      if (this.select && Object.keys(this.select).length > 0) {
        params.startTime = this.formInline.dateArray[0]
        params.endTime = this.formInline.dateArray[1]
      }
      this.$api[`${this.downLoadName}`](params).then(res => {
        this.downLoadLoading = false
        // console.log(res)
        window.open(res.url)
        // window.location.href = res.url
        this.centerDialogVisible = false
        this.$message.success('正在下载中。。。')
      }).catch((err) => {
        this.downLoadLoading = false
        this.$message.error(err.message)
      })
    }
  },
  components: {
    // downloadExcel
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  // min-height: 10vh;
  border-bottom: 1px solid #eee;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  .form-inline {
    .font-style {
      width: 130px;
    }
  }
}
</style>
<style lang="scss">
.header {
  .el-input__suffix-inner {
    display: none;
  }
}
</style>
