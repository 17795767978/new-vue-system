<template>
<div>
  <el-table
    height="70vh"
    size="mini"
    border
    :data="tableData"
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号"
      align="center"
      width="60"
    ></el-table-column>
    <el-table-column
      prop="pfrOrgName"
      align="center"
      label="机构"
      width="120">
    </el-table-column>
    <el-table-column
      prop="pfrLineName"
      label="线路"
      align="center">
    </el-table-column>
    <el-table-column
      prop="pfrBusNumber"
      align="center"
      label="车辆">
    </el-table-column>
    <el-table-column
      prop="prfDevCode"
      align="center"
      label="设备号">
    </el-table-column>
    <el-table-column
      prop="pfrUploadTime"
      align="center"
      :formatter="getTime"
      label="时间">
    </el-table-column>
    <el-table-column
      prop="pfrGetOnNumber"
      align="center"
      label="上车人数">
    </el-table-column>
    <el-table-column
      prop="pfrGetOffNumber"
      align="center"
      label="下车人数">
    </el-table-column>
    <el-table-column
      prop="reciveCount"
      align="center"
      label="记录数">
    </el-table-column>
    <el-table-column
      prop="pfrCurrentLat"
      align="center"
      label="差异百分比">
    </el-table-column>
    <el-table-column
      fixed="right"
      align="center"
      label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="handleClick(scope.row)" size="mini">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    style="float: right; margin-top: 20px;"
    background
    @current-change="handleCurrentChange"
    :current-page.sync="pageNumber"
    :page-size="pageSize"
    layout="total, prev, pager, next"
    :total="total">
  </el-pagination>
  <el-dialog title="详情" :visible.sync="dialogTableVisible" :fullscreen="true">
    <el-table :data="gridData" border size="mini" height="80vh">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column property="pfrLineName" label="线路" align="center"></el-table-column>
      <el-table-column property="pfrBusNumber" label="车辆" align="center"></el-table-column>
      <el-table-column property="pfrUploadTime" label="时间" width="300" :formatter="getInsideTime" align="center"></el-table-column>
      <el-table-column property="prfGetFOnNumber" label="前门上车人数" align="center"></el-table-column>
      <el-table-column property="prfGetFOffNumber" label="前门下车人数" align="center"></el-table-column>
      <el-table-column property="prfGetCOnNumber" label="中门上车人数" align="center"></el-table-column>
      <el-table-column property="prfGetCOffNumber" label="中门下车人数" align="center"></el-table-column>
      <el-table-column property="prfGetEOnNumber" label="后门上车人数" align="center"></el-table-column>
      <el-table-column property="prfGetEOffNumber" label="后门下车人数" align="center"></el-table-column>
    </el-table>
  </el-dialog>
</div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  props: {
    selectData: {}
  },
  data () {
    return {
      tableData: [],
      gridData: [],
      pageNumber: 1,
      pageSize: 15,
      tableDataAll: [],
      total: 0,
      dialogTableVisible: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
    let time = moment().format('YYYY-MM-DD')
    this._getLogQuery({
      pfrOrgUuid: this.userId === '1' ? '' : this.userId,
      pfrLineUuid: '',
      pfrBusNumber: '',
      prfDevCode: '',
      pfrUploadTime: time
    })
  },
  watch: {
    selectData: {
      handler (newV) {
        this.pageNumber = 1
        this._getLogQuery({
          pfrOrgUuid: newV.orgId,
          pfrLineUuid: newV.lineId,
          pfrBusNumber: newV.busNumber,
          prfDevCode: newV.statusNumber,
          pfrUploadTime: moment(newV.dataCurrent).format('YYYY-MM-DD')
        })
      },
      deep: true
    }
  },
  methods: {
    _getLogQuery (params) {
      this.$api['passengerFlow.getLogQuery'](params).then(res => {
        this.tableDataAll = res
        this.total = this.tableDataAll.length
        this.tableData = this.tableDataAll.slice((this.pageNumber - 1) * 15, this.pageNumber * 15)
      })
    },
    handleClick (row) {
      this.dialogTableVisible = true
      // this.gridData = [row]
      this.$api['passengerFlow.getBusKlStatisticalDetail']({
        pfrBusNumber: row.pfrBusNumber,
        pfrUploadTime: moment(row.pfrUploadTime).format('YYYY-MM-DD')
      }).then(res => {
        this.gridData = res.sort((prev, next) => next.pfrUploadTime - prev.pfrUploadTime)
      })
    },
    getTime (row) {
      return moment(row.pfrUploadTime).format('YYYY-MM-DD')
    },
    getInsideTime (row) {
      return moment(row.pfrUploadTime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      this.tableData = this.tableDataAll.slice((this.pageNumber - 1) * 15, this.pageNumber * 15)
    }
  }
}
</script>

<style>

</style>
