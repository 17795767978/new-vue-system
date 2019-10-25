<template>
  <div>
    <Search
      :isOrg='true'
      :isLine="true"
      :isBus="false"
      :isDate="false"
      :isDateTo="true"
      :isTime="false"
      :isTurn="false"
      :isDownload="false"
      :isEmpty="true"
      :isWarntype="true"
      @configCheck="getSearch"
    />
    <div class="table">
      <Table :searchData="searchData" @driverChanged="driverChanged" v-change/>
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
  directives: {
    change: {
      componentUpdated (el) {
        console.log(el)
      }
    }
  },
  methods: {
    getSearch (item) {
      this.searchData = item
    },
    driverChanged (data) {
      this.driverData = data
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  padding: 0px 5vw 1vh;
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
