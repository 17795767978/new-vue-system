<template>
  <div>
    <el-table
      :data="tableData"
      v-loading="showLoading"
      element-loading-text="提醒内容列表加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      border
      style="width: 100%">
      <el-table-column
        label="序号"
        width="60">
        <template slot-scope="scope">
          {{scope.$index + (parseInt(currentPage) - 1) * 10 + 1}}
        </template>
      </el-table-column>
      <el-table-column
        label="提醒内容">
        <template slot-scope="scope">
          {{scope.row.voicetempMessageContent}}
        </template>
      </el-table-column>
      <el-table-column width="150" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.$index, scope.row)"
            size="mini">修改</el-button>
          <el-button
            size="mini"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        class="pagination-box"
        background
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :page-size="5"
        :small="true"
        :total="total">
      </el-pagination>
      <span class="demonstration">共{{total}}条</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'insideTable',
  props: {
    insideParams: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      showLoading: false,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      params: {
        voicetempTypeUuid: ''
      },
      tableData: []
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      this.updateTable(this.insideParams.voicetempTypeUuid)
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const voicetempUuid = row.voicetempUuid
        this.$api['msgsend.delVoicetempMessageById']({
          voicetempUuid: voicetempUuid
        }).then(res => {
          this.$message({
            type: 'success',
            message: '移除成功！'
          })
          // 刷新列表
          this.resetTable()
        }).catch(error => {
          this.$message({
            type: 'error',
            message: `移除失败:${JSON.stringify(error)}`
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleEdit (index, row) {
      this.$prompt('请编辑内容', this.insideParams.name, {
        inputType: 'textarea',
        inputValue: row.voicetempMessageContent,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value === '') {
          this.$message({
            type: 'error',
            message: '提交内容不可为空！'
          })
          return false
        }
        if (value.length > 100) {
          this.$message({
            type: 'error',
            message: '提交的内容不得多于100个字符！'
          })
          return false
        }
        if (row.voicetempMessageContent === value) {
          this.$message({
            type: 'error',
            message: '暂无修改，提交无效！'
          })
        } else {
          this.$api['msgsend.editVoicetempMessage']({
            voicetempUuid: row.voicetempUuid,
            voicetempMessageContent: value
          }).then(res => {
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            // 刷新列表
            this.updateTable(this.insideParams.voicetempTypeUuid)
          }).catch(error => {
            this.$message({
              type: 'error',
              message: `编辑失败:${JSON.stringify(error)}，请联系管理员！`
            })
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    /* 重置列表 */
    resetTable () {
      this.params.voicetempTypeUuid = ''
      this.currentPage = 1
      this.updateTable()
    },
    /* 更新列表数据 */
    updateTable (
      voicetempTypeUuid = ''
    ) {
      this.showLoading = true
      const params = {
        voicetempTypeUuid: voicetempTypeUuid,
        pageSize: this.pageSize,
        pageNum: this.currentPage
      }
      this.$api['msgsend.getVmContentsByVtUuid'](params).then(res => {
        this.setTableData(res)
        this.showLoading = false
      })
      // todo: 模拟数据，在生产环境需注释========================================================
      // const res = {
      //   code: '200',
      //   msg: '成功',
      //   success: 'true',
      //   message: '成功',
      //   data: {
      //     list: [{
      //       voicetempUuid: '12312434',
      //       voicetempMessageContent: this.insideParams.voicetempContent + '信息提醒内容1111111'
      //     }, {
      //       voicetempUuid: '34454545',
      //       voicetempMessageContent: this.insideParams.voicetempContent + '信息提醒内容2222222'
      //     }],
      //     total: 2
      //   }
      // }
      // this.setTableData(res)
      // ========================================================================================
    },
    setTableData (res) {
      const len = res.list.length
      if (len > 0) {
        this.tableData = res.list
        this.total = res.total
      } else {
        this.$message({
          type: 'warning',
          message: `暂无数据！`
        })
      }
    }
  },
  mounted () {
    if (this.insideParams.voicetempTypeUuid !== undefined) {
      this.updateTable(this.insideParams.voicetempTypeUuid)
    }
  }
}
</script>
<style scoped>
.demonstration {
  float: right;
  margin-top: 14px;
  line-height: 36px;
  font-size: 14px;
}
.pagination-box {
  float: right;
  margin-top: 20px;
}
</style>
