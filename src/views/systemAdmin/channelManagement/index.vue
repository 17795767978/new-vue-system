<template>
  <div>
    <Search
      :isOrg='true'
      :isLine="true"
      :isEmpty="true"
      :isBus="true"
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
  name: 'channelManagement',
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

<style scoped lang="scss">
.table {
  width: 100%;
  padding: 0px 1vw 1vh;
  height: 100%;
  box-sizing: border-box;
}
</style>
