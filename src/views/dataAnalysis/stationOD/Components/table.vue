<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      border
      height="70vh"
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
        prop="upStaName"
        label="出发站点"
        align="center">
      </el-table-column>
      <el-table-column
        prop="downStaName"
        label="到达站点"
        align="center">
      </el-table-column>
      <el-table-column
        prop="linearDistance"
        align="center"
        label="直线距离（KM）">
      </el-table-column>
      <el-table-column
        prop="payNumber"
        align="center"
        label="刷卡人数">
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right; margin-top: 20px;"
      background
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
import moment from 'moment'
export default {
  props: {
    selectData: {
      type: Object
    }
  },
  data () {
    return {
      tableData: [],
      pageNumber: 1,
      pageSize: 15,
      total: 0
    }
  },
  created () {
    let month = moment().subtract(30, 'days').format('YYYY-MM')
    this._getAnalStaOdDataListData({
      month,
      linearDistanceMin: '',
      linearDistanceMax: '',
      payNumberMin: '',
      payNumberMax: '',
      payTimeIntervalMin: '',
      payTimeIntervalMax: '',
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      downStaUuids: '',
      upStaUuids: ''
    })
  },
  watch: {
    selectData (newV) {
      this.pageNumber = 1
      this._getAnalStaOdDataListData({
        month: moment(newV.month).format('YYYY-MM'),
        linearDistanceMin: newV.startDis,
        linearDistanceMax: newV.endDis,
        payNumberMin: newV.startNum,
        payNumberMax: newV.endNum,
        payTimeIntervalMin: newV.stHour,
        payTimeIntervalMax: newV.edHour,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        downStaUuids: Object.keys(newV.endStation).length > 0 ? newV.endStation.value : '',
        upStaUuids: Object.keys(newV.startStation).length > 0 ? newV.startStation.value : ''
      })
    }
  },
  methods: {
    async _getAnalStaOdDataListData (params) {
      let result = await this.$api['lineNet.getAnalStaOdDataListData'](params)
      if (result.list.length === 0) {
        this.$message.warning('暂无数据')
      }
      this.tableData = result.list
      this.total = result.total
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      let month = moment().subtract(30, 'days').format('YYYY-MM')
      if (Object.keys(this.selectData).length === 0) {
        this._getAnalStaOdDataListData({
          month,
          linearDistanceMin: '',
          linearDistanceMax: '',
          payNumberMin: '',
          payNumberMax: '',
          payTimeIntervalMin: '',
          payTimeIntervalMax: '',
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          downStaUuids: '',
          upStaUuids: ''
        })
      } else {
        this._getAnalStaOdDataListData({
          month: moment(this.selectData.month).format('YYYY-MM'),
          linearDistanceMin: this.selectData.startDis,
          linearDistanceMax: this.selectData.endDis,
          payNumberMin: this.selectData.startNum,
          payNumberMax: this.selectData.endNum,
          payTimeIntervalMin: this.selectData.stHour,
          payTimeIntervalMax: this.selectData.edHour,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          downStaUuids: Object.keys(this.selectData.endStation).length > 0 ? this.selectData.endStation.value : '',
          upStaUuids: Object.keys(this.selectData.startStation).length > 0 ? this.selectData.startStation.value : ''
        })
      }
    }
  }
}
</script>

<style>

</style>
