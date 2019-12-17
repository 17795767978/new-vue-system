<template>
  <div class="alarm-table">
    <el-row class="title-box">
      <el-button type="success" @click="AddAlarm">{{title}}</el-button>
    </el-row>
    <headerNav v-show="hasHeaderNav"></headerNav>
    <tableWrapper
      :table-data="tableData"
      :table-key="cloumns"
      @handleClick="handleClick"
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
    <dialogWrapper v-if="dialogFormVisible" @close="dialogFormVisible=false" :rowData="rowData" :title="title" @updateTable="updateTable" ref="formName"></dialogWrapper>
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
      currentPage: 1,
      dialogFormVisible: false,
      title: '参数设置',
      hasHeaderNav: true,
      titleArr: ['参数设置', '参数下发'],
      cloumns: [],
      cloumnsList: [{
        prop: 'plUuid',
        label: '序号',
        width: 100,
        align: 'center'
      },
      {
        prop: 'plValue',
        label: '任务名称',
        width: 200,
        align: 'center'
      },
      {
        prop: 'plDisplay',
        label: '下发时间',
        width: 180,
        align: 'center'
      },
      {
        prop: 'plRemark',
        label: '备注',
        width: 100,
        align: 'center'
      },
      {
        prop: 'plSort',
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
        prop: 'plUuid',
        label: '序号',
        width: 100,
        align: 'center'
      },
      {
        prop: 'plValue',
        label: '车牌号',
        width: 200,
        align: 'center'
      },
      {
        prop: 'plDisplay',
        label: '编号',
        width: 180,
        align: 'center'
      },
      {
        prop: 'plRemark',
        label: '设备号',
        width: 100,
        align: 'center'
      },
      {
        prop: 'plSort',
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
    this._alarmManageTable({
      pageSize: 10,
      pageNum: this.currentPage
    })
    this.handleListChange(this.$route.name)
  },
  mounted () {
  },
  watch: {
    '$route' (to, from) {
      this.handleListChange(to.name)
    }
  },
  methods: {
    _alarmManageTable (params) {
      this.$api['tiredMonitoring.getWarnTypeList'](params).then(res => {
        return this.getList(res)
      })
    },
    getList (res) {
      let tableArr = res.list
      this.tableData = tableArr.sort((prev, next) => next.plSort - prev.plSort)
      this.total = res.total
    },
    handleBan (row) {
      this.$api['tiredMonitoring.warntypeIsvalid']({
        plUuid: row.plUuid,
        plIsvalid: 1
      }).then(res => {
        this._alarmManageTable({
          pageSize: 10,
          pageNum: this.currentPage
        })
      })
    },
    handleOpen (row) {
      this.$api['tiredMonitoring.warntypeIsvalid']({
        plUuid: row.plUuid,
        plIsvalid: 0
      }).then(res => {
        this._alarmManageTable({
          pageSize: 10,
          pageNum: this.currentPage
        })
      })
    },
    handleClick (row) {
      this.cloumns = this.cloumnsDetail
      this.$router.push({
        name: 'parameterSetting',
        query: {
          id: row.plUuid
        }
      })
    },
    AddAlarm () {
      this.dialogFormVisible = true
      this.rowData = {}
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this._alarmManageTable({
        pageSize: 10,
        pageNum: this.currentPage
      })
    },
    updateTable () {
      this._alarmManageTable({
        pageSize: 10,
        pageNum: this.currentPage
      })
    },
    handleListChange (name) {
      if (name === 'deviceParameter') {
        this.cloumns = this.cloumnsList
        this.hasHeaderNav = true
        this.title = this.titleArr[0]
      } else {
        this.cloumns = this.cloumnsDetail
        this.hasHeaderNav = false
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
