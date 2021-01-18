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
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
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
      tableCurrentData: [] // 数据list
    }
  },
  mounted () {
    if (Object.keys(this.tableData).length > 0) {
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
