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
        width="120">
      </el-table-column>
      <el-table-column
        prop="busPlateNumber"
        align="center"
        label="车牌号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="busSelfCode"
        align="center"
        label="车辆自编号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="devCode"
        align="center"
        label="设备编号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="warnTypeName"
        align="center"
        label="抓拍类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="speed"
        align="center"
        label="抓拍速度(km/h)"
        width="120">
      </el-table-column>
      <el-table-column
        prop="warnTime"
        align="center"
        label="抓拍时间"
        :formatter="getDate"
        width="200">
      </el-table-column>
      <el-table-column
          align="center"
          fixed="right"
          label="操作"
          >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="mini">详情</el-button>
          </template>
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
    this._getDevicePhotoList(
      {
        orgId: this.userId === '1' ? '' : this.userId,
        lineId: '',
        startTime,
        endTime,
        pageNum: 1,
        pageSize: 15,
        busSelfCode: '',
        devCode: '',
        busPlateNumber: ''
      }
    )
  },
  watch: {
    'selectData': {
      deep: true,
      handler (newV) {
        this.pageNum = 1
        this._getDevicePhotoList({
          orgId: newV.orgId === '1' ? '' : newV.orgId,
          lineId: newV.lineId,
          startTime: newV.startTime,
          endTime: newV.endTime,
          pageNum: 1,
          pageSize: 15,
          busSelfCode: newV.selfCode,
          devCode: newV.deviceCode,
          busPlateNumber: newV.busNumber
        })
      }
    }
  },
  methods: {
    _getDevicePhotoList (params) {
      this.isLoading = true
      this.$api['tiredMonitoring.devicePhotoList'](params).then(res => {
        this.isLoading = false
        this.tableData = res.list
        this.total = res.total
        if (res.list.length === 0) {
          this.$message.warning('暂无数据')
        }
      })
    },
    // 时间格式化
    getDate (row) {
      console.log(row.warnTime)
      return moment(row.warnTime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleCurrentChange (val) {
      this.pageNum = val
      if (Object.keys(this.selectData).length > 0) {
        this._getDevicePhotoList({
          orgId: this.selectData.orgId === '1' ? '' : this.selectData.orgId,
          lineId: this.selectData.lineId,
          startTime: this.selectData.startTime,
          endTime: this.selectData.endTime,
          busPlateNumber: this.selectData.busNumber,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          busSelfCode: this.selectData.selfCode,
          devCode: this.selectData.devCode
        })
      } else {
        let yestoday = new Date()
        let startTime = moment(yestoday - 24 * 60 * 60 * 1000).format('YYYY-MM-DD 00:00:00')
        let endTime = moment(yestoday - 24 * 60 * 60 * 1000).format('YYYY-MM-DD 23:59:59')
        this._getDevicePhotoList({
          orgId: this.userId === '1' ? '' : this.userId,
          lineId: '',
          startTime,
          endTime,
          busPlateNumber: '',
          driverNum: '',
          busSelfCode: '',
          devCode: '',
          pageNum: this.pageNum,
          pageSize: 15 })
      }
    },
    handleClick (row) {
      if (row.warnType === 'OVERSPEED') {
        this.$router.push({
          name: 'alarmContent',
          query: {
            id: row.warnUuid,
            type: 'overspeed'
          }
        })
      } else {
        this.$router.push({
          name: 'alarmContent',
          query: {
            id: row.warnUuid,
            type: 'normal'
          }
        })
      }
    }
  }
}
</script>

<style>

</style>
