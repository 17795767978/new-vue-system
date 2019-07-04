<template>
  <div class="wrapper">
    <div class="search clearfix">
      <el-button class="fr" type="primary" @click="handleAddRole">添加角色</el-button>
    </div>
    <div class="table">
      <el-table
        :data="list"
        row-key="id"
        border
        fit
        highlight-current-row
        style="width: 100%">
        <el-table-column align="center" label="排序" width="60">
          <template slot-scope="scope">
            <span>{{scope.row.roleSort}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="角色名称" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.roleName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="角色描述" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.describes}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建人" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.createUser}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.enabled === '1' ? '启用' : '禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" :formatter="getCreateTime">
        </el-table-column>
        <el-table-column align="center" label="修改时间" :formatter="getUpdateTime">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <div>
              <el-button
                size="mini"
                type="primary"
                @click="handleCheck(scope.row.roleId)"
              >操作</el-button>
              <el-button
                size="mini"
                type="warning"
                @click="handleAllot(scope.row)"
              >分配权限</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteRole(scope.row.roleId)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="330px">
      <div>
        <el-row>
        <span>角色名称：</span>
        <el-input
          style="width: 200px"
          v-model="roleName"
          placeholder="请输入角色名称">
        </el-input>
        </el-row>
        <el-row style="margin-top: 20px">
        <span>是否禁用：</span>
        <el-select
          style="width: 200px"
          v-model="enabled"
          placeholder="请选择">
          <el-option
            v-for="item in enableOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onRoleSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="分配权限"
      :visible.sync="dialogRoleVisible"
      width="300px">
      <div>
        <el-tree
          :data="treeData"
          ref="tree"
          show-checkbox
          node-key="resourceId"
          :default-checked-keys="defaultTreeData"
          :props="defaultProps">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onAllotubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="updateWrapper"
      width="420px">
      <el-form label-width="100px" :model="adminForm" ref="adminForm" :rules="rules">
        <el-form-item label="排序：" prop="roleSort">
          <el-input
            style="width: 240px"
            placeholder="请输入排序"
            v-model="adminForm.roleSort"></el-input>
        </el-form-item>
        <el-form-item label="角色名称：" prop="roleName">
          <el-input
            style="width: 240px"
            placeholder="角色名称"
            v-model="adminForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述：" prop="describes">
          <el-input
            style="width: 240px"
            placeholder="角色描述"
            v-model="adminForm.describes"></el-input>
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmitUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Role',
  data () {
    return {
      list: [],
      dialogVisible: false,
      dialogRoleVisible: false,
      updateWrapper: false,
      roleName: '',
      enabled: '',
      roleId: '',
      adminForm: {
        roleId: '',
        roleSort: '',
        roleName: '',
        describes: '',
        enabled: ''
      },
      rules: {
        roleSort: [
          { required: true, message: '请输入序号', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        describes: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: '请选择状态', trigger: 'blur' }
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
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeData: [],
      defaultTreeData: [],
      total: '',
      currentPage: 1,
      rolesIndexArr: [],
      rolesNameArr: [],
      currentSort: '',
      currentName: ''
    }
  },
  created () {
    this.getSysRoleList()
    this.getSourceList()
  },
  watch: {
    dialogRoleVisible (newValue) {
      if (newValue === false) {
        this.defaultTreeDate = []
        this.$refs.tree.setCheckedNodes(this.defaultTreeDate)
      }
    }
  },
  methods: {
    getSysRoleList () {
      this.$api['role.list']({
        pageSize: 10,
        pageNumber: this.currentPage
      }).then(res => {
        this.list = res.list.sort((prev, next) => prev.roleSort - next.roleSort)
        if (this.list.length > 0) {
          this.rolesIndexArr = this.list.map(sort => sort.roleSort)
          this.rolesNameArr = this.list.map(name => name.roleName)
        }
      })
    },
    getSourceList () {
      this.$api['resource.list']().then(res => {
        let list = []
        let data = []
        res.forEach((item, index) => {
          list[index] = {
            resourceId: item.resourceId,
            resourceParentId: item.resourceParentId,
            name: item.resourceTitle
          }
        })
        data = list.filter(item => item.resourceParentId === null)
        data.forEach((item, index) => {
          this.treeData[index] = {
            resourceId: item.resourceId,
            name: item.name,
            children: []
          }
        })
        this.treeData.forEach((tree, index) => {
          tree.children = list.filter(i => i.resourceParentId === tree.resourceId)
        })
        this.treeData.forEach((tree, index) => {
          tree.children.forEach(child => {
            child.children = list.filter(i => i.resourceParentId === child.resourceId)
          })
        })
      })
    },
    onRoleSubmit () {
      if (this.roleName.length > 0) {
        if (!this.rolesNameArr.some(item => item === this.roleName)) {
          this.$api['role.add']({
            roleName: this.roleName,
            enabled: this.enabled
          }).then(res => {
            this.getSysRoleList()
            this.adminForm.roleName = this.roleName
            this.$message.success('添加成功!')
            this.dialogVisible = false
          })
        } else {
          this.$message.error('角色名称已存在')
        }
      } else {
        this.$message.error('角色名称未输入')
      }
    },
    handleDeleteRole (id) {
      this.$confirm('此操作将永久删除该角色和角色绑定的权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api['role.delete']({
          id: id
        }).then(res => {
          this.getSysRoleList({
            pageSize: 10,
            pageNumber: this.currentPage
          })
          this.$message.success('删除成功！')
        }).catch((err) => {
          this.$message.error(`${err.message}绑定了角色，不能删除`)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleAllot (row) {
      let arr = []
      this.dialogRoleVisible = true
      this.roleId = row.roleId
      arr = row.resources.filter(item => item.resourceId !== '47' &&
        item.resourceId !== '48' &&
        item.resourceId !== '353' &&
        item.resourceId !== '350' &&
        item.resourceId !== '359' &&
        item.resourceId !== '362'
      )
      if (arr.length > 0) {
        arr = arr.map(res => res.resourceId)
        this.defaultTreeData = Array.from(new Set(arr))
        this.defaultTreeData = this.defaultTreeData.sort((prev, next) => prev - next)
      } else {
        this.defaultTreeData = []
      }
    },
    onAllotubmit () {
      let allresourceIds = []
      allresourceIds = this.$refs.tree.getHalfCheckedNodes().map(item => item.resourceId)
      allresourceIds = [...allresourceIds, ...this.$refs.tree.getCheckedKeys()]
      const resourceIds = allresourceIds
      this.$api['resource.updateRole']({
        resourceIds,
        roleId: this.roleId
      }).then(res => {
        this.dialogRoleVisible = false
        this.$message.success('分配成功！')
        this.defaultTreeData = []
        this.getSysRoleList()
      })
    },
    handleCheck (id) {
      this.updateWrapper = true
      this.adminForm.roleId = id
      this.$api['role.detail']({
        id
      }).then(res => {
        this.adminForm.roleName = res.roleName
        this.adminForm.describes = res.describes
        this.adminForm.roleSort = res.roleSort
        this.adminForm.enabled = res.enabled
        this.currentSort = res.roleSort
        this.currentName = res.roleName
        console.log(this.currentSort)
        console.log(this.currentSort === this.adminForm.roleSort)
        console.log(!this.rolesIndexArr.some(sort => sort === this.adminForm.roleSort))
      })
    },
    onSubmitUpdate () {
      this.$refs['adminForm'].validate((valid) => {
        if (valid) {
          if (this.currentName === this.adminForm.roleName || !this.rolesNameArr.some(name => name === this.adminForm.roleName)) {
            if (this.currentSort === Number(this.adminForm.roleSort) || !this.rolesIndexArr.some(sort => sort === Number(this.adminForm.roleSort))) {
              this.$api['role.update'](this.adminForm).then(res => {
                this.getSysRoleList({
                  pageSize: 10,
                  pageNumber: this.currentPage
                })
                this.$message.success('修改成功！')
                this.updateWrapper = false
              })
            } else {
              this.$message.error('角色序号已存在')
            }
          } else {
            this.$message.error('角色名已存在')
          }
        } else {
          return false
        }
      })
    },
    handleAddRole () {
      this.roleName = ''
      this.dialogVisible = true
    },
    getCreateTime (row) {
      return moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    getUpdateTime (row) {
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
}
</style>
