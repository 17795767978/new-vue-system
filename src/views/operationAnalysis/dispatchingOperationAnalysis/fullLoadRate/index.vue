<template>
  <div class="full-load-rate">
    <header>
      <headerNav @configCheck="configCheck" @tabTypeCheck="tabTypeCheck"></headerNav>
    </header>
    <div class="content">
      <contentWrapper
        :checkData="checkData"
        :tabTypeData="tabTypeData"
        :isUpdateUp="isUpdateUp"
        :isUpdateDown="isUpdateDown"
        @isUpdateFaUp="isUpdateFaUp"
        @isUpdateFaDown="isUpdateFaDown"
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
      checkData: {},
      tabTypeData: [],
      isUpdateUp: false,
      isUpdateDown: false,
      timeNow: ''
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
        this.timeNow = moment(Date.now()).valueOf()
      }
    }
  },
  methods: {
    configCheck (data) {
      this.checkData = data
      let oldTime = this.timeNow
      this.timeNow = moment(Date.now()).valueOf()
      if (this.timeNow - oldTime < 1) {
        this.$message.warning('短时间内请勿重复操作')
      } else {
        this.isUpdateUp = true
        this.isUpdateDown = true
      }
    },
    tabTypeCheck (tabType) {
      this.tabTypeData = tabType
    },
    isUpdateFaUp () {
      this.isUpdateUp = false
    },
    isUpdateFaDown () {
      this.isUpdateDown = false
    }
  }
}
</script>

<style lang="scss" scoped>
.full-load-rate {
  width: 100%;
}
</style>
