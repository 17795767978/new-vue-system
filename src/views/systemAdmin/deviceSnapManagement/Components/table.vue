<template>
  <div v-loading="isLoading">
    <el-table
      :data="tableData"
      height="67vh"
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
        width="120"
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
        width="120">
      </el-table-column>
      <el-table-column
        prop="busSelfCode"
        align="center"
        label="车辆自编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="deviceCode"
        align="center"
        label="设备编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="startDate"
        align="center"
        label="开始日期"
        :formatter="getStartDate"
        width="120">
      </el-table-column>
      <el-table-column
        prop="endDate"
        align="center"
        label="结束日期"
        :formatter="getEndDate"
        width="120">
      </el-table-column>
      <el-table-column
        prop="startTime"
        align="center"
        label="开始时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="endTime"
        align="center"
        label="结束时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="duration"
        align="center"
        label="采集间隔(min)"
        width="120">
      </el-table-column>
      <el-table-column
        prop="isvalid"
        align="center"
        label="状态"
        width="80">
        <template slot-scope="scope">
          <span>{{scope.row.isvalid === '1' ? '启用' : '禁用'}}</span>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          fixed="right"
          label="操作"
          >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="mini">操作</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
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
    },
    isUpdate: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['formData', 'userId'])
  },
  data () {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 13,
      total: 0,
      isLoading: false
    }
  },
  created () {
    let today = new Date()
    let endDate = moment(today).format('YYYY-MM-DD')
    let startDate = moment(today - 24 * 60 * 60 * 1000 * 7).format('YYYY-MM-DD')
    this._getDevicePhotoList(
      {
        orgId: this.userId === '1' ? '' : this.userId,
        lineId: '',
        startDate,
        endDate,
        pageNum: 1,
        pageSize: 13,
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
          startDate: newV.dateArray[0],
          endDate: newV.dateArray[1],
          pageNum: 1,
          pageSize: 13,
          busSelfCode: newV.selfCode,
          devCode: newV.deviceCode,
          busPlateNumber: newV.busNumber
        })
      }
    },
    isUpdate (newV) {
      if (newV) {
        if (Object.keys(this.selectData).length > 0) {
          this._getDevicePhotoList({
            orgId: this.selectData.orgId === '1' ? '' : this.selectData.orgId,
            lineId: this.selectData.lineId,
            startDate: this.selectData.dateArray[0],
            endDate: this.selectData.dateArray[1],
            busPlateNumber: this.selectData.busNumber,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            busSelfCode: this.selectData.selfCode,
            devCode: this.selectData.devCode
          })
        } else {
          let yestoday = new Date()
          let startDate = moment(yestoday - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
          let endDate = moment(yestoday - 24 * 60 * 60 * 1000 * 7).format('YYYY-MM-DD')
          this._getDevicePhotoList({
            orgId: this.userId === '1' ? '' : this.userId,
            lineId: '',
            startDate,
            endDate,
            busPlateNumber: '',
            driverNum: '',
            busSelfCode: '',
            devCode: '',
            pageNum: this.pageNum,
            pageSize: 13 })
        }
      }
    }
  },
  methods: {
    _getDevicePhotoList (params) {
      this.isLoading = true
      this.$api['wholeInformation.deviceManageList'](params).then(res => {
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
      return moment(row.startDate).format('YYYY-MM-DD')
    },
    getEndDate (row) {
      return moment(row.endDate).format('YYYY-MM-DD')
    },
    handleCurrentChange (val) {
      this.pageNum = val
      if (Object.keys(this.selectData).length > 0) {
        this._getDevicePhotoList({
          orgId: this.selectData.orgId === '1' ? '' : this.selectData.orgId,
          lineId: this.selectData.lineId,
          startDate: this.selectData.dateArray[0],
          endDate: this.selectData.dateArray[1],
          busPlateNumber: this.selectData.busNumber,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          busSelfCode: this.selectData.selfCode,
          devCode: this.selectData.devCode
        })
      } else {
        let yestoday = new Date()
        let startDate = moment(yestoday - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
        let endDate = moment(yestoday - 24 * 60 * 60 * 1000 * 7).format('YYYY-MM-DD')
        this._getDevicePhotoList({
          orgId: this.userId === '1' ? '' : this.userId,
          lineId: '',
          startDate,
          endDate,
          busPlateNumber: '',
          driverNum: '',
          busSelfCode: '',
          devCode: '',
          pageNum: this.pageNum,
          pageSize: 13 })
      }
    },
    handleClick (row) {
      this.$emit('checkPhoto', row)
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api['wholeInformation.deletePhoto']({
          takePhotoUuids: [row.takePhotoUuid]
        }).then(res => {
          this._getDevicePhotoList({
            orgId: this.selectData.orgId === '1' ? '' : this.selectData.orgId,
            lineId: this.selectData.lineId,
            startDate: this.selectData.dateArray[0],
            endDate: this.selectData.dateArray[1],
            busPlateNumber: this.selectData.busNumber,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            busSelfCode: this.selectData.selfCode,
            devCode: this.selectData.devCode
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>

</style>
