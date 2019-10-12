<template>
  <div>
    <Search
      :isOrg='true'
      :isLine="true"
      :isBus="false"
      :isDate="false"
      :isTime="false"
      :isTurn="false"
      :isDownload="false"
      :isWarntype="false"
      @configCheck="getSearch"
    />
    <div class="content">
      <div class="total-line-length">
        <TotalLineNum />
      </div>
      <div class="total-station-length">
        <TotalStationNum />
      </div>
      <div class="line-length">
        <LineLengthChart />
      </div>
      <div class="station-length">
        <StationTable />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Search from '@/components/searchAlarm'
import TotalLineNum from './Components/totalLineNumChart'
import TotalStationNum from './Components/totalStationChart'
import LineLengthChart from './Components/lineLengthChart'
import StationTable from './Components/stationTable'
export default {
  name: 'lineCondition',
  data () {
    return {
      selectData: {}
    }
  },
  methods: {
    getSearch (data) {
      this.selectData = data
      console.log(this.selectData)
    }
  },
  components: {
    Search,
    TotalLineNum,
    TotalStationNum,
    LineLengthChart,
    StationTable
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: calc(100vh - 16vh);
  padding: 2vh 2vw;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .total-line-length,
  .total-station-length {
    padding: 1vh 1vw;
    width: 50%;
    height: 50%;
    border-bottom: 1px solid #EBEEF5;
    box-sizing: border-box;
    &.total-line-length {
      border-right: 1px solid #EBEEF5;
      box-sizing: border-box;
    }
  }
  .line-length {
    width: 70%;
    height: 50%;
    border-right: 1px solid #EBEEF5;
    padding: 1vh 1vw;
    box-sizing: border-box;
  }
  .station-length {
    width: 30%;
    height: 50%;
    padding: 1vh 1vw;
    box-sizing: border-box;
  }
}
</style>
