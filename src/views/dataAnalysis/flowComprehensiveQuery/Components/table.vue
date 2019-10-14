<template>
  <div>
    <el-table
      :data="tableData"
      height="36vh"
      border
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80">
      </el-table-column>
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
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="getRowData(scope.row)">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="上下行">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="刷卡总量（人次）">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="站名">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="周转量（人次）">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="平均运距（KM）">
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
          date: '公交一公司',
          name: '47路',
          address: '上行'
        },
        {
          date: '公交一公司',
          name: '50路',
          address: '上行'
        }
      ]
    }
  },
  methods: {
    getRowData (row) {
      console.log(row)
      this.$emit('getRow', row)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
