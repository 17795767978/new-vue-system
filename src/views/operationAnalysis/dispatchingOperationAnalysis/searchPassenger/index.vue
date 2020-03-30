<template>
  <div class="passenger-search">
    <header>
      <header-nav @configCheck="configCheck" @isDownload="isDownload" :excelData="excelData" :totle="totle" :echartsData="echartsData" @clearEcahrtsData="clearEcahrtsData" @clearUrlParams="clearUrlParams"/>
    </header>
    <div class="content">
      <contentWrapper
        :selectData="selectData"
        :isUpdate="isUpdate"
        :isDownLoad="isDownLoad"
        @isUpdateTo="isUpdateTo"
        @isDownLoadTo="isDownLoadTo"
        @getData="getData"
        :echartsData="echartsData"
      ></contentWrapper>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from './Components/header'
import contentWrapper from './Components/content'
import moment from 'moment'
export default {
  name: 'searchPassenger',
  data () {
    return {
      selectData: {},
      nowTime: '',
      isUpdate: false,
      isDownLoad: false,
      excelData: [],
      totle: 0,
      echartsData: {}
    }
  },
  components: {
    headerNav,
    contentWrapper
  },
  mounted () {
    this.echartsData = JSON.parse(JSON.stringify(this.$route.params))
  },
  activated () {
    this.echartsData = JSON.parse(JSON.stringify(this.$route.params))
  },
  watch: {
    headerParams: {
      deep: true,
      handler () {
        this.nowTime = moment(Date.now()).valueOf()
      }
    }
  },
  methods: {
    configCheck (data) {
      this.selectData = data
      let oldTime = this.nowTime
      this.nowTime = moment(Date.now()).valueOf()
      if (this.nowTime - oldTime < 1) {
        this.$message.warning('短时间内请勿重复操作')
      } else {
        this.isUpdate = true
      }
    },
    isUpdateTo () {
      this.isUpdate = false
    },
    isDownload () {
      this.isDownLoad = true
    },
    isDownLoadTo () {
      this.isDownLoad = false
    },
    getData (list, num) {
      this.excelData = list
      this.totle = num
    },
    clearEcahrtsData () {
      this.echartsData = {}
    },
    clearUrlParams () {
      this.echartsData = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.passenger-search {
  width: 100%;
}
</style>
