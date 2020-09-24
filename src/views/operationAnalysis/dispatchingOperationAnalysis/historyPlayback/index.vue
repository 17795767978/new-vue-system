<template>
  <div>
    <Search
      isOrg
      isLine
      isBus
      isDate
      isEmpty
      @configCheck="getSearch"
    />
    <div class="echarts-wrapper" v-if="this.echartsIds">
      <div v-for="item in echartsIds" :key="item.value" class="echart">
        <div class="title">{{item.key}}</div>
        <div class="echart-content">
          <Echarts :echartData="item" :xAxisData="xAxisData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm/'
import Echarts from './Components/echarts'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'historyPlayback',
  data () {
    return {
      // selectData: {}
      xAxisData: [],
      echartsIds: [{ key: '速度趋势', value: 'busSpeed', data: [] }, { key: '转速趋势', value: 'motorSpeed', data: [] }, { key: '电耗', value: 'averageElectricConsumption', data: [] }, { key: 'SOC', value: 'busSoc', data: [] }, { key: '电池电压', value: 'batteryVoltage', data: [] }, { key: '电池电流', value: 'batteryCurrent', data: [] }]
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
    let startTime = moment(new Date() - 24 * 3600 * 1000).format('YYYY-MM-DD 00:00:00')
    let endTime = moment().format('YYYY-MM-DD 23:59:59')
    this._initEchartsData({
      orgUuid: this.userId,
      lineUuid: '',
      busPlateNumber: '',
      startTime,
      endTime
    })
  },
  methods: {
    _initEchartsData (params) {
      this.$api['passengerFlow.getHistoryCanData'](params).then(res => {
        res = res.sort((prev, next) => prev.uploadTime - next.uploadTime)
        this.xAxisData = res.map(item => moment(item.uploadTime).format('HH:mm:ss'))
        this.echartsIds.forEach(item => {
          const data = res.map(val => val[item.value])
          item.data = data
        })
      })
    },
    getSearch (data) {
      // this.selectData = data
      this._initEchartsData({
        orgUuid: data.orgId,
        lineUuid: data.lineId,
        busPlateNumber: data.busNumber,
        startTime: data.startTime,
        endTime: data.endTime
      })
    }
  },
  components: {
    Search,
    Echarts
  }
}
</script>

<style lang="scss" scoped>
.echarts-wrapper {
  width: 95%;
  margin-left: 2.5%;
  display: flex;
  height: 80vh;
  margin-top: 2.5vh;
  flex-wrap: wrap;
  justify-content: space-around;
  .echart {
    width: 50%;
    height: 33.3%;
    padding: .5vh .5vw;
    box-sizing: border-box;
    &.echart:nth-child(1) {
      border-right: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
    }
    &.echart:nth-child(3) {
      border-right: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
    }
    &.echart:nth-child(5) {
      border-right: 1px solid #e5e5e5;
    }
    &.echart:nth-child(2) {
      border-bottom: 1px solid #e5e5e5;
    }
    &.echart:nth-child(4) {
      border-bottom: 1px solid #e5e5e5;
    }
    .title {
      width: 100%;
      height: 3vh;
      line-height: 3vh;
      text-align: center;
      font-size: 1vw;
      font-weight: bold;
    }
    .echart-content {
      width: 100%;
      height: calc(100% - 3vh);
    }
  }
}
</style>
