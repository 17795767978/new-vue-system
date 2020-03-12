<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading" >
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" @getEchartsData="getEchartsData"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
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
      id: 'drive',
      grid: {},
      loading: true,
      echartsData: {}
    }
  },
  created () {
    let defaultData = this.$store.getters.formData
    this._getDriver({
      orgId: defaultData.orgId === '1' ? '' : defaultData.orgId,
      lineId: '',
      busNumber: '',
      warnTypes: defaultData.warningArr
    })
  },
  mounted () {
    // console.log(this.$refs.wrapper.style)
  },
  watch: {
    searchData: {
      deep: true,
      handler (newV) {
        let defaultData = this.$store.getters.formData
        this._getDriver({
          orgId: newV.orgId === '1' ? '' : newV.orgId,
          lineId: newV.lineId,
          busNumber: newV.busNumber,
          warnTypes: newV.warnTypeId.length === 0 ? defaultData.warningArr : newV.warnTypeId
        })
      }
    }
  },
  methods: {
    _getDriver (params) {
      this.loading = true
      this.$api['homeTired.getStatisticDatasByWarnType'](params).then(res => {
        this.loading = false
        let data = []
        let dataArrValue = res.map(item => item.warnLabel)
        let dataArrNumber = res.map(item => item.warnNumber)
        let dataArrwarnType = res.map(item => item.warnType)
        for (let i = 0; i < dataArrValue.length; i++) {
          data[i] = {
            name: dataArrValue[i],
            value: dataArrNumber[i],
            warnType: dataArrwarnType[i]
          }
        }
        this.title = {}
        this.lineData = [{
          name: '不良驾驶行为',
          type: 'pie',
          radius: ['35%', '50%'],
          center: ['50%', '45%'],
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
      // this.echartsData = data
      this.$emit('getwarnTypeData', data)
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
