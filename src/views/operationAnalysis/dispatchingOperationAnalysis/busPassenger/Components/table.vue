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
        prop="devCode"
        align="center"
        label="设备号">
      </el-table-column>
      <el-table-column
        prop="getOnNumber"
        align="center"
        label="上车人数">
      </el-table-column>
      <el-table-column
        prop="getOffNumber"
        align="center"
        label="下车人数">
      </el-table-column>
      <el-table-column
        prop="pfrpassengerDif"
        align="center"
        label="上下车客流差值">
        <template slot-scope="scope">
          <span>{{scope.row.pfrpassengerDif}}%</span>
        </template>
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
    ...mapGetters(['userId'])
  },
  mounted () {
    let dateBefore = moment().format('YYYY-MM-DD 00:00:00')
    let dateAfter = moment().format('YYYY-MM-DD 23:59:59')
    this._pageBusPersonTotalList({
      orgUuid: this.userId === '1' ? '' : this.userId,
      lineUuid: '',
      busUuid: '',
      dayOrhistory: '1',
      startTime: dateBefore,
      endTime: dateAfter
      // pageSize: this.pageSize,
      // pageNumber: this.pageNumber
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.pageNumber = 1
        this._pageBusPersonTotalList({
          orgUuid: newV.orgId === '1' ? '' : newV.orgId,
          lineUuid: newV.lineId,
          busUuid: newV.busNumber,
          dayOrhistory: newV.isHistory,
          startTime: moment(newV.startTime).format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment(newV.endTime).format('YYYY-MM-DD HH:mm:ss')
          // pageSize: this.pageSize,
          // pageNumber: this.pageNumber
        })
      }
    }
  },
  methods: {
    _pageBusPersonTotalList (params) {
      this.loading = true
      this.$api['passengerFlow.pageBusPersonTotalList'](params).then(res => {
        if (res.length === 0) {
          this.$message.warning('暂无数据')
        }
        this.loading = false

        this.tableAllData = this.format(res)
        this.tableData = this.tableAllData.slice(0, 15)
        this.total = this.tableAllData.length
        this.pageNumber = 1
      })
    },
    format (data) {
      let dataFormat = []
      data.forEach(item => {
        let pfrpassengerDifNum
        if (item.getOnNumber > 0) {
          pfrpassengerDifNum = Math.abs(`${((item.getOnNumber - item.getOffNumber) / item.getOnNumber * 100).toFixed(2)}`)
          dataFormat.push(Object.assign({ pfrpassengerDif: pfrpassengerDifNum }, item))
        } else {
          dataFormat.push(Object.assign({ pfrpassengerDif: '0' }, item))
        }
      })
      dataFormat = dataFormat.sort((prev, next) => next.pfrpassengerDif - prev.pfrpassengerDif)
      return dataFormat
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
