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
        <el-table-column align="center" label="账号">
          <template slot-scope="scope">
            <span>{{scope.row.userAccount}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="管理员姓名">
          <template slot-scope="scope">
            <span>{{scope.row.userReallName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="角色">
          <template slot-scope="scope">
            <span>{{scope.row.roleName}}</span>
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
                type="primary"
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
      title="提示"
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
        <el-form-item label="姓名：" prop="userReallName">
          <el-input
            style="width: 240px"
            placeholder="请输入姓名"
            v-model="adminForm.userReallName"></el-input>
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
        userReallName: '',
        userGender: '',
        enabled: ''
        // roleId: ''
      },
      rules: {
        userAccount: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        userReallName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        userGender: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: '请选择', trigger: 'blur' }
        ]
      },
      enableOptions: [
        {
          value: 1,
          label: '启用'
        },
        {
          value: 2,
          label: '禁用'
        }
      ],
      maleOptions: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 2
        }
      ],
      userId: '',
      isAdd: true,
      isDisable: false
    }
  },
  created () {
    this.getAdminList({
      current: 1,
      size: 10
    })
    // getRoleList('sys/role/list').then(res => {
    //   if (res.code === 0) {
    //     this.roleOptions = res.data.map(item => {
    //       return {
    //         label: item.name,
    //         value: item.id
    //       }
    //     })
    //   }
    // })
  },
  methods: {
    getAdminList (params) {
      this.$api['permission.userList'](params).then(res => {
        // console.log(res)
        this.list = res
      })
    },
    onSearch () {
      this.getAdminList('sys/user/page', {
        name: this.form.name,
        current: 1,
        size: 10
      })
    },
    handleCurrentChange (val) {
      this.current = val
      this.getAdminList('sys/user/page', {
        name: this.form.name,
        current: this.current,
        size: 10
      })
    },
    addAdmin () {
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
                current: 1,
                size: 10
              })
            })
          } else {
            // editSysAdmin('sys/user/update', {
            //   id: this.adminId,
            //   name: this.adminForm.name,
            //   password: this.adminForm.password,
            //   roleId: this.adminForm.roleId
            // }).then(res => {
            //   if (res.code === 0) {
            //     this.dialogVisible = false
            //     this.$message.success('编辑成功！')
            //     this.getAdminList('sys/user/page', {
            //       current: 1,
            //       size: 10
            //     })
            //   }
            // })
          }
        }
      })
    },
    handleRemoveAdmin (id) {
      // deleteSysAdmin('sys/user/delete', {
      //   id
      // }).then(res => {
      //   if (res.code === 0) {
      //     this.$message.success('删除成功！')
      //     this.getAdminList('sys/user/page', {
      //       current: 1,
      //       size: 10
      //     })
      //   }
      // })
    },
    handleEditAdmin (id) {
      // this.$refs['adminForm'].resetFields()
      this.dialogVisible = true
      this.isAdd = false
      this.userId = id
      this.isDisable = true
      this.$api['permission.detail']({
        id
      }).then(res => {
        // Object.keys(this.adminForm).forEach(key => {
        //   if (res.data.sysUser.hasOwnProperty(key)) {
        //     this.adminForm[key] = res.data.sysUser[key]
        //   }
        // })
        this.adminForm.roleId = res.sysRoleId
        this.adminForm.password = ''
      })
    },
    forMatterCreateTime (row) {
      return moment(row.createTime).format('YYYY-MM-DD HH:MM:SS')
    },
    forMatterUpdateTime (row) {
      return moment(row.updateTime).format('YYYY-MM-DD HH:MM:SS')
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
