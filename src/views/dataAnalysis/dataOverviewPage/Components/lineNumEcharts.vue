<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" :tooltip="tooltip"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
export default {
  name: '',
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
      id: 'lineGrade',
      grid: {},
      loading: true,
      tooltip: {}
    }
  },
  created () {
    this._getCompanyLineCountsListData()
  },
  mounted () {
  },
  methods: {
    _getCompanyLineCountsListData (params) {
      this.loading = true
      this.$api['lineNet.getCompanyLineCountsListData'](params).then(res => {
        let dataNameArr = res.map(item => item.company)
        let data = []
        res.forEach(item => {
          data.push({
            name: item.company,
            value: item.lineCounts
          })
        })
        this.loading = false
        this.title = {
          text: '分公司线路条数',
          left: 'center',
          top: 10,
          textStyle: {
            'color': '#000',
            'fontSize': '22'
          }
        }
        this.grid = {
          x: 50,
          y: 50,
          x2: 10,
          y2: 30,
          borderWidth: 1
        }
        this.legend = [
          {
            data: dataNameArr,
            top: 50,
            textStyle: {
              color: '#000'
            }
          }
        ]
        this.tooltip = {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        }
        this.lineData = [
          {
            name: '线路等级占比',
            type: 'pie',
            center: ['50%', '60%'],
            label: {
              normal: {
                show: true,
                position: 'inside'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '18',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data
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
