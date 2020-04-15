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
    <introduceWrapper :msg="msg"/>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from './Components/header'
import contentWrapper from './Components/content'
import introduceWrapper from '@/components/introduce/'
import moment from 'moment'
import mixinsTime from '@/mixins/global/'
export default {
  name: 'fullLoadRate',
  mixins: [mixinsTime],
  data () {
    return {
      checkData: {},
      tabTypeData: [],
      isUpdateUp: false,
      isUpdateDown: false,
      timeNow: '',
      msg: {
        methods: '区间满载率查询主要是为了查询某天某时间段的线路上各个断面登降量、断面客流量以及满载率的页面。横坐标为某线路下的站点，纵坐标为上下车人数，断面客流以及满载率等。',
        aim: '线路客流满载率的查询与分析是为线网优化、线路排班、运营情况评价等提供的较有力数据支撑，直观反应公交资源的使用情况以及用户的乘车体验情况。同时对线路客流特点的直观展示可为用户提供大站快车，通勤车，定制公交等更多的场景。'
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
