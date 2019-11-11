<template>
  <div v-loading="isloading">
    <h2 style="width: 100%; height: 2vh; text-align: center;line-height: 2vh">通道配置列表</h2>
    <el-table
      ref="tableWrapper"
      :data="tableData"
      height="70vh"
      border
      size="mini"
      style="width: 100%">
      <el-table-column
        align="center"
        label="序号"
        type="index"
        width="60">
      </el-table-column>
        <template slot-scope="scope">
          <span> {{scope.$index + (pageNumber - 1) * pageSize + 1}} </span>
        </template>
      <el-table-column
        v-for="item in columnArr"
        :key="item.plvalue"
        align="center"
        :prop="item.plvalue"
        :label="item.pldisplay">
        <template slot-scope="scope">
          <el-button v-if="item.plvalue === 'drivername'" type="primary" size="mini" @click="getrowData(scope.row)">{{scope.row.drivername}}</el-button>
          <span v-else>{{scope.row[item.plvalue]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button type="primary" @click="canEdit(scope.row)" size="small">编辑</el-button>
          <el-button type="success" @click="save(scope.row)" size="small">操作</el-button>
        </template>
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
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  props: {
    searchData: {
      type: Object
    }
  },
  data () {
    return {
      tableData: [],
      columnArr: [],
      isloading: true,
      total: 0,
      pageNumber: 1,
      pageSize: 13
    }
  },
  computed: {
    ...mapGetters(['formData'])
  },
  created () {
    let defaultForm = this.formData
    this._getTableData({
      orgId: defaultForm.orgId === '1' ? '' : defaultForm.orgId,
      lineId: defaultForm.lineId,
      busNumber: '',
      busSelfCode: '',
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    })
  },
  mounted () {
  },
  activated () {
  },
  watch: {
    searchData: {
      deep: true,
      handler (newV) {
        this._getTableData({
          orgId: newV.orgId === '1' ? '' : newV.orgId,
          lineId: newV.lineId,
          busNumber: newV.busNumber,
          busSelfCode: newV.busSelfCode,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        })
      }
    }
  },
  methods: {
    _getTableData (params) {
      this.isloading = true
      this.$api['tiredMonitoring.getBadDrivingDriverRanking'](params).then(res => {
        setTimeout(() => {
          this.isloading = false
        }, 100)
        this.columnArr = res.column
        this.tableData = res.data
      })
    },
    canEdit (row) {
      console.log(row)
    },
    save (row) {
      console.log(row)
    },
    handleCurrentChange (val) {
      this.selectData.pageNumber = val
      this.selectData.pageSize = 13
      this.pageNumber = val
      this._getTableData({
        orgId: this.searchData.orgId === '1' ? '' : this.searchData.orgId,
        lineId: this.searchData.lineId,
        busNumber: this.searchData.busNumber,
        busSelfCode: this.searchData.busSelfCode,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      })
    }
  }
}
</script>

<style>

</style>
