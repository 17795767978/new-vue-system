<template>
  <div>
    <el-table
      :data="tableData"
      height="37vh"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="date"
        align="center"
        label="线路">
        <template slot-scope="scope">
        <el-button type="primary" @click="goToDetail(scope.row)" size="mini">{{scope.row.date}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        align="center"
        label="方向">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="线路名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="线路站对数">
      </el-table-column>
      <el-table-column
        prop="num"
        align="center"
        label="重复站对数">
      </el-table-column>
      <el-table-column
        prop="repeat"
        align="center"
        label="重复度">
      </el-table-column>
      <el-table-column
        prop="repeatLine"
        width="300"
        align="center"
        label="重复线路(排名前三)">
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
          date: '01',
          type: '上行',
          name: '口杯',
          address: 12312312,
          num: 12121,
          repeat: '10%',
          repeatLine: ['0', '23', '4']
        }
      ]
    }
  },
  methods: {
    goToDetail (data) {
      console.log(data)
      this.$router.push({
        name: 'repeatabilityDetail',
        query: {
          id: '001'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
