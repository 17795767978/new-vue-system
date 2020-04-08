<template>
  <div v-loading="isLoading">
    <el-table
      :data="tableData"
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
        prop="warntime"
        align="center"
        label="报警时间"
        width="150"
        :formatter="getDate"
        >
      </el-table-column>
      <el-table-column
        prop="busnumber"
        align="center"
        label="车牌号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="drivernum"
        align="center"
        label="司机工号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="drivername"
        align="center"
        label="司机"
        width="100">
      </el-table-column>
      <el-table-column
        prop="linename"
        align="center"
        label="线路"
        width="150">
      </el-table-column>
      <el-table-column
        prop="orgname"
        align="center"
        label="总站"
        width="150">
      </el-table-column>
      <el-table-column label="驾驶行为监测报警台账" align="center">
        <el-table-column align="center" v-for="item in tableAlarmTypeTitle" :key="item.plvalue" :label="item.pldisplay">
          <el-table-column align="center" label="一级" :prop="item.level[0]">
            <template slot-scope="scope">
              {{scope.row[item.level[0]] === '0' ? '' : '√'}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="二级" :prop="item.level[1]">
            <template slot-scope="scope">
              {{scope.row[item.level[1]] === '0' ? '' : '√'}}
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right; margin-top: 1vh"
      background
      :current-page="pageNumber"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
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
    let defaultForm = this.formData
    let startTime = moment(yestoday - 24 * 60 * 60 * 1000).format('YYYY-MM-DD 00:00:00')
    let endTime = moment().format('YYYY-MM-DD 23:59:59')
    this._getDrivingBehaviorDay({
      orgId: this.userId === '1' ? '' : this.userId,
      lineId: '',
      startTime,
      endTime,
      busNumber: '',
      driverNum: '',
      warnTypes: defaultForm.warningArr,
      handleResults: [],
      pageNumber: 1,
      pageSize: 15 })
  },
  watch: {
    'selectData': {
      deep: true,
      handler (newV) {
        console.log(newV)
        let defaultForm = this.formData
        this.pageNumber = 1
        this._getDrivingBehaviorDay({
          orgId: newV.orgId === '1' ? '' : newV.orgId,
          lineId: newV.lineId,
          startTime: newV.startTime,
          endTime: newV.endTime,
          busNumber: newV.busNumber,
          driverNum: newV.driverNum,
          warnTypes: newV.warnTypeId.length === 0 ? defaultForm.warningArr : newV.warnTypeId,
          handleResults: newV.checkList,
          pageNumber: 1,
          pageSize: 15
        })
      }
    }
  },
  methods: {
    _getDrivingBehaviorDay (params) {
      this.isLoading = true
      this.$api['tiredMonitoring.getDrivingBehaviorDay'](params).then(res => {
        this.isLoading = false
        this.tableAlarmTypeTitle = res.columnData
        this.tableData = res.data.list
        this.total = res.data.total
      }).catch(err => {
        this.isLoading = false
        this.$message.error(err.msg)
      })
    },
    // 时间格式化
    getDate (row) {
      return moment(row.warntime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleCurrentChange (val) {
      console.log()
      this.pageNumber = val
      let defaultForm = this.formData
      if (Object.keys(this.selectData).length > 0) {
        this._getDrivingBehaviorDay({
          orgId: this.selectData.orgId === '1' ? '' : this.selectData.orgId,
          lineId: this.selectData.lineId,
          startTime: this.selectData.startTime,
          endTime: this.selectData.endTime,
          busNumber: this.selectData.busNumber,
          driverNum: this.selectData.driverNum,
          warnTypes: this.selectData.warnTypeId.length === 0 ? defaultForm.warningArr : this.selectData.warnTypeId,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          handleResults: this.selectData.checkList
        })
      } else {
        let yestoday = new Date()
        let defaultForm = this.formData
        let startTime = moment(yestoday - 24 * 60 * 60 * 1000).format('YYYY-MM-DD 00:00:00')
        let endTime = moment(yestoday).format('YYYY-MM-DD 23:59:59')
        this._getDrivingBehaviorDay({
          orgId: this.userId === '1' ? '' : this.userId,
          lineId: '',
          startTime,
          endTime,
          busNumber: '',
          driverNum: '',
          handleResults: [],
          warnTypes: defaultForm.warningArr,
          pageNumber: this.pageNumber,
          pageSize: 15 })
      }
      // this._passengerFlow({ ...this.selectData }, this.selectData.radio)
    }
  }
}
</script>

<style>

</style>
