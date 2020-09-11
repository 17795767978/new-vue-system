<template>
  <div class="monitoring-ledger">
    <Search
      :isOrg='true'
      :isLine="true"
      :isBus="true"
      :isBusSelfCode="true"
      :isDriverNum="true"
      :isDate="true"
      :isEmpty="true"
      :isWarntype="true"
      :isDownload="true"
      :isAudit="true"
      :isProcessingResult="true"
      :downLoadName="downLoadName"
      @configCheck="getSearch" />
      <div class="table-style">
        <Table :selectData="selectData"/>
      </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Table from './Components/Table'
import mixinsTime from '@/mixins/global/'
export default {
  name: 'monitoringLedger',
  mixins: [mixinsTime],
  data () {
    return {
      selectData: {},
      downLoadName: 'downLoad.getDrivingBehaviorDayExport'
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
