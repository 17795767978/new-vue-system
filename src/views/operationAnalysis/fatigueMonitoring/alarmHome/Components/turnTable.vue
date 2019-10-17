<template>
  <div class="table">
    <el-table
      :data="tableData"
      border
      size="mini"
      height="300"
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
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._getDriverTable({
      orgId,
      lineId: defaultData.lineId,
      busPlateNumber: '',
      warnTypes: []
    })
  },
  watch: {
    searchData: {
      deep: true,
      handler (newV) {
        console.log(newV)
        const { orgId, lineId, busNumber, warnTypeId } = newV
        this._getDriverTable({
          orgId,
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
        // console.log(res)
        this.tableData = res
      })
    }
  }
}
</script>

<style>

</style>
