<template>
  <el-dialog
      :title="titleMsg"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="40%">
        <el-form label-width="100px" :model="adminForm" ref="adminForm" :rules="rules">
          <el-form-item label="父级模块：">
            <el-select class="font-style" filterable v-model="adminForm.resouceParent" placeholder="请选择">
              <el-option
                v-for="item in parentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模块名称：" prop="resouceTitle">
            <el-input
              ref="accoutDom"
              type="text"
              style="width: 240px"
              placeholder="请输入资源名称"
              auto-complete="new-text"
              v-model="adminForm.resouceTitle"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="userRealName">
          </el-form-item>
          <el-form-item label="是否禁用：" prop="enabled">
            <el-select
              style="width: 240px"
              v-model="adminForm.resouceEnable"
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
          </el-form-item>
          <el-form-item label="所属机构：" prop="userOrgUuid">
          </el-form-item>
          <el-form-item label="角色：" prop="roleIds">
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
export default {
  props: {
    titleMsg: {
      type: String
    },
    parentOptions: {
      type: Array
    }
  },
  data () {
    return {
      dialogVisible: false,
      adminForm: {
        resouceTitle: '',
        resouceName: '',
        resouceUrl: '',
        resouceEnable: '',
        resourceType: '',
        resouceParent: ''
      },
      rules: {
        // resouceParent: [
        //   { required: true, message: '请选择父级', trigger: 'blur' }
        // ],
        resouceName: [
          { required: true, message: '请输入模块编码', trigger: 'blur' }
        ],
        resouceUrl: [
          { required: true, message: '请输入模块路由', trigger: 'blur' }
        ],
        resouceEnable: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        resouceTitle: [
          { required: true, message: '请输入模块名称', trigger: 'blur' }
        ]
      },
      enableOptions: [
        {
          label: '启用',
          value: '1'
        },
        {
          label: '禁用',
          value: '0'
        }
      ]
    }
  },
  methods: {
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
            }).catch(err => {
              this.$message.error(err.message)
            })
          } else {
            this.adminForm.userId = this.user
            this.$api['permission.update'](this.adminForm).then(res => {
              this.dialogVisible = false
              this.$message.success('修改成功！')
              this.getAdminList('sys/user/page', {
                pageNumber: this.current,
                pageSize: 10
              })
            }).catch(err => {
              this.$message.error(err.message)
            })
          }
        }
      })
    }
  }
}
</script>

<style>

</style>
