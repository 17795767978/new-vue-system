<template>
  <div>
    <!-- 查询区 -->
    <Search
      isDateToNoDefault
      isEmpty
      @configCheck="getSearch"
    />
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
        prop="orgName"
        label="公司"
        width="220">
      </el-table-column>
      <el-table-column
        align="center"
        prop="lineName"
        label="线路"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="payTimeInterval"
        label="日期"
        width="220">
      </el-table-column>
      <el-table-column
        align="center"
        prop="sumUpPayNumber"
        label="上车总数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="sumDownPayNumber"
        label="下车总数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="avgUpPayNumber"
        label="平均上车/天">
      </el-table-column>
      <el-table-column
        align="center"
        prop="avgDownPayNumber"
        label="平均下车/天">
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
  name: 'monthlyPassengerTrafficReport',
  components: { Search },
  methods: {
    getSearch (event) {
      const noDefaultDateArr = event.noDefaultDateArr
      this.params = {
        'startDate': noDefaultDateArr[0] || null,
        'endDate': noDefaultDateArr[1] || null
      }
      this.initList()
    },
    initList () {
      this.pageNumber = 1
      this.getList()
    },
    getList () {
      this.loading = true
      this.$api['mptReport.passengerFlowMonthStatistics'](Object.assign({}, this.params, {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      })).then(res => {
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
  mounted () {
    this.initList()
  },
  data () {
    return {
      isDisabled: false,
      loading: false,
      params: {
        'startDate': null,
        'endDate': null
      },
      pageNumber: 1,
      pageSize: 15,
      total: 0,
      tableData: []
    }
  }
}
</script>
<style scoped>

</style>
