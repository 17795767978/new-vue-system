<template>
  <div>
    <Search
      :isOrg='true'
      :isLine="true"
      :isBus="false"
      :isDate="true"
      :isTime="false"
      :isTurn="false"
      :isDownload="false"
      :isWarntype="true"
      @configCheck="getSearch"
    />
    <div class="table">
      <Table />
    </div>
    <div class="driver">
      <Driver />
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
      searchData: {}
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
