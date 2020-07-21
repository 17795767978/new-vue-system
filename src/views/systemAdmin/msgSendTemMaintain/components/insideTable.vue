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
      total: 2,
      tableData: [{
        voicetempUuid: '12312434',
        voicetempMessageContent: '请保持车速，不要超速行驶！'
      }, {
        voicetempUuid: '34454545',
        voicetempMessageContent: '车辆已经超速，请司机立刻调整车速！'
      }]
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleEdit (index, row) {
      this.$prompt('请编辑内容', this.insideParams.name, {
        inputValue: row.value,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你调整后的值为: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
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
