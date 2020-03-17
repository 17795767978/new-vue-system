<template>
  <div class="table" v-loading="isLoading">
    <el-table
      :data="currentTableData"
      size="mini"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="80">
        <template slot-scope="scope">
          <span> {{scope.$index + (pageNumber - 1) * pageSize + 1}} </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="devCode"
        label="设备编号"
        width="150">
      </el-table-column>
      <el-table-column
        align="center"
        prop="orgName"
         width="150"
        label="所属公司">
      </el-table-column>
      <el-table-column
        align="center"
        prop="lineName"
         width="120"
        label="所属线路">
      </el-table-column>
      <el-table-column
        align="center"
        prop="busSelfCode"
        label="车辆自编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="busPlateNumber"
        width="120"
        label="车牌号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="onlineStatus"
        width="100"
        label="在线状态">
        <template slot-scope="scope">
          <span>
            {{scope.row.onlineStatus === '1' ? '在线' : '离线'}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="onlineTime"
        :formatter="getTime"
        label="离线时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="updateCount"
        label="上传数据条数">
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right; margin-top: 1vh;"
      background
      @current-change="handleCurrentChangeLine"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
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
      tableAllData: [],
      currentTableData: [],
      total: 0,
      pageSize: 10,
      pageNumber: 1,
      isLoading: false
    }
  },
  created () {
    this._getDevData({
      devClass: '2',
      devCode: '',
      orgUuid: '',
      lineUuid: '',
      busUuid: '',
      busSelfCode: '',
      startTime: moment().format('YYYY-MM-DD 00:00:00'),
      endTime: moment().format('YYYY-MM-DD 23:59:59'),
      deviceOnlineStatus: '1',
      dayOrhistory: '1'
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this._getDevData({
          devClass: newV.statusType,
          devCode: newV.statusNumber,
          orgUuid: newV.orgId === '1' ? '' : newV.orgId,
          lineUuid: newV.lineId,
          busUuid: newV.busNumber,
          busSelfCode: newV.selfNumber,
          startTime: moment(newV.valueTime[0]).format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment(newV.valueTime[1]).format('YYYY-MM-DD HH:mm:ss'),
          deviceOnlineStatus: newV.onLine,
          dayOrhistory: newV.radio
        })
      }
    }
  },
  methods: {
    _getDevData (params) {
      this.isLoading = true
      this.total = 0
      this.$api['tiredMonitoring.getDevData'](params).then(res => {
        this.isLoading = false
        this.tableAllData = res
        this.currentTableData = res.slice(0, 10)
        this.total = res.length
        this.pageNumber = 1
        this.$message.success('数据更新成功')
      })
    },
    getTime (data) {
      return moment(data.onlineTime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleCurrentChangeLine (val) {
      this.pageNumber = val
      this.currentTableData = this.tableAllData.slice((val - 1) * 10, val * 10)
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  height: 60vh;
}
</style>
