<template>
  <div>
    <el-table
      :data="tableData"
      border
      height="36vh"
      size="mini"
      style="width: 100%">
      <el-table-column
        type="index"
        align="center"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="lineName"
        align="center"
        label="站点名称">
      </el-table-column>
      <el-table-column
        prop="predistance"
        align="center"
        label="距离首站距离(km)">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    selectData: {
      type: Object
    }
  },
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this._getLineCondition({
      lineID: ''
    })
  },
  watch: {
    'selectData.lineLineId': {
      handler (newV) {
        let str = newV.split('+')[0]
        this._getLineCondition({
          lineID: str
        })
      }
    }
  },
  methods: {
    _getLineCondition (params) {
      this.tableData = []
      this.$api['lineNet.getLineCondition'](params).then(res => {
        res.forEach(item => {
          this.tableData.push({
            lineName: item.lineName,
            predistance: item.predistance
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
