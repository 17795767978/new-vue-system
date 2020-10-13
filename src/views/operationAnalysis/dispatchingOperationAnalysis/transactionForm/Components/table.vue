<template>
<div>
  <el-table
    style="width: 95%; margin-left: 2.5%; margin-top: 3vh;"
    ref="tableWrapper"
    :data="tableData"
    size="mini"
    @sort-change="handlerSortChange"
    border>
    <el-table-column
      align="center"
      type="index"
      label="序号"
      width="80">
      <template slot-scope="scope">
        <span> {{scope.$index + (pageNum - 1) * pageSize + 1}} </span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      prop="devUuid"
      label="设备编号"
      width="260"
      sortable
      >
    </el-table-column>
    <el-table-column
      sortable
      align="center"
      prop="cardNumber"
      label="交易卡号"
      width="250"
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
      sortable
      align="center"
      prop="payTime"
      label="刷卡时间"
      :formatter="getCardTime"
      width="200"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="fee"
      label="交易金额(元)"
      width="120"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="staName"
      label="站点名称"
      width="180"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="orgName"
      label="机构"
      width="120"
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
      width="120"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="customerId"
      label="乘客编号"
      width="120"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="orderId"
      label="本地订单号"
      width="300"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="serialNumber"
      label="聚合支付流水号"
      width="300"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="attach"
      label="交易附加信息"
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
      pageSize: 17,
      total: 0,
      order: ''
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
      pageSize: this.pageSize,
      order: this.order
    })
  },
  activated () {
    if (Object.keys(this.$route.params).length) {
      this.pageNum = 1
      this.order = ''
      const { busNumber, dateArray, lineId, orgId } = this.$route.params
      this._getPosRecordPage({
        orgUuid: orgId,
        lineUuid: lineId,
        busNumber: busNumber,
        startTime: dateArray[0],
        endTime: dateArray[1],
        pageNum: 1,
        pageSize: this.pageSize,
        order: ''
      })
    }
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.pageNum = 1
        this._getPosRecordPage({
          orgUuid: newV.orgId,
          lineUuid: newV.lineId,
          busNumber: newV.busNumber,
          startTime: newV.startTime,
          endTime: newV.endTime,
          pageNum: 1,
          pageSize: this.pageSize,
          order: this.order
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
          busNumber: this.selectData.busNumber,
          startTime: this.selectData.startTime,
          endTime: this.selectData.endTime,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          order: this.order
        })
      } else {
        this._getPosRecordPage({
          orgUuid: this.userId,
          lineUuid: '',
          busNumber: '',
          startTime,
          endTime,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          order: this.order
        })
      }
    },
    handlerSortChange (data) {
      this.order = data.order === 'ascending' ? data.prop : `${data.prop} ${data.order.substring(0, 4)}`
      // console.log(this.order)
      let startTime = moment(new Date() - 24 * 3600 * 1000).format('YYYY-MM-DD 00:00:00')
      let endTime = moment().format('YYYY-MM-DD 23:59:59')
      if (Object.keys(this.selectData).length > 0) {
        this._getPosRecordPage({
          orgUuid: this.selectData.orgId,
          lineUuid: this.selectData.lineId,
          busNumber: this.selectData.busNumber,
          startTime: this.selectData.startTime,
          endTime: this.selectData.endTime,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          order: this.order
        })
      } else {
        this._getPosRecordPage({
          orgUuid: this.userId,
          lineUuid: '',
          busNumber: '',
          startTime,
          endTime,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          order: this.order
        })
      }
      this.$emit('sortParam', this.order)
    },
    getCardTime (row) {
      return moment(row.payTime).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style>

</style>
