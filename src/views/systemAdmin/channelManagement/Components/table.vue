<template>
  <div v-loading="isloading">
    <h2 style="width: 100%; height: 2vh; text-align: center;line-height: 2vh">通道配置列表
      <el-button type="success" style="float:right; margin-right: 10vw;" size="mini" @click="onSave" v-if="tableData.length > 0">批量保存</el-button>
    </h2>
    <el-table
      ref="tableWrapper"
      :data="tableDataOwn"
      height="60vh"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        label="序号"
        type="index"
        width="60">
        <template slot-scope="scope">
          <span> {{scope.$index + (pageNumber - 1) * pageSize + 1}} </span>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in columnArr"
        :key="item"
        align="center"
        :prop="item"
        :label="index === 0 ? '车牌号' : `视频通道${item.substring(5, item.length)}`">
        <template slot-scope="scope">
          <el-select v-if="index > 0" v-model="scope.row[item]" :placeholder="`请选择通道`" clearable
            @change="getChange(scope.row)"
            @clear="getClear(item.substring(5, item.length))"
            @visible-change="getFocus(scope.row)"
            :disabled="scope.row.disabled && tableData.length === 0"
            >
            <el-option
              v-for="item in videoInfo"
              :key="item.value"
              :label="item.label"
              :disabled="item.disabled"
              :value="item.value">
            </el-option>
          </el-select>
          <span v-else>{{scope.row.busPlateNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        v-if="tableData.length === 0"
        width="150">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.disabled === true" @click="canEdit(scope.row)" size="small">编辑</el-button>
          <el-button type="primary" v-else @click="canEdit(scope.row)" size="small">取消</el-button>
          <el-button type="success" @click="save(scope.row)" size="small">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right; margin-top: 20px;"
      background
      :current-page="pageNumber"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  props: {
    selectData: {
      type: Object
    },
    tableData: {
      type: Array
    },
    videoTableHeader: {
      type: Array
    }
  },
  data () {
    return {
      tableDataAll: [],
      tableDataOwn: [],
      columnArr: ['busPlateNumber'],
      isloading: true,
      total: 0,
      pageNumber: 1,
      pageSize: 10,
      videoInfo: '',
      oldRow: {}
    }
  },
  computed: {
    ...mapGetters(['formData'])
  },
  created () {
    this.isloading = true
    this._getVideoInfo()
  },
  mounted () {
    setTimeout(() => {
      this.videoInfo.forEach((item, index) => {
        this.columnArr.push(`video${index + 1}`)
      })
      this.isloading = false
    }, 1000)
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this._getTableData({
          orgUuid: newV.orgId === '1' ? '' : newV.orgId,
          lineUuid: newV.lineId,
          busPlateNumbers: newV.busNumber,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        })
      }
    },
    tableData: {
      deep: true,
      handler (newV) {
        this.isloading = true
        this.tableDataAll = newV
        if (newV.length > 0) {
          this.pageNumber = 1
          this.tableDataOwn = this.tableDataAll.slice(0, 10)
          this.total = newV.length
        } else {
        }
        setTimeout(() => {
          this.isloading = false
        }, 1000)
      }
    },
    videoTableHeader: {
      deep: true,
      handler (newV) {
        this.columnArr = newV
      }
    }
  },
  methods: {
    _getVideoInfo () {
      this.videoInfo = []
      this.$api['wholeInformation.videoInfo']().then(res => {
        res.forEach(item => {
          if (item.videoIsvalid === '1') {
            this.videoInfo.push({
              label: item.videoName,
              value: item.videoName,
              disabled: false
            })
          }
        })
      })
    },
    _getTableData (params) {
      this.columnArr = ['busPlateNumber']
      this.tableDataOwn = []
      this.pageNumber = 1
      this.videoInfo.forEach((item, index) => {
        this.columnArr.push(`video${index + 1}`)
      })
      this.isloading = true
      this.$api['wholeInformation.videoList'](params).then(res => {
        this.total = res.total
        res.list.forEach(item => {
          this.tableDataOwn.push({
            ...item,
            ...{
              disabled: true
            }
          })
        })
        this.$emit('clearTableData', [])
        setTimeout(() => {
          this.isloading = false
        }, 1000)
      })
    },
    // 下拉合上
    getFocus (row) {
      let dataArr = []
      Object.keys(row).forEach(key => {
        dataArr.push(row[key])
      })
      this.videoInfo.forEach(item => {
        if (dataArr.some(info => item.value === info)) {
          item.disabled = true
        } else {
          item.disabled = false
        }
      })
    },
    // 修改
    getChange (row) {
      this.tableDataAll = JSON.parse(JSON.stringify(this.tableDataAll))
      Object.keys(row).forEach(item => {
        this.videoInfo.forEach(info => {
          if (info.value === row[item]) {
            info.disabled = true
          } else {
            info.disabled = false
          }
        })
      })
    },
    getClear (index) {
      this.videoInfo[index - 1].disabled = false
    },
    onSave () {
      console.log(this.tableData)
      this.$api['wholeInformation.videoInfoAdd']({
        list: JSON.stringify(this.tableData)
      }).then(res => {
        this.$message.success(`修改成功`)
      })
    },
    canEdit (row) {
      if (row.disabled === true) {
        row.disabled = false
      } else {
        row.disabled = true
      }
    },
    save (row) {
      console.log(row)
      this.$api['wholeInformation.videoUpdateList']({
        list: JSON.stringify([{ ...row }])
      }).then(res => {
        row.disabled = true
        this.$message.success('修改成功')
        this.pageNumber = 1
        this._getTableData({
          orgUuid: this.selectData.orgId === '1' ? '' : this.selectData.orgId,
          lineUuid: this.selectData.lineId,
          busPlateNumbers: this.selectData.busNumber,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        })
      })
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      if (this.tableData.length > 0) {
        this.tableDataOwn = this.tableData.slice((val - 1) * 10, val * 10)
      } else {
        this._getTableData({
          orgUuid: this.selectData.orgId === '1' ? '' : this.selectData.orgId,
          lineUuid: this.selectData.lineId,
          busPlateNumbers: this.selectData.busNumber,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        })
      }
    }
  }
}
</script>

<style>

</style>
