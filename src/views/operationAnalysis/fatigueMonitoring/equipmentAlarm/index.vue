<template>
  <div class="equipment-alarm">
    <Search
      isOrg
      isLine
      isBus
      isSelfCode
      isDeviceCode
      isDevType
      isEmpty
      isDownload
      :downLoadName="downLoadName"
      :rateParams="rateParams"
      @configCheck="getSearch" />
      <div class="table">
        <Table :selectData="selectData" :rateParams="rateParams"/>
      </div>

  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Table from './Components/table'
export default {
  name: 'equipmentAlarm',
  data () {
    return {
      selectData: {},
      rateParams: {},
      downLoadName: 'tiredMonitoring.equipmentAlarmExport'
    }
  },
  mounted () {
    // console.log(1111111111111)
    // this.changePage()
  },
  activated () {
    this.changePage()
  },
  methods: {
    getSearch (data) {
      this.selectData = data
    },
    changePage () {
      const params = this.$route.params
      const data = JSON.parse(JSON.stringify(params))
      if (Object.keys(data).length > 1) {
        this.rateParams = data
      } else {
        this.rateParams = {}
      }
    }
  },
  components: {
    Table,
    Search
  }
}
</script>

<style lang="scss" scoped>
.table {
  padding: 2vh 1vw;
  box-sizing: border-box;
}
</style>
