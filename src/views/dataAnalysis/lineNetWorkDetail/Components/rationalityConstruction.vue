<template>
  <div>
    <el-table
      :data="tableData"
      height="36vh"
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
        label="机构"
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
        label="站点建设合理性">
        <template slot-scope="scope">
          <el-link type="primary" @click="detailByProd(scope.row)">{{scope.row.prod}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="rela"
        align="center"
        label="舒适性">
        <template slot-scope="scope">
          <el-link type="warning" @click="detailByRela(scope.row)">{{scope.row.rela}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="cond"
        align="center"
        label="便捷性">
        <template slot-scope="scope">
          <el-link type="danger" @click="detailByCond(scope.row)">{{scope.row.cond}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="fast"
        align="center"
        label="快捷性">
        <template slot-scope="scope">
          <el-link type="info" @click="detailByFast(scope.row)">{{scope.row.fast}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="total"
        align="center"
        label="总得分">
        <template slot-scope="scope">
          <el-link type="success" @click="getEcharts(scope.row)">{{scope.row.total}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="grade"
        align="center"
        label="线路等级">
        <template slot-scope="scope">
          <span style="color: green">{{scope.row.grade}}</span>
        </template>
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
