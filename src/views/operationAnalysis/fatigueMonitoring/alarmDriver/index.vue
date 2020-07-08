<template>
  <div>
    <Search
      :isOrg='true'
      :isLine="true"
      :isDateTo="true"
      :isEmpty="true"
      :isWarntype="true"
      :isDownload="true"
      :isProcessingResult="userId === '1'"
      :downLoadName="downLoadName"
      @configCheck="getSearch"
    />
    <div class="table">
      <Table :searchData="searchData" @driverChanged="driverChanged"/>
    </div>
    <!-- <div class="driver">
      <Driver :searchData="searchData" :driverData="driverData"/>
    </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
import Search from '@/components/searchAlarm'
// import Driver from './Components/driver'
import Table from './Components/table'
import { mapGetters } from 'vuex'
export default {
  name: 'alarmDriver',
  data () {
    return {
      searchData: {},
      driverData: {},
      downLoadName: 'downLoad.getBadDrivingDriverRankingExport'
    }
  },
  components: {
    Search,
    Table
    // Driver
  },
  computed: {
    ...mapGetters(['userId'])
  },
  methods: {
    getSearch (item) {
      this.searchData = item
    },
    driverChanged (data) {
      this.driverData = data
    }
  },
  destroyed () {
    console.log('alarmDriver')
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  padding: 0px 1vw 1vh;
  height: 75vh;
  box-sizing: border-box;
  // border-bottom: 1px solid #EBEEF5;
}
.driver {
  width: 100%;
  padding: 0px 1vw;
  height: 27vh;
  box-sizing: border-box;
}
</style>
