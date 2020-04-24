<template>
  <div>
    <el-table
      ref="tableWrapper"
      :data="seeTableData"
      height="70vh"
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
        prop="company"
        align="center"
        width="150"
        label="分公司">
        <!-- <template slot-scope="scope">
        <el-button type="primary" @click="goToDetail(scope.row)" size="mini">{{scope.row.date}}</el-button>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="lineNumber"
        align="center"
        label="线路号">
      </el-table-column>
      <el-table-column
        prop="arrow"
        align="center"
        label="上下行">
      </el-table-column>
      <el-table-column
        prop="linename"
        align="center"
        width="300"
        label="线路名">
      </el-table-column>
      <el-table-column
        prop="sStationIndex"
        align="center"
        width="100"
        label="站序A">
      </el-table-column>
      <el-table-column
        prop="eStationIndex"
        width="100"
        align="center"
        label="站序B">
      </el-table-column>
      <el-table-column
        prop="sStation"
        align="center"
        label="站位A">
      </el-table-column>
      <el-table-column
        prop="eStation"
        align="center"
        label="站位B">
      </el-table-column>
      <el-table-column
        prop="repeatLine"
        align="center"
        label="重复线路">
      </el-table-column>
      <el-table-column
        prop="repeatLineCount"
        align="center"
        label="重复数量(条)">
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right; margin-top: 20px;"
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
export default {
  props: {
    selectData: {
      type: Object
    },
    queryData: {
      type: Object
    }
  },
  data () {
    return {
      tableData: [],
      seeTableData: [],
      isRequstStatus: false,
      cellHeight: 0,
      currentCell: 0,
      viewCellNum: 0,
      searchData: {},
      pageNumber: 1,
      pageSize: 30,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['defaultSearch'])
  },
  mounted () {
    setTimeout(() => {
      if (Object.keys(this.$route.params).length > 0) {
        this.queryData.startStation = ''
        this.queryData.endStation = ''
        this.queryData.lineType = '1'
        this.queryData.lineLineId = this.queryData.lineUuid + '+' + this.queryData.lineNumber
        this.queryData.lineOrgId = this.queryData.company
        this.changeSearchCondition(this.queryData)
      } else {
        this.changeSearchCondition(this.defaultSearch)
      }
    }, 500)
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.pageNumber = 1
        this.pageSize = 30
        this.searchData = newV
        if (newV.lineOrgId !== '' && newV.lineLineId !== '' && newV.lineType !== '') {
          this.changeSearchCondition(this.searchData)
        } else {
          this.$message.warning('机构、线路、方向为必填项')
        }
      }
    },
    queryData: {
      deep: true,
      handler (newV) {
        this.pageNumber = 1
        this.pageSize = 30
        let data = {
          lineOrgId: newV.company,
          lineLineId: newV.lineUuid + '+' + newV.lineNumber,
          lineType: newV.arrow,
          startStation: {},
          endStation: {},
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }
        this.searchData = data
        this.changeSearchCondition(this.searchData)
      }
    }
  },
  methods: {
    _getRepeatTable (params) {
      this.$api['lineNet.getRepeatDetailLink'](params).then(res => {
        this.tableData = res.list
        this.total = res.total
        this.seeTableData = res.list
      })
    },
    changeSearchCondition (params) {
      console.log(params)
      if (params.lineType === '上行') {
        params.lineType = '1'
      } else if (params.lineType === '下行') {
        params.lineType = '2'
      }
      let lineArr = (params.lineLineId && params.lineLineId.split('+')) || []
      this._getRepeatTable({
        company: params.lineOrgId,
        lineID: lineArr[0],
        arrow: params.lineType,
        sStation: params.startStation && params.startStation.value ? params.startStation.value : '',
        eStation: params.endStation && params.endStation.value ? params.endStation.value : '',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      })
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      if (Object.keys(this.searchData).length > 0) {
        this.changeSearchCondition(this.searchData)
      } else {
        this.changeSearchCondition(this.defaultSearch)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
<style>
  .el-table .warning-row {
    display: none;
  }

  .el-table .success-row {
    display: block;
  }
</style>
