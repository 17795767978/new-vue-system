<template>
    <div>
       <!-- 查询 -->
      <Search
        isDate
        isEmpty
        @configCheck="getSearch"
      />
        <div style="margin-top: 2vh; padding: 0 1vh; box-sizing:border-box">
          <el-table
            ref="roleTable"
            size="mini"
            stripe
            height="70vh"
            border
            v-loading="isListLoading"
            :data="tableData"
            >
              <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="100"></el-table-column>
              <el-table-column prop="xlsLogModel" label="功能模块" min-width="100" align="center"></el-table-column>
              <el-table-column prop="xlsFilename"  label="上传文件名" min-width="100" align="center"></el-table-column>
              <el-table-column prop="xlsErrCode" label="错误码" min-width="100" align="center"></el-table-column>
              <el-table-column prop="xlsErrMsg" label="错误日志" align="center">
                <template slot-scope="scope">
                    <el-popover
                      placement="top-start"
                      width="300"
                      trigger="hover"
                    >
                    {{ scope.row.xlsErrMsg }}
                    <div class="remark" slot="reference">{{ scope.row.xlsErrMsg }}</div>
                    </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="xlsLogCreateTime" label="创建时间" align="center" :formatter="formatCreateDate"></el-table-column>
              <el-table-column prop="xlsLogCreateUser" label="创建人" align="center"></el-table-column>
          </el-table>
        </div>
            <el-pagination background style="float: right; margin-top: 1vh" layout="total, prev, pager, next"
            :current-page="pagination.pageNum"
            :page-size="pagination.pageSize"
            :total="pagination.total"
            @current-change="changePage"
            ></el-pagination>
    </div>
</template>
<script>
import moment from 'moment'
import Search from '@/components/searchAlarm'
// 自定义组件
// import CommonWrapper from '@/components/commonWrapper'
// import CommonTable from '@/components/commonTable'

// api
// import { checkImportLog } from '@/api/common.js'
export default {
  name: 'UploadLog',
  props: {
    modelName: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      searchForm: {
        notifyTime: ['', ''],
        mdStartDate: '',
        mdEndDate: '',
        xlsLogModel: ''
      },
      pagination: { // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      dateBefore: {
        disabledDate: (time) => {
          return time.getTime() > new Date().getTime()
        }
      },
      oftenTime: moment().format('HH:mm:ss'),
      tableData: [],
      isListLoading: false
    }
  },
  watch: {
    'searchForm.notifyTime': function (time) {
      if (time.length) {
        this.searchForm.mdStartDate = moment(time[0]) ? moment(time[0]) : ''
        this.searchForm.mdEndDate = moment(time[1]) ? moment(time[1]) : ''
      }
    }
  },
  mounted () {
    // 初始化后先根据默认条件查询数据
    this.initTime()
    this.search()
  },
  methods: {
    getSearch (data) {
      // this.selectData = data
      this.searchForm.notifyTime = [data.startTime, data.endTime]
      this.searchForm.mdStartDate = data.startTime
      this.searchForm.mdEndDate = data.endTime
      console.log(this.searchForm.notifyTime)
      this.search()
    },
    initTime () {
      const startTime = moment().valueOf() - 24 * 3600 * 1000
      const endTime = moment().valueOf()
      this.searchForm.notifyTime = [moment(startTime).format('YYYY-MM-DD 00:00:00'), moment(endTime).format('YYYY-MM-DD 23:59:59')]
      this.searchForm.mdStartDate = moment(startTime).format('YYYY-MM-DD 00:00:00')
      this.searchForm.mdEndDate = moment(endTime).format('YYYY-MM-DD 23:59:59')
    },
    // 转换查询参数为后端需要的参数格式
    convertSearchParams () {

    },
    search () {
      const searchParams = {
        mdStartDate: moment(this.searchForm.mdStartDate).format('YYYY-MM-DD HH:mm:ss'),
        mdEndDate: moment(this.searchForm.mdEndDate).format('YYYY-MM-DD HH:mm:ss'),
        xlsLogModel: this.modelName,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      }
      this.isListLoading = true
      this.$api['wholeInformation.checkImportLog'](searchParams).then(res => {
        this.tableData = res.list
        this.pagination.total = res.total
        this.pagination.pageNum = res.pageNum
        this.pagination.pageSize = res.pageSize
        this.isListLoading = false
      })
    },
    resetForm (formName) {
      this.$refs.searchForm.resetFields()
      // this.initTime()
      this.searchForm.mdStartDate = ''
      this.searchForm.mdEndDate = ''
      this.pagination.pageNum = 1
      this.search()
    },
    // 生成列表序号
    indexMethod (index) {
      return (index + 1) + (this.pagination.pageNum - 1) * this.pagination.pageSize
    },
    // 列表日期格式化
    formatCreateDate (row) {
      if (row.xlsLogCreateTime) {
        return moment(row.xlsLogCreateTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    // 列表翻页
    changePage (pageNum) {
      this.pagination.pageNum = pageNum
      this.search()
    }
  },
  components: {
    Search
    // CommonWrapper,
    // CommonTable
  }
}
</script>

<style lang="scss" scoped>
 .remark{
    width:100%;
    max-width:300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
 }
</style>
