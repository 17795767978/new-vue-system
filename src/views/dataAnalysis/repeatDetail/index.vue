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
      :isTurn="true"
      :isDownload="true"
      :isWarntype="false"
      :isStation="true"
      :isDefault="true"
      :queryData="queryData"
      @configCheck="getSearch"
    />
    <div class="content">
      <Table :queryData="queryData" :selectData="selectData"/>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Table from './Components/table'
export default {
  name: 'repeatabilityDetail',
  data () {
    return {
      selectData: {},
      queryData: {}
    }
  },
  created () {
    this.queryData = this.$route.params.data
  },
  activated () {
    this.queryData = this.$route.params.data
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

<style scoped>
.content {
  width: 100%;
  padding: 2vh 1vw;
  box-sizing: border-box;
}
</style>
