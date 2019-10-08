<template>
  <div>
    <h2 style="width: 100%; height: 2vh; text-align: center;line-height: 2vh">不良驾驶行为分析报警司机排行</h2>
    <el-table
      :data="tableData"
      height="50vh"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="80">
      </el-table-column>
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
  },
  methods: {
  }
}
</script>

<style>

</style>
