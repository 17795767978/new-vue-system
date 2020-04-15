<template>
  <div class="rantime-analysis">
    <header>
      <headerNav @configCheck="configCheck"></headerNav>
    </header>
    <div class="content">
      <h2 class="title">线路站间运行时间分析</h2>
      <contentWrapper :selectData="selectData" :isUpdate="isUpdate" @isUpdateTo="isUpdateTo"></contentWrapper>
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
  name: 'rauntimeAnalysis',
  mixins: [mixinsTime],
  data () {
    return {
      selectData: {},
      isUpdate: false,
      timeNow: '',
      msg: {
        methods: '线路站间运行时间分析纵坐标将一天24小时以1小时为单位分为n个时间段，横坐标为时间长度，颜色代表站点，矩形的长度表示当前站到下一站的平均通行时间。线条矩形越长表示该站与下一站花费时间越长。整个矩形的长度表示该时间段完成一趟的平均运行时间。',
        aim: '直观展示了各个时间段上站点间花费的时间长度，对调度排班，线路运行时间标准有很好的参考价值。'
      }
    }
  },
  components: {
    headerNav,
    contentWrapper,
    introduceWrapper
  },
  watch: {
    selectData () {
      this.timeNow = moment(Date.now()).valueOf()
    }
  },
  methods: {
    configCheck (data) {
      this.selectData = data
      let oldTime = this.timeNow
      this.timeNow = moment(Date.now()).valueOf()
      if (this.timeNow - oldTime < 1) {
        this.$message.warning('短时间内请勿重复操作')
      } else {
        this.isUpdate = true
      }
    },
    isUpdateTo () {
      this.isUpdate = false
    }
  }
}
</script>

<style lang="scss" scoped>
.rantime-analysis {
  width: 100%;
  .content {
    .title {
      text-align: center;
      margin: 20px 0;
    }
  }
}
</style>
