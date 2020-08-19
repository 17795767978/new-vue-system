<template>
  <div>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      size="mini"
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
        prop="orgName"
        align="center"
        label="机构">
      </el-table-column>
      <el-table-column
        prop="pfrLineName"
        align="center"
        label="线路">
      </el-table-column>
      <el-table-column
        prop="prfBusPlateNumber"
        align="center"
        label="车辆">
      </el-table-column>
      <el-table-column
        prop="busSelfCode"
        align="center"
        label="自编号">
      </el-table-column>
      <el-table-column
        prop="prfDevCode"
        align="center"
        label="设备号">
      </el-table-column>
      <el-table-column
        prop="pfrGetOnNumber"
        align="center"
        label="上车人数">
      </el-table-column>
      <el-table-column
        prop="pfrGetOffNumber"
        align="center"
        label="下车人数">
      </el-table-column>
      <el-table-column
        prop="pfrpassengerDif"
        align="center"
        label="上下车客流差值">
        <!-- <template slot-scope="scope">
          <span>{{scope.row.pfrpassengerDif}}%</span>
        </template> -->
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right; margin-top: 20px;"
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
  data () {
    return {
      tableData: [],
      pageNumber: 1,
      pageSize: 15,
      total: 0,
      loading: false,
      tableAllData: []
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted () {
    let dateBefore = moment().format('YYYY-MM-DD 00:00:00')
    let dateAfter = moment().format('YYYY-MM-DD 23:59:59')
    this._pageBusPersonTotalList({
      orgId: this.userId === '1' ? '' : this.userId,
      lineId: '',
      busNumber: '',
      isHistory: '1',
      startTime: dateBefore,
      endTime: dateAfter,
      busSelfCode: ''
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.pageNumber = 1
        this._pageBusPersonTotalList({
          orgId: newV.orgId === '1' ? '' : newV.orgId,
          lineId: newV.lineId,
          busNumber: newV.busNumber,
          isHistory: newV.isHistory,
          startTime: moment(newV.startTime).format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment(newV.endTime).format('YYYY-MM-DD HH:mm:ss'),
          busSelfCode: newV.busSelfCode
        })
      }
    }
  },
  methods: {
    _pageBusPersonTotalList (params) {
      this.loading = true
      this.$api['passengerFlow.pageBusPersonTotalList'](params).then(res => {
        console.log(res)
        this.loading = false
        this.tableAllData = res
        this.tableData = this.tableAllData.slice(0, 15)
        this.total = this.tableAllData.length
        this.pageNumber = 1
      })
    },
    // format (data) {
    //   let dataFormat = []
    //   data.forEach(item => {
    //     let pfrpassengerDifNum
    //     if (item.getOnNumber > 0) {
    //       pfrpassengerDifNum = Math.abs(`${((item.getOnNumber - item.getOffNumber) / item.getOnNumber * 100).toFixed(2)}`)
    //       dataFormat.push(Object.assign({ pfrpassengerDif: pfrpassengerDifNum }, item))
    //     } else {
    //       dataFormat.push(Object.assign({ pfrpassengerDif: '0' }, item))
    //     }
    //   })
    //   dataFormat = dataFormat.sort((prev, next) => next.pfrpassengerDif - prev.pfrpassengerDif)
    //   return dataFormat
    // },
    handleCurrentChange (val) {
      this.pageNumber = val
      this.tableData = this.tableAllData.slice((val - 1) * this.pageSize, val * this.pageSize)
    }
  }
}
</script>

<style>
</style>
