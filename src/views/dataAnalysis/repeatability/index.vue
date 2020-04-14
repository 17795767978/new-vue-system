<template>
  <div>
    <Search
      :isOrg='false'
      :isLine="false"
      :isOrgSec='true'
      :isLineSec="true"
      :isBus="false"
      :isDate="false"
      :isTime="false"
      :isTurn="false"
      :isDownload="false"
      :isDefault="false"
      :isWarntype="false"
      @configCheck="getSearch"
    />
    <div class="content">
      <div class="repeatability-table">
        <RepeatabilityTable :selectData="selectData"/>
      </div>
      <div class="line-repeatability">
        <LineRepeatability @changeRightEcharts="changeRightEcharts"/>
      </div>
      <div class="line-dowm-repeatability">
        <LineRepeatabilityDown :echartsData="echartsData"/>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import LineRepeatability from './Components/lineRepeatability'
import LineRepeatabilityDown from './Components/lineRepeatabilityDown'
import RepeatabilityTable from './Components/repeatabilityTable'
import mixinsTime from '@/mixins/global/'
export default {
  name: 'repeatability',
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
    changeRightEcharts (data) {
      console.log(data)
      this.echartsData = data
    }
  },
  mounted () {
  },
  activated () {
  },
  components: {
    Search,
    LineRepeatability,
    LineRepeatabilityDown,
    RepeatabilityTable
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
    width: 60%;
    height: 50%;
    border-top: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
    box-sizing: border-box;
    border-right: 1px solid #EBEEF5;
  }
  .line-dowm-repeatability {
    width: 40%;
    height: 50%;
    border-top: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
    box-sizing: border-box;
  }
  .repeatability-table {
    width: 100%;
    height: 50%;
    padding: 1vh 1vw;
    box-sizing: border-box;
  }
}
</style>
