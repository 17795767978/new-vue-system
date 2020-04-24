<template>
  <div>
    <Search
      :isMonth="true"
      :isEmpty="true"
      :isStation="true"
      @configCheck="getSearch"
      @emptySelect="handlerEmpty"
    >
      <span style="margin-right: 0.5vw;">出发时间</span>
      <el-time-select
        size="mini"
        style="width: 7vw"
        placeholder="起始时间"
        v-model="slotData.stHour"
        :picker-options="{
          start: '06:00',
          step: '01:00',
          end: '23:00'
        }">
      </el-time-select>
      -
      <el-time-select
        size="mini"
        style="width: 7vw;margin-right: 1vw;"
        placeholder="结束时间"
        v-model="slotData.edHour"
        :picker-options="{
          start: '06:00',
          step: '01:00',
          end: '23:00',
          minTime: slotData.stHour
        }">
      </el-time-select>
      <span style="margin-right: 0.5vw;">直线距离（km）</span>
      <el-input class="default" min="0" v-model="slotData.startDis" size="mini"
        style="width: 7vw" placeholder="起始距离" type="number"></el-input>
      -
      <el-input class="default" min="0" v-model="slotData.endDis" size="mini"
        style="width: 7vw;margin-right: 1vw;" placeholder="结束距离" type="number"></el-input>

      <span style="margin-right: 0.5vw;">刷卡人数</span>
      <el-input  class="default" min="0" v-model="slotData.startNum" size="mini"
        style="width: 7vw"  type="number"></el-input>
      -
      <el-input class="default" min="0" v-model="slotData.endNum" size="mini"
        style="width: 7vw;margin-right: 1vw;" type="number"></el-input>
        <el-button slot="download" type="success" size="mini" @click="centerDialogVisible = true">导出</el-button>
    </Search>
    <div class="table">
      <Table :selectData="selectData"/>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
       <p>导出只支持最大下载量为1048575条，如果超过1048575条默认下载前1048575条</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getExcel"  :loading="downLoadLoading">确认</el-button>
        <!-- <downloadExcel
          :data= "excelData"
          type="xls"
          style="display: inline-block; margin-left: 10px;"
          name= "客流查询报表.xls"
        >
        </downloadExcel> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Table from './Components/table'
import moment from 'moment'
export default {
  name: 'cityOD',
  data () {
    return {
      selectData: {},
      slotData: {
        stHour: '07:00',
        edHour: '09:00',
        startDis: '',
        endDis: '',
        startNum: '',
        endNum: ''
      },
      centerDialogVisible: false,
      downLoadLoading: false
    }
  },
  watch: {
    'slotData.startDis': {
      handler (newV) {
        this.handleFieldZero(newV, 'startDis')
      }
    },
    'slotData.endDis': {
      handler (newV) {
        this.handleFieldZero(newV, 'endDis')
      }
    },
    'slotData.startNum': {
      handler (newV) {
        this.handleFieldZero(newV, 'startNum')
      }
    },
    'slotData.endNum': {
      handler (newV) {
        this.handleFieldZero(newV, 'endNum')
      }
    }
  },
  methods: {
    // 验证不能小于零
    handleFieldZero (num, type) {
      if (Number(num) < 0) {
        this.slotData[type] = ''
        this.$message.warning('值不能小于0')
      }
    },
    // 验证结束大于开始
    handleAbout (num, type, com) {
      if (Number(num) <= Number(this.slotData[com])) {
        this.slotData[type] = ''
        this.$message.warning('结束值必须大于开始值')
      }
    },
    getSearch (data) {
      if (this.slotData.endNum !== '') {
        this.handleAbout(this.slotData.endNum, 'endNum', 'startNum')
      }
      if (this.slotData.endDis !== '') {
        this.handleAbout(this.slotData.endDis, 'endDis', 'startDis')
      }
      this.selectData = { ...data, ...this.slotData }
    },
    handlerEmpty () {
      this.selectData = {}
      this.slotData = {
        stHour: '',
        edHour: '',
        startDis: '',
        endDis: '',
        startNum: '',
        endNum: ''
      }
    },
    getExcel () {
      console.log(this.selectData)
      this.downLoadLoading = true
      if (Object.keys(this.selectData).length > 0) {
        this.$api['downLoad.stationODExports']({
          month: moment(this.selectData.month).format('YYYY-MM'),
          linearDistanceMin: this.slotData.startDis,
          linearDistanceMax: this.slotData.endDis,
          payNumberMin: this.slotData.startNum,
          payNumberMax: this.slotData.endNum,
          upStaUuids: this.selectData.startStation.value,
          downStaUuids: this.selectData.endStation.value,
          payTimeIntervalMin: this.slotData.stHour,
          payTimeIntervalMax: this.slotData.edHour
        }).then(res => {
          this.downLoadLoading = false
          // console.log(res)
          window.open(res.url)
          // window.location.href = res.url
          this.centerDialogVisible = false
          this.$message.success('正在下载中。。。')
        }).catch((err) => {
          this.downLoadLoading = false
          this.$message.error(err.message)
        })
      } else {
        this.$message.warning('请先查询再导出')
        this.downLoadLoading = false
      }
    }
  },
  components: {
    Search,
    Table
  }
}
</script>

<style lang="scss" scoped>
.table {
  padding: 2vh 10vw 0;
  box-sizing: border-box;
}
</style>
