<template>
  <div class="search-passenger-flow">
    <Search
      :isOrg='true'
      :isDefault="true"
      :isEmpty="true"
      :isDateTo="true"
      :isDownload="true"
      :islineIdRepeat="true"
      :isRadio="true"
      :downLoadName="downLoadName"
      @configCheck="getSearch"
    />
    <div class="content">
      <div class="org">
        <Table :selectData="selectData"/>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Search from '@/components/searchAlarm/'
import Table from './Components/table'
export default {
  name: 'searchPassengerFlow',
  data () {
    return {
      selectData: {},
      downLoadName: 'downLoad.passengerFlowExport'
    }
  },
  components: {
    Search,
    Table
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    getSearch (data) {
<<<<<<< HEAD
      this.selectData = data
=======
      if (data.dateArray.length > 0) {
        this.selectData = data
      } else {
        this.$message.error('请添加查询时间段')
      }
>>>>>>> f33f6724342a112172797c499f4aa198da2d2097
    }
  }
}
</script>

<style lang="scss" scoped>
.search-passenger-flow {
  width: 100%;
  height: 75vh;
  .content {
    width: 100%;
    height: 71vh;
    padding: 2vh 2vw;
    box-sizing: border-box;
  }
}
</style>
