<template>
  <div class="monitoring-ledger">
    <Search
      :isOrg='true'
      :isLine="true"
      :isBus="true"
      :isDate="true"
      :isEmpty="true"
      :isSelfCode="true"
      :isDeviceCode="true"
      :isDownload="true"
      :downLoadName="downLoadName"
      @configCheck="getSearch" />
      <div class="table-style">
        <Table :selectData="selectData"/>
      </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Table from './Components/table'
export default {
  name: 'equipmentCapture',
  data () {
    return {
      selectData: {},
      downLoadName: 'downLoad.deviceExport'
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
