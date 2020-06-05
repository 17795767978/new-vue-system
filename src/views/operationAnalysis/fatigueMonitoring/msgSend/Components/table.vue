<template>
  <div class="table">
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      size="mini"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        align="center"
        label="机构"
        prop="orgName"
        width="200">
      </el-table-column>
      <el-table-column
        prop="lineName"
        label="线路"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="busPlateNumber"
        label="车牌号">
      </el-table-column>
      <el-table-column
        prop="busSelfCode"
        align="center"
        label="自编号">
      </el-table-column>
      <el-table-column
        prop="busCreateTime"
        align="center"
        :formatter="getTime"
        label="下发时间">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="下发内容">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="下发状态">
      </el-table-column>
      <!-- <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column> -->
    </el-table>
    <el-pagination
      style="float: right; margin-top: 20px;"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="pageNumber"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
    <el-dialog title="下发消息" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="下发设备" prop="dev">
          <el-select v-model="ruleForm.dev" placeholder="请选择下发设备">
            <el-option
              v-for="item in devOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提醒类型" prop="msgType">
          <el-select v-model="ruleForm.msgType" placeholder="请选择提醒类型">
            <el-option
              v-for="item in warnsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="提醒内容" prop="msgContent">
          <el-select v-model="ruleForm.msgContent" placeholder="请选择提醒内容">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="内容描述" prop="desc">
          <el-input type="textarea" :rows="5" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即下发</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  props: {
    selectData: {
      type: Object
    }
  },
  data () {
    let markSuggestion = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写内容描述'))
      } else if (value.length && value.length > 150) {
        return callback(new Error('输入最大100字'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      selectItems: [],
      pageSize: 15,
      pageNumber: 1,
      searchData: { orgId: '', lineId: '' },
      total: 0,
      dialogFormVisible: false,
      warnsOptions: [],
      devOptions: [{
        label: '调度主机',
        value: '1'
      }],
      ruleForm: {
        dev: '',
        msgType: '',
        // msgContent: '',
        desc: ''
      },
      rules: {
        dev: [{ required: true, message: '请选择下发设备', trigger: 'change' }],
        msgType: [{ required: true, message: '请选择提醒类型', trigger: 'change' }],
        desc: [{ validator: markSuggestion, trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
    this.searchData.orgId = this.userId
    this._busPageList({
      orgId: this.searchData.orgId,
      lineId: this.searchData.lineId,
      pageSize: 15,
      pageNumber: 1
    })
    this._alarmType({
      warnLevel: ''
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.searchData.orgId = newV.orgId
        this.searchData.lineId = newV.lineId
        this.pageNumber = 1
        this._busPageList({
          orgId: newV.orgId,
          lineId: newV.lineId,
          pageSize: 15,
          pageNumber: 1
        })
      }
    }
  },
  methods: {
    _busPageList (params) {
      this.$api['tiredMonitoring.busPageList'](params).then(res => {
        if (res.total === 0) {
          this.$message.warning('暂无数据')
        }
        this.total = res.total
        this.tableData = res.list
      })
    },
    _alarmType (params) {
      this.$api['tiredMonitoring.getWarntypes'](params).then(res => {
        let dataArr = res
        this.warnsOptions = []
        dataArr.forEach((list, index) => {
          this.warnsOptions.push({
            label: list.value,
            value: list.code
          })
        })
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api['tiredMonitoring.VoicepromptBatch']({
            devType: this.ruleForm.dev,
            sendType: this.ruleForm.msgType,
            busUuid: this.warnDetails.busUuid,
            content: this.ruleForm.desc
          }).then(res => {
            this.$message.success('下发消息成功')
            this.ruleForm = {
              dev: '',
              msgType: '',
              // msgContent: '',
              desc: ''
            }
            this.resetForm('ruleForm')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getTime (row) {
      return moment(row.busCreateTime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleSelectionChange (data) {
      let arr = []
      arr = data.map(item => item.busUuid)
      this.selectItems = arr.splice('')
      console.log(data)
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      this._busPageList({
        orgId: this.searchData.orgId,
        lineId: this.searchData.lineId,
        pageSize: 15,
        pageNumber: this.pageNumber
      })
    }
  }
}
</script>

<style>

</style>
