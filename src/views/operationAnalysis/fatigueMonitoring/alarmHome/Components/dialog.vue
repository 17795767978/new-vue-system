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
        <el-table-column property="busPlateNumber" label="车牌号" align="center" width="120"></el-table-column>
        <el-table-column property="driverNum" label="司机工号" width="150" align="center"></el-table-column>
        <el-table-column property="driverName" label="司机" width="120" align="center"></el-table-column>
        <el-table-column property="devCode" label="设备编号" width="150" align="center"></el-table-column>
        <el-table-column property="warnTypeName" label="报警类型" width="100" align="center"></el-table-column>
        <el-table-column property="warnTime" label="报警时间" :formatter="formatter"  width="300" align="center"></el-table-column>
        <el-table-column property="speed" label="报警车速（KM/H）" align="center"  width="150"></el-table-column>
        <el-table-column property="handleResult" width="100" label="处理状态" align="center">
          <template slot-scope="scope">
          <span  v-if="scope.row.handleResult === '0'">未处理</span>
          <span  v-else-if="scope.row.handleResult === '1'">已处理</span>
          <span v-else>误报</span>
          <!-- <template slot-scope="scope">
            <el-button v-if="scope.row.handleResult === '0'" type="danger" size="mini" @click="goToSucc(scope.row)">未处理</el-button>
            <el-button v-if="scope.row.handleResult === '1'" type="success" size="mini" plain>已处理</el-button>
          </template> -->
          </template>
        </el-table-column>
        <el-table-column property="name" label="查看详情" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="goToDetail(scope.row)">查看详情</el-button>
            <el-button :disabled="scope.row.handleResult !== '0'" type="success" size="mini" @click="goToSucc(scope.row, scope.$index)">处理</el-button>
          </template>
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
    </el-dialog>
    <el-dialog
      title="处理操作"
      :visible.sync="checkDialog"
      width="30%"
      center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="处理状态" prop="status">
          <el-select v-model="ruleForm.status">
            <el-option
              v-for="item in checkOptions.slice(1)"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理意见" prop="suggestion">
          <el-input type="textarea" v-model="ruleForm.suggestion"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkDialog = false">取 消</el-button>
        <el-button type="primary" @click="upDateCheck">确认</el-button>
      </span>
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
      total: 0,
      checkDialog: false,
      closeRow: null,
      ruleForm: {
        status: '',
        suggestion: ''
      },
      checkMsg: {},
      rules: {
        status: [
          { required: true, message: '请选择处理状态', trigger: 'blur' }
        ],
        suggestion: [
          { required: true, message: '请填写处理意见', trigger: 'blur' }
        ]
      },
      checkOptions: [
        {
          value: '0',
          label: '未处理'
        },
        {
          value: '1',
          label: '已处理'
        },
        {
          value: '2',
          label: '误报'
        }
      ]
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
        this.selectAllData = this.tableData
        this.total = this.selectAllData.length
        this.handleCurrentChange(this.pageNumber)
      }
    },
    echartsData: {
      deep: true,
      handler (newV) {
        this.chartData = newV
        this.selectAllData = this.chartData
        this.total = this.selectAllData.length
        this.handleCurrentChange(this.pageNumber)
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
    },
    'ruleForm.status': {
      handler (newV) {
        if (newV === '1') {
          this.ruleForm.suggestion = '属实'
        } else if (newV === '2') {
          this.ruleForm.suggestion = '误报'
        } else {
          this.ruleForm.suggestion = ''
        }
      }
    }
  },
  methods: {
    goToDetail (data) {
      const type = data.warnType === 'OVERSPEED' ? 'overspeed' : 'normal'
      this.$router.push({
        path: '/fatigue-monitoring/alarm-content',
        query: {
          id: data.warnUuid,
          type
        }
      })
    },
    goToSucc (row, index) {
      // this.$api['tiredMonitoring.wsUpdate']({
      //   warnUuid: row.warnUuid,
      //   handleResult: '1'
      // }).then(res => {
      //   this.$message.success('已处理')
      //   row.handleResult = '1'
      // })
      this.closeRow = index + (this.pageNumber - 1) * 15
      this.checkMsg.warnUuid = row.warnUuid
      this.checkDialog = true
      this.ruleForm = {
        status: '',
        suggestion: ''
      }
    },
    upDateCheck () {
      this.$api['tiredMonitoring.wsUpdate']({
        warnUuid: this.checkMsg.warnUuid,
        handleResult: this.ruleForm.status,
        handleSuggestion: this.ruleForm.suggestion
      }).then(res => {
        this.$message.success('已处理')
        this.checkDialog = false
        if (this.isSee.dataType === 'ws') {
          this.wsData.splice(this.closeRow, 1)
          this.selectAllData = this.wsData
          this.total = this.selectAllData.length
          this.handleCurrentChange(this.pageNumber)
        } else if (this.isSee.dataType === 'table') {
          this.selectAllData = this.tableData
          this.total = this.selectAllData.length
          this.handleCurrentChange(this.pageNumber)
          this.$emit('updateTable', 'table')
        } else if (this.isSee.dataType === 'charts') {
          this.selectAllData = this.chartData
          this.total = this.selectAllData.length
          this.handleCurrentChange(this.pageNumber)
          this.$emit('updateTable', 'charts')
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
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
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-dialog__headerbtn {
  font-size: 36px;
}
</style>
