<template>
  <div>
    <Search
      isOrg
      isLine
      isBus
      isDate
      isEmpty
      isDownload
      :sortParams="sortParams"
      :downLoadName="downLoadName"
      @configCheck="getSearch"
    />
    <Table :selectData="selectData" @sortParam="getSortParam"/>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm/'
import Table from './Components/table'
export default {
  name: 'transactionForm',
  data () {
    return {
      downLoadName: 'downLoad.posExport',
      selectData: {},
      sortParams: ''
    }
  },
  methods: {
    getSearch (data) {
      this.selectData = data
    },
    getSortParam (data) {
      this.sortParams = data
    }
  },
  components: {
    Search,
    Table
  }
}
</script>

<style>

</style>
