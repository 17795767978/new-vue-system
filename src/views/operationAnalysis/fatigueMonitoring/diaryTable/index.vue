<template>
  <div class="diary-table">
    <Search
      :isOrg='true'
      :isDataCurrent="true"
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
  name: 'diaryTable',
  mixins: [mixinsTime],
  data () {
    return {
      selectData: {},
      downLoadName: 'downLoad.getAlarmUploadReportDayExcel'
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
.diary-table {
  .table-style {
    width: 100%;
    padding: 2vh 2vw;
    box-sizing: border-box;
  }
}
</style>
