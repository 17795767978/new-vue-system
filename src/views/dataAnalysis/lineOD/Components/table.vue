<template>
  <div>
    <el-table
      :data="tableData"
      height="36vh"
      border
      style="width: 100%">
      <el-table-column
        prop="org"
        label="分公司"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="line"
        label="线路号"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="prod"
        align="center"
        label="上下行">
      </el-table-column>
      <el-table-column
        prop="rela"
        align="center"
        label="上车站位名">
      </el-table-column>
      <el-table-column
        prop="cond"
        align="center"
        label="上车站序名">
      </el-table-column>
      <el-table-column
        prop="fast"
        align="center"
        label="下车站位名">
      </el-table-column>
      <el-table-column
        prop="total"
        align="center"
        label="下车站序名">
      </el-table-column>
      <el-table-column
        prop="grade"
        align="center"
        label="刷卡量（人次）">
      </el-table-column>
      <el-table-column
        prop="grade"
        align="center"
        label="日期">
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
