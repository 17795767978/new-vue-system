<template>
  <div class="bus-passenger-flow">
    <Search
      :isOrg='true'
      :isLine="true"
      :isDefault="true"
      :isEmpty="true"
      :isBus="true"
      :isDate="true"
      :isRadio="true"
      :isBusSelfCode="true"
      :isDownload="true"
      :downLoadName="downLoadName"
      :select="{
        date: [...timeArr],
        isHistory
      }"
      @configCheck="getSearch"
    >
    <el-form-item label="选择日期">
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
    <el-form-item label="查询时间">
      <el-radio v-model="isHistory" label="0">当天</el-radio>
      <el-radio v-model="isHistory" label="1">历史</el-radio>
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
import mixinsTime from '@/mixins/global/'
export default {
  name: 'busPassenger',
  mixins: [mixinsTime],
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          const endTime = moment(moment().format('YYYY-MM-DD 23:59:59')).valueOf()
          return time.getTime() > endTime || (time.getTime() < endTime - 3600 * 24 * 1000)
        }
      },
      timeArr: [],
      isHistory: '0',
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
      if (newV === '0') {
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
    }
  },
  methods: {
    getSearch (data) {
      if (this.timeArr.length > 0) {
        this.selectData = { ...data, isHistory: this.isHistory, startTime: this.timeArr[0], endTime: this.timeArr[1] }
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
