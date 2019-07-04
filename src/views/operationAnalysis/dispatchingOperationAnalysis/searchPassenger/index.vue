<template>
  <div class="passenger-search">
    <header>
      <header-nav @configCheck="configCheck" @isDownload="isDownload" :excelData="excelData"/>
    </header>
    <div class="content">
      <contentWrapper
        :selectData="selectData"
        :isUpdate="isUpdate"
        :isDownLoad="isDownLoad"
        @isUpdateTo="isUpdateTo"
        @isDownLoadTo="isDownLoadTo"
        @getData="getData"
      ></contentWrapper>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from './Components/header'
import contentWrapper from './Components/content'
import moment from 'moment'
export default {
  name: 'timeTableAnalysis',
  data () {
    return {
      selectData: {},
      nowTime: '',
      isUpdate: false,
      isDownLoad: false,
      excelData: []
    }
  },
  components: {
    headerNav,
    contentWrapper
  },
  mounted () {
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
    getData (data) {
      this.excelData = data
    }
  }
}
</script>

<style lang="scss" scoped>
.passenger-search {
  width: 100%;
}
</style>
