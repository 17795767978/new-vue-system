<template>
  <div>
    <Search
      isOrg
      isLine
      isBus
      isDate
      isEmpty
      isDownload
      :downLoadName="downLoadName"
      @configCheck="getSearch"
    />
    <Table :selectData="selectData"/>
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

<style>

</style>
