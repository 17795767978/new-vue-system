<template>
  <div>
    <el-table
      :data="tableData"
      height="70vh"
      size="mini"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80">
        <template slot-scope="scope">
          <span> {{scope.$index + (pageNumber - 1) * pageSize + 1}} </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="orgName"
        align="center"
        label="所属机构"
        width="200">
      </el-table-column>
      <el-table-column
        prop="lineName"
        align="center"
        width="150"
        label="线路">
      </el-table-column>
      <el-table-column
        prop="busNumber"
        align="center"
        width="150"
        label="车牌号">
      </el-table-column>
      <el-table-column
        prop="busSelfCode"
        align="center"
        width="120"
        label="自编号">
      </el-table-column>
      <el-table-column
        prop="devCode"
        align="center"
        width="150"
        label="设备编号">
      </el-table-column>
      <el-table-column
        prop="warnTime"
        align="center"
        width="250"
        :formatter="getWarnTime"
        label="脱管报警时间">
      </el-table-column>
      <el-table-column
        prop="warnTimes"
        align="center"
        width="150"
        label="脱管时长">
      </el-table-column>
      <el-table-column
        prop="busUpdateTime"
        align="center"
        :formatter="getUpdateTime"
        label="更新时间">
      </el-table-column>
      <el-table-column
        prop="devState"
        align="center"
        width="120"
        label="设备当前状态">
        <template slot-scope="scope">
          <span>{{scope.row.devState ?  scope.row.devState === '0' ? '离线' : '在线' : ''}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        style="float: right; margin-top: 20px;"
        :current-page="pageNumber"
        background
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        layout="prev, pager, next, total"
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
    },
    rateParams: {
      type: Object
    }
  },
  data () {
    return {
      tableData: [],
      total: 0,
      pageNumber: 1,
      pageSize: 15
    }
  },
  created () {
    this._getControlList({
      busNumber: '', busSelfCode: '', orgUuid: '', lineUuid: '', devCode: '', devModel: 'ADAS', pageNumber: this.pageNumber, pageSize: this.pageSize
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.pageNumber = 1
        this._getControlList({
          busNumber: newV.busNumber,
          busSelfCode: newV.selfCode,
          orgUuid: newV.orgId,
          lineUuid: newV.lineId,
          devCode: newV.deviceCode,
          devModel: newV.devModel,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        })
      }
    },
    rateParams: {
      deep: true,
      handler (newV) {
        this.pageNumber = 1
        if (Object.keys(newV).length > 0) {
          this._getControlList({
            busNumber: newV.car,
            busSelfCode: newV.carSelf,
            orgUuid: newV.orgUuid,
            lineUuid: newV.lineUuid,
            devCode: newV.devCode,
            devModel: newV.devModel,
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
          })
        }
      }
    }
  },
  methods: {
    _getControlList (params) {
      this.$api['tiredMonitoring.controlList'](params).then(res => {
        this.tableData = res.list
        this.total = res.total
      })
    },
    getUpdateTime (row) {
      if (row.busUpdateTime) {
        return moment(row.busUpdateTime).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
    },
    getWarnTime (row) {
      if (row.warnTime) {
        return moment(row.warnTime).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      if (!Object.keys(this.selectData).length) {
        if (Object.keys(this.rateParams).length > 0) {
          this._getControlList({
            busNumber: this.rateParams.car,
            busSelfCode: this.rateParams.carSelf,
            orgUuid: this.rateParams.orgUuid,
            lineUuid: this.rateParams.lineUuid,
            devCode: this.rateParams.devCode,
            devModel: this.rateParams.devModel,
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
          })
        } else {
          this._getControlList({
            busNumber: '', busSelfCode: '', orgUuid: '', lineUuid: '', devCode: '', devModel: 'ADAS', pageNumber: this.pageNumber, pageSize: this.pageSize
          })
        }
      } else {
        this._getControlList({
          busNumber: this.selectData.busNumber,
          busSelfCode: this.selectData.selfCode,
          orgUuid: this.selectData.orgId,
          lineUuid: this.selectData.lineId,
          devCode: this.selectData.deviceCode,
          devModel: this.selectData.devModel,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        })
      }
    }
  }
}
</script>

<style>

</style>
