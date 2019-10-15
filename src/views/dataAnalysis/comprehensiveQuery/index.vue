<template>
  <div>
    <Search
      :isOrg='false'
      :isLine="false"
      :isOrgSec='true'
      :isDefault="true"
      :isLineSec="true"
      :isMonth="false"
      :isBus="false"
      :isDate="false"
      :isDataCurrent="true"
      :isTime="false"
      :isTurn="true"
      :isDownload="true"
      :isWarntype="false"
      @configCheck="getSearch"
    />
    <div class="content">
      <div class="total-line-length">
        <QueryTable :selectData="selectData"/>
      </div>
      <div class="total-station-length">
        <div class="settings">
          <Settings />
        </div>
        <div class="echarts">
          <QueryEcharts :selectData="selectData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Search from '@/components/searchAlarm'
import QueryTable from './Components/queryTable'
import Settings from './Components/setting'
import QueryEcharts from './Components/queryEcharts'
export default {
  name: 'comprehensiveQuery',
  data () {
    return {
      selectData: {}
    }
  },
  methods: {
    getSearch (data) {
      this.selectData = data
    }
  },
  components: {
    Search,
    QueryTable,
    Settings,
    QueryEcharts
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
    width: 100%;
    height: 50%;
    &.total-line-length {
      border-bottom: 1px solid #EBEEF5;
      box-sizing: border-box;
    }
    .echarts {
      width: 100%;
      height: 36vh;
    }
  }
}
</style>
