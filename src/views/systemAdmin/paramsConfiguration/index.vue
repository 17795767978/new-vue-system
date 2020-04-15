<template>
  <div>
    <!-- <header-breadcrumb :breadData="$route.matched" /> -->
    <!-- <nav-button>
      <el-button-group>
        <nav-premisson-button :comp="comp" :buttonData="buttonData"></nav-premisson-button>
      </el-button-group>
    </nav-button> -->
      <el-button-group>
        <el-button icon="el-icon-plus" @click="handleAdd" size="small">新建</el-button>
        <!-- <el-button icon="fdddfont icon-delete" :disabled="!selectRow.length" @click="batchRemove">删除</el-button> -->
      </el-button-group>
    <!-- 查询 -->
      <params-conf-search class="search" @search="queryList" @rest="rest"/>
    <!-- 用户列表 -->
      <el-table
        style="width: 95%; margin: 0 auto"
        border
        ref="paramsTable"
        height="65vh"
        stripe
        v-loading="isListLoading"
        size="mini"
        :data="tableData">
        <!-- <el-table-column align="center" type="selection" width="30"></el-table-column> -->
        <el-table-column align="center" prop="index" label="序号">
          <template slot-scope="scope">
            <span> {{scope.$index + (pagination.pageNumber - 1) * pagination.pageSize + 1}} </span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="paramName" label="参数名称"></el-table-column> -->
        <el-table-column align="center" prop="paramName" label="参数编码"></el-table-column>
        <el-table-column align="center" prop="paramValue" label="参数值"></el-table-column>
        <el-table-column align="center" prop="paramIsvalid" label="启/禁用">
        <template slot-scope="scope" >
          <el-tag v-if="scope.row.paramIsvalid === '1'" type="success" @click="handleType('paramIsvalidStatus')">启用</el-tag>
          <el-tag v-if="scope.row.paramIsvalid === '0'" type="danger" @click="handleType('paramIsvalidStatus')">禁用</el-tag>
        </template>
        </el-table-column>
        <el-table-column align="center" prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click.stop="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini"  type="danger" @click.stop="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination  background   layout="total, prev, pager, next"
        style="float: right; margin-top: 1.5vh;margin-right: 2%"
        :current-page.sync="pagination.pageNumber"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @current-change="changePage"
      ></el-pagination>
    <!-- 参数新建/修改 -->
    <params-update
      :show.sync="isShowParamsDialog"
      :paramsData.sync="editParams"
      :isCreate="isCreate"
      @updateList="queryList"
    />

  </div>
</template>
<script>
// 自定义组件
// import NavButton from '@/components/navButton'
// import NavPremissonButton from '@/components/navButton/navPremissonButton'
import ParamsConfSearch from './Components/search'
import ParamsUpdate from './Components/paramsUpdate'
import mixinsTime from '@/mixins/global/'
// api
// import { paramsListGet, paramsDelete } from '@/api/systemparams'
export default {
  name: 'paramsConfiguration',
  components: { ParamsConfSearch, ParamsUpdate },
  mixins: [mixinsTime],
  data () {
    return {
      comp: this,
      buttonData: [],
      tableData: [],
      selectRow: [], // 列表选中列
      editParams: {}, // 需要编辑的参数对象
      isShowParamsDialog: false, // 新建/编辑窗口打开状态
      isListLoading: false, // 列表加载
      isCreate: true, // 编辑窗口展示新建or编辑
      pagination: { // 翻页数据
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      searchParams: {} // 查询参数
    }
  },
  activated () {
    this.$refs.paramsTable.doLayout()
  },
  methods: {
    // 查询和初始化查询
    // 查询/翻页公用方法
    queryList (params) {
      const searchParams = this.searchParams = params
      this.getParamsList(
        {
          ...searchParams,
          pageNumber: this.pagination.pageNumber,
          pageSize: this.pagination.pageSize
        }
      )
    },
    // 获取列表
    getParamsList (params) {
      this.isListLoading = true
      this.$api['wholeInformation.paramsListGet'](params).then(res => {
        this.tableData = res.list
        this.pagination.total = res.total
        this.pagination.pageNumber = res.pageNum
        this.pagination.pageSize = res.pageSize
        this.isListLoading = false
      })
    },
    rest (params) {
      const searchParams = this.searchParams = params
      this.getParamsList(
        {
          ...searchParams,
          pageNumber: 1,
          pageSize: this.pagination.pageSize
        }
      )
    },
    // 显示编辑界面
    handleEdit (index, row) {
      this.isCreate = false
      this.editParams = row
      this.isShowParamsDialog = true
    },
    // 显示新增界面
    handleAdd () {
      this.isCreate = true
      this.isShowParamsDialog = true
    },
    // 单行删除
    handleDel (index, row) {
      this.$confirm('确认删除该参数吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.paramsDeletes({ sysUuid: row.sysUuid })
      }).catch(() => {})
    },
    // 批量删除
    batchRemove () {
      this.$confirm('确认删除选中的参数吗？', '提示', {
        type: 'warning'
      }).then(() => {
        let paramIds = []
        this.selectRow.map(row => paramIds.push(row.id))
        this.isListLoading = true
        this.paramsDeletes(paramIds).then(() => {
          this.isListLoading = false
        })
      }).catch(() => {})
    },
    // 删除接口方法
    paramsDeletes (paramIds) {
      return this.$api['wholeInformation.paramsDelete'](paramIds).then((res) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.queryList()
      })
    },
    // 列表翻页
    changePage (pageNumber) {
      this.pagination.pageNumber = pageNumber
      this.getParamsList({ pageNumber: this.pagination.pageNumber, pageSize: this.pagination.pageSize })
    },
    // 生成列表序号
    indexMethod (index) {
      return (index + 1) + (this.pagination.pageNumber - 1) * this.pagination.pageSize
    }
  }
}
</script>
