<template>
  <div class="header">
    <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
      <el-form-item label="选择机构" v-if="isOrg">
        <el-select class="font-style" @visible-change="changed" v-model="formInline.orgId" :disabled="disabled" placeholder="请选择" filterable>
          <el-option
            v-for="item in comOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择线路" v-if="isLine">
        <el-select class="font-style" filterable v-model="formInline.lineId" placeholder="请选择">
          <el-option
            v-for="item in lineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择线路" v-if="islineIdRepeat">
        <el-select style="width: 200px" filterable v-model="formInline.lineIds" multiple collapse-tags placeholder="请选择">
          <el-option
            v-for="item in lineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择机构" v-if="isOrgSec">
        <el-select class="font-style" @visible-change="changed" v-model="formInline.lineOrgId" placeholder="请选择" filterable>
          <el-option
            v-for="item in comOptionsSec"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择线路" v-if="isLineSec">
        <el-select class="font-style" filterable v-model="formInline.lineLineId" placeholder="请选择">
          <el-option
            v-for="item in lineOptionsSec"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择车辆" v-if="isBus">
        <el-select class="font-style" style="width: 200px" v-model="formInline.busNumber" :multiple="isBusMul" :collapse-tags="isBusMul" filterable placeholder="请选择">
          <el-option
            v-for="item in carOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="方向" v-if="isTurn">
        <el-select class="font-style" v-model="formInline.lineType" placeholder="请选择">
          <el-option
            v-for="item in turnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="月份" v-if="isMonth">
        <el-date-picker
          v-model="formInline.month"
          type="month"
          placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="站位A" v-if="isStation">
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
      <el-form-item label="站位B" v-if="isStation">
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
      <el-form-item label="选择日期" v-if="isDataCurrent">
        <el-date-picker
          v-model="formInline.dataCurrent"
          type="date"
          :editable="false"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="选择日期" v-if="isDate">
         <el-date-picker
          v-model="formInline.valueTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="选择日期" v-if="isDateTo">
        <el-date-picker
          :picker-options="pickerOptions"
          :disabled="formInline.radio === '1' && isRadio"
          v-model="formInline.dateArray"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
      </el-form-item>
      <el-form-item label="时间" v-if="isTime">
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
      <el-form-item v-if="isRadio" label="查询时间">
        <el-radio v-model="formInline.radio" label="1">当天</el-radio>
        <el-radio v-model="formInline.radio" label="2">历史</el-radio>
      </el-form-item>
      <el-form-item label="报警类型" v-if="isWarntype">
        <el-select v-model="formInline.warnTypeId" multiple collapse-tags placeholder="请选择">
          <el-option
            v-for="item in warnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
    select: {
      type: Object
    }
  },
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
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
        radio: '1'
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
    this.$store.dispatch('getComList').then(res => {
      this.comOptions = res
    })
    this.$store.dispatch('getLineList').then(res => {
      this.lineOptions = res
    })
    this.$store.dispatch('getCarList').then(res => {
      this.carOptions = res
    })
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
    let timeEnd = moment(endTime).format('YYYY-MM-DD 23:59:59')
    setTimeout(() => {
      this.formInline.valueTime = [timeStart, timeEnd]
    }, 20)
    this._stationList()
  },
  computed: {
    ...mapGetters(['userId', 'formDown'])
  },
  mounted () {
    let defaultForm = this.$store.getters.formData
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
      console.log(this.queryData)
      this.formInline.lineOrgId = this.queryData.company
      this.formInline.lineLineId = this.queryData.lineUuid + '+' + this.queryData.lineNumber
      this.formInline.lineType = this.queryData.arrow
    }
  },
  activated () {
    setTimeout(() => {
      console.log(this.queryData)
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
        }
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
        } else {
          this.formInline.dateArray = []
          this.pickerOptions = {
            disabledDate (time) {
              return time.getTime() > Date.now() - 24 * 3600 * 1000
            }
          }
        }
      }
    },
    isLineEmpty (newV) {
      if (newV) {
        this.formInline.lineLineId = ''
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
      this.formInline.startTime = moment(this.formInline.valueTime[0]).format('YYYY-MM-DD HH:mm:ss')
      this.formInline.endTime = moment(this.formInline.valueTime[1]).format('YYYY-MM-DD HH:mm:ss')
      if (this.formInline.dateArray.length === 2) {
        this.formInline.dateArray = [moment(this.formInline.dateArray[0]).format('YYYY-MM-DD'), moment(this.formInline.dateArray[1]).format('YYYY-MM-DD')]
      }
      if (this.formInline.endHour !== '') {
        this.formInline.endHourFormatter = Number(this.formInline.endHour.substring(0, 2)) - 1
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
        radio: this.formInline.radio
      }
      this.$emit('configCheck', configData)
    },
    onclear () {
      let date = moment(new Date()).format('YYYY-MM-DD')
      this.formInline = {
        orgId: this.userId === '1' ? '' : this.userId,
        lineId: '',
        busNumber: '',
        valueTime: [],
        lineType: '',
        startTime: '',
        endTime: '',
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
        dateArray: [],
        lineIds: [],
        radio: '2'
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
        radio: this.formInline.radio
      }
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
      let endTime = dataNow.getTime() - 24 * 3600 * 1000
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
        radio: this.formInline.radio
      }
      this.$emit('configCheckMul', configData)
    },
    getExcel () {
      console.log(this.select)
      let lineArr = []
      this.downLoadLoading = true
      if (this.formInline.lineLineId && this.formInline.lineLineId !== '') {
        console.log(this.formInline.lineLineId)
        lineArr = this.formInline.lineLineId.split('+')
      }
      if (this.select) {
        this.formInline.dateArray = [moment(this.select.date[0]).format('YYYY-MM-DD HH:mm:ss'), moment(this.select.date[1]).format('YYYY-MM-DD HH:mm:ss')]
      }
      this.$api[`${this.downLoadName}`]({
        company: this.formInline.lineOrgId,
        lineId: this.formInline.lineId,
        // 判断是否为单车查询页面的导出，后台spring不能区分lineID和lineId，默认取lineID，所以利用this.select做判断传值的问题
        lineID: this.select ? this.formInline.lineId : lineArr[0],
        orgId: this.formInline.orgId === '1' ? '' : this.formInline.orgId,
        arrow: this.isTurn ? this.formInline.lineType : '',
        startStation: this.isStation ? this.formInline.startStation : '',
        endStation: this.isStation ? this.formInline.endStation : '',
        pDate: this.isDataCurrent ? moment(this.formInline.dataCurrent).format('YYYY-MM-DD') : '',
        startTime: this.formInline.dateArray[0],
        endTime: this.formInline.dateArray[1],
        data: this.formDown,
        isHistory: this.select && this.select.isHistory
      }).then(res => {
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
  border-bottom: 1px solid #eee;
  padding: 20px 20px;
  box-sizing: border-box;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.5);
  .form-inline {
    height: 4vh;
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
