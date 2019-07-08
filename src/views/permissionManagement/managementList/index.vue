<template>
  <div class="wrapper">
    <div class="search">
      <el-button type="primary" @click="addAdmin">添加管理员</el-button>
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
        <el-table-column align="center" label="账号">
          <template slot-scope="scope">
            <span>{{scope.row.userAccount}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="管理员姓名">
          <template slot-scope="scope">
            <span>{{scope.row.userRealName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="角色">
          <template slot-scope="scope">
            <span>{{scope.row.roleName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="性别">
          <template slot-scope="scope">
            <span>{{scope.row.userGender === '1' ? '男' : '女'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.enabled === '1' ? '启用' : '禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" :formatter="forMatterCreateTime">
        </el-table-column>
        <el-table-column align="center" label="更新时间" :formatter="forMatterUpdateTime">
        </el-table-column>
        <el-table-column align="center" label="操作">
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
              <el-button
                size="mini"
                type="danger"
                @click="handleRemoveAdmin(scope.row.userId)"
              >删除</el-button>
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
    <el-dialog
      :title="titleMsg"
      :visible.sync="dialogVisible"
      width="420px">
      <el-form label-width="100px" :model="adminForm" ref="adminForm" :rules="rules">
        <el-form-item label="账号：" prop="userAccount">
          <el-input
            style="width: 240px"
            :disabled="isDisable"
            placeholder="请输入账号"
            v-model="adminForm.userAccount"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="userPassword">
          <el-input
            type="password"
            style="width: 240px"
            placeholder="请输入密码"
            v-model="adminForm.userPassword"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="userRealName">
          <el-input
            style="width: 240px"
            placeholder="请输入姓名"
            v-model="adminForm.userRealName"></el-input>
        </el-form-item>
        <el-form-item label="是否禁用：" prop="enabled">
          <el-select
            style="width: 240px"
            v-model="adminForm.enabled"
            placeholder="请选择">
            <el-option
              v-for="item in enableOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别：" prop="userGender">
          <el-select
            style="width: 240px"
            v-model="adminForm.userGender"
            placeholder="请选择">
            <el-option
              v-for="item in maleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色：" prop="roleIds">
          <el-select
            style="width: 240px"
            v-model="adminForm.roleIds"
            multiple
            collapse-tags
            placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属机构：" prop="userOrgUuid">
          <el-select
            style="width: 240px"
            v-model="adminForm.userOrgUuid"
            placeholder="请选择">
            <el-option
              v-for="item in orgOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
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
      dialogVisible: false,
      adminForm: {
        userAccount: '',
        userPassword: '',
        userRealName: '',
        userGender: '',
        enabled: '',
        roleIds: [],
        userOrgUuid: ''
        // roleId: ''
      },
      rules: {
        userAccount: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        userRealName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        userGender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        roleIds: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ],
        userOrgUuid: [
          { required: true, message: '请选择所属机构', trigger: 'blur' }
        ]
      },
      enableOptions: [
        {
          value: '1',
          label: '启用'
        },
        {
          value: '0',
          label: '禁用'
        }
      ],
      maleOptions: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '2'
        }
      ],
      roleOptions: [],
      orgOptions: [],
      userId: '',
      isAdd: true,
      isDisable: false,
      pageSize: 10,
      titleMsg: ''
    }
  },
  created () {
    this.getAdminList({
      pageNumber: this.current,
      pageSize: 10
    })
    this.getRoleList()
    this.getOrgList()
  },
  methods: {
    getAdminList (params) {
      this.$api['permission.userList'](params).then(res => {
        this.list = res.list
        this.total = res.total
      })
    },
    getRoleList () {
      this.$api['role.list']({
        enabled: '1'
      }).then(res => {
        let list = []
        if (res.list) {
          list = res.list
        } else {
          list = res
        }
        list.forEach((i, index) => {
          this.roleOptions[index] = {
            value: i.roleId,
            label: i.roleName
          }
        })
        // this.list = res
      })
    },
    getOrgList (params) {
      this.$store.dispatch('getComList').then(res => {
        this.orgOptions = res
      })
    },
    handleCurrentChange (val) {
      this.current = val
      this.getAdminList({
        name: this.form.name,
        pageNumber: this.current,
        pageSize: 10
      })
    },
    addAdmin () {
      this.titleMsg = '新增'
      this.dialogVisible = true
      this.isAdd = true
      this.isDisable = false
      Object.keys(this.adminForm).forEach(key => {
        this.adminForm[key] = ''
      })
      this.$nextTick(() => {
        this.$refs['adminForm'].resetFields()
      })
    },
    onSubmit () {
      this.$refs['adminForm'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.$api['permission.add'](this.adminForm).then(res => {
              this.dialogVisible = false
              this.$message.success('添加成功！')
              this.getAdminList('sys/user/page', {
                pageNumber: this.current,
                pageSize: 10
              })
            })
          } else {
            this.adminForm.userId = this.userId
            this.$api['permission.update'](this.adminForm).then(res => {
              this.dialogVisible = false
              this.$message.success('修改成功！')
              this.getAdminList('sys/user/page', {
                pageNumber: this.current,
                pageSize: 10
              })
            })
          }
        }
      })
    },
    handleRemoveAdmin (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api['permission.delete']({
          id
        }).then(res => {
          this.$message.success('删除成功！')
          this.getAdminList('sys/user/page', {
            pageNumber: this.current,
            pageSize: 10
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleEditAdmin (id) {
      this.titleMsg = '编辑'
      this.dialogVisible = true
      this.isAdd = false
      this.userId = id
      this.isDisable = true
      this.$api['permission.detail']({
        id
      }).then(res => {
        this.adminForm.userAccount = res.userAccount
        this.adminForm.userPassword = res.userPassword
        this.adminForm.userRealName = res.userRealName
        this.adminForm.userGender = res.userGender
        this.adminForm.enabled = res.enabled
        this.userId = res.userId
        this.adminForm.roleIds = res.roleIds
        this.adminForm.userOrgUuid = res.userOrgUuid
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
