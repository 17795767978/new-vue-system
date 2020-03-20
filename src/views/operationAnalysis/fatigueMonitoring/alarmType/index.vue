<template>
  <div>
    <Search
      :isOrg='true'
      :isLine="true"
      :isBus="false"
      :isDate="false"
      :isDateTo="true"
      :isTime="false"
      :isTurn="false"
      :isEmpty="true"
      :isDownload="false"
      :isWarntype="false"
      @configCheck="getSearch"
    />
    <div class="content">
      <div class="statistics">
        <AlarmStatistics :searchData="searchData" @echartsSelected="echartsSelected"/>
      </div>
      <div class="time-slot">
        <AlarmTimeSlot :searchData="searchData" :selectEcharts="selectEcharts"/>
      </div>
      <div class="time-trend">
        <AlarmTimestrend  :searchData="searchData" :selectEcharts="selectEcharts"/>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Search from '@/components/searchAlarm'
import AlarmStatistics from './Components/alarmStatistics'
import AlarmTimeSlot from './Components/alarmTimeslot'
import AlarmTimestrend from './Components/alarmTimetrend'
export default {
  name: 'alarmType',
  data () {
    return {
      searchData: {},
      selectEcharts: {}
    }
  },
  components: {
    Search,
    AlarmStatistics,
    AlarmTimeSlot,
    AlarmTimestrend
  },
  methods: {
    getSearch (item) {
      if (item.dateArray.length === 0) {
        this.$message.warning('请添加时间段查询')
      } else {
        this.searchData = item
      }
    },
    echartsSelected (data) {
      this.selectEcharts = data
    }
  },
  destroyed () {
    console.log('alarmType')
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 84vh;
  padding: 2vh 2vw;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .statistics {
    width: 35%;
    border-right: 1px solid #EBEEF5;
    height: 42vh;
    box-sizing: border-box;
  }
  .time-slot {
    width: 65%;
    height: 42vh;
  }
  .time-trend {
    width: 100%;
    height: 40vh;
    border-top: 1px solid #EBEEF5;
  }
}
</style>
