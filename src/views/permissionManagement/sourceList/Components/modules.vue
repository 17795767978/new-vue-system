<template>
  <el-dialog
      :title="titleMsg"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :fullscreen="true">
       <el-row :gutter="24" style="width: 70%; margin: 5vh auto">
         <el-col :span="12">
           <el-form label-width="100px" :model="adminForm" ref="adminForm" :rules="rules" style="border-right: 1px solid #b5b5b5">
            <el-form-item label="父级模块：">
              <el-select class="font-style" filterable clearable v-model="adminForm.resourceParentId" placeholder="请选择">
                <el-option
                  v-for="item in parentOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模块名称：" prop="resourceTitle">
              <el-input
                type="text"
                style="width: 240px"
                placeholder="请输入模块名称"
                auto-complete="new-text"
                v-model="adminForm.resourceTitle"></el-input>
            </el-form-item>
            <el-form-item label="模块编码：" prop="resourceName">
              <el-input
                type="text"
                style="width: 240px"
                placeholder="请输入模块编码"
                auto-complete="new-text"
                v-model="adminForm.resourceName"></el-input>
            </el-form-item>
            <el-form-item label="模块URL：" prop="resourceUrl">
              <el-input
                type="text"
                style="width: 240px"
                placeholder="请输入模块URL"
                auto-complete="new-text"
                v-model="adminForm.resourceUrl"></el-input>
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
            <el-form-item label="模块icon：" prop="resourceImage">
              <el-input
                type="text"
                style="width: 240px"
                placeholder="请输入模块icon"
                auto-complete="new-text"
                v-model="adminForm.resourceImage"></el-input>
            </el-form-item>
            <el-form-item label="模块排序：">
              <el-input
                type="text"
                style="width: 240px"
                placeholder="请输入模块排序"
                auto-complete="new-text"
                v-model="adminForm.resourceSort"></el-input>
            </el-form-item>
          </el-form>
         </el-col>
         <el-col :span="12" style="padding-left: 10%; box-sizing:border-box;">
           <ResouceTree :parentTreeAnimal="parentTreeAnimal" :parentTreeTitle="parentTreeTitle" :defaultTitle="moduleRowData.resourceTitle" :defaultId="moduleRowData.resourceId" :titleMsg="titleMsg"/>
         </el-col>
       </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit" style="margin-right: 20vw">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
import ResouceTree from './resouceTree'
import { mapMutations } from 'vuex'
export default {
  props: {
    titleMsg: {
      type: String,
      default: '新增'
    },
    parentOptions: {
      type: Array
    },
    moduleRowData: {
      type: Object,
      default: () => {
        return {
          resourceTitle: '',
          resourceId: ''
        }
      }
    }
  },
  components: {
    ResouceTree
  },
  data () {
    return {
      parentTreeAnimal: '',
      parentTreeTitle: '',
      dialogVisible: false,
      disabledSort: false,
      adminForm: {
        resourceTitle: '',
        resourceName: '',
        resourceUrl: '',
        enabled: '',
        resourceLevel: '1',
        resourceParentId: '',
        resourceImage: '',
        resourceSort: ''
      },
      rules: {
        // resouceParent: [
        //   { required: true, message: '请选择父级', trigger: 'blur' }
        // ],
        resourceName: [
          { required: true, message: '请输入模块编码', trigger: 'blur' }
        ],
        resourceUrl: [
          { required: true, message: '请输入模块路由', trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        resourceTitle: [
          { required: true, message: '请输入模块名称', trigger: 'blur' }
        ],
        resourceImage: [
          { required: true, message: '请输入模块icon', trigger: 'blur' }
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
  watch: {
    'adminForm.resourceParentId': {
      handler (newV) {
        this.parentTreeAnimal = newV
        // this.adminForm.resourceTitle = ''
      }
    },
    'adminForm.resourceTitle': {
      handler (newV) {
        this.parentTreeTitle = newV
      }
    },
    dialogVisible (newV) {
      if (!newV) {
        this.adminForm = {
          resourceTitle: '',
          resourceName: '',
          resourceUrl: '',
          enabled: '',
          resourceLevel: '1',
          resourceParentId: '',
          resourceImage: '',
          resourceSort: ''
        }
      }
    },
    moduleRowData: {
      deep: true,
      handler (newV) {
        const { resourceTitle,
          resourceName,
          resourceUrl,
          enabled,
          resourceParentId,
          resourceImage,
          resourceSort } = newV
        setTimeout(() => {
          this.adminForm = {
            resourceTitle,
            resourceName,
            resourceUrl,
            enabled,
            resourceLevel: '1',
            resourceParentId,
            resourceImage,
            resourceSort
          }
        }, 300)
      }
    }
  },
  methods: {
    ...mapMutations({
      'SET_ROLES': 'SET_ROLES'
    }),
    onSubmit () {
      this.$refs['adminForm'].validate((valid) => {
        if (valid) {
          if (this.titleMsg === '新增模块') {
            this.$api['resource.addResource'](this.adminForm).then(res => {
              this.dialogVisible = false
              this.$message.success('添加成功！')
              this.$emit('updateList')
              this.$api['platformMenu.list']({
                id: localStorage.getItem('id')
              }).then(res => {
                this.SET_ROLES(res.resourceTree)
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
