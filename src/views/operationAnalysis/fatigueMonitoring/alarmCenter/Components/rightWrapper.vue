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
        <el-form-item label="设备编号">
          <el-input v-model="formInline.devCode" placeholder="请输设备编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="formInline.busPlateNumber" placeholder="请输车牌号" clearable></el-input>
        </el-form-item>
        <el-form-item label="自编号">
          <el-input v-model="formInline.busSelfCode" placeholder="请输自编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="司机">
          <el-input v-model="formInline.driverName" placeholder="请输司机名" clearable></el-input>
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
        <el-form-item label="审核状态">
          <el-select v-model="formInline.auditStatus" multiple collapse-tags placeholder="请选择">
            <el-option
              v-for="item in auditOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理结果">
          <!-- <el-select v-model="formInline.checkType">
            <el-option
              v-for="item in checkOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select> -->
          <el-checkbox-group v-model="formInline.checkType">
            <el-checkbox label="未处理" :disabled="formInline.auditStatus.length === 1 ? formInline.auditStatus[0] === '1' : false"></el-checkbox>
            <el-checkbox label="已处理"></el-checkbox>
            <el-checkbox label="误报"></el-checkbox>
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
        height="580"
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
          prop="driverName"
          label="司机"
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
          prop="devCode"
          label="设备编号"
          width="150">
        </el-table-column>
        <el-table-column
          align="center"
          prop="warnTypeName"
          label="报警类型"
          width="150">
        </el-table-column>
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
          prop="handleUser"
          label="处理人"
          width="100"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="handleTime"
          label="处理时间"
          :formatter="getHandleTime"
          width="160"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="warnTime"
          label="处理结果"
          width="100"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.handleResult === '0'">未处理</span>
            <span v-else-if="scope.row.handleResult === '1'">已处理</span>
            <span v-else>误报</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="handleSuggestion"
          label="处理意见"
          width="120"
        >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" :content="scope.row.handleSuggestion" placement="top-start">
              <span>{{scope.row.handleSuggestion && scope.row.handleSuggestion.length > 7 ? `${scope.row.handleSuggestion.substring(0, 6)}...` : scope.row.handleSuggestion}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="auditStatus"
          label="审核结果"
          width="100"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.auditStatus === '0' || scope.row.auditStatus"></span>
            <span v-else-if="scope.row.auditStatus === '1'">已处理</span>
            <span v-else-if="scope.row.auditStatus === '2'">误报</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="auditSuggestion"
          label="审核意见"
          width="120"
        >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" :content="scope.row.auditSuggestion" placement="top-start">
              <span>{{scope.row.auditSuggestion && scope.row.auditSuggestion.length > 7 ? `${scope.row.auditSuggestion.substring(0, 6)}...` : scope.row.auditSuggestion}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="260">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="mini">详情</el-button>
            <el-button :disabled="scope.row.overTime || scope.row.handleResult !== '0' || (new Date() - scope.row.warnTime > 24000 * 3600)" @click="handleCheck(scope.row)" type="success" size="mini">处理</el-button>
            <!-- isRoleType -->
            <el-button v-if="(isRoleType && (new Date() - scope.row.warnTime > 24000 * 3600)) || (isRoleType &&  scope.row.handleResult !== '0')" @click="handleAudit(scope.row)" :type="scope.row.auditStatus === '0' ? 'warning' : 'info'" size="mini">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          style="float: right; margin-top: 20px;"
          background
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
        <el-form-item label="处理内容" prop="selectCheckContent">
          <el-select v-model="ruleForm.selectCheckContent">
            <el-option
              v-for="item in checkcontentOptions"
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
    <el-dialog
      title="审核操作"
      :visible.sync="auditDialog"
      :show-close="false"
      width="30%"
      center>
      <el-form :model="auditRuleForm" :rules="auditRules" ref="auditRuleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="审核状态" prop="auditStatus">
          <el-select v-model="auditRuleForm.auditStatus">
            <el-option
              v-for="item in checkOptions.slice(1)"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核内容" prop="selectAuditContent">
          <el-select v-model="auditRuleForm.selectAuditContent">
            <el-option
              v-for="item in auditcontentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核意见" prop="auditSuggestion">
          <el-input type="textarea" v-model="auditRuleForm.auditSuggestion" maxlength="100"></el-input>
          <span>{{auditRuleForm.auditSuggestion.length}}/100</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetAutidForm('auditRuleForm')">取 消</el-button>
        <el-button type="primary" @click="upDateAudit('auditRuleForm')">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
// import { tableList, alarmType, downLoad } from 'server/interface'
// import downloadExcel from 'vue-json-excel'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  props: {
    selectCarData: {
      type: Object
    }
  },
  components: {
    // downloadExcel
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
        driverName: '',
        warnTypeId: [],
        timeValue: [],
        checkType: ['已处理'],
        auditStatus: ['0']
      },
      ruleForm: {
        status: '',
        suggestion: '',
        selectCheckContent: '' // 选择处理的内容
      },
      auditRuleForm: {
        auditStatus: '',
        auditSuggestion: '',
        selectAuditContent: '' // 选择审核的内容
      },
      rules: {
        status: [
          { required: true, message: '请选择处理状态', trigger: 'blur' }
        ],
        suggestion: [
          { validator: markSuggestion, trigger: 'blur' }
        ]
        // selectCheckContent: [
        //   {
        //     required: true, message: '请选择处理内容', trigger: 'blur'
        //   }
        // ]
      },
      auditRules: {
        auditStatus: [
          { required: true, message: '请选择处理状态', trigger: 'blur' }
        ],
        auditSuggestion: [
          { validator: markSuggestion, trigger: 'blur' }
        ]
        // selectAuditContent: [
        //   {
        //     required: true, message: '请选择处理内容', trigger: 'blur'
        //   }
        // ]
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
      warnOptions: [],
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      json_data: [],
      centerDialogVisible: false,
      loading: true,
      downloadLoading: true,
      checkDialog: false,
      auditDialog: false,
      checkMsg: {},
      auditMsg: {},
      code: '加载中',
      comOptions: [],
      lineOptions: [],
      checkcontentOptions: [],
      auditcontentOptions: [],
      isRoleType: JSON.parse(localStorage.getItem('userRoleType')),
      isOthersSug: false,
      rowDatas: {}
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
    this.formInline.orgId = this.userId
    this._alarmType({
      warnLevel: ''
    })
  },
  mounted () {
    let defaultData = this.$store.getters.formData
    setTimeout(() => {
      if (Object.keys(this.$route.params).length > 0) {
        this.formInline = this.$route.params
      }
      let type = this.formInline.checkType
      this._tableList({
        orgId: this.userId === '1' ? '' : this.userId, // 组织机构id
        lineId: this.formInline.lineId, // 线路id
        busUuid: this.formInline.busUuid, // 车辆id
        devCode: this.formInline.devCode, // 设备号
        busPlateNumber: this.formInline.busPlateNumber, // 车牌号
        busSelfCode: this.formInline.busSelfCode, // 自编号
        warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: this.formInline.warnTypeId.length === 0 ? defaultData.warningArr : this.formInline.warnTypeId, // 报警类型
        startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
        endTime: this.formInline.timeValue[1],
        pageSize: 10,
        pageNum: 1,
        driverName: this.formInline.driverName,
        handleResults: this.getCheckType(type),
        auditStatus: this.formInline.auditStatus
      })
    }, 200)
  },
  activated () {
    let defaultData = this.$store.getters.formData
    setTimeout(() => {
      if (Object.keys(this.$route.params).length > 0) {
        this.formInline = this.$route.params
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
        warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: this.formInline.warnTypeId.length === 0 ? defaultData.warningArr : this.formInline.warnTypeId, // 报警类型
        startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
        endTime: this.formInline.timeValue[1],
        driverName: this.formInline.driverName,
        pageSize: 10,
        pageNum: 1,
        handleResults: this.getCheckType(type),
        auditStatus: this.formInline.auditStatus
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
        let handleResults = this.getCheckType(newValue.checkType)
        if (newValue.levelsType !== '0') {
          this._tableList({
            orgId: this.formInline.orgId === '1' ? '' : this.formInline.orgId, // 组织机构id
            lineId: this.formInline.lineId, // 线路id
            busUuid: this.formInline.busUuid, // 车辆id
            devCode: this.formInline.devCode, // 设备号
            busPlateNumber: this.formInline.busPlateNumber, // 车牌号
            busSelfCode: this.formInline.busSelfCode, // 自编号
            warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
            warnTypeId: this.formInline.warnTypeId.length === 0 ? defaultData.warningArr : this.formInline.warnTypeId, // 报警类型
            startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
            endTime: this.formInline.timeValue[1],
            driverName: this.formInline.driverName,
            pageSize: 10,
            pageNum: 1,
            handleResults,
            auditStatus: this.formInline.auditStatus
          })
        }
      }
    },
    '$route.params': {
      handler (newV) {
        console.log(newV)
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
        // 判断是否路由传值
        if (Object.keys(this.$route.params).length === 0) {
          this.formInline.lineId = ''
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
          setTimeout(() => {
            this.lineOptions = list
          }, 20)
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
    'ruleForm.status': {
      handler (newV) {
        this.ruleForm.selectCheckContent = ''
        this.ruleForm.suggestion = ''
        if (newV === '1') {
          this._getCheckOptions({
            handleStatus: '1',
            handleType: '1',
            handleIsvalid: '1'
          })
        } else if (newV === '2') {
          this._getCheckOptions({
            handleStatus: '2',
            handleType: '1',
            handleIsvalid: '1'
          })
        } else {
          this._getCheckOptions({
            handleStatus: '',
            handleType: '1',
            handleIsvalid: '1'
          })
        }
      }
    },
    'auditRuleForm.auditStatus': {
      handler (newV) {
        if (this.isOthersSug) {
          console.log(1)
          this.auditRuleForm.selectAuditContent = this.rowDatas && this.rowDatas.auditSuggestion
          this.auditRuleForm.auditSuggestion = this.rowDatas && this.rowDatas.auditSuggestion
        } else {
          console.log(2)
          // this.auditRuleForm.selectAuditContent = ''
          // this.auditRuleForm.auditSuggestion = this.rowDatas && this.rowDatas.auditSuggestion
        }
        if (newV === '1') {
          this._getCheckOptions({
            handleStatus: '1',
            handleType: '2',
            handleIsvalid: '1'
          })
        } else if (newV === '2') {
          this._getCheckOptions({
            handleStatus: '2',
            handleType: '2',
            handleIsvalid: '1'
          })
        } else {
          this._getCheckOptions({
            handleStatus: '',
            handleType: '2',
            handleIsvalid: '1'
          })
        }
      }
    },
    'ruleForm.selectCheckContent': {
      handler (newV) {
        this.ruleForm.suggestion = newV
      }
    },
    'auditRuleForm.selectAuditContent': {
      handler (newV) {
        if (newV !== '') {
          this.auditRuleForm.auditSuggestion = newV
        }
      }
    },
    auditDialog (newV) {
      if (!newV) {
        this.auditRuleForm = {
          auditStatus: '',
          auditSuggestion: '',
          selectAuditContent: ''
        }
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
    _getCheckOptions (params) {
      this.$api['tiredMonitoring.getByStatus'](params).then(res => {
        let dataArr = res
        this.checkcontentOptions = []
        this.auditcontentOptions = []
        if (params.handleType === '1') {
          dataArr.forEach((list, index) => {
            this.checkcontentOptions[index] = {
              label: list.handleContext.length > 13 ? `${list.handleContext.substring(0, 13)}...` : list.handleContext,
              value: list.handleContext
            }
          })
          this.checkcontentOptions.push({
            label: '其他',
            value: ''
          })
        } else {
          dataArr.forEach((list, index) => {
            this.auditcontentOptions[index] = {
              label: list.handleContext.length > 13 ? `${list.handleContext.substring(0, 13)}...` : list.handleContext,
              value: list.handleContext
            }
          })
          this.auditcontentOptions.push({
            label: '其他',
            value: ''
          })
        }
      })
    },
    _tableList (params) {
      this.loading = true
      this.$api['tiredMonitoring.getWarnList'](params).then(res => {
        this.tableData = res.list
        this.total = res.total
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.$message.error(err.message)
      })
    },
    getHandleTime (row) {
      return row.handleTime && moment(row.handleTime).format('YYYY-MM-DD HH:mm:ss')
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
        busSelfCode: this.formInline.busSelfCode, // 自编号
        warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: this.formInline.warnTypeId.length === 0 ? defaultData.warningArr : this.formInline.warnTypeId, // 报警类型
        startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
        endTime: this.formInline.timeValue[1],
        pageSize: 10,
        pageNum: this.pageNum,
        driverName: this.formInline.driverName,
        handleResults: this.getCheckType(type),
        auditStatus: this.formInline.auditStatus
      })
    },
    handleClick (row) {
      if (row.warnType === 'OVERSPEED') {
        this.$router.push({
          name: 'alarmContent',
          query: {
            id: row.warnUuid,
            type: 'overspeed'
          }
        })
      } else {
        this.$router.push({
          name: 'alarmContent',
          query: {
            id: row.warnUuid,
            type: 'normal'
          }
        })
      }
    },
    handleCheck (row) {
      this.checkMsg.warnUuid = row.warnUuid
      this.checkDialog = true
      this.ruleForm = {
        status: '',
        suggestion: '',
        selectCheckContent: ''
      }
      this._getCheckOptions({
        handleStatus: '',
        handleType: '1',
        handleIsvalid: '1'
      })
    },
    handleAudit (row) {
      this.rowDatas = row
      this.auditDialog = true
      this._getCheckOptions({
        handleStatus: row.auditStatus,
        handleType: '2',
        handleIsvalid: '1'
      })
      this.auditMsg.warnUuid = row.warnUuid
      setTimeout(() => {
        const isOthers = this.auditcontentOptions.filter(item => row.auditSuggestion === item.value)
        this.isOthersSug = +isOthers.length
        if (row.auditStatus !== '0') {
          this.auditRuleForm = {
            auditStatus: row.auditStatus,
            selectAuditContent: isOthers.length ? isOthers[0].value : '', // 选择审核的内容
            auditSuggestion: row.auditSuggestion
          }
        }
      }, 200)
    },
    upDateCheck (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api['tiredMonitoring.wsUpdate']({
            warnUuid: this.checkMsg.warnUuid,
            handleResult: this.ruleForm.status,
            handleSuggestion: this.ruleForm.suggestion
          }).then(res => {
            this.$message.success('已处理')
            this.resetForm(formName)
            let defaultData = this.$store.getters.formData
            this._tableList({
              orgId: this.formInline.orgId !== '1' ? this.formInline.orgId : '', // 组织机构id
              lineId: this.formInline.lineId, // 线路id
              busUuid: this.formInline.busUuid, // 车辆id
              devCode: this.formInline.devCode, // 设备号
              busPlateNumber: this.formInline.busPlateNumber, // 车牌号
              busSelfCode: this.formInline.busSelfCode, // 自编号
              warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
              warnTypeId: this.formInline.warnTypeId.length === 0 ? defaultData.warningArr : this.formInline.warnTypeId, // 报警类型
              startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
              endTime: this.formInline.timeValue[1],
              pageSize: 10,
              pageNum: this.pageNum,
              driverName: this.formInline.driverName,
              auditStatus: this.formInline.auditStatus
            })
          }).catch(err => {
            this.$message.error(err.msg)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    upDateAudit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api['tiredMonitoring.warnAudit']({
            warnUuid: this.auditMsg.warnUuid,
            auditStatus: this.auditRuleForm.auditStatus,
            auditSuggestion: this.auditRuleForm.auditSuggestion
          }).then(res => {
            this.$message.success('已审核')
            this.resetAutidForm(formName)
            let defaultData = this.$store.getters.formData
            this._tableList({
              orgId: this.formInline.orgId !== '1' ? this.formInline.orgId : '', // 组织机构id
              lineId: this.formInline.lineId, // 线路id
              busUuid: this.formInline.busUuid, // 车辆id
              devCode: this.formInline.devCode, // 设备号
              busPlateNumber: this.formInline.busPlateNumber, // 车牌号
              busSelfCode: this.formInline.busSelfCode, // 自编号
              warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
              warnTypeId: this.formInline.warnTypeId.length === 0 ? defaultData.warningArr : this.formInline.warnTypeId, // 报警类型
              startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
              endTime: this.formInline.timeValue[1],
              pageSize: 10,
              pageNum: this.pageNum,
              driverName: this.formInline.driverName,
              auditStatus: this.formInline.auditStatus
            })
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
    resetAutidForm (formName) {
      this.auditDialog = false
      this.$refs[formName].resetFields()
    },
    onSubmit () {
      let dateArr = []
      let defaultData = this.$store.getters.formData
      this.formInline.timeValue.forEach(time => {
        dateArr.push(moment(time).format('YYYY-MM-DD HH:mm:ss'))
      })
      if (this.userId !== '1') {
        this.formInline.orgId = this.userId
      }
      this.pageNum = 1
      let handleResults = this.formInline.checkType
      this._tableList({
        orgId: this.formInline.orgId === '1' ? '' : this.formInline.orgId, // 组织机构id
        lineId: this.formInline.lineId, // 线路id
        busUuid: this.formInline.busUuid, // 车辆id
        devCode: this.formInline.devCode, // 设备号
        busPlateNumber: this.formInline.busPlateNumber, // 车牌号
        busSelfCode: this.formInline.busSelfCode, // 自编号
        warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: this.formInline.warnTypeId.length === 0 ? defaultData.warningArr : this.formInline.warnTypeId, // 报警类型 // 报警类型
        startTime: dateArr[0], // 时间格式   开始结束默认查近7天的
        endTime: dateArr[1],
        pageSize: 10,
        pageNum: 1,
        driverName: this.formInline.driverName,
        handleResults: this.getCheckType(handleResults),
        auditStatus: this.formInline.auditStatus
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
        busUuid: '',
        busSelfCode: '',
        warnLevel: '',
        warnTypeId: [],
        timeValue: [moment(endTime).format('YYYY-MM-DD 00:00:00'), moment(dataNow).format('YYYY-MM-DD 23:59:59')],
        checkType: ['已处理'],
        auditStatus: ['0']
      }
      this.$emit('clear')
    },
    onSave () {
      this.centerDialogVisible = true
      // this.$api['tiredMonitoring.getWarnList']({
      //   orgId: this.formInline.orgId, // 组织机构id
      //   lineId: this.formInline.lineId, // 线路id
      //   busUuid: this.formInline.busUuid, // 车辆id
      //   devCode: this.formInline.devCode, // 设备号
      //   busPlateNumber: this.formInline.busPlateNumber, // 车牌号
      //   busSelfCode: this.formInline.busSelfCode, // 自编号
      //   warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
      //   warnTypeId: this.formInline.warnTypeId, // 报警类型
      //   startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
      //   endTime: this.formInline.timeValue[1],
      //   pageSize: 10000,
      //   pageNum: 1
      // }).then(res => {
      //   let excelArr = []
      //   res.list.forEach((item, index) => {
      //     item.warnTime = moment(item.warnTime).format('YYYY-MM-DD HH:mm:ss')
      //     excelArr[index] = {
      //       '所属公司': item.orgName,
      //       '所属线路': item.lineName,
      //       '车牌号': item.busPlateNumber,
      //       '车辆自编号': item.busSelfCode,
      //       '设备编号': item.devCode,
      //       '报警级别(级)': item.warnLevel,
      //       '报警类型': item.warnTypeName,
      //       '报警速度': item.speed,
      //       '报警时间': item.warnTime
      //     }
      //   })
      //   this.json_data = excelArr
      //   this.downloadLoading = false
      //   this.code = '下载'
      // })
    },
    getExcel () {
      let defaultData = this.$store.getters.formData
      let handleResults = this.formInline.checkType
      this.$api['downLoad.warnExport']({
        orgId: this.formInline.orgId === '1' ? '' : this.formInline.orgId, // 组织机构id
        lineId: this.formInline.lineId, // 线路id
        busUuid: this.formInline.busUuid, // 车辆id
        devCode: this.formInline.devCode, // 设备号
        busPlateNumber: this.formInline.busPlateNumber, // 车牌号
        busSelfCode: this.formInline.busSelfCode, // 自编号
        warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: this.formInline.warnTypeId.length === 0 ? defaultData.warningArr : this.formInline.warnTypeId, // 报警类型
        startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
        endTime: this.formInline.timeValue[1],
        driverName: this.formInline.driverName,
        handleResults: this.getCheckType(handleResults),
        auditStatus: this.formInline.auditStatus
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
      return checkList
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
