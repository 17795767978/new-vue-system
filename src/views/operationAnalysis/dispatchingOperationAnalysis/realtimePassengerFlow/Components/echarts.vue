<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" :tooltip="tooltip"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
const GRID = {
  x: 50,
  y: 50,
  x2: 10,
  y2: 30,
  borderWidth: 1
}
export default {
  name: 'passengerHome',
  props: {
    selectData: {
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
      maxNum: [],
      id: 'lineLength',
      grid: {},
      loading: true,
      tooltip: {}
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this._getLineTotalPassengerFlow({
      orgId: this.selectData.orgUuid
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV, oldV) {
        if (newV.personCount !== oldV.personCount) {
          this._getLineTotalPassengerFlow({
            orgId: newV.orgUuid
          })
        }
        if (newV.orgUuid !== oldV.orgUuid) {
          this._getLineTotalPassengerFlow({
            orgId: newV.orgUuid
          })
        }
      }
    }
  },
  methods: {
    _getLineTotalPassengerFlow (params) {
      this.loading = true
      this.$api['passengerFlow.getLineTotalPassengerFlow'](params).then(res => {
        console.log(res)
        let series = res.map(item => Number(item.personCount))
        let lineNameArr = res.map(item => item.lineName)
        let maxNum = Math.max(...series)
        let maxNumArr = []
        series.forEach((num, index) => {
          maxNumArr.push(maxNum)
        })
        setTimeout(() => {
          this.loading = false
        }, 1000)
        this.title = {
          text: `${this.selectData.orgName}当日累计客流人次`,
          left: 'center',
          top: 10,
          textStyle: {
            'color': '#fff',
            'fontSize': '22'
          }
        }
        this.tooltip = {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (params) => {
            let param = params[1]
            return `${param.name}${param.seriesName}: ${param.data}`
          }
        }
        this.grid = GRID
        this.lineData = [
          {
            name: '最大人数',
            type: 'bar',
            data: maxNumArr,
            barWidth: 10,
            color: '#1C3679',
            smooth: false
          },
          {
            name: '客流人次',
            type: 'bar',
            data: series,
            barWidth: 10,
            color: '#44F0FF',
            barGap: '-100%',
            smooth: true
          }
        ]
        // this.maxNum = []
        this.dataLength = 2
        this.legend = []
        this.xData = [
          {
            type: 'category',
            data: lineNameArr,
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLine: { // y轴
              show: false
            },
            axisLabel: {
              inside: false,
              // interval: 0,
              textStyle: {
                color: '#fff',
                fontSize: '10',
                borderRadius: '6'
              }
            }
          }
        ]
        this.yData = [
          {
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: { // y轴
              show: false
            },
            axisLabel: {
              inside: false,
              interval: 0,
              textStyle: {
                color: '#fff',
                fontSize: '10',
                borderRadius: '6'
              }
            }
          }
        ]
      })
    }
  },
  components: {
    lineEcharts
  }
}
</script>

<style lang="scss" scoped>
.passenger-vol {
  width:100%;
  box-sizing: border-box;
  height: 100%;
}
</style>
