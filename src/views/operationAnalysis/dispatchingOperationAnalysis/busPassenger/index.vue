<template>
  <div class="bus-passenger-flow">
    <Search
      :isOrg='true'
      :isLine="true"
      :isEmpty="true"
      :isBus="true"
      :isDownload="true"
      :isBusSelfCode="true"
      :downLoadName="downLoadName"
      :selectData="selectData"
      :select="{
        date: [...timeArr],
        isHistory,
        getOnNumMin,
        getOnNumMax,
        getOffNumMin,
        getOffNumMax
      }"
      @handlerClear="handlerClear"
      @configCheck="getSearch"
    >
    <el-form-item label="选择日期:">
      <el-date-picker
        :picker-options="pickerOptions"
        :default-time="['00:00:00', '23:59:59']"
        v-model="timeArr"
        :clearable="false"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="上车人数:">
      <el-input v-model="getOnNumMin" placeholder="请输入" style="width: 150px"></el-input>
      -
      <el-input v-model="getOnNumMax" placeholder="请输入" style="width: 150px"></el-input>
    </el-form-item>
    <el-form-item label="下车人数:">
      <el-input v-model="getOffNumMin" placeholder="请输入" style="width: 150px"></el-input>
      -
      <el-input v-model="getOffNumMax" placeholder="请输入" style="width: 150px"></el-input>
    </el-form-item>
    <el-form-item label="查询时间">
      <el-radio v-model="isHistory" label="1">当天</el-radio>
      <el-radio v-model="isHistory" label="0">历史</el-radio>
    </el-form-item>
    </Search>
    <div class="content">
      <div class="org">
        <Table :selectData="selectData"/>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Search from '@/components/searchAlarm/'
import Table from './Components/table.vue'
export default {
  name: 'busPassenger',
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          const endTime = moment(moment().format('YYYY-MM-DD 23:59:59')).valueOf()
          return time.getTime() > endTime || (time.getTime() < endTime - 3600 * 24 * 1000)
        }
      },
      timeArr: [],
      isHistory: '1',
      getOnNumMin: null,
      getOnNumMax: null,
      getOffNumMin: null,
      getOffNumMax: null,
      selectData: {},
      downLoadName: 'passengerFlow.busTotalPersonExport'
    }
  },
  created () {
    let dateBefore = moment().format('YYYY-MM-DD 00:00:00')
    let dateAfter = moment().format('YYYY-MM-DD 23:59:59')
    this.timeArr = [dateBefore, dateAfter]
  },
  watch: {
    isHistory (newV) {
      if (newV === '1') {
        let dateBefore = moment().format('YYYY-MM-DD 00:00:00')
        let dateAfter = moment().format('YYYY-MM-DD 23:59:59')
        this.timeArr = [dateBefore, dateAfter]
        this.pickerOptions = {
          disabledDate (time) {
            const endTime = moment(moment().format('YYYY-MM-DD 23:59:59')).valueOf()
            return time.getTime() > endTime || (time.getTime() < endTime - 3600 * 24 * 1000)
          }
        }
      } else {
        this.pickerOptions = {
          disabledDate (time) {
            return time.getTime() > moment(moment().format('YYYY-MM-DD 23:59:59')).valueOf() - 3600 * 24 * 1000
          }
        }
        this.timeArr = []
      }
    },
    getOnNumMin (newV) {
      if (newV) {
        const isClear = Number(newV) > Number(this.getOnNumMax)
        if (isClear) {
          this.getOnNumMax = null
        }
      }
    },
    getOffNumMin (newV) {
      if (newV) {
        const isClear = Number(newV) > Number(this.getOffNumMax)
        if (isClear) {
          this.getOffNumMax = null
        }
      }
    }
  },
  methods: {
    handlerClear () {
      this.getOnNumMin = null
      this.getOnNumMax = null
      this.getOffNumMin = null
      this.getOffNumMax = null
    },
    getSearch (data) {
      if (this.timeArr.length > 0) {
        if (this.getOnNumMin && this.getOnNumMax && (Number(this.getOnNumMin) > Number(this.getOnNumMax))) {
          this.$message.warning('上车人数范围输入错误')
          this.getOnNumMax = null
          return
        }
        if (this.getOffNumMin && this.getOffNumMax && (Number(this.getOffNumMin) > Number(this.getOffNumMax))) {
          this.$message.warning('下车人数范围输入错误')
          this.getOffNumMax = null
          return
        }
        this.selectData = { ...data, isHistory: this.isHistory, startTime: this.timeArr[0], endTime: this.timeArr[1], getOnNumMin: this.getOnNumMin, getOnNumMax: this.getOnNumMax, getOffNumMin: this.getOffNumMin, getOffNumMax: this.getOffNumMax }
        console.log(this.selectData)
      } else {
        this.$message.error('请选择时间段')
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
.bus-passenger-flow {
  width: 100%;
  height: 75vh;
  .content {
    width: 100%;
    height: 71vh;
    padding: 2vh 2vw;
    box-sizing: border-box;
  }
}
</style>
