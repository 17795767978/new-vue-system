<template>
  <div class="table-level">
     <el-table
      :data="tableData"
      size="mini"
      border
      style="width: 100%; overflow:auto"
      height="300px"
      >
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="60">
        <template slot-scope="scope">
          <span> {{scope.$index + (currentPage - 1) * pageSize + 1}} </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="busPlateNumber"
        label="车牌号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="warnLevel1Num"
        label="一级">
      </el-table-column>
      <el-table-column
        align="center"
        prop="warnLevel2Num"
        label="二级"
        >
      </el-table-column>
      <el-table-column
        align="center"
        prop="warnLevel3Num"
        label="三级"
        >
      </el-table-column>
      <el-table-column
        align="center"
        prop="total"
        label="总数"
        >
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right; margin-top: 20px;"
      background
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
    <span class="demonstration" style="float: right; margin-top: 20px; line-height: 36px;">共{{total}}条</span>
  </div>
</template>

<script type="type/ecmascript-6">
// import {alarmTableAna} from 'server/interface';
import { Pagination, Table } from 'element-ui'
import moment from 'moment'
export default {
  props: {
    selectData: {
      type: Object
    }
  },
  data () {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 10
    }
  },
  components: {
    'el-pagination': Pagination,
    'el-table': Table
  },
  created () {
    let start = new Date()
    let endTime = moment(start).format('YYYY-MM-DD 23:59:59')
    let startTime = moment(start - 3600 * 1000 * 24 * 7).format('YYYY-MM-DD 00:00:00')
    this._alarmTableAna({
      orgId: this.selectData.orgId,
      lineId: this.selectData.lineId,
      busPlateNumber: this.selectData.busPlateNumber,
      startTime,
      endTime,
      pageSize: 10,
      pageNum: this.currentPage
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler () {
        this._alarmTableAna({
          orgId: this.selectData.orgId,
          lineId: this.selectData.lineId,
          busPlateNumber: this.selectData.busPlateNumber,
          startTime: moment(this.selectData.valueTime[0]).format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment(this.selectData.valueTime[1]).format('YYYY-MM-DD HH:mm:ss'),
          pageSize: 10,
          pageNum: this.currentPage
        })
      }
    }
  },
  methods: {
    _alarmTableAna (params) {
      this.$api['tiredMonitoring.getWarnLevelList'](params).then(res => {
        this.tableData = res.list
        this.total = res.total
        this.tableData.forEach((item, index) => {
          item.total = Number(item.warnLevel1Num) + Number(item.warnLevel2Num) + Number(item.warnLevel3Num)
        })
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this._alarmTableAna({
        orgId: this.selectData.orgId,
        lineId: this.selectData.lineId,
        busPlateNumber: this.selectData.busPlateNumber,
        startTime: '',
        endTime: '',
        pageSize: 10,
        pageNum: this.currentPage
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-level {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #eeeeee;
  border-radius: 12px;
  height: 372px;
}
</style>
