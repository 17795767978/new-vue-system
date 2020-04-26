<template>
  <div class="passenger-card-map" ref="wrapper" v-loading="loading" >
    <span class="total-num" @click="goToIndex">
      <el-link type="primary" style="font-size: 1.2vw">刷卡总量：{{totalNum}}</el-link>
    </span>
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" :tooltip="tooltip" @getEchartsData="getEchartsData"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
// import { max } from '../../../../../utils/max.js'
import lineEcharts from '@/components/echarts/brokenLineDiagram'
import moment from 'moment'
const TIME = 60 * 1000
export default {
  props: {
    sendCardType: {
      type: Object
    }
  },
  data () {
    return {
      lineData: [],
      // width: 100,
      title: {},
      height: '',
      legend: {},
      xData: [],
      yData: [],
      maxNum: 0,
      id: 'cardTypes',
      grid: {},
      loading: true,
      tooltip: {},
      totalNum: 0,
      totalTime: null
    }
  },
  created () {
    let orgUuid = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._getLines({
      orgUuid,
      cardSelfCodes: [],
      date: moment().format('YYYY-MM-DD')
    })
  },
  mounted () {
    // console.log(this.$refs.wrapper.style)
  },
  beforeDestroy () {
    clearTimeout(this.totalTime)
    this.totalTime = null
  },
  watch: {
    sendCardType: {
      deep: true,
      handler (newV) {
        let orgUuid = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
        this._getLines({
          orgUuid,
          cardSelfCodes: newV.cardTypes,
          date: moment(newV.date).format('YYYY-MM-DD')
        })
      }
    }
  },
  methods: {
    _getLines (params) {
      this.loading = true
      clearTimeout(this.totalTime)
      this.totalTime = null
      this.$api['passengerFlow.ICCardTypeAnalysis'](params).then(res => {
        if (res.length === 0) {
          this.$message.warning('IC卡类型统计暂无数据')
        } else {
          this.totalNum = 0
          res.forEach(item => {
            this.totalNum += Number(item.value)
          })
        }
        this.loading = false
        this.title = {}
        this.lineData = [{
          name: '刷卡次数',
          type: 'pie',
          center: ['50%', '60%'],
          data: res,
          barWidth: 20,
          color: ['#ff8f8f', '#eb6f49', '#f0f', '#fdb628', '#67e0e3', '#44ff9b', '#00f8f8', '#99dd1f', '#007130', '#d2a0ef'],
          itemStyle: {
            // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
            emphasis: {
              barBorderRadius: 30
            }
          }
        }]
        this.grid = {
          x: 50,
          y: 50,
          x2: 30,
          y2: 30,
          borderWidth: 1
        }
        this.tooltip = {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        }
        this.legend = {
          orient: 'vertical',
          left: 10,
          data: (() => {
            return res.map(item => item.name)
          })()
        }
        if (Object.keys(this.sendCardType).length === 0) {
          this.totalTime = setTimeout(() => {
            let orgUuid = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
            this._getLines({
              orgUuid,
              cardSelfCodes: [],
              date: moment().format('YYYY-MM-DD')
            })
          }, TIME)
        } else {
          const isToday = moment(this.sendCardType.date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
          if (isToday) {
            this.totalTime = setTimeout(() => {
              let orgUuid = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
              this._getLines({
                orgUuid,
                cardSelfCodes: this.sendCardType.cardTypes,
                date: moment().format('YYYY-MM-DD')
              })
            }, TIME)
          }
        }
      })
    },
    getEchartsData (data) {
      this.$emit('getIdType', data.data.cardSelfCode)
    },
    goToIndex () {
      if (this.totalNum > 0) {
        this.$emit('getTotal')
      } else {
        this.$message.warning('IC卡类型统计暂无数据')
      }
    }
  },
  components: {
    lineEcharts
  }
}
</script>

<style lang="scss" scoped>
.passenger-card-map {
  width:100%;
  box-sizing: border-box;
  height: 80%;
  margin-top: 9%;
  position: relative;
  .total-num {
    position: absolute;
    top: 0vh;
    right: 2vw;
    text-underline-position: below;
    z-index: 999;
    cursor: pointer;
  }
}
</style>
