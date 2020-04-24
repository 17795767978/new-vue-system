<template>
  <div>
    <Search
      :isOrgSec='true'
      :isLineSec="true"
      :isEmpty="true"
      :isDefault="false"
      @configCheck="getSearch"
    />
    <div class="content">
      <div class="repeatability-table">
        <CoreTable @changeEcharts="changeEcharts" :selectData="selectData"/>
      </div>
      <div class="line-repeatability">
        <LineGrade :selectData="selectData"/>
      </div>
      <div class="line-dowm-repeatability">
        <ProjectScore :echartsData="echartsData" :selectData="selectData"/>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import CoreTable from './Components/coreTable'
import LineGrade from './Components/lineGrade'
import ProjectScore from './Components/projectScore'
import mixinsTime from '@/mixins/global/'
export default {
  name: 'lineNetworkCore',
  mixins: [mixinsTime],
  data () {
    return {
      selectData: {},
      echartsData: {}
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
  mounted () {
  },
  components: {
    Search,
    CoreTable,
    LineGrade,
    ProjectScore
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: calc(100vh - 16vh);
  padding: 2vh 2vw;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .line-repeatability {
    width: 50%;
    height: 50%;
    box-sizing: border-box;
    border-right: 1px solid #EBEEF5;
  }
  .line-dowm-repeatability {
    width: 50%;
    height: 50%;
  }
  .repeatability-table {
    width: 100%;
    height: 50%;
    padding: 1vh 1vw;
    border-bottom: 1px solid #EBEEF5;
    box-sizing: border-box;
  }
}
</style>
