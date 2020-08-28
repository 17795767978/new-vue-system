<template>
  <div class="table" v-loading="isLoadingTo">
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      size="mini"
      tooltip-effect="dark"
      style="width: 100%"
      @select="onTableSelect"
      @select-all="selectAll"
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
      <!-- <el-table-column
        prop="busCreateTime"
        align="center"
        :formatter="getTime"
        label="下发时间">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="下发内容">
      </el-table-column> -->
      <el-table-column
        prop="name"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="getDetail(scope.row)"  size="mini">详情</el-button>
        </template>
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
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNumber"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
    <el-dialog title="下发消息" :visible.sync="dialogFormVisible" :show-close="false">
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
          <el-button type="primary" style="margin-left: 5vw;" v-if="isSafeSend" @click="gotoDetail">下发消息维护</el-button>
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
        <el-form-item label="提醒内容" prop="msgContent">
          <el-select v-model="ruleForm.msgContent" placeholder="请选择提醒内容">
            <el-option
              v-for="item in msgOptions"
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
          <el-input type="textarea" :rows="5" v-model="ruleForm.desc" maxlength="100"></el-input>
          <p class="text-limit">{{ruleForm.desc.length}} / 100</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="isLoading">立即下发</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="下发消息详情" width="40%" :visible.sync="detailVisible">
      <ul>
        <li style="border-bottom: 1px solid #e5e5e5; padding: .5vh; box-sizing:border-box" v-for="(item, index) in detailMsg" :key="index">
          <p style="margin: .3vh 1vw;">下发时间：{{item.time}}</p>
          <p style="margin: .3vh 1vw;">下发内容： {{item.content}}</p>
        </li>
      </ul>
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
      isLoadingTo: false,
      isLoading: false,
      isSafeSend: false,
      tableData: [],
      tableDataAll: '',
      selectItems: [],
      pageSize: 15,
      pageNumber: 1,
      searchData: { orgId: '', lineId: '' },
      total: 0,
      dialogFormVisible: false,
      warnsOptions: [],
      msgOptions: [],
      devOptions: [{
        label: '调度主机',
        value: '1'
      }],
      ruleForm: {
        dev: '',
        msgType: '',
        msgContent: '',
        desc: ''
      },
      rules: {
        dev: [{ required: true, message: '请选择下发设备', trigger: 'change' }],
        msgType: [{ required: true, message: '请选择提醒类型', trigger: 'change' }],
        desc: [{ validator: markSuggestion, trigger: 'blur' }],
        msgContent: [{ required: true, message: '请选择提醒内容', trigger: 'change' }]
      },
      detailVisible: false,
      detailMsg: [],
      isCheckAll: false, // 是否全选状态
      isSelectAll: false, // 是否全选
      removeChecks: [] // 被取消选中的数据
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
      carList: this.searchData.carList,
      carNo: this.searchData.carNo,
      pageSize: 100000,
      pageNumber: 1
    })
    this._alarmType({
      pageNum: 1,
      pageSize: 100000
    })
    this._contentType({
      voicetempTypeUuid: '',
      pageNum: 1,
      pageSize: 100000
    })
    this.isMsgOperation()
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
          carList: newV.busNumber,
          carNo: newV.carNo,
          pageSize: 100000,
          pageNumber: 1
        })
      }
    },
    isSelectAll (newV) {
      if (newV) {
        this.tableDataAll.forEach(item => {
          item.isSelect = true
        })
        let arrSelect = this.tableDataAll.filter(item => item.isSelect === true)
        let arrBusUuid = arrSelect.map(item => item.busUuid)
        this.selectItems = arrBusUuid.join(',')
      } else {
        this.tableDataAll.forEach(item => {
          item.isSelect = false
        })
      }
    },
    'ruleForm.msgType': {
      handler (newV) {
        this.ruleForm.msgContent = ''
        this.ruleForm.desc = ''
        this._contentType({
          voicetempTypeUuid: newV,
          pageNum: 1,
          pageSize: 100000
        })
      }
    },
    'ruleForm.msgContent': {
      handler (newV) {
        const selectData = this.msgOptions.filter(item => item.value === newV)
        this.ruleForm.desc = selectData.length ? selectData[0].label : ''
      }
    }
  },
  methods: {
    // 判断是否有语音下发页面
    isMsgOperation () {
      const roles = this.$store.getters.roles
      const selectRoles = roles.filter(item => item.path === '/channel-management')[0]
      const isHasCurrent = selectRoles.children.some(item => item.path === '/msgsend-tempmaintain')
      if (isHasCurrent) {
        this.isSafeSend = true
      } else {
        this.isSafeSend = false
      }
    },
    _busPageList (params) {
      this.isLoadingTo = true
      this.$api['tiredMonitoring.busPageList'](params).then(res => {
        this.isLoadingTo = false
        if (res.total === 0) {
          this.$message.warning('暂无数据')
        }
        this.total = res.total
        this.tableDataAll = res.list
        this.tableDataAll.forEach(item => {
          item.isSelect = false
        })
        this.tableData = this.tableDataAll.slice((this.pageNumber - 1) * 15, this.pageNumber * 15)
      })
    },
    _alarmType (params) {
      this.$api['msgsend.getVoicetempTypeData'](params).then(res => {
        let dataArr = res.list
        this.warnsOptions = []
        dataArr.forEach((list, index) => {
          this.warnsOptions.push({
            label: list.voicetempContent,
            value: list.voicetempTypeUuid
          })
        })
      })
    },
    _contentType (params) {
      this.$api['msgsend.getVmContentsByVtUuid'](params).then(res => {
        let dataArr = res.list
        this.msgOptions = []
        dataArr.forEach((list, index) => {
          this.msgOptions.push({
            label: list.voicetempMessageContent,
            value: list.voicetempUuid
          })
        })
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoading = true
          this.$api['tiredMonitoring.VoicepromptBatch']({
            devType: this.ruleForm.dev,
            sendType: this.ruleForm.msgType,
            busUuids: this.selectItems,
            content: this.ruleForm.desc
          }).then(res => {
            this.isLoading = false
            this.dialogFormVisible = false
            this.$message.success('下发消息成功')
            this.isCheckAll = false
            this.isSelectAll = false
            this.ruleForm = {
              dev: '',
              msgType: '',
              msgContent: '',
              desc: ''
            }
            this.resetForm('ruleForm')
            this._busPageList({
              orgId: this.searchData.orgId,
              lineId: this.searchData.lineId,
              carList: this.searchData.busNumber,
              carNo: this.searchData.carNo,
              pageSize: 10000,
              pageNumber: this.pageNumber
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.isLoading = false
      this.dialogFormVisible = false
      this.ruleForm = {
        dev: '',
        msgType: '',
        msgContent: '',
        desc: ''
      }
      this.$refs[formName].resetFields()
    },
    getTime (row) {
      return moment(row.busCreateTime).format('YYYY-MM-DD HH:mm:ss')
    },
    onTableSelect (rows, row) {
      row.isSelect = !row.isSelect
    },
    selectAll (data) {
      this.isSelectAll = data.length > 0
    },
    handleSelectionChange () {
      let arrSelect = this.tableDataAll.filter(item => item.isSelect === true)
      let arrBusUuid = arrSelect.map(item => item.busUuid)
      this.selectItems = arrBusUuid.join(',')
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      this.tableData = this.tableDataAll.slice((val - 1) * 15, val * 15)
      setTimeout(() => {
        this.tableData.forEach((item, index) => {
          if (item.isSelect) {
            this.$refs.multipleTable.toggleRowSelection(this.tableData[index])
          }
        })
      }, 20)
    },
    getDetail (row) {
      this.detailMsg = row.voiceMap.map(item => ({
        content: item.voiceprompt_content,
        time: moment(item.send_time).format('YYYY-MM-DD HH:mm:ss')
      }))
      this.detailVisible = true
    },
    gotoDetail () {
      this.dialogFormVisible = false
      this.$router.push({
        name: 'msgTempMaintain'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.text-limit {
  margin: 0
}
</style>
