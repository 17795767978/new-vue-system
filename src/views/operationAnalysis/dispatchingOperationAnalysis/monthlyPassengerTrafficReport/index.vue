<template>
  <div>
    <!-- 查询区 -->
    <Search
      isOrg
      isLine
      isDateToNoDefault
      isEmpty
      @configCheck="getSearch"
    />
    <!-- TABLE区 -->
    <el-table
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
        prop="COMPY_NAME"
        label="公司"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="LINE_NAME"
        label="线路"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="UP_SUM"
        label="上车总数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="DOWM_SUM"
        label="下车总数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="AVERAGE_UP_DAILY"
        label="平均上车/天">
      </el-table-column>
      <el-table-column
        align="center"
        prop="AVERAGE_DOWN_DAILY"
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

    },
    /* 分页查询 */
    handleCurrentChange (val) {
      this.pageNumber = val
    }
  },
  data () {
    return {
      pageNumber: 1,
      pageSize: 15,
      total: 0,
      tableData: [
        {
          COMPY_NAME: '富吉公交',
          LINE_NAME: '101',
          UP_SUM: '91179',
          DOWM_SUM: '91133',
          AVERAGE_UP_DAILY: '4342',
          AVERAGE_DOWN_DAILY: '4340'
        }, {
          COMPY_NAME: '富吉公交',
          LINE_NAME: '102',
          UP_SUM: '91179',
          DOWM_SUM: '91133',
          AVERAGE_UP_DAILY: '4342',
          AVERAGE_DOWN_DAILY: '4340'
        }, {
          COMPY_NAME: '富吉公交',
          LINE_NAME: '102',
          UP_SUM: '91179',
          DOWM_SUM: '91133',
          AVERAGE_UP_DAILY: '4342',
          AVERAGE_DOWN_DAILY: '4340'
        }
      ]
    }
  }
}
</script>
<style scoped>

</style>
