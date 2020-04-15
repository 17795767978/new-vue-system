<template>
  <el-dialog title="线路权限" :visible.sync="dialogTableVisible" :fullscreen="true">
    <el-row style="width: 100%; height: 80vh">
      <el-col :span="5" style="height: 100%; overflow-y: scroll; border: 1px solid #e5e5e5; margin-right: 1.5vw;border-radius: 6px;">
        <el-tree
          ref="tree"
          :data="lineTreeDatas"
          show-checkbox
          node-key="id"
          :default-expanded-keys="defaultKeys"
          @check="getCheckKey"
          :props="defaultProps">
        </el-tree>
      </el-col>
      <el-col :span="18" style="height: 100%;border: 1px solid #e5e5e5;border-radius: 6px; padding: 2vh 2vw; box-sizing:border-box">
        <el-table
           v-loading="loading"
          :data="tableData"
          border
          height="72.5vh"
          style="width: 100%">
          <el-table-column align="center" label="序号" type="index" width="60">
            <template slot-scope="scope">
              <span> {{scope.$index + (current - 1) * pageSize + 1}} </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="orgName"
            label="所属机构">
          </el-table-column>
          <el-table-column
            align="center"
            prop="lineName"
            label="所属线路">
          </el-table-column>
          <el-table-column
            align="center"
            prop="busPlateNumber"
            label="车牌号">
          </el-table-column>
          <el-table-column
            align="center"
            prop="busSelfCode"
            label="车辆自编号">
          </el-table-column>
        </el-table>
        <el-pagination
          style="float:right; margin-top: 1vh"
          background
          :current-page="current"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer" style="float:right; margin-right: 2.5vw">
      <el-button type="primary" @click="onSubmit" size="large">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    lineTreeDatas: {
      type: Array
    },
    rowData: {
      type: Object
    }
  },
  data () {
    return {
      loading: false,
      tableData: [],
      dialogTableVisible: false,
      defaultKeys: [],
      selectKeys: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      pageSize: 13,
      current: 1,
      total: 0
    }
  },
  watch: {
    selectKeys (newV) {
      this.loading = true
      this.tableDataAll = []
      this.tableData = []
      this.total = 0
      this.current = 1
      if (newV.length) {
        this.$api['wholeInformation.getBusByLineIds']({
          lineUuids: newV
        }).then(res => {
          this.loading = false
          this.tableDataAll = res
          this.total = res.length
          this.tableData = res.slice(0, this.pageSize)
        })
      } else {
        this.loading = false
        this.tableDataAll = []
        this.total = 0
        this.tableData = []
      }
    },
    rowData: {
      deep: true,
      handler (newV) {
        setTimeout(() => {
          this.defaultKeys = newV.lineAuths.map(item => item.lineUuid)
          this.$refs.tree.setCheckedKeys(this.defaultKeys)
          this.selectKeys = this.defaultKeys
        }, 20)
      }
    }
  },
  methods: {
    getCheckKey () {
      this.selectKeys = this.$refs.tree.getCheckedKeys()
    },
    handleCurrentChange (val) {
      this.current = val
      this.tableData = this.tableDataAll.slice((val - 1) * this.pageSize, val * this.pageSize)
    },
    onSubmit () {
      this.$api['wholeInformation.correlationLinePermissions']({
        roleId: this.rowData.roleId,
        resourceIds: this.selectKeys
      }).then(res => {
        this.$message.success('修改成功')
        this.dialogTableVisible = false
        this.$emit('updateList')
        this.tableDataAll = []
        this.tableData = []
        this.total = 0
        this.current = 1
        this.defaultKeys = []
        this.$refs.tree.setCheckedKeys([])
      }).catch(err => {
        this.dialogTableVisible = false
        this.defaultKeys = []
        this.$refs.tree.setCheckedKeys([])
        this.$message.error(err.message)
      })
    }
  }
}
</script>

<style>

</style>
