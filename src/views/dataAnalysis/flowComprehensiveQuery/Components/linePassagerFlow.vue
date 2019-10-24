<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
import moment from 'moment'
import { mapGetters } from 'vuex'
const GRID = {
  x: 50,
  y: 50,
  x2: 70,
  y2: 30,
  borderWidth: 1
}
export default {
  name: 'passengerHome',
  props: {
    rowData: {
      type: Object
    },
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
      id: 'lineScoreDisplay',
      grid: {},
      loading: true,
      currentSelect: {},
      lineNum: '',
      arrow: ''
    }
  },
  computed: {
    ...mapGetters(['queryId', 'formData'])
  },
  created () {
    // let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    let lineArr = this.formData.lineLineId.split('+')
    this.arrow = this.formData.lineType === '1' ? '上行' : '下行'
    this.lineNum = lineArr[1]
    this.formData.dataCurrent = this.formData.currentDate
    this.currentSelect = JSON.parse(JSON.stringify(this.formData))
    this._getPfOdbrushCountListGridData({
      company: this.currentSelect.lineOrgId,
      lineID: lineArr[0],
      arrow: this.currentSelect.lineType,
      pDate: this.currentSelect.dataCurrent
    })
  },
  mounted () {
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.lineNum = ''
        this.arrow = ''
        this.currentSelect = JSON.parse(JSON.stringify(newV))
        this.currentSelect.dataCurrent = moment(this.currentSelect.dataCurrent).format('YYYY-MM-DD')
        let lineArr = newV.lineLineId.split('+')
        this._getPfOdbrushCountListGridData({
          company: this.currentSelect.lineOrgId,
          lineID: lineArr[0],
          arrow: this.currentSelect.lineType,
          pDate: this.currentSelect.dataCurrent
        })
      }
    },
    'queryId': {
      handler (newV) {
        let lineArr = this.currentSelect.lineLineId.split('+')
        if (newV === '1') {
          this._getPfOdbrushCountListGridData({
            company: this.currentSelect.lineOrgId,
            lineID: lineArr[0],
            arrow: this.currentSelect.lineType,
            pDate: this.currentSelect.dataCurrent
          })
        } else if (newV === '2') {
          this._getPfOdZZLListGridData({
            company: this.currentSelect.lineOrgId,
            lineID: lineArr[0],
            arrow: this.currentSelect.lineType,
            pDate: this.currentSelect.dataCurrent
          })
        } else if (newV === '3') {
          this._getPfOdPJYJListGridData({
            company: this.currentSelect.lineOrgId,
            lineID: lineArr[0],
            arrow: this.currentSelect.lineType,
            pDate: this.currentSelect.dataCurrent
          })
        }
      }
    },
    rowData: {
      deep: true,
      handler (newV) {
        this.lineNum = newV.lineNumber
        this.arrow = newV.arrow
        this.currentSelect.lineLineId = newV.lineUuid + '+' + newV.lineNumber
        this.currentSelect.lineType = newV.arrow === '上行' ? '1' : '2'
        let lineArr = this.currentSelect.lineLineId.split('+')
        this._getPfOdbrushCountListGridData({
          company: this.currentSelect.lineOrgId,
          lineID: lineArr[0],
          arrow: this.currentSelect.lineType,
          pDate: this.currentSelect.dataCurrent
        })
        this.$emit('defaultConfig')
      }
    }
  },
  methods: {
    _getPfOdbrushCountListGridData (params) {
      this.loading = true
      this.$api['lineNet.getPfOdbrushCountListGridData'](params).then(res => {
        console.log(res)
        setTimeout(() => {
          this.loading = false
        }, 1000)
        this.title = {
          text: `${this.lineNum}${this.arrow}线路各时间段客流详情（刷卡总量）`,
          left: 'center',
          top: 0,
          textStyle: {
            'color': '#000',
            'fontSize': '22'
          }
        }
        this.grid = GRID
        this.lineData = [
          {
            name: res.legendNames[0],
            type: 'bar',
            data: res.datas[0],
            barWidth: 20,
            smooth: true
          }
        ]
        this.dataLength = 2
        this.legend = {
          data: res.legendNames,
          right: 100,
          top: 10,
          textStyle: {
            color: '#000'
          }
        }
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
    },
    _getPfOdZZLListGridData (params) {
      this.loading = true
      this.$api['lineNet.getPfOdZZLListGridData'](params).then(res => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
        this.title = {
          text: `${this.lineNum}${this.arrow}线路评分展示（平均运距）`,
          left: 'center',
          top: 0,
          textStyle: {
            'color': '#000',
            'fontSize': '22'
          }
        }
        this.grid = GRID
        this.lineData = [
          {
            name: res.legendNames[0],
            type: 'bar',
            data: res.datas[0],
            barWidth: 20,
            smooth: true
          }
        ]
        this.dataLength = 2
        this.legend = {
          data: res.legendNames,
          right: 100,
          top: 10,
          textStyle: {
            color: '#000'
          }
        }
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
    },
    _getPfOdPJYJListGridData (params) {
      this.loading = true
      this.$api['lineNet.getPfOdPJYJListGridData'](params).then(res => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
        this.title = {
          text: `${this.lineNum}${this.arrow}线路评分展示（周转量）`,
          left: 'center',
          top: 0,
          textStyle: {
            'color': '#000',
            'fontSize': '22'
          }
        }
        this.grid = GRID
        this.lineData = [
          {
            name: res.legendNames[0],
            type: 'bar',
            data: res.datas[0],
            barWidth: 20,
            smooth: true
          }
        ]
        this.dataLength = 2
        this.legend = {
          data: res.legendNames,
          right: 100,
          top: 10,
          textStyle: {
            color: '#000'
          }
        }
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
