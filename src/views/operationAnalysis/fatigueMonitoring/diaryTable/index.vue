<template>
  <div class="diary-table">
    <Search
      :isOrg='true'
      :isDataCurrent="true"
      :isDownload="true"
      :isProcessingResult="userId === '1'"
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
import { mapGetters } from 'vuex'
export default {
  name: 'diaryTable',
  data () {
    return {
      selectData: {},
      downLoadName: 'downLoad.getAlarmUploadReportDayExcel'
    }
  },
  computed: {
    ...mapGetters(['userId'])
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
