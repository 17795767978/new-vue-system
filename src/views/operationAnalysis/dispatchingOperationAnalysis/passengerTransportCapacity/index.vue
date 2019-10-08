<template>
  <div class="passenger-transport-capacity">
    <header>
      <headerNav @configCheck="configCheck"></headerNav>
    </header>
    <div class="content">
      <contentWrapper
        :selectData="selectData"
        :isUpdateUp="isUpdateUp"
        :isUpdateDown="isUpdateDown"
        @isUpdateFaUp="isUpdateFaUp"
        @isUpdateFaDown="isUpdateFaDown"
      ></contentWrapper>
    </div>
    <introduceWrapper :msg="msg"/>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from './Components/header'
import contentWrapper from './Components/content'
import introduceWrapper from '@/components/introduce/'
import moment from 'moment'
export default {
  name: 'timeTableAnalysis',
  data () {
    return {
      selectData: {},
      nowTime: '',
      isUpdateUp: false,
      isUpdateDown: false,
      msg: {
        methods: '输入查询线路，日期单击查询可查看系统，横坐标为时间，15分钟为单位，纵坐标为客流。运力是实际公交投入的运力，运量是单位时间内的通过量。',
        aim: '客流运力运量分析主要分析用户运力与运量的匹配情况，是否存在运力不足或者运力过剩情况，为调度排班，排班评价等提供支持。'
      }
    }
  },
  components: {
    headerNav,
    contentWrapper,
    introduceWrapper
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
        this.isUpdateUp = true
        this.isUpdateDown = true
      }
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
.passenger-transport-capacity {
  width: 100%;
}
</style>
