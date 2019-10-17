<template>
  <div>
    <h2 style="width: 100%; height: 2vh; text-align: center;line-height: 2vh">不良驾驶行为分析报警司机排行</h2>
    <el-table
      :data="tableData"
      height="50vh"
      border
      style="width: 100%">
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
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="lineName"
        label="线路"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="driverNum"
        label="工号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="driverName"
        label="司机">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="getrowData(scope.row)">{{scope.row.driverName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="warnFatigue"
        label="疲劳">
      </el-table-column>
      <el-table-column
        align="center"
        prop="warnSmoking"
        label="抽烟">
      </el-table-column>
      <el-table-column
        align="center"
        prop="warnPhone"
        label="打电话">
      </el-table-column>
      <el-table-column
        align="center"
        prop="warnDistraction"
        label="分神">
      </el-table-column>
      <el-table-column
        align="center"
        prop="warnAbnormal"
        label="驾驶员异常">
      </el-table-column>
      <el-table-column
        align="center"
        prop="warnTotalNum"
        label="报警总数">
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  props: {
    searchData: {
      type: Object
    }
  },
  data () {
    return {
      tableData: [],
      plain: true
    }
  },
  computed: {
    ...mapGetters(['formData'])
  },
  created () {
    let defaultForm = this.formData
    this._getTableData({
      orgId: defaultForm.orgId === '1' ? '' : defaultForm.orgId,
      lineId: defaultForm.lineId,
      startTime: defaultForm.dateArray[0],
      endTime: defaultForm.dateArray[1],
      warnTypes: []
    })
  },
  watch: {
    searchData: {
      deep: true,
      handler (newV) {
        this._getTableData({
          orgId: newV.orgId === '1' ? '' : newV.orgId,
          lineId: newV.lineId,
          startTime: newV.dateArray[0] === undefined ? '' : newV.dateArray[0],
          endTime: newV.dateArray[1] === undefined ? '' : newV.dateArray[1],
          warnTypes: newV.warnTypeId
        })
      }
    }
  },
  methods: {
    _getTableData (params) {
      this.$api['tiredMonitoring.getBadDrivingDriverRanking'](params).then(res => {
        this.tableData = res
      })
    },
    getrowData (row) {
      this.$emit('driverChanged', row)
    }
  }
}
</script>

<style>

</style>
