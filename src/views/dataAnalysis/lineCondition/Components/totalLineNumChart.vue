<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" @getEchartsData="getEchartsData"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import { max } from '../../../../utils/max.js'
import lineEcharts from '@/components/echarts/brokenLineDiagram'
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
      id: 'dataLine',
      grid: {},
      loading: true
    }
  },
  created () {
    // let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._getlineNumLength({
      company: '',
      lineID: ''
    })
  },
  mounted () {
  },
  watch: {
    // selectData: {
    //   deep: true,
    //   handler (newV) {
    //     console.log(newV)
    //     this._getlineNumLength({
    //       company: newV.lineOrgId,
    //       lineID: newV.lineLineId
    //     })
    //   }
    // }
  },
  methods: {
    getEchartsData (data) {
      this.$emit('changeEcharts', data)
      console.log(data)
    },
    _getlineNumLength (params) {
      this.loading = true
      this.$api['lineNet.getlineNumLength'](params).then(res => {
        this.loading = false
        this.title = {
          text: '分公司线路条数/总长度',
          left: 'center',
          top: 0,
          textStyle: {
            'color': '#000',
            'fontSize': '22'
          }
        }
        this.grid = {
          x: 50,
          y: 50,
          x2: 70,
          y2: 30,
          borderWidth: 1
        }
        this.lineData = [
          {
            name: '线路总数',
            type: 'bar',
            data: res.datas[0],
            barWidth: 20
          },
          {
            name: '线路长度',
            type: 'line',
            yAxisIndex: 1,
            data: res.datas[1],
            smooth: false
          }
        ]
        this.maxNum = [max(res.datas[0]), max(res.datas[1])]
        this.dataLength = 2
        this.legend = [
          {
            data: ['线路总数'],
            right: 100,
            top: 10,
            textStyle: {
              color: '#000'
            }
          },
          {
            data: ['线路长度'],
            right: 10,
            top: 10,
            textStyle: {
              color: '#000'
            }
          }
        ]
        this.xData = [
          {
            type: 'category',
            data: res.xAxisNames,
            axisPointer: {
              type: 'shadow'
            },
            splitLine: {
              show: true
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
        this.yData = [
          {
            min: 0,
            max: this.maxNum[0],
            interval: Math.ceil(this.maxNum[0] / 6),
            // axisLabel: {
            //     formatter: '{value} ml'
            // },
            splitLine: {
              show: false
            },
            axisLabel: {
              inside: false,
              interval: 0,
              textStyle: {
                color: '#000',
                fontSize: '10',
                borderRadius: '6'
              }
            }
          },
          {
            splitLine: {
              show: false
            },
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
