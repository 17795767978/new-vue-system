<template>
  <div>
    <Search
      :isOrg='false'
      :isLine="false"
      :isBus="false"
      :isDate="true"
      :isTime="true"
      :isTurn="false"
      :isMonth="false"
      :isDownload="true"
      :isWarntype="false"
      @configCheck="getSearch"
    />
    <div class="content-wrapper">
      <div class="table">
        <Table />
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Table from './Components/table'
export default {
  name: 'ODMatrix',
  data () {
    return {
      selectData: {},
      echartsData: {},
      activeName: 'first'
    }
  },
  methods: {
    getSearch (data) {
      this.selectData = data
    }
  },
  mounted () {
  },
  components: {
    Search,
    Table
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 100%;
  height: calc(100vh - 16vh);
  padding: 2vh 2vw;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .table {
    width: 100%;
    height: 100%;
  }
}
</style>
