<template>
  <div v-loading="isLoading">
    <el-table
      :data="tableData"
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
          <span> {{scope.$index + (pageNum - 1) * pageSize + 1}} </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="orgName"
        align="center"
        label="所属机构"
        width="150"
        >
      </el-table-column>
      <el-table-column
        prop="lineName"
        align="center"
        label="所属线路"
        width="100">
      </el-table-column>
      <el-table-column
        prop="busPlateNumber"
        align="center"
        label="车牌号"
        width="150">
      </el-table-column>
      <!-- <el-table-column
        prop="busSelfCode"
        align="center"
        label="车辆类型"
        width="120">
      </el-table-column> -->
      <el-table-column
        prop="chargeDayNums"
        align="center"
        label="当日充电次数"
        width="100">
      </el-table-column>
      <el-table-column
        prop="warnTypeName"
        align="center"
        label="充电开始时间"
        :formatter="getStartDate"
         width="200">
      </el-table-column>
      <el-table-column
        prop="socS"
        align="center"
        label="充电前SOC"
        width="120">
      </el-table-column>
      <el-table-column
        prop="warnTime"
        align="center"
        label="充电结束时间"
        :formatter="getEndDate"
        width="200">
      </el-table-column>
      <el-table-column
        prop="socE"
        align="center"
        label="充电后SOC">
      </el-table-column>
      <el-table-column
        prop="chargeDuration"
        align="center"
        label="单次充电时长"
        width="300">
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right; margin-top: 1vh"
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
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  props: {
    selectData: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(['formData', 'userId'])
  },
  data () {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 15,
      total: 0,
      isLoading: false
    }
  },
  created () {
    let today = new Date()
    let startTime = moment(today - 24 * 60 * 60 * 1000).format('YYYY-MM-DD 00:00:00')
    let endTime = moment().format('YYYY-MM-DD 23:59:59')
    this._chargeList(
      {
        orgId: this.userId === '1' ? '' : this.userId,
        lineId: '',
        startTime,
        endTime,
        pageNumber: 1,
        pageSize: 15,
        busNumber: ''
      }
    )
  },
  watch: {
    'selectData': {
      deep: true,
      handler (newV) {
        this.pageNum = 1
        this._chargeList({
          orgId: newV.orgId === '1' ? '' : newV.orgId,
          lineId: newV.lineId,
          startTime: newV.startTime,
          endTime: newV.endTime,
          pageNumber: 1,
          pageSize: 15,
          busNumber: newV.busNumber
        })
      }
    }
  },
  methods: {
    _chargeList (params) {
      this.isLoading = true
      this.$api['tiredMonitoring.chargeList'](params).then(res => {
        this.isLoading = false
        this.tableData = res.list
        this.total = res.total
        if (res.list.length === 0) {
          this.$message.warning('暂无数据')
        }
      })
    },
    // 时间格式化
    getStartDate (row) {
      return moment(row.chargeS).format('YYYY-MM-DD HH:mm:ss')
    },
    getEndDate (row) {
      return moment(row.chargeE).format('YYYY-MM-DD HH:mm:ss')
    },
    handleCurrentChange (val) {
      this.pageNum = val
      if (Object.keys(this.selectData).length > 0) {
        this._chargeList({
          orgId: this.selectData.orgId === '1' ? '' : this.selectData.orgId,
          lineId: this.selectData.lineId,
          startTime: this.selectData.startTime,
          endTime: this.selectData.endTime,
          busNumber: this.selectData.busNumber,
          pageNumber: this.pageNum,
          pageSize: this.pageSize
        })
      } else {
        let yestoday = new Date()
        let startTime = moment(yestoday - 24 * 60 * 60 * 1000).format('YYYY-MM-DD 00:00:00')
        let endTime = moment().format('YYYY-MM-DD 23:59:59')
        this._chargeList({
          orgId: this.userId === '1' ? '' : this.userId,
          lineId: '',
          startTime,
          endTime,
          busNumber: '',
          pageNumber: this.pageNum,
          pageSize: 15 })
      }
    }
  }
}
</script>

<style>

</style>
