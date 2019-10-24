<template>
  <div>
    <Search
      :isOrgSec='true'
      :isLineSec="true"
      :isBus="false"
      :isTime="false"
      :isTurn="true"
      :isMonth="false"
      :isDataCurrent="true"
      :isEmpty="true"
      :isDownload="true"
      :isWarntype="false"
      @configCheck="getSearch"
    />
    <div class="content-wrapper">
      <div class="table">
        <Table :selectData="selectData"/>
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
      console.log(data)
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
