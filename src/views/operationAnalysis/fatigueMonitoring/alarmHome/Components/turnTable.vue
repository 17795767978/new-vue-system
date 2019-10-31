<template>
  <div class="table">
    <el-table
      :data="tableData"
      border
      size="mini"
      height="270"
      stripe
      style="width: 100%">
      <el-table-column
        prop="orgName"
        label="机构"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="driverNum"
        label="工号"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="driverName"
        align="center"
        label="司机">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="goToDetail(scope.row)">{{scope.row.driverName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalWarn"
        align="center"
        label="报警总数">
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    searchData: {
      type: Object
    }
  },
  data () {
    return {
      tableData: []
    }
  },
  created () {
    let defaultData = this.$store.getters.formData
    this._getDriverTable({
      orgId: defaultData.orgId === '1' ? '' : defaultData.orgId,
      lineId: defaultData.lineId,
      busPlateNumber: '',
      warnTypes: []
    })
  },
  watch: {
    searchData: {
      deep: true,
      handler (newV) {
        const { orgId, lineId, busNumber, warnTypeId } = newV
        this._getDriverTable({
          orgId: orgId === '1' ? '' : orgId,
          lineId,
          busPlateNumber: busNumber,
          warnTypes: warnTypeId
        })
      }
    }
  },
  methods: {
    _getDriverTable (params) {
      this.$api['tiredMonitoring.getBadDrivingBehaviorRanking'](params).then(res => {
        this.tableData = res
      })
    },
    goToDetail (row) {
      this.$emit('getDetail', row)
    }
  }
}
</script>

<style>

</style>
