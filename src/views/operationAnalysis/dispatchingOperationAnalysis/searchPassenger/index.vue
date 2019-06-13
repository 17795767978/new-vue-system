<template>
  <div class="passenger-search">
    <header>
      <header-nav @configCheck="configCheck"/>
    </header>
    <div class="content">
      <contentWrapper
        :selectData="selectData"
        :isUpdate="isUpdate"
        @isUpdateTo="isUpdateTo"
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
      isUpdate: false
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
      console.log(this.isUpdate)
      this.isUpdate = false
    }
  }
}
</script>

<style lang="scss" scoped>
.passenger-search {
  width: 100%;
}
</style>
