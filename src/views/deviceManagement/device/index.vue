<template>
  <div>
    <!-- 面包屑 -->
    <!-- <header-breadcrumb :breadData="$route.matched" />  -->
      <!-- <el-button-group>
        <nav-premisson-button :comp="comp" :buttonData="buttonData"></nav-premisson-button>
      </el-button-group> -->
      <el-button-group>
        <el-button icon="fdddfont icon-add-new" size="mini" @click="handleAdd">新建</el-button>
        <!--<el-button icon="fdddfont icon-delete" :disabled="!selectRow.length" @click="batchRemove">删除</el-button>-->
        <el-button icon="fdddfont icon-shujudaoru" size="mini" @click="exportsFile">导入</el-button>
        <el-button icon="fdddfont icon-shujudaoru" size="mini" @click="exportsLog">导入日志查看</el-button>
      </el-button-group>
    <!-- 查询 -->
    <Search
      isBus
      isStatusNum
      isStatusType
      isSelfNum
      isOnline
      isEmpty
      @configCheck="getSearch"
    />
    <!-- 设备列表 -->
    <div style="margin-top: 2vh; padding: 0 1vh; box-sizing:border-box">
          <el-table
            size="mini"
            ref="roleTable"
            border
            height="70vh"
            stripe
            v-loading="isListLoading"
            :data="tableData"
            @selection-change="selected => selectRow = selected">
            <!-- <el-table-column type="selection" min-width="30"></el-table-column> -->
            <el-table-column type="index" align="center" :index="indexMethod" label="序号" min-width="100"></el-table-column>
            <el-table-column prop="devCode" align="center" label="设备编号" width="150">>
              <template slot-scope="scope">
                <el-tooltip
                  placement="bottom-end"
                  :enterable="false"
                  :content="scope.row.devCode"
                >
                  <div class="table-inline">{{scope.row.devCode}}</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="devClassName" align="center" label="设备类型" width="100"></el-table-column>
            <el-table-column  label="所属公司" align="center" min-width="80">
              <template slot-scope="scope">{{scope.row.orgName}}</template>
            </el-table-column>
            <el-table-column  label="所属线路" align="center" min-width="80">
              <template slot-scope="scope">{{scope.row.lineName || '' || null}}</template>
            </el-table-column>
            <el-table-column label="车辆自编号" align="center" min-width="80">
              <template slot-scope="scope">{{scope.row.busSelfCode || '' || null}}</template>
            </el-table-column>
            <el-table-column  label="车牌号" align="center" min-width="80">
              <template slot-scope="scope">{{scope.row.devBusPlateNumber || '' || null}}</template>
            </el-table-column>
            <el-table-column prop="devPhone" align="center" label="设备电话" min-width="100"></el-table-column>
            <el-table-column prop="devSimNum" align="center" label="SIM卡号" min-width="110"></el-table-column>
            <el-table-column  label="在线状态" align="center" min-width="70">
              <template slot-scope="scope">
                <div>{{scope.row.devOnlineStatus === '0' ? '断开':'在线'}}</div>
              </template>
            </el-table-column>
            <el-table-column  label="启禁状态" align="center" min-width="70">
              <template slot-scope="scope">
                <el-button size="mini"  round @click="validDevice(scope.$index, scope.row)">{{scope.row.devIsvalid === '0' ? '禁用':'启用'}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="devUpdateTime" align="center" label="设备状态更新时间" :formatter="formatCreateDate" min-width="150"></el-table-column>
            <el-table-column label="操作" min-width="140" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click.stop="handleDel(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          </div>
          <el-pagination style="float: right; margin-top: 1vh" background   layout="total, prev, pager, next"
                           :current-page.sync="pagination.pageNumber"
                           :page-size="pagination.pageSize"
                           :total="pagination.total"
                           @current-change="changePage"
          ></el-pagination>
    <!-- 车辆新建/修改 -->
    <device-update
      :show.sync="isShowRoleDialog"
      :roleData.sync="editRole"
      :isCreate="isCreate"
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
    <upload-file-table  :showUploadTable.sync="showUploadTable" :pojo="pojo" :uploadData.sync="uploadData" @updateList="queryList" v-if="uploadData.data"/>
  </div>
</template>
<script>
/**
 * Device Management Module
 * ----------------------
 * Author: dengshijun
 * Date: 2018.05.24
 */
import moment from 'moment'
// 全局混入
// import {mixins} from '@/mixins'
// 自定义组件
// import NavButton from '@/components/navButton'
// import NavPremissonButton from '@/components/navButton/navPremissonButton'
// import CommonWrapper from '@/components/commonWrapper'
// import CommonTable from '@/components/commonTable'

// import DeviceManagementSearch from './Components/Search'
import Search from '@/components/searchAlarm'
import DeviceUpdate from './Components/DeviceUpdate'
// 导入文件模块
import UploadFile from '../Common/upload'
import UploadFileTable from '../Common/uploadTable'
import UploadLog from '../Common/uploadLog'
// api
// import { devicepageSearch, deleteDevice, isvalidDevice } from '@/api/management'
export default {
  name: 'deviceMan',
  // mixins: [mixins],
  data () {
    return {
      selectData: {},
      comp: this,
      buttonData: [],
      tableData: [],
      selectRow: [], // 列表选中列
      editRole: {}, // 需要编辑的路线对象
      isShowRoleDialog: false, // 新建/编辑窗口打开状态
      isListLoading: false, // 列表加载
      isCreate: true, // 编辑窗口展示新建or编辑
      // 导入需要传入的变量
      showUpload: false, // 导入窗口打开状态 ====>必填
      uploadFileUrl: '/excel/uploadFile', // 文件上传的url ====>必填
      limit: 1, // 上传文件的个数 默认为1
      size: 0.5, // 上传文件总的最大的容量（MB）默认为0.5
      acceptType: '.xls', // 上传文本格式  多个为'.xls,.png,.mp4' 默认为.xls
      pojo: 'TDevice', // 上传的额外参数（设备导入）===> (非必填) 可以是字符串，数字，对象 在上传模块接受到的额外参数将以对象形式上传 {pojo: this.pojo}
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
      searchParams: {}, // 查询参数
      isClearSearch: false
    }
  },
  activated () {
    this.$refs.roleTable.doLayout()
  },
  mounted () {
    this.getRoles({
      busNumber: '',
      busSelfCode: '',
      devClass: '',
      devCode: '',
      devOnlineStatus: '1',
      pageNumber: this.pagination.pageNumber,
      pageSize: this.pagination.pageSize
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.queryList()
      }
    }
  },
  methods: {
    getSearch (data) {
      this.selectData = data
      this.queryList()
    },
    // 查询和初始化查询
    // 查询/翻页公用方法
    queryList () {
      // const searchParams = {
      //   busPlateNumber: '',
      //   busSelfCode: '',
      //   devClass: '',
      //   devCode: '',
      //   devOnlineStatus: ''
      // }
      this.getRoles(
        {
          busNumber: this.selectData.busNumber,
          busSelfCode: this.selectData.busSelfCode,
          devClass: this.selectData.devClass,
          devCode: this.selectData.deviceCode,
          devOnlineStatus: this.selectData.isOnline,
          pageNumber: this.pagination.pageNumber,
          pageSize: this.pagination.pageSize
        }
      )
    },
    // 获取列表
    getRoles (params) {
      this.isListLoading = true
      this.$api['wholeInformation.devicepageSearch'](params).then(res => {
        this.tableData = res.list
        this.pagination.total = res.total
        this.pagination.pageNumber = res.pageNum
        this.pagination.pageSize = res.pageSize
        this.isListLoading = false
        this.isClearSearch = false
      })
    },
    rest (params) {
      this.getRoles(
        {
          busNumber: this.selectData.busNumber,
          busSelfCode: this.selectData.busSelfCode,
          devClass: this.selectData.devClass,
          devCode: this.selectData.deviceCode,
          devOnlineStatus: this.selectData.isOnline,
          pageNumber: 1,
          pageSize: this.pagination.pageSize
        }
      )
    },
    // 列表翻页
    changePage (pageNum) {
      this.pagination.pageNumber = pageNum
      this.queryList()
    },
    // 生成列表序号
    indexMethod (index) {
      return (index + 1) + (this.pagination.pageNumber - 1) * this.pagination.pageSize
    },
    // 列表日期格式化
    formatCreateDate (row) {
      if (row.devUpdateTime) {
        return moment(row.devUpdateTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    isButtonDisabled () {
      return !!this.selectRow.length
    },
    // 显示新增界面
    handleAdd () {
      this.isCreate = true
      this.isShowRoleDialog = true
    },
    // 显示编辑界面
    handleEdit (index, row) {
      this.isCreate = false
      this.editRole = row
      this.isShowRoleDialog = true
    },
    // 删除的接口方法
    deleteDevices (lineIds) {
      return this.$api['wholeInformation.deleteDevice'](lineIds).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.queryList()
      }).catch(() => {})
    },
    // 批量删除
    batchRemove () {
      this.$confirm('确认删除选中的设备吗？', '提示', {
        type: 'warning'
      }).then(() => {
        let deviceIds = []
        this.selectRow.map(row => deviceIds.push(row.devUuid))
        this.isListLoading = true
        this.deleteDevices(deviceIds).then(() => {
          this.isListLoading = false
        }).catch(() => {})
      })
    },
    // 单行删除
    handleDel (index, row) {
      this.$confirm('确认删除该设备吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteDevices({ devUuid: row.devUuid })
      }).catch(() => {})
    },
    exportsLog () {
      this.$nextPage({
        title: '导入日志查看',
        props: {
          modelName: '设备信息批量导入'
        },
        component: UploadLog, // 该组件会通过Webpack分开打包,并异步加载
        cache: true
      })
    },
    // 设备启用禁用
    validDevice (index, row) {
      const validStatus = row.devIsvalid === '0' ? '启用' : '禁用'
      this.$confirm(`确认状态修改为${validStatus}?`, '提示', {
        type: 'warning'
      }).then(() => {
        const params = {
          devUuid: row.devUuid,
          devIsvalid: row.devIsvalid === '0' ? '1' : '0'
        }
        this.$api['wholeInformation.isvalidDevice'](params).then(res => {
          this.queryList()
        })
      }).catch(() => {})
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
          busNumber: this.selectData.busNumber,
          busSelfCode: this.selectData.busSelfCode,
          devClass: this.selectData.devClass,
          devCode: this.selectData.deviceCode,
          devOnlineStatus: this.selectData.isOnline,
          pageNumber: this.pagination.pageNumber,
          pageSize: this.pagination.pageSize
        }
      )
    }
  },
  components: {
    Search,
    DeviceUpdate,
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
