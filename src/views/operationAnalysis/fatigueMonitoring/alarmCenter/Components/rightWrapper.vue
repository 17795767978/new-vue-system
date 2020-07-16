<template>
  <div class="right-search-wrapper">
    <div class="top-search">
      <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
        <el-form-item label="选择机构">
        <el-select class="font-style" v-model="formInline.orgId" :disabled="this.userId !== '1'" placeholder="请选择" filterable>
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
      <el-form-item label="选择司机">
        <el-select
        ref="selectDriver"
        v-model="formInline.drvEmployeeId"
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="drvLoading">
          <el-option
            v-for="item in selectDriverOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="设备编号">
          <el-input v-model="formInline.devCode" placeholder="请输设备编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="formInline.busPlateNumber" placeholder="请输车牌号" clearable></el-input>
        </el-form-item>
        <el-form-item label="自编号">
          <el-input v-model="formInline.busSelfCode" placeholder="请输自编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="报警级别">
          <el-select v-model="formInline.warnLevel" placeholder="请选择">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报警类型">
          <el-select v-model="formInline.warnTypeId" multiple collapse-tags placeholder="请选择">
            <el-option
              v-for="item in warnOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核结果" v-if="userId === '1'">
          <el-checkbox-group v-model="formInline.checkType">
            <el-checkbox label="未审核"></el-checkbox>
            <el-checkbox label="属实"></el-checkbox>
            <el-checkbox label="误报"></el-checkbox>
            <el-checkbox label="其他"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="选择时间">
          <el-date-picker
            :picker-options="pickerOptionsDate"
            v-model="formInline.timeValue"
            :default-time="['00:00:00', '23:59:59']"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="warning" @click="onClear">重置</el-button>
          <el-button type="success" @click="onSave">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <hr style="border: 1px solid #eee; margin-bottom: 20px;" />
    <div class="content">
      <el-table
        :data="tableData"
        stripe
        border
        height="65vh"
        v-loading="loading"
        size="mini"
        style="width: 100%">
        <el-table-column
          align="center"
          type="index"
          label="序列"
          width="60">
          <template slot-scope="scope">
            <span> {{scope.$index + (pageNum - 1) * pageSize + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orgName"
          align="center"
          width="100"
          label="所属公司"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="lineName"
          label="所属线路"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="busPlateNumber"
          label="车牌号"
          width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="busSelfCode"
          label="车辆自编号"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="driverName"
          label="司机"
          width="200">
          <template slot-scope="scope">
            <el-select
              @change="updateCc(scope.row)"
              v-model="scope.row.driverName"
              filterable
              clearable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="drvLoading">
                <el-option
                  v-for="item in selectDriverOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="warnTypeName"
          label="报警类型"
          width="150">
        </el-table-column>
        <!-- warnNumber -->
        <el-table-column
          align="center"
          label="报警级别"
          width="100">
          <template slot-scope="scope">
            {{scope.row.warnLevel}}级
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="warnNumber"
          label="报警次数"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="speed"
          label="报警速度(KM/H)"
          width="120"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="warnTime"
          label="报警时间"
          :formatter="formatterTime"
          width="150"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="报警位置"
          width="300"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="auditUser"
          label="审核人"
          width="120"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="auditStatus"
          label="审核结果"
          width="100"
        >
          <template slot-scope="scope">
            <span v-if="!scope.row.auditStatus || scope.row.auditStatus === '0'">未审核</span>
            <span v-else-if="scope.row.auditStatus === '1'">属实</span>
            <span v-else-if="scope.row.auditStatus === '2'">误报</span>
            <span v-else-if="scope.row.auditStatus === '3'">其他</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="auditSuggestion"
          label="审核意见"
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" :content="scope.row.auditSuggestion" placement="top-start">
              <span>{{scope.row.auditSuggestion && scope.row.auditSuggestion.length > 7 ? `${scope.row.auditSuggestion.substring(0, 6)}...` : scope.row.auditSuggestion}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="auditTime"
          label="审核时间"
          :formatter="formatterAuditTime"
          width="150"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="handleUser"
          label="处理人"
          width="150"
          >
          <template slot-scope="scope">
            <el-input v-model="scope.row.handleUser" @blur="checkHandleUser(scope.row)" placeholder="请输入处理人"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="handleTime"
          :formatter="formatterHandleTime"
          label="处理时间"
          width="150"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="handleSuggestion"
          label="处理意见"
          width="150"
          >
        </el-table-column>
        <!-- <el-table-column align="center"
          prop="cc"
          width="150"
          label="抄送人">
          <template slot-scope="scope">
            <el-input type="text" size="mini" v-model="scope.row.cc" @blur="updateCc(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center"
          prop="ccTime"
          width="300"
          label="抄送时间">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.ccTime"
              type="datetime"
              @change="updateCc(scope.row)"
              placeholder="选择日期时间">
            </el-date-picker>
          </template>
        </el-table-column> -->
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="mini">详情</el-button>
            <el-button v-if="userId === '1'" :disabled="scope.row.auditStatus !== '0'" @click="handleAudit(scope.row)" type="warning" size="mini">审核</el-button>
            <el-button v-else @click="handleCheck(scope.row)" :type="scope.row.handleSuggestion ? 'info' : 'success'" size="mini">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          style="float: right; margin-top: 20px;"
          background
          :disabled="loading"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
        <span class="demonstration" style="float: right; margin-top: 20px; line-height: 36px;">共{{total}}条</span>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>导出只支持最大下载量为65536条，如果超过65536条默认下载前65536条</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getExcel">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="操作"
      :visible.sync="checkDialog"
      width="30%"
      center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="审核状态" prop="status" v-if="isAudit">
          <el-select v-model="ruleForm.status">
            <el-option
              v-for="item in checkOptions.slice(1)"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="isAudit ? '审核意见' : '处理意见'" prop="suggestion">
          <el-input type="textarea" v-model="ruleForm.suggestion" :autosize="{ minRows: 3, maxRows: 5}" maxlength="100"></el-input>
          <span>{{ruleForm.suggestion.length}}/100</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="upDateCheck('ruleForm')">确认</el-button>
      </span>
    </el-dialog>
    <DialogDetail :sendTitle="sendTitle" :warnDetails="warnDetails" @updateList="updateList"/>
  </div>
</template>

// updateWarnCc
<script type="text/ecmascript-6">
import moment from 'moment'
import { mapGetters } from 'vuex'
import DialogDetail from './dialogsDetail'
export default {
  props: {
    selectCarData: {
      type: Object
    }
  },
  components: {
    // downloadExcel
    DialogDetail
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
      pickerOptionsDate: {
        disabledDate (time) {
          const endTime = moment(moment().format('YYYY-MM-DD 23:59:59')).valueOf()
          return time.getTime() > endTime
        }
      },
      formInline: {
        orgId: '',
        lineId: '',
        devCode: '',
        busPlateNumber: '',
        busUuid: '',
        busSelfCode: '',
        warnLevel: '',
        warnTypeId: [],
        timeValue: [],
        checkType: [],
        drvEmployeeId: '',
        warnUuid: ''
      },
      ruleForm: {
        status: '',
        suggestion: ''
      },
      rules: {
        status: [
          { required: true, message: '请选择审核状态', trigger: 'blur' }
        ],
        suggestion: [
          { validator: markSuggestion, trigger: 'blur' }
        ]
      },
      levelOptions: [
        {
          value: '1',
          label: '1级'
        }, {
          value: '2',
          label: '2级'
        }
      ],
      checkOptions: [
        {
          value: '0',
          label: '未审核'
        },
        {
          value: '1',
          label: '属实'
        },
        {
          value: '2',
          label: '误报'
        },
        {
          value: '3',
          label: '其他'
        }
      ],
      driverOptionsAll: [],
      selectDriverOptions: [],
      warnOptions: [],
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      json_data: [],
      centerDialogVisible: false,
      loading: false,
      downloadLoading: true,
      checkDialog: false,
      checkMsg: {},
      code: '加载中',
      comOptions: [],
      lineOptions: [],
      sendTitle: '',
      warnDetails: {},
      drvLoading: false,
      isAudit: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
    let dataNow = new Date()
    let endTime = dataNow.getTime() - 3600 * 24 * 1 * 1000
    let timeStart = moment(endTime).format('YYYY-MM-DD 00:00:00')
    let timeEnd = moment(dataNow).format('YYYY-MM-DD 23:59:59')
    setTimeout(() => {
      this.comOptions = this.$store.state.globel.comData

      this.lineOptions = this.$store.state.globel.lineData
      this.formInline.timeValue = [timeStart, timeEnd]
    }, 20)
    this._alarmType({
      warnLevel: ''
    })
  },
  mounted () {
    let defaultData = this.$store.getters.formData
    let dataNow = new Date()
    let endTime = dataNow.getTime() - 3600 * 24 * 1 * 1000
    let timeStart = moment(endTime).format('YYYY-MM-DD 00:00:00')
    let timeEnd = moment(dataNow).format('YYYY-MM-DD 23:59:59')
    setTimeout(() => {
      this.formInline.timeValue = [timeStart, timeEnd]
      if (Object.keys(this.$route.params).length > 0) {
        if (this.$route.params.type === 'sort') {
          this.formInline = this.$route.params
        } else {
          this.formInline = {
            orgId: this.$route.params.orgUuid,
            lineId: this.$route.params.lineUuid,
            devCode: this.$route.params.devCode,
            busPlateNumber: this.$route.params.busPlateNumber,
            busUuid: '',
            busSelfCode: '',
            warnLevel: '',
            warnTypeId: [this.$route.params.warnType],
            timeValue: [moment(this.$route.params.warnTime).format('YYYY-MM-DD 00:00:00'), moment(this.$route.params.warnTime).format('YYYY-MM-DD 23:59:59')],
            checkType: [],
            drvEmployeeId: '',
            warnUuid: this.$route.params.warnUuid
          }
        }
        // this.$refs.selectDriver.remoteMethod(this.formInline.drvEmployeeId)
      }
      let type = this.formInline.checkType
      this._tableList({
        orgId: this.userId === '1' ? '' : this.userId, // 组织机构id
        lineId: this.formInline.lineId, // 线路id
        busUuid: this.formInline.busUuid, // 车辆id
        devCode: this.formInline.devCode, // 设备号
        busPlateNumber: this.formInline.busPlateNumber, // 车牌号
        drvEmployeeId: this.formInline.drvEmployeeId,
        busSelfCode: this.formInline.busSelfCode, // 自编号
        warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: this.formInline.warnTypeId.length === 0 ? defaultData.warningArr : this.formInline.warnTypeId, // 报警类型
        startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
        endTime: this.formInline.timeValue[1],
        pageSize: 10,
        pageNum: 1,
        driverName: this.formInline.driverName,
        auditStatus: this.userId === '1' ? this.getCheckType(type) : ['1'],
        warnUuid: this.formInline.warnUuid
        // auditStatus: this.formInline.auditStatus
      })
    }, 200)
    // console.log(this.formInline);
    // if (this.userId !== '1') {
    //   this.disabled = true
    // }
    this.formInline.orgId = this.userId
  },
  activated () {
    let defaultData = this.$store.getters.formData
    setTimeout(() => {
      if (Object.keys(this.$route.params).length > 0) {
        if (this.$route.params.type === 'sort') {
          this.formInline = this.$route.params
        } else {
          this.formInline = {
            orgId: this.$route.params.orgUuid,
            lineId: this.$route.params.lineUuid,
            devCode: this.$route.params.devCode,
            busPlateNumber: this.$route.params.busPlateNumber,
            busUuid: '',
            busSelfCode: '',
            warnLevel: '',
            warnTypeId: [this.$route.params.warnType],
            timeValue: [moment(this.$route.params.warnTime).format('YYYY-MM-DD 00:00:00'), moment(this.$route.params.warnTime).format('YYYY-MM-DD 23:59:59')],
            checkType: [],
            drvEmployeeId: '',
            warnUuid: this.$route.params.warnUuid
          }
        }
        // this.$refs.selectDriver.remoteMethod(this.formInline.drvEmployeeId)
      }
      this.pageNum = 1
      let type = this.formInline.checkType
      this._tableList({
        orgId: this.userId === '1' ? '' : this.userId, // 组织机构id
        lineId: this.formInline.lineId, // 线路id
        busUuid: this.formInline.busUuid, // 车辆id
        devCode: this.formInline.devCode, // 设备号
        busPlateNumber: this.formInline.busPlateNumber, // 车牌号
        busSelfCode: this.formInline.busSelfCode, // 自编号
        drvEmployeeId: this.formInline.drvEmployeeId,
        warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: this.formInline.warnTypeId.length === 0 ? defaultData.warningArr : this.formInline.warnTypeId, // 报警类型
        startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
        endTime: this.formInline.timeValue[1],
        driverName: this.formInline.driverName,
        pageSize: 10,
        pageNum: 1,
        auditStatus: this.userId === '1' ? this.getCheckType(type) : ['1'],
        warnUuid: this.formInline.warnUuid
      })
    }, 200)
  },
  watch: {
    selectCarData: {
      deep: true,
      handler (newValue) {
        let defaultData = this.$store.getters.formData
        // 车偏号 联动
        this.changeBusPlateNumber()
        this.formInline.timeValue.forEach(time => {
          time = moment(time).format('YYYY-MM-DD HH:mm:ss')
        })
        let auditStatus = this.getCheckType(newValue.checkType)
        if (newValue.levelsType !== '0') {
          this._tableList({
            orgId: this.formInline.orgId === '1' ? '' : this.formInline.orgId, // 组织机构id
            lineId: this.formInline.lineId, // 线路id
            busUuid: this.formInline.busUuid, // 车辆id
            devCode: this.formInline.devCode, // 设备号
            busPlateNumber: this.formInline.busPlateNumber, // 车牌号
            drvEmployeeId: this.formInline.drvEmployeeId,
            busSelfCode: this.formInline.busSelfCode, // 自编号
            warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
            warnTypeId: this.formInline.warnTypeId.length === 0 ? defaultData.warningArr : this.formInline.warnTypeId, // 报警类型
            startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
            endTime: this.formInline.timeValue[1],
            pageSize: 10,
            pageNum: 1,
            auditStatus: this.userId === '1' ? auditStatus : ['1'],
            warnUuid: this.formInline.warnUuid
          })
        }
      }
    },
    'formInline.auditStatus': {
      handler (newV) {
        // 判断是否路由传值
        if (Object.keys(this.$route.params).length === 0) {
          this.formInline.checkType = []
        } else {
          this.formInline.checkType = this.$route.params.checkType
        }
      }
    },
    'formInline.orgId': {
      handler (newValue) {
        // this.driverOptionsAll = []
        if (Object.keys(this.$route.params).length === 0) {
          this.formInline.lineId = ''
          this.formInline.busNumber = ''
          this.formInline.drvEmployeeId = ''
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
          setTimeout(() => {
            this.lineOptions = list
          }, 20)
        }).catch(() => {
          this.lineOptions = []
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
        this._getDriverDt({
          orgId: orgId,
          lineUuid: '',
          drvName: '',
          drvEmployeeId: ''
        })
      }
    },
    'formInline.lineId': {
      handler (newValue) {
        this.formInline.busNumber = ''
        this.formInline.drvEmployeeId = ''
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
        this._getDriverDt({
          orgId: this.formInline.orgId,
          lineUuid: newValue,
          drvName: '',
          drvEmployeeId: ''
        })
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
    },
    '$store.state.globel.options': {
      deep: true,
      handler (newV) {
        console.log(newV)
        this.formInline = {
          orgId: newV.orgUuid,
          lineId: newV.lineUuid,
          devCode: newV.devCode,
          busPlateNumber: newV.busPlateNumber,
          busUuid: '',
          busSelfCode: '',
          warnLevel: '',
          warnTypeId: [newV.warnType],
          timeValue: [moment(newV.warnTime).format('YYYY-MM-DD 00:00:00'), moment(newV.warnTime).format('YYYY-MM-DD 23:59:59')],
          checkType: [],
          drvEmployeeId: '',
          warnUuid: newV.warnUuid
        }
        let type = this.formInline.checkType
        this._tableList({
          orgId: this.userId === '1' ? '' : this.userId, // 组织机构id
          lineId: this.formInline.lineId, // 线路id
          busUuid: this.formInline.busUuid, // 车辆id
          devCode: this.formInline.devCode, // 设备号
          busPlateNumber: this.formInline.busPlateNumber, // 车牌号
          drvEmployeeId: this.formInline.drvEmployeeId,
          busSelfCode: this.formInline.busSelfCode, // 自编号
          warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
          warnTypeId: this.formInline.warnTypeId, // 报警类型
          startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
          endTime: this.formInline.timeValue[1],
          pageSize: 10,
          pageNum: 1,
          driverName: this.formInline.driverName,
          auditStatus: this.userId === '1' ? this.getCheckType(type) : ['1'],
          warnUuid: this.formInline.warnUuid
          // auditStatus: this.formInline.auditStatus
        })
      }
    }
  },
  methods: {
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
    _getDriverDt (params) {
      this.$api['tiredMonitoring.getDriverDt'](params).then(res => {
        this.driverOptionsAll = []
        this.selectDriverOptions = []
        const arr = res
        console.log(res)
        arr.forEach(item => {
          this.driverOptionsAll.push({
            label: `${item.drvName} ${item.drvEmployeeId}`,
            value: item.drvEmployeeId
          })
        })
      })
    },
    _tableList (params) {
      this.loading = true
      this.tableData = []
      let tableBeforeData = []
      this.$api['tiredMonitoring.getWarnList'](params).then(res => {
        res.list.forEach(item => {
          if (item.driverName === '0 0') {
            item.driverName = ''
          }
        })
        res.list.forEach((item, index) => {
          this.getPointAddress(item, index).then((data) => {
            item.address = data.adr
            item.index = data.idx
            tableBeforeData.push(item)
          })
        })
        this.total = res.total
        setTimeout(() => {
          this.tableData = tableBeforeData.sort((prev, next) => prev.index - next.index)
          this.loading = false
        }, 500)
      }).catch(err => {
        this.loading = false
        this.$message.error(err.message)
      })
    },
    formatterAuditTime (row) {
      if (row.auditTime) {
        return moment(row.auditTime).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
    },
    formatterHandleTime (row) {
      if (row.handleTime) {
        return moment(row.handleTime).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
    },
    checkHandleUser (row) {
      const { warnUuid, handleUser } = row
      this.$api['tiredMonitoring.wsUpdate']({
        warnUuid,
        handleUser
      }).then(res => {
        this.$message.success('操作成功')
      })
    },
    remoteMethod (query) {
      this.selectDriverOptions = []
      if (query !== '') {
        this.drvLoading = true
        setTimeout(() => {
          this.drvLoading = false
          this.selectDriverOptions = this.driverOptionsAll.filter(item => {
            const name = item.label.split(' ')[0]
            return name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 20)
      } else {
        this.selectDriverOptions = []
      }
    },
    // 左侧点击是否显示右侧搜索内容，0 总公司 1 公司 2 线路 3 车牌号
    changeBusPlateNumber () {
      if (this.selectCarData.levelsType === '3') {
        this.formInline.busPlateNumber = this.selectCarData.name
        this.formInline.busUuid = this.selectCarData.id
      } else if (this.selectCarData.levelsType === '2') {
        this.formInline.busPlateNumber = ''
        this.formInline.busUuid = ''
        this.formInline.orgId = ''
        this.formInline.lineId = this.selectCarData.id
      } else if (this.selectCarData.levelsType === '1') {
        this.formInline.busPlateNumber = ''
        this.formInline.busUuid = ''
        this.formInline.lineId = ''
        this.formInline.orgId = this.selectCarData.id
      } else if (this.selectCarData.levelsType === '0' || !this.selectCarData.levelsType) {
        this.formInline.busPlateNumber = ''
        this.formInline.busUuid = ''
        this.formInline.lineId = ''
        this.formInline.orgId = this.userId === '1' ? '' : this.userId
      }
    },
    formatterTime (row) {
      return moment(row.warnTime).format('YYYY-MM-DD HH:mm:ss')
    },
    getSlice (row) {
      const content = row.handleSuggestion
      if (content && content.length <= 7) {
        return row.handleSuggestion
      } else if (content && content.length > 7) {
        return `${row.handleSuggestion.substring(0, 5)}...`
      }
    },
    handleCurrentChange (val) {
      this.pageNum = val
      let defaultData = this.$store.getters.formData
      let type = this.formInline.checkType
      this._tableList({
        orgId: this.formInline.orgId !== '1' ? this.formInline.orgId : '', // 组织机构id
        lineId: this.formInline.lineId, // 线路id
        busUuid: this.formInline.busUuid, // 车辆id
        devCode: this.formInline.devCode, // 设备号
        busPlateNumber: this.formInline.busPlateNumber, // 车牌号
        drvEmployeeId: this.formInline.drvEmployeeId,
        busSelfCode: this.formInline.busSelfCode, // 自编号
        warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: this.formInline.warnTypeId.length === 0 ? defaultData.warningArr : this.formInline.warnTypeId, // 报警类型
        startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
        endTime: this.formInline.timeValue[1],
        pageSize: 10,
        pageNum: this.pageNum,
        auditStatus: this.userId === '1' ? this.getCheckType(type) : ['1'],
        warnUuid: this.formInline.warnUuid
      })
    },
    handleClick (row) {
      this.sendTitle = `${row.warnTypeName} ${row.busPlateNumber}`
      this.$children[5].dialogVisible = true
      this.$api['tiredMonitoring.getWarnDetail']({
        warnUuid: row.warnUuid,
        warnTime: ''
      }).then(res => {
        res.devUuid = row.devUuid
        res.devRefId = row.devRefId
        res.busUuid = row.busUuid
        const warnTimesArr = res.warnTimes ? res.warnTimes.split(',') : []
        const warnUuidsArr = res.warnUuids ? res.warnUuids.split(',') : []
        this.warnDetails = Object.assign({ warnTimesArr, warnUuidsArr }, res)
      }).catch(err => {
        this.$message.error(err.message)
      })
      // if (row.warnType === 'OVERSPEED') {
      //   this.$router.push({
      //     name: 'alarmContent',
      //     query: {
      //       id: row.warnUuid,
      //       type: 'overspeed'
      //     }
      //   })
      // } else {
      //   this.$router.push({
      //     name: 'alarmContent',
      //     query: {
      //       id: row.warnUuid,
      //       type: 'normal'
      //     }
      //   })
      // }
    },
    handleAudit (row) {
      this.checkMsg.warnUuid = row.warnUuid
      this.checkDialog = true
      this.isAudit = true
      this.ruleForm = {
        status: '',
        suggestion: ''
      }
    },
    handleCheck (row) {
      this.checkMsg.warnUuid = row.warnUuid
      this.checkDialog = true
      this.isAudit = false
      this.ruleForm = {
        status: '',
        suggestion: row.handleSuggestion ? row.handleSuggestion : ''
      }
    },
    updateCc (row) {
      const { warnUuid, driverName } = row
      const drvData = driverName.split(' ')
      this.$api['tiredMonitoring.wsUpdate']({
        warnUuid,
        driverName: drvData.length > 1 ? drvData[0] : '0',
        driverIccard: drvData.length > 1 ? drvData[1] : '0'
      }).then(res => {
        this.$message.success('操作成功')
        this.selectDriverOptions = []
      })
    },
    upDateCheck (formName) {
      let form = {}
      let type = this.formInline.checkType
      if (this.isAudit) {
        form = {
          auditStatus: this.ruleForm.status,
          auditSuggestion: this.ruleForm.suggestion,
          auditTime: moment().format('YYYY-MM-DD HH:mm:ss'),
          auditUser: localStorage.getItem('userRealName')
        }
      } else {
        form = {
          handleSuggestion: this.ruleForm.suggestion,
          handleTime: moment().format('YYYY-MM-DD HH:mm:ss'),
          handleUser: localStorage.getItem('userRealName')
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api['tiredMonitoring.wsUpdate']({
            warnUuid: this.checkMsg.warnUuid,
            ...form
          }).then(res => {
            this.$message.success('操作成功')
            this.checkDialog = false
            let defaultData = this.$store.getters.formData
            this._tableList({
              orgId: this.formInline.orgId !== '1' ? this.formInline.orgId : '', // 组织机构id
              lineId: this.formInline.lineId, // 线路id
              busUuid: this.formInline.busUuid, // 车辆id
              devCode: this.formInline.devCode, // 设备号
              drvEmployeeId: this.formInline.drvEmployeeId,
              busPlateNumber: this.formInline.busPlateNumber, // 车牌号
              busSelfCode: this.formInline.busSelfCode, // 自编号
              warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
              warnTypeId: this.formInline.warnTypeId.length === 0 ? defaultData.warningArr : this.formInline.warnTypeId, // 报警类型
              startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
              endTime: this.formInline.timeValue[1],
              pageSize: 10,
              pageNum: this.pageNum,
              auditStatus: this.userId === '1' ? this.getCheckType(type) : ['1'],
              warnUuid: this.formInline.warnUuid
            })
            this.$store.dispatch('updateMsg', true)
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
    },
    onSubmit () {
      let dateArr = []
      let defaultData = this.$store.getters.formData
      this.formInline.warnUuid = ''
      this.formInline.timeValue.forEach(time => {
        dateArr.push(moment(time).format('YYYY-MM-DD HH:mm:ss'))
      })
      if (this.userId !== '1') {
        this.formInline.orgId = this.userId
      }
      this.pageNum = 1
      let auditStatus = this.formInline.checkType
      this._tableList({
        orgId: this.formInline.orgId === '1' ? '' : this.formInline.orgId, // 组织机构id
        lineId: this.formInline.lineId, // 线路id
        busUuid: this.formInline.busUuid, // 车辆id
        devCode: this.formInline.devCode, // 设备号
        driverName: this.formInline.driverName,
        busPlateNumber: this.formInline.busPlateNumber, // 车牌号
        drvEmployeeId: this.formInline.drvEmployeeId,
        busSelfCode: this.formInline.busSelfCode, // 自编号
        warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: this.formInline.warnTypeId.length === 0 ? defaultData.warningArr : this.formInline.warnTypeId, // 报警类型 // 报警类型
        startTime: dateArr[0], // 时间格式   开始结束默认查近7天的
        endTime: dateArr[1],
        pageSize: 10,
        pageNum: 1,
        auditStatus: this.userId === '1' ? this.getCheckType(auditStatus) : ['1'],
        warnUuid: this.formInline.warnUuid
      })
    },
    onClear () {
      let dataNow = new Date()
      let endTime = dataNow.getTime() - 3600 * 24 * 1 * 1000
      this.formInline = {
        orgId: this.userId,
        lineId: '',
        devCode: '',
        busPlateNumber: '',
        driverName: '',
        drvEmployeeId: '',
        busUuid: '',
        busSelfCode: '',
        warnLevel: '',
        warnTypeId: [],
        timeValue: [moment(endTime).format('YYYY-MM-DD 00:00:00'), moment(dataNow).format('YYYY-MM-DD 23:59:59')],
        checkType: []
      }
      this.$emit('clear')
    },
    onSave () {
      this.centerDialogVisible = true
    },
    updateList () {
      let defaultData = this.$store.getters.formData
      let type = this.formInline.checkType
      this._tableList({
        orgId: this.formInline.orgId !== '1' ? this.formInline.orgId : '', // 组织机构id
        lineId: this.formInline.lineId, // 线路id
        busUuid: this.formInline.busUuid, // 车辆id
        devCode: this.formInline.devCode, // 设备号
        drvEmployeeId: this.formInline.drvEmployeeId,
        busPlateNumber: this.formInline.busPlateNumber, // 车牌号
        busSelfCode: this.formInline.busSelfCode, // 自编号
        warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: this.formInline.warnTypeId.length === 0 ? defaultData.warningArr : this.formInline.warnTypeId, // 报警类型
        startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
        endTime: this.formInline.timeValue[1],
        pageSize: 10,
        pageNum: this.pageNum,
        auditStatus: this.userId === '1' ? this.getCheckType(type) : ['1'],
        warnUuid: this.formInline.warnUuid
      })
    },
    getExcel () {
      let defaultData = this.$store.getters.formData
      let auditStatus = this.formInline.checkType
      this.$api['downLoad.warnExport']({
        orgId: this.formInline.orgId === '1' ? '' : this.formInline.orgId, // 组织机构id
        lineId: this.formInline.lineId, // 线路id
        busUuid: this.formInline.busUuid, // 车辆id
        devCode: this.formInline.devCode, // 设备号
        busPlateNumber: this.formInline.busPlateNumber, // 车牌号
        drvEmployeeId: this.formInline.drvEmployeeId,
        busSelfCode: this.formInline.busSelfCode, // 自编号
        warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: this.formInline.warnTypeId.length === 0 ? defaultData.warningArr : this.formInline.warnTypeId, // 报警类型
        startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
        endTime: this.formInline.timeValue[1],
        auditStatus: this.userId === '1' ? this.getCheckType(auditStatus) : ['1'],
        warnUuid: this.formInline.warnUuid
      }).then(res => {
        // console.log(res)
        window.open(res.url)
        // window.location.href = res.url
        this.centerDialogVisible = false
        this.$message.success('正在下载中。。。')
      }).catch((err) => {
        this.$message.error(err.message)
      })
    },
    getCheckType (type) {
      let checkList = []
      if (type.length > 0) {
        type.forEach(item => {
          if (item === '未审核') {
            checkList.push('0')
          } else if (item === '属实') {
            checkList.push('1')
          } else if (item === '误报') {
            checkList.push('2')
          } else {
            checkList.push('3')
          }
        })
      } else {
        checkList = []
      }
      return checkList
    },
    getPointAddress (item, index) {
      // eslint-disable-next-line no-undef
      let point = new BMap.Point(Number(item.lng), Number(item.lat))
      // eslint-disable-next-line no-undef
      let gc = new BMap.Geocoder()
      return new Promise((resolve, reject) => {
        gc.getLocation(point, function (rs) {
          let addComp = rs.addressComponents
          resolve({ adr: `${addComp.province}${addComp.city}${addComp.district}${addComp.street}${addComp.streetNumber}`, idx: index })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.right-search-wrapper {
  width: 100%;
  padding: 20px 10px;
  box-sizing: border-box;
  overflow: auto;
}
</style>
