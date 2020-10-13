<template>
  <div>
    <!-- 面包屑 -->
    <!-- <header-breadcrumb :breadData="$route.matched" /> -->
      <!-- <el-button-group>
      <nav-premisson-button :comp="comp" :buttonData="buttonData"></nav-premisson-button>
      </el-button-group> -->
      <!--<el-button-group>-->
        <!-- <el-button icon="fdddfont icon-add-new" @click="handleAdd">新建</el-button> -->
        <!--<el-button icon="fdddfont icon-delete" :disabled="!selectRow.length" @click="batchRemove">删除</el-button>-->
        <el-button-group>
          <el-button icon="fdddfont icon-shujudaoru" size="mini" @click="exportsFile">导入</el-button>
          <el-button icon="fdddfont icon-shujudaoru" size="mini" @click="exportsLog">导入日志查看</el-button>
        </el-button-group>
      <!--</el-button-group>-->
    <!-- 查询 -->
    <!-- <bus-management-search ref="searchList" class="search" :isClearSearch="isClearSearch" @search="queryList" @rest="rest"/> -->
    <Search
      isOrg
      isLine
      isBus
      isBusSelfCode
      isEmpty
      @configCheck="getSearch"
    />
    <!-- 车辆列表 -->
    <div style="margin-top: 5vh; padding: 0 1vh; box-sizing:border-box">
          <el-table
            size="mini"
            ref="roleTable"
            height="60vh"
            border
            stripe
            v-loading="isListLoading"
            :data="tableData"
            @selection-change="selected => selectRow = selected">
            <!-- <el-table-column type="selection" min-width="30"></el-table-column> -->
            <el-table-column type="index" :index="indexMethod" align="center" label="序号" width="70"></el-table-column>
            <el-table-column prop="orgName" label="所属机构" min-width="140" align="center"></el-table-column>
            <el-table-column prop="lineName" label="所属线路" align="center">
              <template slot-scope="scope">
                <el-tooltip
                  placement="bottom-end"
                  :enterable="false"
                  :content="scope.row.lineName"
                >
                  <div class="table-inline">{{scope.row.lineName}}</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="busPlateNumber" align="center" label="车牌号" width="120"></el-table-column>
            <el-table-column label="车辆自编号" align="center" min-width="100">
              <template slot-scope="scope">{{scope.row.busSelfCode || '' || null}}</template>
            </el-table-column>
            <!--<el-table-column prop="busDevUuid" label="设备编号" min-width="140">-->
              <!--<template slot-scope="scope">-->
                <!--<el-tooltip-->
                  <!--placement="bottom-end"-->
                  <!--:enterable="false"-->
                  <!--:content="scope.row.devCode"-->
                <!--&gt;-->
                  <!--<div class="table-inline">{{scope.row.busDevUuid || '' || null}}</div>-->
                <!--</el-tooltip>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="devNum" align="center" label="挂接设备数" width="100">
              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  trigger="click">
                  <el-table :data="popTableData">
                    <el-table-column property="devClassName" label="设备类型" width="150"></el-table-column>
                    <el-table-column property="devCode" label="设备号" width="200"></el-table-column>
                  </el-table>
                  <el-button type="text" size="mini" slot="reference" @click="searchDev(scope.$index, scope.row)">
                    {{scope.row.devNum}}
                  </el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column align="center" label="启禁状态" min-width="70">
              <template slot-scope="scope">{{scope.row.busIsvalid === '0' ? '禁用':'启用'}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="busCreateTime" label="更新时间" :formatter="formatCreateDate"
                             min-width="180"></el-table-column>
            <!-- <el-table-column align="center" prop="busCreateUser" label="更新人" min-width="100">
              <template slot-scope="scope">{{scope.row.busCreateUser || '' || null}}</template>
            </el-table-column> -->

            <el-table-column align="center" label="操作" min-width="180">
              <template slot-scope="scope">
                <el-button size="mini" type="primary"
                           @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <!-- <el-button size="mini" round icon="fdddfont icon-delete"
                           @click.stop="handleDel(scope.$index, scope.row)"></el-button> -->
              </template>
            </el-table-column>
          </el-table>
          </div>
          <el-pagination style="float: right; margin-top: 1vh" background layout="total, prev, pager, next"
                         :current-page.sync="pagination.pageNumber"
                         :page-size="pagination.pageSize"
                         :total="pagination.total"
                         @current-change="changePage"
          ></el-pagination>
    <!-- 因为需要时时获取设备编号,所以将这两个模块分开 -->
    <!-- 车辆新建 -->
    <bus-create
      :show.sync="isCreate"
      @updateList="queryList"
    />
    <!-- 车辆修改 -->
    <bus-update
      :show.sync="isEdit"
      :roleData.sync="editRole"
      @updateList="queryList"
    />
    <!-- 导入文件 -->
    <upload-file
      :showUpload.sync="showUpload"
      :uploadFileUrl="uploadFileUrl"
      :limit="limit"
      :size="size"
      :acceptType="acceptType"
      :pojo="pojo"
      :isShowDown="isShowDown"
      :isHasToken="isHasToken"
      @updateList="updateList"
      @complete="getUploadData"/>
    <!-- 导入文件表格 -->
    <upload-file-table :showUploadTable.sync="showUploadTable" :pojo="pojo" :uploadData.sync="uploadData"
                       @updateList="queryList" v-if="uploadData.data"/>
  </div>
</template>
<script>
/**
 * Bus Management Module
 * ----------------------
 * Author: dengshijun
 * Date: 2018.05.24
 */
import moment from 'moment'
// 全局混入
// import { mixins } from '@/mixins'
// 自定义组件
import Search from '@/components/searchAlarm'
import BusUpdate from './Components/busUpdate'
import BusCreate from './Components/busCreate'
// 导入文件模块
import UploadFile from '../Common/upload'
import UploadFileTable from '../Common/uploadTable'
import UploadLog from '../Common/uploadLog'
// api
// import { buspageSearch, deleteBus, isvalidBus, busToDevGet } from '@/api/management'

export default {
  name: 'vehicleAndDevice',
  // mixins: [mixins],
  data () {
    return {
      comp: this,
      selectData: {},
      buttonData: [],
      tableAllData: [],
      tableData: [],
      popTableData: [],
      selectRow: [], // 列表选中列
      editRole: {}, // 需要编辑的路线对象
      isEdit: false, // 编辑窗口打开状态
      isListLoading: false, // 列表加载
      isCreate: false, // 新建窗口打开状态
      // 导入需要传入的变量
      showUpload: false, // 导入窗口打开状态 ====>必填
      uploadFileUrl: '/excel/uploadFile', // 文件上传的url ====>必填
      limit: 1, // 上传文件的个数 默认为1
      size: 0.5, // 上传文件总的最大的容量（MB）默认为0.5
      acceptType: '.xls', // 上传文本格式  多个为'.xls,.png,.mp4' 默认为.xls
      pojo: 'TBus', // 上传的额外参数（车辆导入）===> (非必填) 可以是字符串，数字，对象 在上传模块接受到的额外参数将以对象形式上传 {pojo: this.pojo}
      isShowDown: true, // 是否显示下载模板 ===> (非必填)
      isHasToken: true, // 是否需要上传token ===> (非必填)
      // 导入完成后的表格模块变量
      showUploadTable: false, // 导入列表打开状态
      uploadData: {}, // 批量导入返回的数据
      pagination: { // 翻页数据
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      isClearSearch: false
    }
  },
  activated () {
    this.$refs.roleTable.doLayout()
  },
  mounted () {
    this.getRoles({
      orgId: '',
      lineId: '',
      busNumber: '',
      busSelfCode: ''
    })
  },
  methods: {
    getSearch (data) {
      this.selectData = data
      this.pagination = {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      }
      this.queryList()
    },
    // 查询和初始化查询
    // 查询/翻页公用方法
    queryList () {
      // const searchParams = {
      //   orgId: '', // 组织机构id
      //   lineId: '', // 线路id
      //   busPlateNumber: '', // 车辆id
      //   busSelfCode: '' // 自编号
      //   // devCode: null
      // }
      this.getRoles(
        {
          orgId: this.selectData.orgId,
          lineId: this.selectData.lineId,
          busNumber: this.selectData.busNumber,
          busSelfCode: this.selectData.busSelfCode
        }
      )
    },
    // 获取列表
    getRoles (params) {
      this.isListLoading = true
      this.$api['wholeInformation.getCar'](params).then(res => {
        this.tableAllData = res
        this.tableData = res.slice(0, 10)
        this.pagination.total = res.length
        this.isListLoading = false
        this.isClearSearch = false
      })
    },
    rest (params) {
      this.getRoles(
        {
          orgId: this.selectData.orgId,
          lineId: this.selectData.lineId,
          busNumber: this.selectData.busNumber,
          busSelfCode: this.selectData.busSelfCode
        }
      )
    },
    searchDev (index, row) {
      this.$api['wholeInformation.busToDevGet']({ busUuid: row.busUuid }).then(res => {
        this.popTableData = res
      })
    },
    // 列表翻页
    changePage (pageNum) {
      this.pagination.pageNumber = pageNum
      this.tableData = this.tableAllData.slice(10 * (pageNum - 1), 10 * pageNum)
    },
    // 生成列表序号
    indexMethod (index) {
      return (index + 1) + (this.pagination.pageNumber - 1) * this.pagination.pageSize
    },
    // 列表日期格式化
    formatCreateDate (row) {
      if (row.busCreateTime) {
        return moment(row.busCreateTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    isButtonDisabled () {
      return !!this.selectRow.length
    },
    // 显示新增界面
    handleAdd () {
      this.isCreate = true
    },
    // 显示编辑界面
    handleEdit (index, row) {
      this.editRole = row
      this.isEdit = true
    },
    // 删除的接口方法
    deleteBuses (lineIds) {
      return this.$api['wholeInformation.deleteBus'](lineIds).then(res => {
        if (!res.error) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.queryList()
        }
      })
    },
    // 批量删除
    batchRemove () {
      this.$confirm('确认删除选中的车辆吗？', '提示', {
        type: 'warning'
      }).then(() => {
        let busIds = []
        this.selectRow.map(row => busIds.push(row.busUuid))
        this.isListLoading = true
        this.deleteBuses(busIds).then(() => {
          this.isListLoading = false
        }).catch(() => {
        })
      })
    },
    // 单行删除
    // handleDel (index, row) {
    //   this.$confirm('确认删除该车辆吗?', '提示', {
    //     type: 'warning'
    //   }).then(() => {
    //     this.deleteBuses({busUuid: row.busUuid})
    //   }).catch(() => {
    //   })
    // },
    // 车辆启用禁用
    validBus (index, row) {
      const validStatus = row.busIsvalid === '0' ? '启用' : '禁用'
      this.$confirm(`确认状态修改为${validStatus}?`, '提示', {
        type: 'warning'
      }).then(() => {
        const params = {
          busUuid: row.busUuid,
          busIsvalid: row.busIsvalid
        }
        this.$api['wholeInformation.isvalidBus'](params).then(res => {
          console.log(res)
          this.queryList()
        })
      }).catch(() => {
      })
    },
    // 批量导入
    exportsFile () {
      this.showUpload = true
    },
    // 批量导入数据
    getUploadData (params) {
      setTimeout(() => {
        this.showUploadTable = true
      }, 500)
      let promise = new Promise(function (resolve, reject) {
        resolve(params)
      })
      promise.then(res => {
        this.uploadData = res
      })
    },
    updateList () {
      this.isClearSearch = true
      this.getRoles(
        {
          orgId: this.selectData.orgId,
          lineId: this.selectData.lineId,
          busNumber: this.selectData.busNumber,
          busSelfCode: this.selectData.busSelfCode
        }
      )
    },
    // 导入查看log
    exportsLog () {
      this.$nextPage({
        title: `导入日志详情`,
        props: {
          modelName: '车辆设备绑定批量导入'
        },
        component: UploadLog, // 该组件会通过Webpack分开打包,并异步加载
        cache: true
      })
    }
  },
  components: {
    // NavButton,
    // NavPremissonButton,
    // CommonWrapper,
    // CommonTable,
    Search,
    BusUpdate,
    BusCreate,
    UploadFile,
    UploadFileTable
  }
}
</script>
<style lang="scss" scoped>
  .table-inline{
    width:100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
