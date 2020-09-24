<template>
  <div>
     <Search
      isOrg
      isLine
      isBus
      isDate
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
  name: 'energyConsumptionAnalysis',
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
