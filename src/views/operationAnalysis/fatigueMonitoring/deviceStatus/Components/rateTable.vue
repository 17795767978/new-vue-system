<template>
  <div class="table-wrapper">
    <h4 style="margin-top: 10px;">
      <i class="fa fa-fort-awesome"></i>
      <span>设备状态</span>
    </h4>
    <el-table
      :data="tableData"
      size="mini"
      border
      style="width: 100%"
      >
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="60">
      </el-table-column>
      <el-table-column
        align="center"
        label="所属线路">
        <template slot-scope="scope">
          <el-button style="width: 150px;" type="primary" size="mini" plain @click="handleClick(scope.row)">{{scope.row.lineName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="onlineDeviceCount"
        label="在线设备数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="deviceCount"
        label="已安装设备数">
      </el-table-column>
      <el-table-column
        align="center"
        label="在线率(%)"
        :formatter="formatterRate"
        >
      </el-table-column>
      <el-table-column
        align="center"
        label="更新时间"
        :formatter="formatterTime"
        >
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        style="float: right; margin-top: 20px;"
        :current-page="outCurrentPage"
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
      <span class="demonstration" style="float: right; margin-top: 20px; line-height: 36px;">共{{total}}条</span>
    </div>
    <!-- 弹出框 -->
    <el-dialog :title="lineName" width="80%" :visible.sync="dialogTableVisible">
      <el-table size="mini" :data="lineTableData" border height="600px" style="margin-bottom: 40px;">
        <el-table-column type="index" align="center" label="序号" width="60"></el-table-column>
        <!-- <el-table-column property="date" label="设备编号"></el-table-column> -->
        <el-table-column align="center" property="deviceCode" label="设备型号"></el-table-column>
        <el-table-column align="center" property="lineName" label="线路"></el-table-column>
        <el-table-column align="center" property="busPlateNum" label="车辆"></el-table-column>
        <el-table-column align="center" label="当前位置">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              trigger="click"
              >
              <mapWrapper v-if="isReload" :rowData="rowData" :isReload="isReload"/>
              <el-button type="success" icon="el-icon-location-outline" slot="reference" circle @click="getRow(scope.row)"></el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="center" label="在线状态">
          <template slot-scope="scope">
            {{scope.row.onlineStatus === '1' ? '在线' : '离线'}}
          </template>
        </el-table-column>
        <el-table-column align="center" property="address" :formatter="formatterTimeInside" label="更新时间"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          style="float: right; margin-top: -20px;"
          background
          :current-page="inCurrentPage"
          @current-change="handleCurrentChangeLine"
          layout="prev, pager, next"
          :total="lineTotal">
        </el-pagination>
        <span class="demonstration" style="float: right; margin-top: -20px;line-height: 36px;">共{{lineTotal}}条</span>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
import mapWrapper from './map'
export default {
  props: {
    selectData: {
      type: Object
    }
  },
  data () {
    return {
      tableData: [],
      lineTableData: [],
      total: 0,
      lineTotal: 0,
      dialogTableVisible: false,
      isReload: false,
      lineId: '',
      lineName: '',
      center: {},
      zoom: 5,
      position: {},
      rowData: {},
      outCurrentPage: 1,
      inCurrentPage: 1
    }
  },
  components: {
    mapWrapper
  },
  created () {
    this._statusTable({
      pageNum: this.outCurrentPage,
      pageSize: 10,
      lineUuid: [], // 线路id，可多选
      orgUuid: '' // 组织机构
    })
  },
  computed: {},
  watch: {
    selectData: {
      deep: true,
      handler () {
        this._statusTable(this.selectData)
      }
    }
  },
  methods: {
    _statusTable (params) {
      this.$api['tiredMonitoring.getLineDeviceStatusPage'](params).then(res => {
        this.tableData = res.list
        this.total = res.total
        if (res.list.length === 0) {
          this.$message.warning('无列表数据')
        }
      })
    },
    formatterTime (row) {
      return moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss')
    },
    formatterRate (row) {
      let num = (row.onlineDeviceCount / row.deviceCount) * 100
      return JSON.stringify(num).substring(0, 5)
    },
    formatterTimeInside (row) {
      return moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleClick (row) {
      this.lineId = row.lineId
      this.lineName = row.lineName
      console.log(this.lineId)
      this.$api['tiredMonitoring.getLinelineStatusPage']({
        pageNum: this.inCurrentPage,
        pageSize: 10,
        lineId: this.lineId
      }).then(res => {
        this.dialogTableVisible = true
        this.lineTableData = res.list
        this.lineTotal = res.total
      })
    },
    // 外层table
    handleCurrentChange (val) {
      this.outCurrentPage = val
      this._statusTable({
        pageNum: this.outCurrentPage,
        pageSize: 10,
        lineUuid: [], // 线路id，可多选
        orgUuid: '' // 组织机构
      })
    },
    // 内层table
    handleCurrentChangeLine (val) {
      this.inCurrentPage = val
      this.$api['tiredMonitoring.getLinelineStatusPage']({
        pageNum: this.inCurrentPage,
        pageSize: 10,
        lineId: this.lineId
      }).then(res => {
        this.dialogTableVisible = true
        this.lineTableData = res.list
        this.lineTotal = res.total
      })
    },
    getRow (row) {
      this.isReload = true
      this.rowData = row
    }
    // map
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 12px;
  margin-top: 10px;
  padding: 10px 10px;
  box-sizing: border-box;
}
</style>
