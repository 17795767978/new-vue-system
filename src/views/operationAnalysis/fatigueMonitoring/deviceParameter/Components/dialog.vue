<template>
  <div class="alarm-dialog">
    <el-dialog :title="title" :visible="true" :close-on-click-modal="false" @close="close">
      <el-form :model="formData" :rules="rules" ref="ruleForm">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="DSM" name="DSM">
            <commonFormSelect
              prop="pResolution"
              placeholder="请选择"
              label="拍照分辨率"
              v-model="formData.pResolution"
              :rules="rules.pResolution"
              :selectData='selectData'
              >
            </commonFormSelect>
            <commonFormSelect
              prop="vResolution"
              placeholder="请选择"
              label="视频分辨率"
              v-model="formData.vResolution"
              :rules="rules.vResolution"
              :selectData='selectData'
              >
            </commonFormSelect>
            <el-tree
              :data="treeData"
              ref="DSMtree"
              show-checkbox
              node-key="id"
              :default-checked-keys="defaultTreeData"
              :props="defaultProps">
            </el-tree>
          </el-tab-pane>
          <el-tab-pane label="ADAS" name="ADAS">
            <commonFormSelect
              prop="pResolution"
              placeholder="请选择"
              label="拍照分辨率"
              v-model="formData.pResolution"
              :rules="rules.pResolution"
              :selectData='selectData'
              >
            </commonFormSelect>
            <commonFormSelect
              prop="vResolution"
              placeholder="请选择"
              label="视频分辨率"
              v-model="formData.vResolution"
              :rules="rules.vResolution"
              :selectData='selectData'
              >
            </commonFormSelect>
            <el-tree
              :data="treeData"
              ref="ADAStree"
              show-checkbox
              node-key="id"
              :default-checked-keys="defaultTreeData"
              :props="defaultProps">
            </el-tree>
          </el-tab-pane>
      </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="handleOperation('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import commonFormSelect from './FormSelect'
export default {
  name: 'deviceDialog',
  props: {
    rowData: {
      type: Object
    },
    title: {
      type: String
    }
  },
  data () {
    return {
      activeName: 'DSM',
      trigger: 'change',
      dialogFormVisible: false,
      formData: {
        pResolution: '',
        vResolution: ''
      },
      treeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {},
      defaultTreeData: [],
      rules: {
        pResolution: { type: 'string', required: true, message: '请选择一个拍照分辨率', trigger: 'change' },
        vResolution: { type: 'string', required: true, message: '请选择一个视频分辨率', trigger: 'change' }
      },
      selectData: [
        { label: '区域1', value: '1' },
        { label: '区域2', value: '2' },
        { label: '区域3', value: '3' },
        { label: '区域4', value: '4' }
      ]
    }
  },
  components: {
    commonFormSelect
  },
  mounted () {
  },
  watch: {
    rowData: {
      deep: true,
      handler (newValue) {
        this.formData = newValue
      }
    }
  },
  methods: {
    handleOperation (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          if (!this.formData.plUuid) {
            this.$api['tiredMonitoring.createWarntype'](this.formData).then(res => {
              this.$message.success('创建成功')
              this.$emit('updateTable')
              this.dialogFormVisible = false
            })
          } else {
            this.$api['tiredMonitoring.updateWarntype'](this.formData).then(res => {
              this.$message.success('修改成功')
              this.$emit('updateTable')
              this.dialogFormVisible = false
            })
          }
        } else {
          return false
        }
      })
    },
    onCancel (ruleForm) {
      this.dialogFormVisible = false
      this.$emit('updateTable')
    },
    handleClick (tab) {
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}
</style>
