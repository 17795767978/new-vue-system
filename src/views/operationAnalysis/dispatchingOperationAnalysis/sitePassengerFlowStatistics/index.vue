<template>
  <div>
    <!-- 查询区 -->
    <Search
      isDateToNoDefault
      isSortMethod
      isEmpty
      isDownload
      downLoadName="mptReport.getStationPassengerFlowExport"
      @configCheck="getSearch"/>
    <!-- TABLE区 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      element-loading-text="拼命加载中"
      border
      stripe
      size="small"
      style="width: 100%;margin-top: 10px;">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80"
      >
      <template slot-scope="scope">
        <span> {{scope.$index + (pageNumber - 1) * pageSize + 1}} </span>
      </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="dateRange"
        label="时间"
        width="220">
      </el-table-column>
      <el-table-column
        align="center"
        prop="staName"
        label="站点"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="getOnNumber"
        label="上车人数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="getOffNumber"
        label="下车人数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="avgUpPayNumber"
        label="平均上车人数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="avgDownPayNumber"
        label="平均下车人数">
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right; margin-top: 20px;"
      background
      :disabled="isDisabled"
      :current-page="pageNumber"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :page-size="pageSize"
      :pager-count="5"
      :total="total">
    </el-pagination>
    <span class="demonstration" style="float: right; margin-top: 20px; line-height: 36px;">共{{total}}条</span>
  </div>
</template>
<script>
import Search from '@/components/searchAlarm'
export default {
  name: 'sitePassengerFlowStatistics',
  components: { Search },
  methods: {
    getSearch (event) {
      const noDefaultDateArr = event.noDefaultDateArr
      this.params = {
        'startDate': noDefaultDateArr[0] || null,
        'endDate': noDefaultDateArr[1] || null,
        'sort': event.sortMethod
      }
      this.initList()
    },
    initList () {
      this.pageNumber = 1
      this.getList()
    },
    getList () {
      if (this.params.startDate === null || this.params.endDate === null) {
        this.$message.warning('查询日期不可为空')
        return false
      }
      this.loading = true
      this.$api['mptReport.stationPassengerFlowStatistics'](Object.assign({}, this.params, {
        pageNum: this.pageNumber,
        pageSize: this.pageSize
      })).then(res => {
        // this.tableData = res
        this.tableData = res.list
        this.total = res.total
        this.loading = false
      }).catch(err => {
        this.$message.error('数据获取失败')
        console.log(err)
        this.loading = false
      })
    },
    /* 分页查询 */
    handleCurrentChange (val) {
      this.pageNumber = val
    }
  },
  data () {
    return {
      isDisabled: false,
      loading: false,
      pageNumber: 1,
      pageSize: 15,
      total: 0,
      searchType: 0,
      params: {
        'startDate': null,
        'endDate': null,
        'sort': 'getOnNumber'
      },
      tableData: []
    }
  }
}
</script>
<style scoped>

</style>
