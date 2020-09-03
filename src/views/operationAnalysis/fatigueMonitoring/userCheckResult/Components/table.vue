<template>
  <div v-loading="isLoading">
    <el-table
      :data="tableData"
      border
      height="72vh"
      size="mini"
      style="width: 100%">
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="80">
        <template slot-scope="scope">
          <span> {{scope.$index + (pageNumber - 1) * pageSize + 1}} </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="userName"
        align="center"
        label="用户名"
        >
      </el-table-column>
      <el-table-column
        prop="alarmSum"
        align="center"
        label="应处理报警总数">
      </el-table-column>
      <el-table-column
        prop="processed"
        align="center"
        label="已处理">
      </el-table-column>
      <el-table-column
        prop="untreated"
        align="center"
        label="未处理">
      </el-table-column>
      <el-table-column
        prop="processedErro"
        align="center"
        label="已处理误差">
      </el-table-column>
      <el-table-column
        prop="falseAlarmErro"
        align="center"
        label="误报误差">
      </el-table-column>
      <el-table-column
        prop="untreatedRatio"
        align="center"
        label="未处理占比">
      </el-table-column>
      <el-table-column
        prop="errorRatio"
        align="center"
        label="误差占比">
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      style="float: right; margin-top: 1vh"
      background
      :current-page="pageNumber"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next"
      :page-size="pageSize"
      :total="total">
    </el-pagination> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  props: {
    selectData: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(['formData', 'userId'])
  },
  data () {
    return {
      tableAlarmTypeTitle: [],
      tableData: [],
      pageNumber: 1,
      pageSize: 15,
      total: 0,
      isLoading: false
    }
  },
  created () {
    let yestoday = new Date()
    let startTime = moment(yestoday - 7 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
    let endTime = moment().format('YYYY-MM-DD')
    let dataForm = this.$store.getters.formData
    this._getDrivingBehaviorDay({
      userId: sessionStorage.getItem('id'),
      warnTypes: dataForm.warningArr,
      startTime,
      endTime })
  },
  watch: {
    'selectData': {
      deep: true,
      handler (newV) {
        let dataForm = this.$store.getters.formData
        this.pageNumber = 1
        this._getDrivingBehaviorDay({
          userId: sessionStorage.getItem('id'),
          startTime: newV.dateArray[0],
          endTime: newV.dateArray[1],
          warnTypes: dataForm.warningArr
        })
      }
    }
  },
  methods: {
    _getDrivingBehaviorDay (params) {
      this.isLoading = true
      this.$api['tiredMonitoring.getAlarmHandleAnalysis'](params).then(res => {
        this.tableData = []
        this.isLoading = false
        res.forEach((item, index) => {
          this.tableData[index] = item
          this.tableData[index].untreatedRatio = Number(item.alarmSum) ? `${(Number(item.untreated) / Number(item.alarmSum) * 100).toFixed(2)}%` : 0
          this.tableData[index].errorRatio = Number(item.processed) ? `${((Number(item.processedErro) + Number(item.falseAlarmErro)) / Number(item.processed) * 100).toFixed(2)}%` : 0
        })
      })
    },
    // 时间格式化
    getDate (row) {
      return moment(row.warntime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      if (Object.keys(this.selectData).length > 0) {
        this._getDrivingBehaviorDay({
          userId: this.selectData.user,
          startTime: this.selectData.dateArray[0],
          endTime: this.selectData.dateArray[1],
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        })
      } else {
        let yestoday = new Date()
        let startTime = moment(yestoday - 7 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
        let endTime = moment(yestoday).format('YYYY-MM-DD')
        this._getDrivingBehaviorDay({
          userId: '',
          lineId: '',
          startTime,
          endTime })
      }
      // this._passengerFlow({ ...this.selectData }, this.selectData.radio)
    }
  }
}
</script>

<style>

</style>
