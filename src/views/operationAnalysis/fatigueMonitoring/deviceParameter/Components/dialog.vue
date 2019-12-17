<template>
  <div class="alarm-dialog">
    <el-dialog :title="title" :visible="true" :close-on-click-modal="false" @close="close">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="DSM" name="DSM">
        <dialog-form :form="form" :treeData="treeData" :defaultProps="defaultProps" :defaultTreeData="defaultTreeData"></dialog-form>
      </el-tab-pane>
      <el-tab-pane label="ADAS" name="ADAS">
        <dialog-form :form="form" :treeData="treeData" :defaultProps="defaultProps" :defaultTreeData="defaultTreeData"></dialog-form>
      </el-tab-pane>
    </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="handleOperation('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import dialogForm from './form'
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
      form: {
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
      defaultTreeData: []
    }
  },
  components: {
    dialogForm
  },
  mounted () {
  },
  watch: {
    rowData: {
      deep: true,
      handler (newValue) {
        this.form = newValue
      }
    }
  },
  methods: {
    handleOperation (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          if (!this.form.plUuid) {
            this.$api['tiredMonitoring.createWarntype'](this.form).then(res => {
              this.$message.success('创建成功')
              this.$emit('updateTable')
              this.dialogFormVisible = false
            })
          } else {
            this.$api['tiredMonitoring.updateWarntype'](this.form).then(res => {
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
    handleClick () {
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
