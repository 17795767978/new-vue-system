<template>
  <div class="table-wrapper">
    <!-- <h4 style="margin-top: 10px;">
      <i class="fa fa-fort-awesome"></i>
      <span style="font-size: 16px;">设备状态</span>
      <span v-show="outsideTime" style="margin-left: 20px">更新时间：{{outsideTime}}</span>
    </h4> -->
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
        <template slot-scope="scope">
          <span> {{scope.$index + (outCurrentPage - 1) * 10 + 1}} </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="devCode"
        label="设备编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="orgName"
        label="所属公司">
      </el-table-column>
      <el-table-column
        align="center"
        prop="lineName"
        width="80"
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
        label="车牌号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="devOnlineStatus"
        width="100"
        label="在线状态">
      </el-table-column>
      <el-table-column
        align="center"
        prop="devIsvalid"
        width="100"
        label="启禁状态">
      </el-table-column>
      <el-table-column
        align="center"
        prop="devOnlineTime"
        :formatter="formatterTime"
        label="更新时间">
      </el-table-column>
      <el-table-column
        align="center"
        label="离线时间"
        :formatter="formatterRate"
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
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
// import mapWrapper from './map'
import { mapGetters } from 'vuex'
export default {
  props: {
    selectData: {
      type: Object,
      default: () => {
        return {
          orgUuid: '',
          lineUuid: '',
          car: '',
          carSelf: '',
          devOnlineStatus: ''
        }
      }
    },
    isUpdate: {
      type: Boolean
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
      inCurrentPage: 1,
      outsideTime: '',
      loading: true
    }
  },
  components: {
    // mapWrapper
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
    this._statusTable({
      pageNumber: this.outCurrentPage,
      pageSize: 10,
      lineId: '',
      orgId: this.userId === '1' ? '' : this.userId, // 组织机构
      busPlateNumber: '',
      busSelfCode: '',
      devCode: '',
      devOnlineStatus: ''
    })
  },
  watch: {
    // selectData: {
    //   deep: true,
    //   handler () {
    //     this._statusTable(this.selectData)
    //   }
    // },
    isUpdate () {
      if (this.isUpdate) {
        this.outCurrentPage = 1
        this._statusTable({
          orgId: this.selectData.orgUuid === '1' ? '' : this.selectData.orgUuid,
          lineId: this.selectData.lineUuid,
          pageNumber: this.outCurrentPage,
          pageSize: 10,
          busPlateNumber: this.selectData.car,
          busSelfCode: this.selectData.carSelf,
          devOnlineStatus: this.selectData.devOnlineStatus,
          devCode: this.selectData.devCode
        })
      }
      this.$emit('isUpdateTo')
    }
  },
  methods: {
    _statusTable (params) {
      this.$api['tiredMonitoring.getLineDeviceStatusPage'](params).then(res => {
        this.tableData = res.list
        this.total = res.total
        this.outsideTime = res.list.length > 0 && moment(res.list[0].updateTime).format('YYYY-MM-DD HH:mm:ss')
        this.$message.success('数据更新')
        if (res.list.length === 0) {
          this.$message.warning('无列表数据')
        }
      })
    },
    formatterRate (row) {
      if (row.offlineTimeLabel) {
        return row.offlineTimeLabel
      } else {
        return '-'
      }
    },
    formatterTime (row) {
      if (row.devOnlineTime) {
        return moment(row.devOnlineTime).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return '-'
      }
    },
    handleClick (row) {
      this.dialogTableVisible = true
      this.loading = true
      this.inCurrentPage = 1
      this.lineId = row.lineId
      this.lineName = row.lineName
      this.lineTableData = []
      this.lineTotal = 0
      this.$api['tiredMonitoring.getLinelineStatusPage']({
        pageNum: this.inCurrentPage,
        pageSize: 10,
        lineId: this.lineId
      }).then(res => {
        this.loading = false
        this.lineTableData = res.list
        this.lineTotal = res.total
        this.$message.success('数据更新')
      })
    },
    // 外层table
    handleCurrentChange (val) {
      this.outCurrentPage = val
      this._statusTable({
        orgId: this.selectData.orgUuid || '',
        lineId: this.selectData.lineUuid || '',
        pageNumber: this.outCurrentPage,
        pageSize: 10,
        busPlateNumber: this.selectData.car || '',
        busSelfCode: this.selectData.carSelf || '',
        devOnlineStatus: this.selectData.devOnlineStatus || ''
      })
    },
    // 内层table
    handleCurrentChangeLine (val) {
      this.inCurrentPage = val
      this.loading = true
      this.$api['tiredMonitoring.getLinelineStatusPage']({
        pageNum: this.inCurrentPage,
        pageSize: 10,
        lineId: this.lineId
      }).then(res => {
        this.dialogTableVisible = true
        this.lineTableData = res.list
        this.lineTotal = res.total
        this.loading = false
      })
    },
    getRow (row) {
      this.isReload = true
      this.rowData = row
      console.log(this.$refs.elPopover)
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
