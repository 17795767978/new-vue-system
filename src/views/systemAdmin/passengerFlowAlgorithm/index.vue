<template>
  <div>
    <el-table
      :data="tableData"
      border
      height="70vh"
      style="width: 90%; margin:10vh auto">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="fieldName"
        label="配置名称"
        align="center"
        width="200">
      </el-table-column>
      <el-table-column
        prop="remark"
        align="left"
        label="配置描述">
      </el-table-column>
      <el-table-column
        align="center"
        width="200"
        label="一级配置项">
        <template slot-scope="scope">
          <el-radio-group v-model="scope.row.paramValue" size="small" @change="getStatus(scope.row)">
            <el-radio :label="true">启用</el-radio>
            <el-radio :label="false">禁用</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="300"
        label="二级配置项">
        <template slot-scope="scope">
          <el-radio-group v-model="scope.row.secondLevelConfig" size="small" @change="getSecondStatus(scope.row)" v-if="scope.row.secondConfigStructure">
            <el-radio :label="scope.row.secondConfigStructure[0].index" :disabled="!scope.row.paramValue">{{scope.row.secondConfigStructure[0].value}}</el-radio>
            <el-radio :label="scope.row.secondConfigStructure[1].index" :disabled="!scope.row.paramValue">{{scope.row.secondConfigStructure[1].value}}</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column
        label="线路设置"
        align="center"
        width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.mainItem === '1'" @click="handleClick(scope.row)" type="text" size="small" :disabled="!scope.row.paramValue">选择线路</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="线路设置" :visible.sync="dialogTableVisible" width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="线路属性" prop="region">
          <el-select v-model="ruleForm.lineType" placeholder="请选择线路属性" style="width: 20vw;">
            <el-option
              v-for="item in lineTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择线路" prop="region" v-if="ruleForm.lineType === '4'">
          <el-select v-model="ruleForm.lineIds" multiple placeholder="请选择线路" style="width: 20vw;" clearable collapse-tags>
            <el-option
              v-for="item in lineOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left: 70%;">
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      dialogTableVisible: false,
      lineTypeOptions: [
        { label: '所有线路', value: '1' },
        { label: '环线线路', value: '2' },
        { label: '普通线路', value: '3' },
        { label: '自定义', value: '4' }
      ],
      lineOptions: [],
      ruleForm: {
        lineType: '',
        lineIds: []
      },
      rules: {},
      selectRow: {}
    }
  },
  created () {
    this._getPassengerList({})
  },
  mounted () {
    this.lineOptions = this.$store.state.globel.lineData
  },
  watch: {},
  methods: {
    async _getPassengerList (params) {
      this.tableData = []
      let result = await this.$api['wholeInformation.getPassengerFlowAlgList'](params)
      if (result.length) {
        result.forEach(item => {
          item.paramValue = item.paramValue === 'true'
          item.secondConfigStructure = JSON.parse(item.secondConfigStructure)
        })
        this.tableData = result
      } else {
        this.tableData = []
      }
    },
    handleClick (row) {
      this.dialogTableVisible = true
      this.ruleForm.lineType = row.lineType
      this.ruleForm.lineIds = row.lineIds
      this.selectRow = row
    },
    async getStatus (row) {
      try {
        await this.$api['wholeInformation.updatePassengerFlowAlg']({
          paramValue: row.paramValue,
          sysUuid: row.sysUuid
        })
        this.$message.success('操作成功')
      } catch {
        this.$message.error('操作失败')
      }
    },
    async getSecondStatus (row) {
      try {
        await this.$api['wholeInformation.updatePassengerFlowAlg']({
          secondLevelConfig: row.secondLevelConfig,
          sysUuid: row.sysUuid
        })
        this.$message.success('操作成功')
      } catch {
        this.$message.error('操作失败')
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          this.$api['wholeInformation.setRelationLine']({
            sysUuid: this.selectRow.sysUuid,
            lineType: this.ruleForm.lineType,
            lineIds: this.ruleForm.lineIds
          }).then(res => {
            this.dialogTableVisible = false
            this._getPassengerList({})
          }).catch(() => {
            this.$message.error('操作失败')
          })
        } else {
          this.dialogTableVisible = false
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.dialogTableVisible = false
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
