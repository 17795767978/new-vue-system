<template>
  <div class="table-wrapper" v-loading="loading">
    <el-table
      :data="tableData"
      element-loading-text="拼命加载中"
      border
      stripe
      size="small"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80"
      >
      <template slot-scope="scope">
        <span> {{scope.$index + (pageNumber - 1) * pageSize + 1}} </span>
      </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="orgName"
        label="机构"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="pfrLineName"
        label="线路"
        width="90">
      </el-table-column>
      <!-- prfGetPersonCount -->
      <el-table-column
        align="center"
        prop="prfBusPlateNumber"
        width="150"
        label="车辆">
      </el-table-column>
      <el-table-column
        align="center"
        width="60"
        label="方向">
        <template slot-scope="scope">
          {{scope.row.pfrLineType === 1 ? '上行' : '下行'}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="70"
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
        prop="pfrTripTime"
        label="趟次"
        width="60">
      </el-table-column>
      <el-table-column
        align="center"
        width="160"
        :formatter="gerDate"
        label="客流时间">
      </el-table-column>
      <el-table-column
        align="center"
        width="80"
        prop="prfGetPersonCount"
        label="车内人数">
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
      :disabled="isDisabled"
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
import { mapGetters } from 'vuex'
export default {
  props: {
    selectData: {
      type: Object
    },
    isUpdate: {
      type: Boolean
    },
    isDownLoad: {
      type: Boolean
    }
  },
  data () {
    return {
      tableData: [],
      total: 0,
      pageNumber: 1,
      pageSize: 15,
      downLoadData: [],
      loading: true,
      isDisabled: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted () {
    // let dataNow = new Date()
    // let endTime = dataNow.getTime() - 24 * 3600 * 1000
    // let timeStart = moment(endTime).format('YYYY-MM-DD 00:00:00')
    // let timeEnd = moment(endTime).format('YYYY-MM-DD 23:59:59')
    // this._passengerFlow({
    //   orgId: this.userId,
    //   lineId: '',
    //   lineType: '',
    //   busNumber: '',
    //   startTime: timeStart,
    //   endTime: timeEnd,
    //   pageSize: 15,
    //   pageNumber: this.pageNumber
    // })
    this.loading = false
    this.isDisabled = false
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
        this.pageNumber = 1
        this.selectData.pageNumber = this.pageNumber
        this.selectData.pageSize = 15
        let select = JSON.parse(JSON.stringify(this.selectData))
        if (this.selectData.orgId === '1') {
          select.orgId = ''
        }
        this._passengerFlow(select, this.selectData.radio)
        this.$emit('isUpdateTo')
      }
    },
    isDownLoad () {
      if (this.isDownLoad) {
        this.selectData.pageNumber = 1
        this.selectData.pageSize = 10000
        this.downLoadList(this.selectData)
        this.$emit('isDownLoadTo')
      }
    }
  },
  methods: {
    _passengerFlow (params, type) {
      this.loading = true
      this.isDisabled = true
      if (type === '1') {
        this.$api['passengerFlow.todayList'](params).then(res => {
          this.tableData = res.list
          this.total = res.total
          this.$message.success('数据已更新')
          this.loading = false
          this.isDisabled = false
        }).catch((error) => {
          this.$message.error(error.message)
          this.loading = false
          this.isDisabled = false
        })
      } else {
        this.$api['passengerFlow.list'](params).then(res => {
          this.tableData = res.list
          this.total = res.total
          this.$message.success('数据已更新')
          this.loading = false
          this.isDisabled = false
        }).catch((error) => {
          this.$message.error(error.message)
          this.loading = false
          this.isDisabled = false
        })
      }
    },
    downLoadList (params) {
      this.$emit('getData', [], 0)
      this.$api['passengerFlow.list'](params).then(res => {
        res.list.forEach((item, index) => {
          item.pfrUploadTime = moment(item.pfrUploadTime).format('YYYY-MM-DD HH:mm:ss')
          this.downLoadData[index] = {
            '机构名称': item.orgName,
            '线路': item.pfrLineName,
            '车辆': item.prfBusPlateNumber,
            '方向': item.pfrLineType === 1 ? '上行' : '下行',
            '站序': item.pfrStationSeq,
            '站点名称': item.pfrStationName,
            '趟次': item.pfrTripTime,
            '客流时间': item.pfrUploadTime,
            '车内人数': item.prfGetPersonCount,
            '上车人数': item.pfrGetOnNumber,
            '下车人数': item.pfrGetOffNumber,
            '前门上车人数': item.prfGetFOnNumber,
            '前门下车人数': item.prfGetFOffNumber,
            '后门上车人数': item.prfGetEOnNumber,
            '后门下车人数': item.prfGetEOffNumber
          }
        })
        if (this.total > 0) {
          this.$emit('getData', this.downLoadData, this.total)
        } else {
          this.$message.warning('暂无数据，无法导出')
        }
        // this.$message.success('数据已更新')
      })
    },
    gerDate (row) {
      return moment(row.pfrUploadTime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleCurrentChange (val) {
      this.selectData.pageNumber = val
      this.selectData.pageSize = 15
      this.pageNumber = val
      let select = JSON.parse(JSON.stringify(this.selectData))
      if (this.selectData.orgId === '1') {
        select.orgId = ''
      }
      this._passengerFlow(select, this.selectData.radio)
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
