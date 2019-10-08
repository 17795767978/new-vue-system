<template>
  <div class="table">
    <el-table
      :data="tableData"
      border
      height="300"
      stripe
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      tableData: []
    }
  }
}
</script>

<style>

</style>
