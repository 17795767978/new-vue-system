<template>
<div>
  <el-table
    style="width: 95%; margin-left: 2.5%; margin-top: 5vh;"
    ref="tableWrapper"
    :data="tableData"
    border>
    <el-table-column
      align="center"
      type="index"
      label="序号"
      width="80">
    </el-table-column>
    <el-table-column
      align="center"
      prop="devCode"
      label="设备编号"
      >
    </el-table-column>
    <el-table-column
      sortable
      align="center"
      prop="fee"
      label="交易金额(元)"
      width="150"
      >
    </el-table-column>
    <el-table-column
      sortable
      align="center"
      prop="cardNumber"
      label="交易卡号"
      >
    </el-table-column>
    <el-table-column
      sortable
      align="center"
      prop="uploadTime"
      :formatter="getTime"
      label="上车时间"
      width="200"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="staName"
      label="站点名称"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="orgName"
      label="机构"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="lineName"
      label="线路"
      width="150"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="busPlateNumber"
      label="车辆车牌号"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="customerId"
      label="乘客编号"
      width="120"
      >
    </el-table-column>
  </el-table>
  <el-pagination
    style="float: right; margin-top: 20px; margin-right: 2.5%"
    background
    :current-page="pageNum"
    @current-change="handleCurrentChange"
    layout="total, prev, pager, next"
    :page-size="pageSize"
    :total="total">
  </el-pagination>
</div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  props: {
    selectData: {
      type: Object
    }
  },
  data () {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 12,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
    let startTime = moment(new Date() - 24 * 3600 * 1000).format('YYYY-MM-DD 00:00:00')
    let endTime = moment().format('YYYY-MM-DD 23:59:59')
    this._getPosRecordPage({
      orgUuid: this.userId,
      lineUuid: '',
      busPlateNumber: '',
      startTime,
      endTime,
      pageNum: 1,
      pageSize: this.pageSize
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.pageNum = 1
        this._getPosRecordPage({
          orgUuid: newV.orgId,
          lineUuid: newV.lineId,
          busPlateNumber: newV.busNumber,
          startTime: newV.startTime,
          endTime: newV.endTime,
          pageNum: 1,
          pageSize: this.pageSize
        })
      }
    }
  },
  methods: {
    _getPosRecordPage (params) {
      this.$api['schedulingAnalysis.getPosRecordPage'](params).then((res) => {
        this.tableData = res.list
        this.total = res.total
      }).catch((err) => {
        this.$message.error(err.message)
      })
    },
    getTime (row) {
      return moment(row.uploadTime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleCurrentChange (val) {
      let startTime = moment(new Date() - 24 * 3600 * 1000).format('YYYY-MM-DD 00:00:00')
      let endTime = moment().format('YYYY-MM-DD 23:59:59')
      this.pageNum = val
      if (Object.keys(this.selectData).length > 0) {
        this._getPosRecordPage({
          orgUuid: this.selectData.orgId,
          lineUuid: this.selectData.lineId,
          busPlateNumber: this.selectData.busNumber,
          startTime: this.selectData.startTime,
          endTime: this.selectData.endTime,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
      } else {
        this._getPosRecordPage({
          orgUuid: this.userId,
          lineUuid: '',
          busPlateNumber: '',
          startTime,
          endTime,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
      }
    }
  }
}
</script>

<style>

</style>
