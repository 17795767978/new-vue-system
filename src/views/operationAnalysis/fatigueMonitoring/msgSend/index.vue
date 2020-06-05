<template>
  <div class="monitoring-ledger">
    <Search
      isOrg
      isLine
      isSend
      @sendMsg="sendMsg"
      @configCheck="getSearch" />
      <div class="table-style">
        <Table :selectData="selectData"/>
      </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Table from './Components/table'
export default {
  name: 'msgSend',
  data () {
    return {
      selectData: {}
    }
  },
  methods: {
    getSearch (data) {
      this.selectData = data
    },
    sendMsg () {
      this.$children[1].dialogFormVisible = true
    }
  },
  components: {
    Search,
    Table
  }
}
</script>

<style lang="scss" scoped>
.monitoring-ledger {
  .table-style {
    width: 100%;
    padding: 3vh 5vw;
    box-sizing: border-box;
  }
}
</style>
