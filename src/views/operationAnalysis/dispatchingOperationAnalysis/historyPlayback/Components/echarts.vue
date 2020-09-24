<template>
  <div class="passenger-vol" ref="wrapper" v-loading="isLoading">
    <lineEcharts :id="echartData.value" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" :dataZoom="dataZoom"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
export default {
  props: {
    xAxisData: {
      type: Array
    },
    echartData: {
      type: Object,
      default: () => {
        return { key: '', value: '', data: [] }
      }
    }
  },
  name: 'passengerHome',
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
      id: '',
      grid: {},
      selectData: {},
      alarmName: '',
      isLoading: true,
      dataZoom: []
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  watch: {
    echartData: {
      deep: true,
      handler () {
        this.initMap()
      }
    }
  },
  methods: {
    initMap () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
      this.title = {
        text: '',
        left: 'center',
        top: 0,
        textStyle: {
          'color': '#000'
        }
      }
      this.grid = {
        x: 30,
        y: 30,
        x2: 30,
        y2: 40
      }
      this.lineData = [{
        name: this.echartData.key,
        type: 'line',
        data: this.echartData.data,
        smooth: true
      }]
      this.dataLength = 2
      this.legend = {
        data: [this.echartData.key],
        right: 10,
        top: 10,
        textStyle: {
          color: '#000'
        }
      }
      this.xData = [
        {
          type: 'category',
          // data: res.xAxisNames,
          data: this.xAxisData,
          axisPointer: {
            type: 'shadow'
          },
          axisLabel: {
            inside: false,
            // interval: 0,
            textStyle: {
              color: '#000',
              fontSize: '10',
              borderRadius: '6'
            }
          }
        }
      ]
      this.dataZoom = [
        {
          show: true,
          type: 'slider',
          realtime: true,
          start: 0,
          end: 10,
          bottom: 0,
          height: '20'
        },
        {
          type: 'inside',
          realtime: true
        }
      ]
      this.yData = [
        {
          axisLabel: {
            inside: false,
            interval: 0,
            textStyle: {
              color: '#000',
              fontSize: '10',
              borderRadius: '6'
            }
          }
        }
      ]
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
