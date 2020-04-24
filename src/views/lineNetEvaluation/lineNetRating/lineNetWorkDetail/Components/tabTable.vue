<template>
  <div>
    <el-table
      :data="tableCurrentData"
      height="70vh"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        v-for="(item, index) in tablePropList"
        :key="item"
        :prop="item"
        :label="tableLabelList[index]"
        align="center">
        <template slot-scope="scope">
          <span v-if="index > 1 && !conditions.some(item => item === tableLabelList[index]) && scope.$index > 0">
            {{Number(scope.row[item]).toFixed(2)}}
          </span>
          <span v-else>{{scope.row[item]}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const CON_DIF = ['站位个数', '刷卡总量(人次)', '空调车', '线路运营车辆数(辆)']
export default {
  props: {
    tableData: {
      type: Object
    }
  },
  data () {
    return {
      tableLabelList: [], // 中文名称
      tablePropList: [], // 英文名称
      tableCurrentData: [], // 数据list
      conditions: []
    }
  },
  mounted () {
    if (Object.keys(this.tableData).length > 0) {
      this.conditions = CON_DIF
      this.tableLabelList = this.tableData.columnNameList
      this.tablePropList = this.tableData.columnList
      this.tableCurrentData = this.tableData.dataList
    }
  },
  watch: {
    tableData: {
      deep: true,
      handler (newV) {
        if (Object.keys(this.tableData).length > 0) {
          this.tableLabelList = this.tableData.columnNameList
          this.tablePropList = this.tableData.columnList
          this.tableCurrentData = this.tableData.dataList
        }
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
