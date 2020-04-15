<template>
  <div class="car-sort">
    <Search
      :isOrg='true'
      :isLine="true"
      :isDateTo="true"
      :isEmpty="true"
      :isWarntype="true"
      :isDownload="true"
      :isProcessingResult="true"
      :downLoadName="downLoadName"
      @configCheck="getSearch"
    />
    <!-- <h2 class="title">不良驾驶行为分析报警车辆排行</h2> -->
    <div class="table-style">
      <Table :searchData="searchData" />
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Table from './Components/Table'
import mixinsTime from '@/mixins/global/'
export default {
  name: 'carSort',
  mixins: [mixinsTime],
  data () {
    return {
      searchData: {},
      downLoadName: 'downLoad.getBadDrivingBusRankingExport'
    }
  },
  components: {
    Search,
    Table
  },
  methods: {
    getSearch (data) {
      this.searchData = data
    }
  }
}
</script>

<style scoped lang="scss">
.car-sort {
  width: 100%;
  height: 87vh;
  .title  {
    width: 100%;
    height: 5vh;
    line-height: 5vh;
    font-size: 3vh;
    text-align: center;
  }
  .table-style {
    padding: 0 2vw;
    box-sizing: border-box;
  }
}
</style>
