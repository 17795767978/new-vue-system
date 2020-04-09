<template>
  <div class="header">
    <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
      <el-row>
      <el-form-item label="所属机构">
        <el-select class="font-style" v-model="formInline.orgId" :disabled="disabled" placeholder="请选择" filterable>
          <el-option
            v-for="item in comOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择线路">
        <el-select class="font-style" filterable v-model="formInline.lineId" placeholder="请选择">
          <el-option
            v-for="item in lineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择车辆" v-if="isBusNumber">
        <el-select class="font-style" v-model="formInline.busNumber" filterable placeholder="请选择">
          <el-option
            v-for="item in carOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上下行" v-if="isType">
        <el-select class="font-style" v-model="formInline.lineType" placeholder="请选择">
          <el-option
            v-for="item in turnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      </el-row>
      <el-form-item label="输入自编号" v-if="isBusSelfNumber">
        <el-input type="text" v-model="formInline.busSelfNumber"></el-input>
      </el-form-item>
      <el-form-item label="选择卡类型">
        <el-select filterable v-model="formInline.cardTypes" multiple collapse-tags placeholder="请选择卡类型">
          <el-option
            v-for="item in cardTypeData"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择日期">
         <el-date-picker
          v-model="formInline.valueTime"
          :picker-options="pickerOptionsDate"
          :default-time="['00:00:00', '23:59:59']"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="查询时间">
        <el-radio v-model="formInline.radio" label="1">当天</el-radio>
        <el-radio v-model="formInline.radio" label="2">历史</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="warning" @click="onclear">重置</el-button>
        <el-button type="success" @click="onSave">导出</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
       <p style="font-weight: bold">导出只支持最大下载量为65536条，如果超过65536条默认下载前65536条</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getExcel" :loading="isLoading">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
