<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      border
      height="65vh"
      style="width: 100%">
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="upStaName"
        label="出发站点"
        align="center">
      </el-table-column>
      <el-table-column
        prop="downStaName"
        label="到达站点"
        align="center">
      </el-table-column>
      <el-table-column
        prop="linearDistance"
        align="center"
        label="直线距离（KM）">
      </el-table-column>
      <el-table-column
        prop="payNumber"
        align="center"
        label="刷卡人数">
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right; margin-top: 20px;"
      background
      :current-page="pageNumber"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
    <span class="demonstration" style="float: right; margin-top: 20px; line-height: 36px;">共{{total}}条</span>
  </div>
</template>

<script>
export default {
  props: {
    selectData: {
      type: Object
    }
  },
  data () {
    return {
      tableData: [],
      pageNumber: 1,
      pageSize: 15,
      total: 0
    }
  },
  created () {
    this._getAnalStaOdDataListData({
      month: '',
      linearDistanceMin: '',
      linearDistanceMax: '',
      payNumberMin: '',
      payNumberMax: '',
      payTimeIntervalMin: '',
      payTimeIntervalMax: '',
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    })
  },
  watch: {
    selectData (newV) {
      console.log(newV)
    }
  },
  methods: {
    async _getAnalStaOdDataListData (params) {
      let result = await this.$api['lineNet.getAnalStaOdDataListData'](params)
      console.log(result)
    },
    handleCurrentChange (val) {}
  }
}
</script>

<style>

</style>
