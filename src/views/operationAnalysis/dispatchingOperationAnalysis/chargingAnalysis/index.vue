<template>
  <div>
     <Search
      isOrg
      isLine
      isBus
      isBusMul
      isDateQuick
      isEmpty
      @configCheck="getSearch"
    />
    <Table :selectData="selectData"/>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm/'
import Table from './Components/table'
export default {
  name: 'chargingAnalysis',
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

<style>

</style>
