<template>
  <div class="diary-table">
    <Search
      :isOrg='true'
      :isLine="true"
      :isBus="true"
      :isDate="true"
      :isDownload="true"
      :isEmpty="true"
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
import mixinsTime from '@/mixins/global/'
export default {
  name: 'chargeDetail',
  mixins: [mixinsTime],
  data () {
    return {
      selectData: {},
      downLoadName: 'tiredMonitoring.chargeExport'
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
