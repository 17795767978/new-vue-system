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
        prop="userName"
        align="center"
        label="用户"
        width="150">
      </el-table-column>
      <el-table-column
        prop="role"
        align="center"
        label="角色"
        width="100">
      </el-table-column>
      <el-table-column
        prop="linename"
        align="center"
        label="模块"
        width="80">
      </el-table-column>
      <el-table-column
        prop="desc"
        align="center"
        label="页面"
        width="120">
      </el-table-column>
      <el-table-column
        prop="desc"
        align="center"
        label="访问Ip"
        width="120">
      </el-table-column>
      <el-table-column
        prop="desc"
        align="center"
        label="访问时间"
        >
      </el-table-column>
      <el-table-column
        prop="desc"
        align="center"
        label="耗时"
        width="120">
      </el-table-column>
      <el-table-column
        prop="desc"
        align="center"
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
      total: 0
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
    this._getLoginLogList({
      orgId: this.userId === '1' ? '' : this.userId,
      lineId: '',
      startTime,
      endTime,
      busNumber: '',
      driverNum: '',
      pageNumber: 1,
      pageSize: 15 })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        console.log(newV)
      }
    }
  },
  methods: {
    _getLoginLogList (params) {},
    handleCurrentChange (val) {
      this.pageNumber = val
    }
  }
}
</script>

<style>

</style>
