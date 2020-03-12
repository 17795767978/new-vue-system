<template>
  <div class="status-management">
    <Search
      :isOrg="true"
      :isLine="true"
      :isBus="true"
      :isDate="true"
      :isStatusNum="true"
      :isSelfNum="true"
      :isStatusType="true"
      :isEmpty="true"
      :isRadio="true"
      :isOnline="true"
      @configCheck="getSearch"
    />
    <div class="table">
      <Table :selectData="selectData"/>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Table from './Components/table'
export default {
  name: 'statusManagement',
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
.status-management {
  .table {
    padding: 2vw 2vw;
    box-sizing: border-box;
  }
}
</style>
