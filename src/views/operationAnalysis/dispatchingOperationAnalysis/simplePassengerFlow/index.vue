<template>
  <div class="trip-order">
    <header>
      <headerNav @configType="configType"></headerNav>
    </header>
    <div class="content">
      <h2 class="title">单车客流详情分析</h2>
      <!-- <h4 class="title time">刷新时间：{{timeNow}}</h4> -->
      <contentWrapper :selectData="selectData" :isUpdate='isUpdate' @isUpdateTo="isUpdateTo"></contentWrapper>
      <!-- <Chart></Chart> -->
    </div>
    <introduceWrapper :msg="msg"/>
  </div>
</template>

<script type="text-ecmascript-6">
import headerNav from './Components/header'
import contentWrapper from './Components/content'
import introduceWrapper from '@/components/introduce/'
import moment from 'moment'
export default {
  name: 'simplePassengerFlow',
  data () {
    return {
      busLine: '1路',
      station: '<kobe>',
      timeNow: '',
      selectData: {},
      isUpdate: false,
      msg: {
        methods: '图中横坐标为线路站点，纵坐标为发车时间，每一个颜色的序列圆代表一辆车一个趟次的详情，气泡的大小代表上车客流人次，上车客流人次越多圆越大，展示了某条线路在某方向(上|下行)上的发车时刻以及在该站的上车客流。',
        aim: '一条线路某方向上各个车辆在各个站点登量客流的图形化展示，主要希望对比不同的发车间隔对客流产生的影响，希望通过微调发车间隔达到客流以及收益最大化，并提升客户满意度'
      }
    }
  },
  mounted () {
    this.timeNow = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  },
  components: {
    headerNav,
    contentWrapper,
    introduceWrapper
  },
  watch: {
    selectData: {
      deep: true,
      handler (oldData, newData) {
        this.timeNow = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  methods: {
    configType (data) {
      let oldTime = moment(this.timeNow).valueOf()
      this.timeNow = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      let newTime = moment(this.timeNow).valueOf()
      if (newTime - oldTime < -1) {
        this.$message.warning('短时间内请勿重复操作')
      } else {
        this.isUpdate = true
      }
      this.selectData = data
    },
    isUpdateTo (isUpdate) {
      this.isUpdate = false
    }
  }
}
</script>

<style lang="scss" scoped>
.trip-order {
  width: 100%;
  .content {
    width: 100%;
    padding: 10px 50px;
    box-sizing: border-box;
    .title {
      text-align: center;
    }
  }
}
</style>
