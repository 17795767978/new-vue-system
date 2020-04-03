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
      <!-- <el-table-column
        prop="busnumber"
        align="center"
        label="车牌号"
        width="120">
      </el-table-column> -->
      <el-table-column
        prop="userAccount"
        align="center"
        label="用户"
        width="150">
      </el-table-column>
      <el-table-column
        prop="roleName"
        align="center"
        label="角色"
        width="100">
      </el-table-column>
      <!-- <el-table-column
        prop="linename"
        align="center"
        label="线路"
        width="80">
      </el-table-column> -->
      <el-table-column
        prop="accessModel"
        align="center"
        label="描述"
        width="120">
      </el-table-column>
      <el-table-column
        prop="accessIp"
        align="center"
        label="访问Ip"
        width="120">
      </el-table-column>
      <el-table-column
        prop="accessChannel"
        align="center"
        label="渠道"
        width="400">
      </el-table-column>
      <el-table-column
        prop="accessTime"
        align="center"
        :formatter="getAccessTime"
        label="登录时间">
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
    let yestoday = new Date() - 24 * 60 * 60 * 1000
    // let defaultForm = this.formData
    let startTime = moment(yestoday).format('YYYY-MM-DD 00:00:00')
    let endTime = moment().format('YYYY-MM-DD 23:59:59')
    this.searchData = {
      orgId: this.userId === '1' ? '' : this.userId,
      userId: '',
      accessModel: '',
      accessIp: '',
      startTime,
      endTime,
      pageNumber: 1,
      pageSize: 15 }
    this._getLoginLogList(this.searchData)
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.pageNumber = 1
        this.searchData = {
          orgId: newV.orgId === '1' ? '' : this.orgId,
          userId: newV.user,
          accessModel: newV.desc,
          accessIp: newV.ip,
          startTime: newV.startTime,
          endTime: newV.endTime,
          pageNumber: 1,
          pageSize: 15 }
        this._getLoginLogList(this.searchData)
      }
    }
  },
  methods: {
    _getLoginLogList (params) {
      this.$api['wholeInformation.getLoginList'](params).then(res => {
        this.tableData = res.list
        this.total = res.total
      })
    },
    getAccessTime (data) {
      return moment(data.accessTime).format('YYYY-MM-DD HH:mm:ss')
    },
    getCreateTime (data) {
      return moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      this.searchData.pageNumber = val
      this._getLoginLogList(this.searchData)
    }
  }
}
</script>

<style>

</style>
