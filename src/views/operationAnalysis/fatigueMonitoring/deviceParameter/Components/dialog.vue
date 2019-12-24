<template>
  <div class="alarm-dialog">
    <el-dialog :title="title" :visible="true" :close-on-click-modal="false" @close="close">
      <el-form :model="formData" :rules="rules" ref="ruleForm" :inline="true" label-width="100px">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="DSM" name="DSM">
            <commonFormSelect
              placeholder="请选择"
              label="拍照分辨率"
              v-model="formData.dsmPhotoResolution"
              :selectData='selectData'
              >
            </commonFormSelect>
            <commonFormSelect
              placeholder="请选择"
              label="视频分辨率"
              v-model="formData.dsmVideoResolution"
              :selectData='selectData'
              >
            </commonFormSelect>
          </el-tab-pane>
          <el-tab-pane label="ADAS" name="ADAS">
            <commonFormSelect
              placeholder="请选择"
              label="拍照分辨率"
              v-model="formData.adasPhotoResolution"
              :selectData='selectData'
              >
            </commonFormSelect>
            <commonFormSelect
              placeholder="请选择"
              label="视频分辨率"
              v-model="formData.adasVideoResolution"
              :selectData='selectData'
              >
            </commonFormSelect>
          </el-tab-pane>
      </el-tabs>
      <div v-if="isDeviceParameter">
        <el-form-item label="任务名称" prop="taskName">
          <el-input class="font-style" v-model="formData.taskName"></el-input>
        </el-form-item>
        <el-form-item label="备        注">
          <el-input class="font-style" v-model="formData.ramark"></el-input>
        </el-form-item>
        <el-tree
          :data="treeData"
          v-loading="loading"
          ref="ADAStree"
          show-checkbox
          node-key="id"
          :default-checked-keys="defaultTreeData"
          :props="defaultProps"
          @check="handleNodeClick">
        </el-tree>
      </div>
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
    defaultProps: {
      type: Object
    },
    title: {
      type: String
    },
    treeData: {
      type: Array
    },
    defaultTreeData: {
      type: Array
    },
    isDeviceParameter: {
      type: Boolean
    },
    loading: {
      type: Boolean
    }
  },
  data () {
    return {
      activeName: 'DSM',
      trigger: 'change',
      dialogFormVisible: false,
      formData: {
        dsmPhotoResolution: '',
        dsmVideoResolution: '',
        adasVideoResolution: '',
        adasPhotoResolution: '',
        taskName: '',
        ramark: '',
        devList: [],
        taskIssueNum: 0,
        jsonData: []
      },
      rules: {
        taskName: { type: 'string', required: true, message: '请输入任务名称', trigger: 'blur' }
      },
      selectData: [
        { label: '高', value: 5 },
        { label: '中', value: 3 },
        { label: '低', value: 1 }
      ]
    }
  },
  components: {
    commonFormSelect
  },
  created () {
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    handleOperation (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          let data = {}
          let {taskName, devList, ramark, dsmPhotoResolution, dsmVideoResolution, adasVideoResolution, adasPhotoResolution} = this.formData
          data.jsonData = []
          let dsm = [{
            "alarmType": "dsm",
            "data": {
              "photoResolution": dsmPhotoResolution,
              "videoResolution": dsmVideoResolution
            }
          }]
          let adas = [{
            "alarmType": "adas",
            "data": {
              "photoResolution": adasPhotoResolution,
              "videoResolution": adasVideoResolution
            }
          }]
          data.jsonData = dsm.concat(adas)
          if (!this.rowData.taskUuid) {
            data.devList = devList
            data.taskName = taskName
            data.taskIssueNum = devList.length
            data.ramark = ramark
            this.$api['tiredMonitoring.taskAdd'](data).then(res => {
              this.$message.success('创建成功')
              this.$emit('updateTable')
              this.$emit('close')
            })
          } else {
            data.taskUuid = this.rowData.taskUuid
            data.devList = this.rowData.devList
            this.$api['tiredMonitoring.taskAdd2'](data).then(res => {
              this.$message.success('保存成功')
              this.$emit('updateTable')
              this.$emit('close')
            })
          }
        } else {
          return false
        }
      })
    },
    handleClick (tab) {
    },
    close () {
      this.$emit('close')
    },
    handleNodeClick (data, checkedNodes, self) {
      this.formData.devList = []
      let listArr = checkedNodes.checkedNodes
      listArr.map((item) => {
        if (item.levelsType === '4') {
          let arr = {
            "devUuid": item.id,
            "devCode": item.name
          }
          this.formData.devList.push(arr)
        }
      })
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
.font-style {
  width: 193px;
}
</style>
