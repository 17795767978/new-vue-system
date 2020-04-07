<template>
  <div v-loading="isLoading">
    <el-table
      :data="tableData"
      height="72vh"
      size="mini"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="80">
        <template slot-scope="scope">
          <span> {{scope.$index + (pageNumber - 1) * pageSize + 1}} </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="orgName"
        align="center"
        label="所属机构"
        width="150"
        >
      </el-table-column>
      <el-table-column
        prop="roleName"
        align="center"
        label="用户"
        width="150">
      </el-table-column>
      <el-table-column
        prop="userAccount"
        align="center"
        label="角色"
        width="100">
      </el-table-column>
      <el-table-column
        prop="accessModelName"
        align="center"
        label="模块"
        width="80">
      </el-table-column>
      <el-table-column
        prop="accessPageName"
        align="center"
        label="页面"
        width="120">
      </el-table-column>
      <el-table-column
        prop="accessIp"
        align="center"
        label="访问Ip"
        width="120">
      </el-table-column>
      <el-table-column
        prop="accessTime"
        align="center"
        :formatter="getAccessTime"
        label="访问时间"
        >
      </el-table-column>
      <el-table-column
        prop="accessDuration"
        align="center"
        label="耗时"
        width="120">
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        :formatter="getCreateTime"
        label="创建时间">
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right; margin-top: 1vh"
      background
      :current-page="pageNumber"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  props: {
    selectData: Object
  },
  data () {
    return {
      isLoading: false,
      tableData: [],
      pageNumber: 1,
      pageSize: 15,
      total: 0,
      searchData: {}
    }
  },
  computed: {
    ...mapGetters(['formData', 'userId'])
  },
  created () {
    let yestoday = new Date()
    // let defaultForm = this.formData
    let startTime = moment(yestoday - 24 * 60 * 60 * 1000).format('YYYY-MM-DD 00:00:00')
    let endTime = moment().format('YYYY-MM-DD 23:59:59')
    this.searchData = {
      orgId: this.userId === '1' ? '' : this.userId,
      userId: '',
      accessModelName: '',
      accessPageName: '',
      accessIp: '',
      startTime,
      endTime,
      pageNumber: 1,
      pageSize: 15 }
    this._getPageAssessLog(this.searchData)
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.pageNumber = 1
        this.searchData = {
          orgId: newV.orgId === '1' ? '' : newV.orgId,
          userId: newV.user,
          accessModelName: newV.modules,
          accessPageName: newV.pages,
          accessIp: newV.Ip,
          startTime: newV.startTime,
          endTime: newV.endTime,
          pageNumber: 1,
          pageSize: 15 }
        this._getPageAssessLog(this.searchData)
      }
    }
  },
  methods: {
    _getPageAssessLog (params) {
      this.$api['wholeInformation.getPageAssessLog'](params).then(res => {
        this.total = res.total
        this.tableData = res.list
      })
    },
    getAccessTime (row) {
      return moment(row.accessTime).format('YYYY-MM-DD HH:mm:ss')
    },
    getCreateTime (row) {
      return moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      this.searchData.pageNumber = val
      this._getPageAssessLog(this.searchData)
    }
  }
}
</script>

<style>

</style>
