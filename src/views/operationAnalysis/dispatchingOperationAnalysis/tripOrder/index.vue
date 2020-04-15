<template>
  <div class="trip-order">
    <header>
      <headerNav @configType="configType"></headerNav>
    </header>
    <div class="content">
      <h2 class="title">发车趟次时序图</h2>
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
import mixinsTime from '@/mixins/global/'
export default {
  name: 'tripOrder',
  mixins: [mixinsTime],
  data () {
    return {
      busLine: '1路',
      station: '<kobe>',
      timeNow: '',
      selectData: {},
      isUpdate: false,
      msg: {
        methods: '车辆发车趟次时序图横坐标为线路站点，纵坐标为发车时间，每一条折线代表一辆车的一趟每站的到站时间，展示了某条线路在某方向(上、下行)上的发车时刻以及各个站间的运行时长。',
        aim: '通过该图可直观展示当日发车是否存在大间隔(两条折线起点处间距过大)，发车间隔过小(两条折线起点处间距较小)，串车(两条折线有交叉)等情况发生，可对调度排班、线路运行情况等进行直观评价。'
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
