<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" :tooltip="tooltip"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
import { mapGetters } from 'vuex'
export default {
  name: '',
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
      id: 'lineGrade',
      grid: {},
      loading: true,
      tooltip: {}
    }
  },
  computed: {
    ...mapGetters(['formData'])
  },
  created () {
    this._getLevelLineCountListData({
      company: '',
      lineID: ''
    })
  },
  mounted () {
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        let str
        if (newV.lineLineId && newV.lineLineId !== '') {
          str = newV.lineLineId.split('+')[0]
        } else {
          str = ''
        }
        this._getLevelLineCountListData({
          company: newV.lineOrgId,
          lineID: str
        })
      }
    }
  },
  methods: {
    _getLevelLineCountListData (params) {
      this.loading = true
      this.$api['lineNet.getLevelLineCountListData'](params).then(res => {
        let data = []
        let name = res.map(item => item.levelName)
        res.forEach(item => {
          data.push({
            value: item.lineCount,
            name: item.levelName
          })
        })
        setTimeout(() => {
          this.loading = false
        }, 1000)
        this.title = {
          text: '线路等级占比',
          left: 'center',
          top: 20,
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
            data: name,
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
                  fontSize: '30',
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
