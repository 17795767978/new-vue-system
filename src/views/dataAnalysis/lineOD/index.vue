<template>
  <div>
    <Search
      :isOrg='true'
      :isLine="true"
      :isBus="false"
      :isDate="false"
      :isTime="false"
      :isTurn="true"
      :isMonth="true"
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
  name: 'lineOD',
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
    height: 50%;
    border-bottom: 1px solid #EBEEF5;
    box-sizing: border-box;
  }
}
</style>
