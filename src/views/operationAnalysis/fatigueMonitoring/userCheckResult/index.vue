<template>
  <div class="user-result">
    <Search
      :isDateTo="true"
      :downLoadName="downLoadName"
      :isEmpty="true"
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
  name: 'userCheckResult',
  mixins: [mixinsTime],
  data () {
    return {
      selectData: {},
      downLoadName: 'downLoad.getDrivingBehaviorDayExport'
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
.user-result {
  .table-style {
    width: 100%;
    padding: 3vh 5vw;
    box-sizing: border-box;
  }
}
</style>
