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
        prop="pfrLineName"
        align="center"
        label="线路">
      </el-table-column>
      <el-table-column
        prop="prfBusPlateNumber"
        align="center"
        label="车辆">
      </el-table-column>
      <el-table-column
        prop="prfDevCode"
        align="center"
        label="设备号">
      </el-table-column>
      <el-table-column
        prop="pfrGetOnNumber"
        align="center"
        label="上车人数">
      </el-table-column>
      <el-table-column
        prop="pfrGetOffNumber"
        align="center"
        label="下车人数">
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
      tableData: [],
      pageNumber: 1,
      pageSize: 15,
      total: 0,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted () {
    let dateBefore = moment().format('YYYY-MM-DD 00:00:00')
    let dateAfter = moment().format('YYYY-MM-DD 23:59:59')
    this._pageBusPersonTotalList({
      orgId: this.userId === '1' ? '' : this.userId,
      lineId: '',
      busNumber: '',
      isHistory: '0',
      startTime: dateBefore,
      endTime: dateAfter,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.pageNumber = 1
        this._pageBusPersonTotalList({
          orgId: newV.orgId,
          lineId: newV.lineId,
          busNumber: newV.busNumber,
          isHistory: newV.isHistory,
          startTime: newV.startTime,
          endTime: newV.endTime,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        })
      }
    }
  },
  methods: {
    _pageBusPersonTotalList (params) {
      this.loading = true
      this.$api['passengerFlow.pageBusPersonTotalList'](params).then(res => {
        // console.log(res)
        this.loading = false
        this.tableData = res.list
        this.total = res.total
      })
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      let dateBefore = moment().format('YYYY-MM-DD 00:00:00')
      let dateAfter = moment().format('YYYY-MM-DD 23:59:59')
      if (this.userId === '1') {
        this._pageBusPersonTotalList({
          orgId: this.userId === '1' ? '' : this.userId,
          lineId: '',
          busNumber: '',
          isHistory: '0',
          startTime: dateBefore,
          endTime: dateAfter,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        })
      } else {
        this._pageBusPersonTotalList({
          orgId: this.selectData.orgId,
          lineId: this.selectData.lineId,
          busNumber: this.selectData.busNumber,
          isHistory: this.selectData.isHistory,
          startTime: this.selectData.startTime,
          endTime: this.selectData.endTime,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        })
      }
    }
  }
}
</script>

<style>

</style>
