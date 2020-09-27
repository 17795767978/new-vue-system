<template>
<div>
  <el-table
    style="width: 95%; margin-left: 2.5%; margin-top: 5vh;"
    ref="tableWrapper"
    show-summary
    :data="tableData"
    border>
    <el-table-column
      align="center"
      type="index"
      label="序号"
      width="80">
    </el-table-column>
    <el-table-column
      align="center"
      prop="orgName"
      label="机构"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="lineName"
      label="线路"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="busPlateNumber"
      label="车辆"
      >
    </el-table-column>
    <!-- <el-table-column
      align="center"
      prop="passFlowNums"
      label="客流数"
      >
    </el-table-column> -->
    <el-table-column
      align="center"
      prop="fee"
      label="交易金额（元）"
      >
      <template slot-scope="scope">
        <el-link @click="handlerToPage(scope.row)" type="primary">{{scope.row.fee}}</el-link>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  props: {
    selectData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
    let startTime = moment(new Date() - 24 * 3600 * 1000).format('YYYY-MM-DD 00:00:00')
    let endTime = moment().format('YYYY-MM-DD 23:59:59')
    this._getBusKLPage({
      orgUuid: this.userId,
      lineUuid: '',
      busPlateNumber: '',
      startTime,
      endTime
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.pageNum = 1
        this._getBusKLPage({
          orgUuid: newV.orgId,
          lineUuid: newV.lineId,
          busPlateNumber: newV.busNumber,
          startTime: newV.startTime,
          endTime: newV.endTime
        })
      }
    }
  },
  methods: {
    _getBusKLPage (params) {
      this.$api['schedulingAnalysis.getBusKLPage'](params).then((res) => {
        this.tableData = res
      }).catch((err) => {
        this.$message.error(err.message)
      })
    },
    handlerToPage (row) {
      // console.log(row)
      let startTime = moment(new Date() - 24 * 3600 * 1000).format('YYYY-MM-DD 00:00:00')
      let endTime = moment().format('YYYY-MM-DD 23:59:59')
      const config = {
        busNumber: row.busPlateNumber,
        orgId: row.orgUuid,
        lineId: row.lineUuid,
        dateArray: Object.keys(this.selectData).length > 0 ? [this.selectData.startTime, this.selectData.endTime] : [startTime, endTime]
      }
      this.$router.push({
        name: 'transactionForm',
        params: config
      })
    }
  }
}
</script>

<style>

</style>
