<template>
  <div class="trip-order">
    <header>
      <headerNav @configTableData="configTableData" @selectStation="selectStation"></headerNav>
    </header>
    <div class="content">
      <contentWrapper :selectData="selectData" :selectStations="selectStations"></contentWrapper>
    </div>
    <introduceWrapper :msg="msg"/>
  </div>
</template>

<script type="text-ecmascript-6">
import headerNav from './Components/header'
import contentWrapper from './Components/content'
import introduceWrapper from '@/components/introduce/'
export default {
  name: 'tripOrder',
  data () {
    return {
      selectData: [],
      selectStations: [],
      msg: {
        methods: '站点登降量查询是一个无线路只关注站点登降量的表格类的数据查询界面，在搜索站点中输入想查询的站点，选择日期以及时间后，单击查询表格会按照日期展示上车人数，下车人数，下钻可查看按小时的人数。',
        aim: '站点一天承载的人流统计，也是公交为公共出行，热门站点所带来的人流量。为详细了解公交对于大型活动，商场等的出行贡献度提供支持。'
      }
    }
  },
  components: {
    headerNav,
    contentWrapper,
    introduceWrapper
  },
  created () {
  },
  methods: {
    configTableData (data) {
      this.selectData = data
    },
    selectStation (data) {
      this.selectStations = data
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
