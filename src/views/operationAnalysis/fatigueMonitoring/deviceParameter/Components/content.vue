<template>
  <div class="alarm-table">
    <el-row class="title-box">
      <el-button type="success" @click="AddTask">{{title}}</el-button>
    </el-row>
    <headerNav v-show="isDeviceParameter" @configCheck="configCheck"></headerNav>
    <tableWrapper
      :table-data="tableData"
      :table-key="cloumns"
      :isDeviceParameter="isDeviceParameter"
      @handleClick="handleClick"
      @handleSelectionChange="handleSelectionChange"
      />
    <div class="block">
      <el-pagination
        class="pagination-box"
        background
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
      <span class="demonstration">共{{total}}条</span>
    </div>
    <dialogWrapper
      v-if="dialogFormVisible"
      :isDeviceParameter="isDeviceParameter"
      @close="dialogFormVisible=false"
      :rowData="rowData"
      :loading="loading"
      :treeData="treeData"
      :title="title"
      :defaultProps="defaultProps"
      :defaultTreeData="defaultTreeData"
      @updateTable="updateTable"
      ref="formName"></dialogWrapper>
  </div>
</template>

<script type="text/ecmascript-6">
import dialogWrapper from './Dialog'
import headerNav from './Header'
import tableWrapper from './Table'
export default {
  name: 'deviceContent',
  data () {
    return {
      total: 0,
      tableData: [],
      rowData: {},
      currentPage: 1,
      dialogFormVisible: false,
      title: '参数设置',
      isDeviceParameter: true,
      taskName: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultTreeData: [],
      loading: true,
      titleArr: ['参数设置', '参数补发'],
      cloumns: [],
      cloumnsList: [{
        prop: 'taskUuid',
        label: '序号',
        width: 100,
        align: 'center'
      },
      {
        prop: 'taskName',
        label: '任务名称',
        width: 200,
        align: 'center'
      },
      {
        prop: 'taskCreateTime',
        label: '下发时间',
        width: 180,
        align: 'center'
      },
      {
        prop: 'remark',
        label: '备注',
        width: 100,
        align: 'center'
      },
      {
        prop: 'taskIssueNum',
        label: '下发数量',
        width: 100,
        align: 'center'
      },
      {
        label: '操作',
        width: 100,
        align: 'center'
      }],
      cloumnsDetail: [{
        prop: 'taskDetailUuid',
        label: '序号',
        width: 100,
        align: 'center'
      },
      {
        prop: 'busPlateNumber',
        label: '车牌号',
        width: 200,
        align: 'center'
      },
      {
        prop: 'busSelfCode',
        label: '编号',
        width: 180,
        align: 'center'
      },
      {
        prop: 'devCode',
        label: '设备号',
        width: 100,
        align: 'center'
      },
      {
        prop: 'taskStatus',
        label: '状态',
        width: 100,
        align: 'center'
      }]
    }
  },
  components: {
    dialogWrapper,
    headerNav,
    tableWrapper
  },
  created () {
    let id = this.$route.query.id
    this.handleListChange(this.$route.name, id)
  },
  mounted () {
  },
  watch: {
    '$route' (to, from) {
      this.handleListChange(to.name, to.query.id)
    }
  },
  methods: {
    configCheck (data) {
      this.taskName = data.taskName
      this.getTaskPageList({
        taskName: this.taskName,
        pageSize: 10,
        pageNum: this.currentPage
      })
    },
    getTaskPageList (params) {
      this.$api['tiredMonitoring.getTaskPageList'](params).then(res => {
        return this.getList(res)
      })
    },
    getOrgLineBusTree () {
      this.$api['tiredMonitoring.getOrgLineBusTree']().then(res => {
        this.treeData = res
        this.loading = false
      })
    },
    getTaskDetailPage (params) {
      this.$api['tiredMonitoring.getTaskDetailPage'](params).then(res => {
        return this.getList(res)
      })
    },
    getList (res) {
      let tableArr = res.list
      this.tableData = tableArr.sort((prev, next) => next.plSort - prev.plSort)
      this.total = res.total
    },
    handleClick (row) {
      this.cloumns = this.cloumnsDetail
      this.$router.push({
        name: 'parameterSetting',
        query: {
          id: row.taskUuid
        }
      })
    },
    AddTask () {
      this.dialogFormVisible = true
      if (!this.isDeviceParameter && !this.rowData.devList.length) {
        this.handleSelectionChange(this.tableData)
      }
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.updateTable()
    },
    handleSelectionChange (val) {
      let arr = []
      val.map((item)=> {
        if (item.taskStatus === '0') {
          arr.push({
            devUuid: item.devUuid,
            devCode: item.devCode
          })
        }
      })
      this.rowData.devList = arr
    },
    updateTable () {
      if (this.isDeviceParameter) {
        this.getTaskPageList({
          pageSize: 10,
          pageNum: this.currentPage
        })
      } else {
        this.getTaskDetailPage({
          taskUuid: this.$route.query.id,
          pageSize: 10,
          pageNum: this.currentPage
        })
      }
    },
    handleListChange (name, taskUuid) {
      if (name === 'deviceParameter') {
        this.getOrgLineBusTree() // 获取结构树
        this.getTaskPageList({
          taskName: this.taskName,
          pageSize: 10,
          pageNum: this.currentPage
        })
        this.rowData.taskUuid = ''
        this.cloumns = this.cloumnsList
        this.isDeviceParameter = true
        this.title = this.titleArr[0]
      } else {
        this.rowData.taskUuid = taskUuid
        this.getTaskDetailPage({
          taskUuid: taskUuid,
          pageSize: 10,
          pageNum: this.currentPage
        })
        this.cloumns = this.cloumnsDetail
        this.isDeviceParameter = false
        this.title = this.titleArr[1]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.alarm-table {
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}
.title-box {
  margin-bottom: 20px;
}
.demonstration {
  float: right;
  margin-top: 20px;
  line-height: 36px;
}
.pagination-box {
  float: right;
  margin-top: 20px;
}
</style>
