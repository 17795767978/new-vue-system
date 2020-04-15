<template>
  <div>
    <Search
      :isOrg='true'
      :isLine="true"
      :isEmpty="true"
      :isBus="true"
      :isBusMul="true"
      :isMul="true"
      @configCheck="getSearch"
      @configCheckMul="getSearchMul" />
    <div class="table">
      <Table :selectData="selectData" :tableData="tableData" :videoTableHeader="videoTableHeader" :videoInfo="videoInfo" @clearTableData="clearTableData"/>
    </div>
    <el-dialog
      title="请选择通道"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @close="closeClear"
      width="20%">
      <ul>
        <li style="margin-bottom: 1vh;" v-for="(options, index) in videoInfo" :key="options.value">
          <span>{{`通道${index + 1}: `}}</span>
          <el-select v-model="videoInfoData[index]" :placeholder="`请选择通道${index + 1}`" @change="getChange" clearable @clear="getClear(index)" @blur="changeStatus">
            <el-option
              v-for="item in videoInfo"
              :key="item.value"
              :label="item.label"
              :disabled="item.disabled"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="seeTable">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Table from './Components/table'
import mixinsTime from '@/mixins/global/'
export default {
  name: 'channelManagement',
  mixins: [mixinsTime],
  data () {
    return {
      selectData: {}, // 单一查询
      selectDataMul: {}, // 批量
      dialogVisible: false,
      videoInfoData: [], // 通道列表
      tableData: [], // 批量生成通道的table
      videoTableHeader: [],
      videoInfo: []
    }
  },
  created () {
    this._getVideoInfo()
  },
  methods: {
    _getVideoInfo () {
      this.$api['wholeInformation.videoInfo']().then(res => {
        this.videoInfo = []
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
    getSearch (data) {
      this.selectData = data
    },
    getSearchMul (data) {
      this.selectDataMul = data
      if (this.selectDataMul.lineId === '' && this.selectDataMul.busNumber.length === 0) {
        this.$message.warning('请选择线路或车辆')
      } else {
        this.dialogVisible = true
      }
    },
    seeTable () {
      this.tableData = []
      this.selectDataMul.busNumber.forEach((item, index) => {
        this.tableData[index] = {
          busPlateNumber: item
        }
        this.videoTableHeader.push('busPlateNumber')
        this.videoInfoData.forEach((info, infoIndex) => {
          this.tableData[index][`video${infoIndex + 1}`] = info
          this.videoTableHeader.push(`video${infoIndex + 1}`)
        })
      })
      this.videoTableHeader = Array.from(new Set([...this.videoTableHeader]))
      this.dialogVisible = false
    },
    getChange (data) {
      this.videoInfo.forEach(item => {
        if (this.videoInfoData.some(info => item.value === info)) {
          item.disabled = true
        } else {
          item.disabled = false
        }
      })
    },
    changeStatus () {
    },
    // 清空input
    getClear (index) {
      console.log(index)
      this.videoInfo[index].disabled = false
    },
    // 关闭弹窗
    closeClear () {
      this.videoInfoData = []
      this.videoInfo.forEach(item => {
        item.disabled = false
      })
      // this.videoTableHeader = []
    },
    // 点击查询时 清除批量的生成table
    clearTableData (data) {
      this.tableData = []
    }
  },
  components: {
    Search,
    Table
  }
}
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  padding: 0px 1vw 1vh;
  height: 100%;
  box-sizing: border-box;
}
</style>
