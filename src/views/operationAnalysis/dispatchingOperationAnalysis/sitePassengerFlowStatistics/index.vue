<template>
  <div>
    <!-- 查询区 -->
    <Search
      isDateToNoDefault
      isSortMethod
      isEmpty
      isDownload
      @configCheck="getSearch"/>
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
        prop="STATION"
        label="站点"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="UP_NUM"
        label="上车人数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="DOWN_NUM"
        label="下车人数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="AVERAGE_UP_NUM"
        label="平均上车人数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="AVERAGE_DOWN_NUM"
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
  data () {
    return {
      pageNumber: 1,
      pageSize: 15,
      total: 0,
      searchType: 0,
      tableData: [
        {
          STATION: '西小口站',
          UP_NUM: '20',
          DOWN_NUM: '20',
          AVERAGE_UP_NUM: '4',
          AVERAGE_DOWN_NUM: '4'
        }
      ]
    }
  },
  methods: {
    getSearch (event) {},
    /* 分页查询 */
    handleCurrentChange (val) {
      this.pageNumber = val
    }
  }
}
</script>
<style scoped>

</style>
