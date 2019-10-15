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
      :isDownload="true"
      :isWarntype="false"
      :isStation="true"
      @configCheck="getSearch"
    />
    <div class="content">
      <Table />
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
      selectData: {}
    }
  },
  created () {
    console.log(this.$route.query)
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
