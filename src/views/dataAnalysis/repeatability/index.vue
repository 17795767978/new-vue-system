<template>
  <div>
    <Search
      :isOrg='false'
      :isLine="false"
      :isOrgSec='false'
      :isLineSec="true"
      :isBus="false"
      :isDate="false"
      :isTime="false"
      :isTurn="false"
      :isDownload="false"
      :isWarntype="false"
      @configCheck="getSearch"
    />
    <div class="content">
      <div class="line-repeatability">
        <LineRepeatability />
      </div>
      <div class="line-dowm-repeatability">
        <LineRepeatabilityDown :selectData="selectData"/>
      </div>
      <div class="repeatability-table">
        <RepeatabilityTable :selectData="selectData"/>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import LineRepeatability from './Components/lineRepeatability'
import LineRepeatabilityDown from './Components/lineRepeatabilityDown'
import RepeatabilityTable from './Components/repeatabilityTable'
export default {
  name: 'repeatability',
  data () {
    return {
      selectData: {}
    }
  },
  methods: {
    getSearch (data) {
      this.selectData = data
      console.log(this.selectData)
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
    border-bottom: 1px solid #EBEEF5;
    box-sizing: border-box;
    border-right: 1px solid #EBEEF5;
  }
  .line-dowm-repeatability {
    width: 40%;
    height: 50%;
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
