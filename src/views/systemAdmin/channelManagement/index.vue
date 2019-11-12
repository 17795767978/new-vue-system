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
      <Table :selectData="selectData"/>
    </div>
    <el-dialog
      title="请选择通道"
      :visible.sync="dialogVisible"
      width="20%">
      <ul>
        <li style="margin-bottom: 1vh;" v-for="(options, index) in videoInfo" :key="options.value">
          <span>{{`通道${index + 1}: `}}</span>
          <el-select v-model="videoInfoData[index]" :placeholder="`请选择通道${index + 1}`" @change="getChange" clearable @clear="getClear(index)">
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
export default {
  name: 'channelManagement',
  data () {
    return {
      selectData: {},
      selectDataMul: {},
      dialogVisible: false,
      videoInfoData: [],
      videoInfo: [
        {
          label: '前路',
          value: '前路',
          disabled: false
        },
        {
          label: '司机',
          value: '司机',
          disabled: false
        },
        {
          label: '前门',
          value: '前门',
          disabled: false
        },
        {
          label: '后门',
          value: '后门',
          disabled: false
        },
        {
          label: '前车厢',
          value: '前车厢',
          disabled: false
        }, {
          label: '后车厢',
          value: '后车厢',
          disabled: false
        }
      ]
    }
  },
  methods: {
    getSearch (data) {
      this.selectData = data
    },
    getSearchMul (data) {
      this.selectDataMul = data
      console.log(this.selectDataMul)
      if (this.selectDataMul.lineId === '' && this.selectDataMul.busNumber.length === 0) {
        this.$message.warning('请选择线路或车辆')
      } else {
        this.dialogVisible = true
      }
    },
    seeTable () {
      console.log(this.videoInfoData)
      this.dialogVisible = false
    },
    getChange (data) {
      console.log(data)
      this.videoInfo.forEach(item => {
        if (item.value === data) {
          item.disabled = true
        }
      })
    },
    getClear (index) {
      console.log(index)
      this.videoInfo[index].disabled = false
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
