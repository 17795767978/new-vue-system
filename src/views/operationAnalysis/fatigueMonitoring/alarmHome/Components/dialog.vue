<template>
  <div class="dialog">
    <el-dialog title="报警详情" :visible.sync="see" :fullscreen="true" :modal="false">
      <el-table :data="selectData" border size="mini">
        <el-table-column type="index" label="序号" width="80" align="center">
          <template slot-scope="scope">
            <span> {{scope.$index + (pageNumber - 1) * pageSize + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column property="orgName" label="所属公司" width="120" align="center"></el-table-column>
        <el-table-column property="lineName" label="所属线路" width="120" align="center"></el-table-column>
        <el-table-column property="busPlateNumber" label="车牌号" align="center"></el-table-column>
        <el-table-column property="driverNum" label="司机工号" width="150" align="center"></el-table-column>
        <el-table-column property="driverName" label="司机" width="120" align="center"></el-table-column>
        <el-table-column property="devCode" label="设备编号" width="100" align="center"></el-table-column>
        <el-table-column property="warnTypeName" label="报警类型" width="100" align="center"></el-table-column>
        <el-table-column property="warnTime" label="报警时间" :formatter="formatter"  width="200" align="center"></el-table-column>
        <el-table-column property="speed" label="报警车速（KM/H）" align="center"></el-table-column>
        <el-table-column property="name" label="查看详情" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="goToDetail(scope.row)">查看详情</el-link>
          </template>
        </el-table-column>
        <el-table-column property="address" label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.handleResult === '0'" type="danger" size="mini" @click="goToSucc(scope.row)">未处理</el-button>
            <el-button v-if="scope.row.handleResult === '1'" type="success" size="mini" plain>已处理</el-button>
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
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    diaData: {
      type: Array
    },
    isSee: {
      type: Object
    },
    clickData: {
      type: Array
    },
    echartsData: {
      type: Array
    }
  },
  data () {
    return {
      selectAllData: [],
      selectData: [],
      see: false,
      wsData: [],
      tableData: [],
      chartData: [],
      pageNumber: 1,
      pageSize: 15,
      total: 0
    }
  },
  watch: {
    diaData: {
      deep: true,
      handler (newV) {
        console.log(newV)
        this.wsData = newV
      }
    },
    clickData: {
      deep: true,
      handler (newV) {
        this.tableData = newV
      }
    },
    echartsData: {
      deep: true,
      handler (newV) {
        this.chartData = newV
      }
    },
    isSee: {
      deep: true,
      handler (newV) {
        // console.log(newV.dataType)
        this.pageNumber = 1
        if (newV.is) {
          this.see = true
        }
        if (newV.dataType === 'ws') {
          this.selectAllData = this.wsData
          this.selectData = this.selectAllData.slice(0, this.pageSize)
          this.total = this.selectAllData.length
        } else if (newV.dataType === 'table') {
          this.selectAllData = this.tableData
          this.total = this.selectAllData.length
          this.selectData = this.selectAllData.slice(0, this.pageSize)
        } else if (newV.dataType === 'charts') {
          this.selectAllData = this.chartData
          this.selectData = this.selectAllData.slice(0, this.pageSize)
          this.total = this.selectAllData.length
        }
      }
    },
    see (newV) {
      if (!newV) {
        this.$emit('close', this.selectAllData)
      }
    }
  },
  methods: {
    goToDetail (data) {
      console.log(data.warnUuid)
      this.$router.push({
        path: '/fatigue-monitoring/alarm-content',
        query: {
          id: data.warnUuid
        }
      })
    },
    goToSucc (row) {
      this.$api['tiredMonitoring.wsUpdate']({
        warnUuid: row.warnUuid,
        handleResult: '1'
      }).then(res => {
        this.$message.success('已处理')
        row.handleResult = '1'
      })
      console.log(row)
    },
    formatter (row) {
      return moment(row.warnTime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      if (val === Math.ceil(this.total / this.pageSize)) {
        this.selectData = this.selectAllData.slice((val - 1) * this.pageSize, this.total + 1)
      } else {
        this.selectData = this.selectAllData.slice((val - 1) * this.pageSize, val * this.pageSize)
      }

      console.log(val)
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-dialog__headerbtn {
  font-size: 36px;
}
</style>
