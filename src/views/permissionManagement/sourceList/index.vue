<template>
  <div class="wrapper">
    <div class="search">
      <el-button type="primary" @click="addModules">添加模块</el-button>
      <el-button type="primary" @click="addPages">添加页面</el-button>
    </div>
    <div class="table">
      <el-table
        :data="list"
        row-key="id"
        border
        fit
        highlight-current-row
        style="width: 100%">
        <el-table-column align="center" label="序号" type="index" width="60">
          <template slot-scope="scope">
            <span> {{scope.$index + (current - 1) * pageSize + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="资源名称" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.resourceTitle}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="资源编码" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.resourceName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="资源类型" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.resourceLevel === '1' ? '模块' : '页面'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="url" prop="resourceUrl" width="400">
        </el-table-column>
        <el-table-column align="center" label="排序"  width="80">
          <template slot-scope="scope">
            <span>{{scope.row.resourceSort}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.enabled === '1' ? '启用' : '禁用'}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="资源等级" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.resourceType}}级</span>
          </template>
        </el-table-column> -->
        <el-table-column align="center" label="创建时间" :formatter="forMatterCreateTime"  width="200">
        </el-table-column>
        <el-table-column align="center" label="更新时间" :formatter="forMatterUpdateTime"  width="200">
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.id === 1">
              -----
            </div>
            <div v-else>
              <el-button
                size="mini"
                type="primary"
                @click="handleEditAdmin(scope.row.userId)"
              >编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        :current-page="current"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <Modules ref="modulesWrapper" :parentOptions="parentOptions" :titleMsg="titleMsg"/>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import Modules from './Components/modules.vue'
export default {
  name: 'Admin',
  data () {
    return {
      form: {
        name: ''
      },
      list: [],
      current: 1,
      total: 0,
      parentOptions: [],
      pageSize: 10,
      titleMsg: ''
    }
  },
  components: {
    Modules
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
    this.getSourceList({
      // orgId: this.userId === '1' ? '' : this.userId,
      pageSize: 10000,
      pageNumber: 1
    })
  },
  watch: {
  },
  methods: {
    getSourceList (params) {
      this.parentOptions = []
      this.$api['resource.list'](params).then(res => {
        let list = res.list.filter(item => item.enabled === '1')
        this.allList = res.list
        this.list = this.allList.slice(0, 10)
        this.total = this.allList.length
        this.getParentList(list)
      })
    },
    handleCurrentChange (val) {
      this.current = val
      this.list = this.allList.slice((this.current - 1) * 10, this.current * 10)
    },
    addModules () {
      this.titleMsg = '新增模块'
      this.$refs.modulesWrapper.dialogVisible = true
      setTimeout(() => {
        this.$refs.modulesWrapper.$refs['adminForm'].resetFields()
      }, 20)
    },
    addPages () {},
    handleChangeTabs (tab, event) {},
    getParentList (roles) {
      roles.forEach(item => {
        if (item.resourceLevel === '1') {
          this.parentOptions.push({
            label: item.resourceTitle,
            value: item.resourceId
          })
        }
      })
    },
    forMatterCreateTime (row) {
      return moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    forMatterUpdateTime (row) {
      return moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  padding: 20px 20px;
  box-sizing: border-box;
  .search {
    margin-bottom: 20px;
  }
  .pagination {
    margin-top: 20px;
    float: right;
  }
}
</style>
