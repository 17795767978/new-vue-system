<template>
  <div>
    <el-table
      :data="tableData"
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
        prop="org"
        label="出发站点"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="line"
        label="到达站点"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="prod"
        align="center"
        label="直线距离">
      </el-table-column>
      <el-table-column
        prop="rela"
        align="center"
        label="驾车距离">
      </el-table-column>
      <el-table-column
        prop="cond"
        align="center"
        label="D">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          org: '公交一公司',
          line: '47路',
          prod: '1.00',
          rela: '0.00',
          cond: '0.20',
          fast: '0.54',
          total: '1.00',
          grade: '普'
        },
        {
          org: '公交二公司',
          line: '50路',
          prod: '1.00',
          rela: '0.00',
          cond: '0.20',
          fast: '0.54',
          total: '1.00',
          grade: '普'
        }
      ]
    }
  },
  methods: {
    detailByProd (data) {
      console.log(data)
    },
    detailByRela (data) {
      console.log(data)
    },
    detailByCond (data) {
      console.log(data)
    },
    detailByFast (data) {
      console.log(data)
    },
    getEcharts (data) {
      this.$emit('changeEcharts', data)
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
