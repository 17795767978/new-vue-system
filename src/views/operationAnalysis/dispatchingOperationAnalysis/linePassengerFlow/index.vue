<template>
  <div>
    <Search
      :isOrg='true'
      :isLine="true"
      :isTurn="true"
      :isDataCurrent="true"
      :isEmpty="true"
      :isDefaultEmpty="true"
      :isDownload="true"
      :isRadio="true"
      @configCheck="getSearch"
      :downLoadName="downLoadName"
    />
    <div class="table">
      <Table :selectData="selectData" @changeEcharts="changeEcharts"/>
    </div>
    <div class="echarts">
      <Echarts :selectData="selectData" :echartsData="echartsData"/>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Table from './Components/table'
import Echarts from './Components/echarts'
export default {
  name: 'linePassengerFlow',
  data () {
    return {
      selectData: {},
      echartsData: {},
      downLoadName: 'downLoad.lineFlowExports'
    }
  },
  methods: {
    getSearch (data) {
      this.selectData = data
    },
    changeEcharts (data) {
      this.echartsData = data
    }
  },
  components: {
    Search,
    Table,
    Echarts
  }
}
</script>

<style lang="scss" scoped>
.table {
  padding: 2vh 10vw 0;
  box-sizing: border-box;
  height: 49vh;
  // border-bottom: 0.2vh solid #EBEEF5;
}
.echarts {
  height: 35vh;
  box-sizing: border-box;
  border-top: 0.1vh solid #EBEEF5;
}
</style>
