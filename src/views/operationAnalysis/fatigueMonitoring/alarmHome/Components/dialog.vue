<template>
  <div class="dialog">
    <el-dialog title="报警详情" :visible.sync="see" :fullscreen="true" :modal="false">
      <el-table :data="selectData" border size="mini">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column property="orgName" label="所属公司" width="120" align="center"></el-table-column>
        <el-table-column property="lineName" label="所属线路" width="120" align="center"></el-table-column>
        <el-table-column property="busNumber" label="车牌号" align="center"></el-table-column>
        <el-table-column property="driverNum" label="司机工号" width="150" align="center"></el-table-column>
        <el-table-column property="driverName" label="司机" width="120" align="center"></el-table-column>
        <el-table-column property="date" label="设备类型" width="100" align="center"></el-table-column>
        <el-table-column property="warnType" label="报警类型" width="100" align="center"></el-table-column>
        <el-table-column property="warnTime" label="报警时间"  width="200" align="center"></el-table-column>
        <el-table-column property="warnSpeed" label="报警车速（KM/H）" align="center"></el-table-column>
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
    </el-dialog>
  </div>
</template>

<script>
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
      selectData: [],
      see: false,
      wsData: [],
      tableData: [],
      chartData: []
    }
  },
  watch: {
    diaData: {
      deep: true,
      handler (newV) {
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
        console.log(newV)
        this.chartData = newV
      }
    },
    isSee: {
      deep: true,
      handler (newV) {
        if (newV.is) {
          this.see = true
        }
        if (newV.dataType === 'ws') {
          this.selectData = this.wsData
        } else if (newV.dataType === 'table') {
          this.selectData = this.tableData
        } else if (newV.dataType === 'charts') {
          this.selectData = this.chartData
        }
      }
    },
    see (newV) {
      if (!newV) {
        this.$emit('close', this.selectData)
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
    }
  }
}
</script>

<style scoped lang="scss">

</style>
