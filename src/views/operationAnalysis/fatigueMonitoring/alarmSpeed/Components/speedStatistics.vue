<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading" >
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid"  @getEchartsData="getEchartsData"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
import { mapGetters } from 'vuex'
export default {
  props: {
    searchData: {
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
      id: 'speedStatistics',
      grid: {},
      loading: true
    }
  },
  computed: {
    ...mapGetters(['formData', 'userId'])
  },
  created () {
    let formData = this.formData
    this._getDriver({
      orgId: this.userId === '1' ? '' : this.userId,
      lineId: formData.lineId,
      startTime: formData.dateArray[0],
      endTime: formData.dateArray[1]
    })
  },
  mounted () {
    // console.log(this.$refs.wrapper.style)
  },
  watch: {
    searchData: {
      deep: true,
      handler (newV) {
        this._getDriver({
          orgId: newV.orgId === '1' ? '' : newV.orgId,
          lineId: newV.lineId,
          startTime: newV.dateArray[0],
          endTime: newV.dateArray[1]
        })
      }
    }
  },
  methods: {
    _getDriver (params) {
      this.loading = true
      this.$api['tiredMonitoring.getAlarmLevelRatioAnalysis'](params).then(res => {
        this.loading = false
        console.log(res)
        let data = []
        let dataArrValue = res.xAxisNames
        let dataArrNumber = res.datas[0]
        for (let i = 0; i < dataArrValue.length; i++) {
          data[i] = {
            name: dataArrValue[i],
            value: dataArrNumber[i]
          }
        }
        this.title = {
          text: '各报警速度占比统计',
          left: 'center'
        }
        this.lineData = [{
          name: '各报警速度占比统计',
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '50%'],
          label: {
            formatter: '{b}: {@2012} ({d}%)'
          },
          // roseType: 'area',
          data
        }]
        this.grid = {
        }
      })
    },
    getEchartsData (data) {
      this.$emit('echartsSelected', data)
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
