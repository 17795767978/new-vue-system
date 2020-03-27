<template>
  <div>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      size="mini"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80"
      >
      <template slot-scope="scope">
        <span> {{scope.$index + (pageNumber - 1) * pageSize + 1}} </span>
      </template>
      </el-table-column>
      <el-table-column
        prop="orgName"
        align="center"
        label="机构">
      </el-table-column>
      <el-table-column
        prop="lineName"
        align="center"
        label="线路">
      </el-table-column>
      <el-table-column
        prop="busPlateNumber"
        align="center"
        label="车辆">
      </el-table-column>
      <el-table-column
        prop="payNumber"
        align="center"
        label="刷卡总量（人次）">
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right; margin-top: 20px;"
      background
      :current-page="pageNumber"
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
  data () {
    return {
      tableAllData: [],
      tableData: [],
      pageNumber: 1,
      pageSize: 15,
      total: 0,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['userId', 'formData'])
  },
  mounted () {
    let lineData = this.$store.state.globel.lineData
    let dateBefore = moment().format('YYYY-MM-DD 00:00:00')
    let dateAfter = moment().format('YYYY-MM-DD 23:59:59')
    this._pageBusPersonTotalList({
      orgUuid: this.userId === '1' ? '' : this.userId,
      lineUuid: lineData[0].value,
      busPlateNumber: '',
      sTime: dateBefore,
      eTime: dateAfter
      // pageSize: this.pageSize,
      // pageNumber: this.pageNumber
    }, '1')
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.pageNumber = 1
        this._pageBusPersonTotalList({
          orgUuid: newV.orgId === '1' ? '' : newV.orgId,
          lineUuid: newV.lineId,
          busPlateNumber: newV.busNumber,
          sTime: moment(newV.startTime).format('YYYY-MM-DD HH:mm:ss'),
          eTime: moment(newV.endTime).format('YYYY-MM-DD HH:mm:ss')
        }, newV.isHistory)
      }
    }
  },
  methods: {
    _pageBusPersonTotalList (params, type) {
      this.loading = true
      if (type === '1') {
        this.$api['passengerFlow.getSingleBusPFStatisticsByDay'](params).then(res => {
          if (res.length === 0) {
            this.$message.warning('暂无数据')
          }
          this.loading = false
          this.tableAllData = res
          this.tableData = res.slice(0, 15)
          this.total = res.length
          this.pageNumber = 1
        })
      } else {
        this.$api['passengerFlow.getSingleBusPFStatisticsByHis'](params).then(res => {
          if (res.length === 0) {
            this.$message.warning('暂无数据')
          }
          this.loading = false
          this.tableAllData = res
          this.tableData = res.slice(0, 15)
          this.total = res.length
          this.pageNumber = 1
        })
      }
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      this.tableData = this.tableAllData.slice((val - 1) * 15, val * 15)
    }
  }
}
</script>

<style>
</style>
