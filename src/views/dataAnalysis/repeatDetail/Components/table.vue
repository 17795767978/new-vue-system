<template>
  <div>
    <el-table
      :data="tableData"
      height="80vh"
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
        width="200"
        label="分公司">
        <!-- <template slot-scope="scope">
        <el-button type="primary" @click="goToDetail(scope.row)" size="mini">{{scope.row.date}}</el-button>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="type"
        align="center"
        label="线路号">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="上下行">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        width="300"
        label="线路名">
      </el-table-column>
      <el-table-column
        prop="num"
        align="center"
        label="站序A">
      </el-table-column>
      <el-table-column
        prop="repeat"
        align="center"
        label="站序B">
      </el-table-column>
      <el-table-column
        prop="repeatLine"
        align="center"
        label="站位A">
      </el-table-column>
      <el-table-column
        prop="repeatLine"
        align="center"
        label="站位B">
      </el-table-column>
      <el-table-column
        prop="repeatLine"
        align="center"
        label="重复线路">
      </el-table-column>
      <el-table-column
        prop="repeatLine"
        align="center"
        label="重复数量(条)">
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
