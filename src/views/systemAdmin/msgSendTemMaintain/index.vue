<template>
  <div class="alarm-table">
    <el-row class="title-box">
      <el-button type="success" @click="handleEdit(null)">新增提醒类型</el-button>
    </el-row>
    <el-form :inline="true" size="mini" class="form-inline">
      <el-form-item label="类型名称">
        <el-input class="font-style" filterable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="warning">重置</el-button>
      </el-form-item>
      <div class="tableWrapper">
        <el-table
          :data="tableData"
          @expand-change="expandChange"
          border
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <!-- props.row -->
                <inside-table :insideParams="props.row"></inside-table>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="60"
            label="序号">
            <template slot-scope="scope">
              {{scope.$index + (parseInt(currentPage) - 1) * 10 + 1}}
            </template>
          </el-table-column>
          <el-table-column
            label="提醒类型编号"
            prop="id">
          </el-table-column>
          <el-table-column
            label="提醒类型名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="操作"
            width="200"
            align="center">
            <template slot-scope="scope">
              <!-- scope.$index, scope.row -->
              <el-button
                @click="handleEdit(scope.row)"
                type="primary"
                size="mini">修改</el-button>
              <el-button
                size="mini"
                type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <div class="block">
      <el-pagination
        class="pagination-box"
        background
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
      <span class="demonstration">共{{total}}条</span>
    </div>
    <!-- 编辑 新增 弹窗 -->
    <pop-dialog
      :dialogVisible="dialogVisible"
      :config="dialogConfig"
      @close="closeDialog"
    ></pop-dialog>
  </div>
</template>
<script>
import InsideTable from './components/insideTable'
import PopDialog from './components/popDialog'
export default {
  name: 'msgTempMaintain',
  components: {
    InsideTable,
    PopDialog
  },
  methods: {
    handleCurrentChange () {},
    expandChange (a, b) {},
    handleEdit (row) {
      this.dialogVisible = true
      this.dialogConfig = row
    },
    closeDialog () {
      this.dialogVisible = false
    }
  },
  data () {
    return {
      currentPage: 1,
      total: 5,
      dialogVisible: false,
      dialogConfig: null,
      tableData: [
        {
          id: '12987122',
          name: '超速报警'
        }, {
          id: '12987123',
          name: '摄像头遮挡'
        }, {
          id: '15616155',
          name: '打哈欠'
        }, {
          id: '15164464',
          name: '闭眼'
        }, {
          id: '54512121',
          name: '车距过近预警'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.alarm-table {
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}
.title-box {
  margin-bottom: 20px;
}
.form-inline {
  min-height: 4vh;
  .font-style {
    width: 130px;
  }
}
.demonstration {
  float: right;
  margin-top: 20px;
  line-height: 36px;
  font-size: 14px;
}
.pagination-box {
  float: right;
  margin-top: 20px;
}
</style>
