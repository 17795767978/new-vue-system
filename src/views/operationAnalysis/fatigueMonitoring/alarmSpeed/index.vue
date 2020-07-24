<template>
  <div>
    <Search
      :isOrg='true'
      :isLine="true"
      :isDateTo="true"
      :isProcessingResult="userId === '1'"
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
import Search from '@/components/searchAlarm'
import SpeedStatistics from './Components/speedStatistics'
import SpeedType from './Components/speedType'
import SpeedNum from './Components/speedNum'
import { mapGetters } from 'vuex'
export default {
  name: 'alarmSpeed',
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
  computed: {
    ...mapGetters(['userId'])
  },
  methods: {
    getSearch (item) {
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
  height: 76vh;
  padding: 2vh 2vw;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .statistics {
    width: 40%;
    border-right: 1px solid #EBEEF5;
    height: 38vh;
    box-sizing: border-box;
  }
  .time-slot {
    width: 60%;
    height: 38vh;
  }
  .time-trend {
    width: 100%;
    height: 38vh;
    border-top: 1px solid #EBEEF5;
  }
}
</style>
