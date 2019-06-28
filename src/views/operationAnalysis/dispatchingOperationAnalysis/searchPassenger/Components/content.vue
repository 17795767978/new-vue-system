<template>
  <div class="table-wrapper">
    <el-table
      :data="tableData"
      border
      stripe
      size="small"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="100"
      >
      <template slot-scope="scope">
        <span> {{scope.$index + (pageNumber - 1) * pageSize + 1}} </span>
      </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="orgName"
        label="机构"
        width="150">
      </el-table-column>
      <el-table-column
        align="center"
        prop="pfrLineName"
        label="线路"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop="prfBusPlateNumber"
        width="150"
        label="车辆">
      </el-table-column>
      <el-table-column
        align="center"
        width="80"
        label="方向">
        <template slot-scope="scope">
          {{scope.row.pfrLineType === '1' ? '上行' : '下行'}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="80"
        prop="pfrStationSeq"
        label="站序">
      </el-table-column>
      <el-table-column
        align="center"
        width="200"
        prop="pfrStationName"
        label="站点名称">
      </el-table-column>
      <el-table-column
        align="center"
        width="200"
        :formatter="gerDate"
        label="客流时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="pfrGetOnNumber"
        label="上车人数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="pfrGetOffNumber"
        label="下车人数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="prfGetFOnNumber"
        label="前门上车人数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="prfGetFOffNumber"
        label="前门下车人数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="prfGetEOnNumber"
        label="后门上车人数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="prfGetEOffNumber"
        label="后门下车人数">
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

<script type="text/ecmascript-6">
import moment from 'moment'
export default {
  props: {
    selectData: {
      type: Object
    },
    isUpdate: {
      type: Boolean
    }
  },
  data () {
    return {
      tableData: [],
      total: 0,
      pageNumber: 1,
      pageSize: 15
    }
  },
  mounted () {
    let dataNow = new Date()
    let endTime = dataNow.getTime() - 24 * 3600 * 1000
    let timeStart = moment(endTime).format('YYYY-MM-DD 00:00:00')
    let timeEnd = moment(endTime).format('YYYY-MM-DD 23:59:59')
    this._passengerFlow({
      orgId: '',
      lineId: '',
      lineType: '',
      busNumber: '',
      startTime: timeStart,
      endTime: timeEnd,
      pageSize: 15,
      pageNumber: this.pageNumber
    })
  },
  watch: {
    // selectData: {
    //   deep: true,
    //   handler (newValue) {
    //     this.selectData.pageNumber = this.pageNumber
    //     this.selectData.pageSize = 10
    //     this._passengerFlow({ ...this.selectData })
    //   }
    // },
    isUpdate () {
      if (this.isUpdate) {
        this.selectData.pageNumber = this.pageNumber
        this.selectData.pageSize = 15
        this._passengerFlow(this.selectData)
        this.$emit('isUpdateTo')
      }
    }
  },
  methods: {
    _passengerFlow (params) {
      this.$api['passengerFlow.list'](params).then(res => {
        this.tableData = res.list
        this.total = res.total
        this.$message.success('数据已更新')
      }).catch(() => {
        this.$message.error('服务端错误')
      })
    },
    gerDate (row) {
      return moment(row.pfrTripDate).format('YYYY-MM-DD')
    },
    handleCurrentChange (val) {
      this.selectData.pageNumber = val
      this.selectData.pageSize = 15
      this.pageNumber = val
      this._passengerFlow({ ...this.selectData })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  margin-top: 20px;
  padding: 20px 20px;
  box-sizing: border-box;
}
</style>
