<template>
  <div class="search-passenger-flow">
    <Search
      isOrg
      isLine
      isBus
      isStatusNum
      isDataCurrent
      isEmpty
      isDownload
      :downLoadName="downLoadName"
      @configCheck="getSearch"
    />
    <div class="content">
      <div class="org">
        <Table :selectData="selectData"/>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Search from '@/components/searchAlarm/'
import Table from './Components/table'
export default {
  name: 'passengerFlowLogQuery',
  data () {
    return {
      selectData: {},
      downLoadName: 'passengerFlow.getBusKlStatisticalExportLog'
    }
  },
  components: {
    Search,
    Table
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    getSearch (data) {
      this.selectData = data
    }
  }
}
</script>

<style lang="scss" scoped>
.search-passenger-flow {
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
