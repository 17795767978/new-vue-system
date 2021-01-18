<template>
  <div>
    <Search
      :isOrg='true'
      :isLine="true"
      :isDateTo="true"
      :isEmpty="true"
      :isWarntype="true"
      @configCheck="getSearch"
    />
    <div class="table">
      <Table :searchData="searchData" @driverChanged="driverChanged"/>
    </div>
    <div class="driver">
      <Driver :searchData="searchData" :driverData="driverData"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Search from '@/components/searchAlarm'
import Driver from './Components/driver'
import Table from './Components/table'
export default {
  name: 'alarmDriver',
  data () {
    return {
      searchData: {},
      driverData: {}
    }
  },
  components: {
    Search,
    Table,
    Driver
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
  height: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #EBEEF5;
}
.driver {
  width: 100%;
  padding: 0px 1vw;
  height: 27vh;
  box-sizing: border-box;
}
</style>
