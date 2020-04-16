<template>
  <div class="alarm-table">
    <el-row style="margin-bottom: 20px;">
      <el-button type="success" @click="AddAlarm">新增处理意见</el-button>
    </el-row>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        width="60"
        type="index"
        label="序号">
        <template slot-scope="scope">
          <span> {{scope.$index + (currentPage - 1) * 10 + 1}} </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="hStatus"
        label="处理类型">
        <template slot-scope="scope">
          <span>{{scope.row.hStatus === '1' ? '已处理' : '误报'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="hContext"
        label="处理内容" width="600">
      </el-table-column>
      <el-table-column
        align="center"
        prop="hIsvalid"
        label="内容状态">
        <template slot-scope="scope">
          <el-button type="danger" plain v-if="scope.row.hIsvalid === '0'" size="small" @click="handleOpen(scope.row)">禁用</el-button>
          <el-button type="success" plain v-if="scope.row.hIsvalid === '1'" size="small"  @click="handleBan(scope.row)">启用</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="crateTime"
        :formatter="getcreateTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        style="float: right; margin-top: 20px;"
        background
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
      <span class="demonstration" style="float: right; margin-top: 20px; line-height: 36px;">共{{total}}条</span>
    </div>
    <dialogWrapper :rowData="rowData" @updateTable="updateTable" ref="formName"></dialogWrapper>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
import dialogWrapper from './dialog'
export default {
  data () {
    return {
      total: 0,
      tableData: [],
      rowData: {},
      currentPage: 1
    }
  },
  components: {
    dialogWrapper
  },
  created () {
    this._alarmManageTable({
      pageSize: 10,
      pageNumber: this.currentPage
    })
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    _alarmManageTable (params) {
      this.$api['tiredMonitoring.getAlarmResult'](params).then(res => {
        // return this.getList(res)
        this.tableData = res.list
        this.total = res.total
      })
    },
    getList (res) {
      let tableArr = res.list
      this.tableData = tableArr.sort((prev, next) => next.plSort - prev.plSort)
      this.total = res.total
    },
    getcreateTime (row) {
      return moment(row.crateTime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleClick (row) {
      this.$children[3].dialogFormVisible = true
      this.rowData = row
    },
    handleBan (row) {
      this.$api['tiredMonitoring.updateAlarmResult']({
        uuid: row.uuid,
        hStatus: row.hStatus,
        hContext: row.hContext,
        hIsvalid: 0
      }).then(res => {
        this._alarmManageTable({
          pageSize: 10,
          pageNum: this.currentPage
        })
      })
    },
    handleOpen (row) {
      this.$api['tiredMonitoring.updateAlarmResult']({
        uuid: row.uuid,
        hStatus: row.hStatus,
        hContext: row.hContext,
        hIsvalid: 1
      }).then(res => {
        this._alarmManageTable({
          pageSize: 10,
          pageNum: this.currentPage
        })
      })
    },
    AddAlarm () {
      this.$children[3].dialogFormVisible = true
      this.rowData = {}
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this._alarmManageTable({
        pageSize: 10,
        pageNumber: this.currentPage
      })
    },
    updateTable () {
      this._alarmManageTable({
        pageSize: 10,
        pageNumber: this.currentPage
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.alarm-table {
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}
</style>
