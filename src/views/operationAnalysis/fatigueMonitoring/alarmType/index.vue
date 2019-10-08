<template>
  <div>
    <Search
      :isOrg='true'
      :isLine="true"
      :isBus="false"
      :isDate="true"
      :isTime="false"
      :isTurn="false"
      :isDownload="false"
      :isWarntype="false"
      @configCheck="getSearch"
    />
    <div class="content">
      <div class="statistics">
        <AlarmStatistics />
      </div>
      <div class="time-slot">
        <AlarmTimeSlot />
      </div>
      <div class="time-trend">
        <AlarmTimestrend />
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
  data () {
    return {
      searchData: {}
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
      this.searchData = item
    }
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
