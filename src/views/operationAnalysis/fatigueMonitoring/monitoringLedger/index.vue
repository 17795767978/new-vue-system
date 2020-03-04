<template>
  <div class="monitoring-ledger">
    <Search
      :isOrg='true'
      :isLine="true"
      :isBus="true"
      :isDriverNum="true"
      :isDate="true"
      :isEmpty="true"
      :isWarntype="true"
      @configCheck="getSearch" />
      <div class="table-style">
        <Table :selectData="selectData"/>
      </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Table from './Components/Table'
export default {
  name: 'monitoringLedger',
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
    Table
  }
}
</script>

<style lang="scss" scoped>
.monitoring-ledger {
  .table-style {
    width: 100%;
    padding: 3vh 5vw;
    box-sizing: border-box;
  }
}
</style>
