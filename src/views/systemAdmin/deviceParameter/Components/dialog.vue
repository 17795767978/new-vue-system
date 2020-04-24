<template>
  <div class="alarm-dialog">
    <el-dialog :title="title" :visible="true" :close-on-click-modal="false" @close="close">
      <el-form :model="formData" :rules="rules" ref="ruleForm" :inline="true" label-width="100px">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="DSM" name="DSM">
              <transition-group name="component-fade" mode="out-in">
              <template v-if="activeName === 'DSM'">
                <commonFormSelect
                  placeholder="请选择"
                  label="拍照分辨率"
                  key="dsmPhotoResolution"
                  v-model="formData.dsmPhotoResolution"
                  :selectData='selectPhoto'
                  >
                </commonFormSelect>
                <commonFormSelect
                  placeholder="请选择"
                  label="视频分辨率"
                  key="dsmVideoResolution"
                  v-model="formData.dsmVideoResolution"
                  :selectData='selectVideo'
                  >
                </commonFormSelect>
              </template>
              </transition-group>
            </el-tab-pane>
            <el-tab-pane label="ADAS" name="ADAS">
              <transition-group name="component-fade" mode="out-in">
               <template v-if="activeName === 'ADAS'">
                <commonFormSelect
                  placeholder="请选择"
                  label="拍照分辨率"
                  key="adasPhotoResolution"
                  v-model="formData.adasPhotoResolution"
                  :selectData='selectPhoto'
                  >
                </commonFormSelect>
                <commonFormSelect
                  placeholder="请选择"
                  label="视频分辨率"
                  key="adasVideoResolution"
                  v-model="formData.adasVideoResolution"
                  :selectData='selectVideo'
                  >
                </commonFormSelect>
                </template>
               </transition-group>
            </el-tab-pane>
          </el-tabs>
      <div v-if="isDeviceParameter">
        <el-form-item label="任务名称" prop="taskName">
          <el-input class="font-style" v-model="formData.taskName"></el-input>
        </el-form-item>
        <el-form-item label="备        注">
          <el-input class="font-style" v-model="formData.remark"></el-input>
        </el-form-item>
        <div class="form-tree">
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
        remark: '',
        devList: [],
        taskIssueNum: 0,
        jsonData: []
      },
      rules: {
        taskName: { type: 'string', required: true, message: '请输入任务名称', trigger: 'blur' }
      },
      selectPhoto: [
        { label: '高', value: 5 },
        { label: '中', value: 3 },
        { label: '低', value: 1 }
      ],
      selectVideo: [
        { label: '高', value: 6 },
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
      // if (this.formData.devList.length === 0) {
      //   this.$message.error('请至少选择一台设备')
      //   return
      // }
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          let data = {}
          let { taskName, devList, remark, dsmPhotoResolution, dsmVideoResolution, adasVideoResolution, adasPhotoResolution } = this.formData
          console.log(devList)
          data.jsonData = []
          let dsm = [{
            alarmType: 'dsm',
            data: {
              photoResolution: dsmPhotoResolution,
              videoResolution: dsmVideoResolution
            }
          }]
          let adas = [{
            alarmType: 'adas',
            data: {
              photoResolution: adasPhotoResolution,
              videoResolution: adasVideoResolution
            }
          }]
          data.jsonData = dsm.concat(adas)
          if (!this.rowData.taskUuid) {
            data.devList = devList
            data.taskName = taskName
            data.remark = remark
            data.taskIssueNum = devList.length
            if (!data.taskIssueNum) {
              this.$message.error('请至少选择一台设备')
              return
            }
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
            devUuid: item.id,
            devCode: item.name
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
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
.form-tree{
  max-height: 300px;
  overflow: auto;
}
</style>
