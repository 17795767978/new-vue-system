<template>
  <div class="time-table-analysis">
    <header>
      <headerNav @configCheck="configCheck"></headerNav>
    </header>
    <div class="content">
      <contentWrapper
        :headerParams="headerParams"
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
  name: 'timeTableAnalysis',
  mixins: [mixinsTime],
  data () {
    return {
      headerParams: {},
      isUpdateUp: false,
      isUpdateDown: false,
      timeNow: '',
      initLine: '',
      msg: {
        methods: '线路客流的高峰时段分析横坐标以小时为单位，纵坐标为单位时间内的周一到周日星期属性，通过颜色与数据展示客流人数多少，客流人数越多，颜色越深。',
        aim: '通过对周一到周日高峰时刻的综合分析可发现客流与时刻和星期的热度关联，找到周一到周日的客流最热时刻，对调度方案调整，资源分配提供决策建议'
      }
    }
  },
  components: {
    headerNav,
    contentWrapper,
    introduceWrapper
  },
  created () {
    this.getInitLineid()
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
      let oldTime = this.timeNow
      this.timeNow = moment(Date.now()).valueOf()
      if (this.timeNow - oldTime < 1) {
        this.$message.warning('短时间内请勿重复操作')
      } else {
        this.isUpdateUp = true
        this.isUpdateDown = true
      }
      this.headerParams = data
    },
    isUpdateFaUp () {
      this.isUpdateUp = false
    },
    isUpdateFaDown () {
      this.isUpdateDown = false
    },
    getInitLineid () {
    }
  }
}
</script>

<style lang="scss" scoped>
.time-table-analysis {
  width: 100%;
}
</style>
