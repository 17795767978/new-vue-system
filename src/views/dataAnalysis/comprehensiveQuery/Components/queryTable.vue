<template>
  <div>
    <el-table
      :data="tableData"
      height="36vh"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="所属机构"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="线路号"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="上下行">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="站序号">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="站名">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="登量（人次）">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="降量（人次）">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="通过量（人次）">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="满载率">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
