<template>
  <div>
    <Search
      :isOrg='true'
      :isLine="true"
      :isDateTo="true"
      :isAudit="true"
      :isProcessingResult="true"
      :isEmpty="true"
      @configCheck="getSearch"
    />
    <div class="content">
      <div class="statistics">
        <SpeedStatistics :searchData="searchData" @echartsSelected="echartsSelected"/>
      </div>
      <div class="time-slot">
        <SpeedType :searchData="searchData" :selectEcharts="selectEcharts"/>
      </div>
      <div class="time-trend">
        <SpeedNum :searchData="searchData"/>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Bus from './Components/bus'
import Search from '@/components/searchAlarm'
import SpeedStatistics from './Components/speedStatistics'
import SpeedType from './Components/speedType'
import SpeedNum from './Components/speedNum'
import mixinsTime from '@/mixins/global/'
export default {
  name: 'alarmSpeed',
  mixins: [mixinsTime],
  data () {
    return {
      searchData: {},
      selectEcharts: {}
    }
  },
  components: {
    Search,
    SpeedStatistics,
    SpeedType,
    SpeedNum
  },
  created () {
    Bus.getAllWarnType()
  },
  beforeDestroy () {
    Bus.$off('handlerChange')
  },
  methods: {
    getSearch (item) {
      console.log(Bus)
      this.searchData = item
    },
    echartsSelected (data) {
      this.selectEcharts = data
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
