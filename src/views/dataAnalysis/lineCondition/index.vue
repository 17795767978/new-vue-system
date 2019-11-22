<template>
  <div>
    <Search
      :isOrg='false'
      :isLine="false"
      :isLineSec="true"
      :isOrgSec="false"
      :isBus="false"
      :isDate="false"
      :isTime="false"
      :isTurn="false"
      :isDefault="false"
      :isDownload="false"
      :isWarntype="false"
      :isEmpty="true"
      :isLineEmpty="isLineEmpty"
      @configCheck="getSearch"
    />
    <div class="content">
      <div class="total-line-length">
        <TotalLineNum :selectData="selectData" @changeEcharts="changeEcharts"/>
      </div>
      <div class="total-station-length">
        <TotalStationNum :selectData="selectData"/>
      </div>
      <div class="line-length">
        <LineLengthChart :selectData="selectData" :echartsData="echartsData" @changeStation="changeStation"/>
      </div>
      <div class="station-length">
        <StationTable :selectData="selectData" :echartsData="echartsData" :stationData="stationData"/>
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
      selectData: {},
      echartsData: {},
      stationData: {},
      isLineEmpty: false
    }
  },
  methods: {
    getSearch (data) {
      this.selectData = data
    },
    changeEcharts (data) {
      this.echartsData = data
      this.isLineEmpty = true
    },
    changeStation (data) {
      this.stationData = data
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