// import moment from 'moment';
// import { lineList, comList } from 'server/interface';
// import downloadExcel from 'vue-json-excel'
import moment from 'moment'
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
    echartsData: {
      type: Object
    }
  },
  data () {
    return {
      pickerOptionsDate: {
        disabledDate (time) {
          const endTime = moment(moment().format('YYYY-MM-DD 23:59:59')).valueOf()
          const startTime = moment(moment().format('YYYY-MM-DD 00:00:00')).valueOf() - 3600 * 24000
          return time.getTime() > endTime || time.getTime() < startTime
        }
      },
      formInline: {
        orgId: '',
        lineId: '',
        busNumber: '',
        valueTime: [],
        lineType: '',
        startTime: '',
        endTime: '',
        busSelfNumber: '',
        radio: '1',
        cardTypes: []
      },
      comOptions: [],
      turnOptions: [{
        value: '1',
        label: '上行'
      }, {
        value: '2',
        label: '下行'
      }],
      lineOptions: [],
      carOptions: [],
      centerDialogVisible: false,
      laoding: true,
      code: '加载中',
      disabled: false,
      isLoading: false,
      isBusNumber: true,
      isBusSelfNumber: true,
      isType: false
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
    let dataNow = new Date()
    let endTime = dataNow.getTime()
    let timeStart = moment(endTime).format('YYYY-MM-DD 00:00:00')
    let timeEnd = moment(endTime).format('YYYY-MM-DD 23:59:59')
    if (!this.echartsData.date) {
      this.formInline.valueTime = [timeStart, timeEnd]
    }
  },
  computed: {
    ...mapGetters(['userId', 'cardTypeData'])
  },
  mounted () {
    if (this.userId !== '1') {
      this.disabled = true
      this.formInline.orgId = this.userId
    }
  },
  watch: {
    'formInline.orgId': {
      handler (newValue) {
        this.formInline.lineId = ''
        this.formInline.busNumber = ''
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
          console.log(this.comOptions)
          this.carOptions = list
        })
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
    'formInline.radio': {
      handler (newV) {
        if (newV === '1') {
          this.formInline.valueTime = [moment().format('YYYY-MM-DD 00:00:00'), moment().format('YYYY-MM-DD 23:59:59')]
          this.isBusSelfNumber = true
          this.isType = false
          this.formInline.lineType = ''
          this.pickerOptionsDate = {
            disabledDate (time) {
              const endTime = moment(moment().format('YYYY-MM-DD 23:59:59')).valueOf()
              const startTime = moment(moment().format('YYYY-MM-DD 00:00:00')).valueOf() - 3600 * 24000
              return time.getTime() > endTime || time.getTime() < startTime
            }
          }
        } else {
          this.pickerOptionsDate = {
            disabledDate (time) {
              const endTime = moment(moment().format('YYYY-MM-DD 23:59:59')).valueOf() - 2 * 3600 * 24000
              return time.getTime() > endTime
            }
          }
          this.formInline.valueTime = []
          this.isType = true
          this.isBusSelfNumber = false
          this.formInline.busSelfNumber = ''
        }
      }
    },
    'echartsData': {
      deep: true,
      immediate: true,
      handler (newV) {
        if (Object.keys(newV).length > 0) {
          this.formInline.radio = moment(newV.date).valueOf() >= moment(moment().format('YYYY-MM-DD 00:00:00')).valueOf() - 3600 * 24000 ? '1' : '2'
          let globelData = this.$store.state.globel
          setTimeout(() => {
            this.formInline.valueTime = [moment(newV.date).format('YYYY-MM-DD 00:00:00'), moment(newV.date).format('YYYY-MM-DD 23:59:59')]
            console.log(this.formInline.valueTime)
          }, 100)

          if (newV.type === 'line') {
            this.formInline.lineId = globelData.lineData.filter(item => item.label === newV.lineName)[0].value
            this.formInline.cardTypes = []
          } else if (newV.type === 'idCard') {
            this.formInline.lineId = ''
            this.formInline.cardTypes = newV.idCard
          } else {
            this.formInline.lineId = ''
            this.formInline.cardTypes = []
          }
        }
      }
    }
  },
  updated () {
    // if (this.totle <= 10000 && this.totle > 0 && this.excelData.length === this.totle && !this.isClose) {
    //   this.laoding = false
    //   this.code = '下载'
    // } else if (this.totle > 10000 && this.excelData.length === 10000 && !this.isClose) {
    //   this.laoding = false
    //   this.code = '下载'
    // } else {
    //   this.laoding = true
    //   this.code = '加载中'
    // }
  },
  methods: {
    onSubmit () {
      // this.formInline.date = moment(this.formInline.date).format('YYYY-MM-DD');
      this.formInline.startTime = moment(this.formInline.valueTime[0]).format('YYYY-MM-DD HH:mm:ss')
      this.formInline.endTime = moment(this.formInline.valueTime[1]).format('YYYY-MM-DD HH:mm:ss')
      this.$emit('configCheck', this.formInline)
      this.$emit('clearUrlParams')
    },
    onclear () {
      this.formInline = {
        orgId: this.userId === '1' ? '' : this.userId,
        lineId: '',
        busNumber: '',
        valueTime: [],
        lineType: '',
        startTime: '',
        endTime: '',
        radio: '1'
      }
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
      let timeStart = moment().format('YYYY-MM-DD 00:00:00')
      let timeEnd = moment().format('YYYY-MM-DD 23:59:59')
      setTimeout(() => {
        this.formInline.valueTime = [timeStart, timeEnd]
      }, 20)
      this.$emit('clearEcahrtsData')
    },
    onSave () {
      // this.$emit('isDownload')
      this.centerDialogVisible = true
    },
    getExcel () {
      this.isLoading = true
      this.formInline.startTime = moment(this.formInline.valueTime[0]).format('YYYY-MM-DD HH:mm:ss')
      this.formInline.endTime = moment(this.formInline.valueTime[1]).format('YYYY-MM-DD HH:mm:ss')
      if (this.formInline.radio === '1') {
        this.$api['downLoad.todayExport']({
          orgUuid: this.formInline.orgId === '1' ? '' : this.formInline.orgId,
          lineUuid: this.formInline.lineId,
          lineType: '',
          busPlateNumber: this.formInline.busNumber,
          busSelfCode: this.formInline.busSelfNumber,
          sTime: this.formInline.startTime,
          eTime: this.formInline.endTime,
          cardSelfCodes: this.formInline.cardTypes
        }).then(res => {
        // console.log(res)
          this.isLoading = false
          window.open(res.url)
          // window.location.href = res.url
          this.centerDialogVisible = false
          this.$message.success('正在下载中。。。')
        }).catch((err) => {
          this.isLoading = false
          this.centerDialogVisible = false
          this.$message.error(err.message)
        })
      } else {
        this.$api['downLoad.historyExport']({
          orgUuid: this.formInline.orgId === '1' ? '' : this.formInline.orgId,
          lineUuid: this.formInline.lineId,
          lineType: this.formInline.lineType,
          busPlateNumber: this.formInline.busNumber,
          sTime: this.formInline.startTime,
          eTime: this.formInline.endTime,
          cardSelfCodes: this.formInline.cardTypes
        }).then(res => {
        // console.log(res)
          this.isLoading = false
          window.open(res.url)
          // window.location.href = res.url
          this.centerDialogVisible = false
          this.$message.success('正在下载中。。。')
        }).catch((err) => {
          this.$message.error(err.message)
          this.isLoading = false
          this.centerDialogVisible = false
        })
      }
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
  padding: 10px 20px 0 20px;
  box-sizing: border-box;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.5);
  .form-inline {
    min-height: 38px;
    .font-style {
      width: 200px;
    }
  }
}
</style>
