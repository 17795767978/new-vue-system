<template>
  <div class="bus-passenger-flow">
    <Search
      :isOrg='true'
      :isLine="true"
      :isEmpty="true"
      :isBus="true"
      :isDeviceCode="true"
      :isDiff="true"
      :isDateWeek="true"
      :isDownload="true"
      :isDateToLimit="true"
      :downLoadName="downLoadName"
      @configCheck="getSearch"
    >
    </Search>
    <div class="content">
      <Table :searchData="searchData"/>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm/'
import Table from './Components/table.vue'
export default {
  name: 'busPassengerWeek',
  data () {
    return {
      searchData: {},
      downLoadName: 'passengerFlow.getBusPersonTotalWeekListExport'
    }
  },
  created () {
  },
  methods: {
    getSearch (data) {
      if (data.endDate === '') {
        this.$message.warning('请选择结束时间')
        return
      }
      this.searchData = data
    }
  },
  components: {
    Search,
    Table
  }
}
</script>

<style lang="scss" scoped>
.bus-passenger-flow {
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
