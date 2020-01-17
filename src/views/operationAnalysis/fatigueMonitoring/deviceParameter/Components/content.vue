<template>
  <div class="alarm-table">
    <el-row class="title-box">
      <el-button type="success" @click="AddTask">{{title}}</el-button>
    </el-row>
    <headerNav :isDeviceParameter="isDeviceParameter" @configCheck="configCheck"></headerNav>
    <tableWrapper
      :table-data="tableData"
      :table-key="cloumns"
      :currentPage="currentPage"
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
import dialogWrapper from './dialog'
import headerNav from './header'
import tableWrapper from './table'
export default {
  name: 'deviceContent',
  data () {
    return {
      total: 0,
      tableData: [],
      rowData: {},
      id: '',
      selectData: {},
      currentPage: 1,
      dialogFormVisible: false,
      title: '参数设置',
      isDeviceParameter: true,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultTreeData: [],
      loading: true,
      titleArr: ['参数设置', '参数补发'],
      cloumns: [],
      cloumnsList: [
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
      cloumnsDetail: [
        {
          prop: 'orgName',
          label: '所属机构',
          align: 'center'
        },
        {
          prop: 'lineName',
          label: '所属线路',
          align: 'center'
        },
        {
          prop: 'busPlateNumber',
          label: '车牌号',
          align: 'center'
        },
        {
          prop: 'busSelfCode',
          label: '编号',
          align: 'center'
        },
        {
          prop: 'devCode',
          label: '设备号',
          width: 100,
          align: 'center'
        },
        {
          prop: 'devOnlineStatus',
          label: '在线状态',
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
    this.id = this.$route.query.id
    this.handleListChange(this.$route.name, this.id)
  },
  mounted () {
  },
  watch: {
    '$route' (to, from) {
      this.currentPage = 1
      this.handleListChange(to.name, this.id)
    }
  },
  methods: {
    configCheck (data) {
      this.selectData = data
      this.updateTable()
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
      this.id = row.taskUuid
      this.$router.push({
        name: 'parameterSetting',
        query: {
          id: this.id
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
      val.map((item) => {
        arr.push({
          devUuid: item.devUuid,
          devCode: item.devCode
        })
      })
      this.rowData.devList = arr
    },
    updateTable () {
      if (this.isDeviceParameter) {
        this.getTaskPageList({
          taskName: this.selectData.taskName,
          pageSize: 10,
          pageNum: this.currentPage
        })
      } else {
        this.getTaskDetailPage({
          taskUuid: this.id,
          pageSize: 10,
          taskStatus: this.selectData.taskStatus,
          pageNum: this.currentPage
        })
      }
    },
    handleListChange (name, taskUuid) {
      if (name === 'deviceParameter') {
        this.rowData.taskUuid = ''
        this.cloumns = this.cloumnsList
        this.$nextTick(() => {
          this.isDeviceParameter = true
        })
        this.title = this.titleArr[0]
        this.getOrgLineBusTree() // 获取结构树
        this.getTaskPageList({
          taskName: this.selectData.taskName,
          pageSize: 10,
          pageNum: this.currentPage
        })
      } else {
        this.cloumns = this.cloumnsDetail
        this.$nextTick(() => {
          this.isDeviceParameter = false
        })
        this.title = this.titleArr[1]
        this.rowData.taskUuid = taskUuid
        this.getTaskDetailPage({
          taskUuid: taskUuid,
          pageSize: 10,
          taskStatus: this.selectData.taskStatus,
          pageNum: this.currentPage
        })
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
