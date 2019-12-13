<template>
<div class="dom" ref="topWrapper">
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import elementResizeDetector from 'element-resize-detector'
import moment from 'moment'
// import 'echarts/extension/bmap/bmap'
const COLOR_ARR = ['#aeea3e', '#d0ea22', '#ffe20f', '#ff9050']
export default {
  name: '',
  props: {
    selectData: {
      type: Object
    }
  },
  data () {
    return {
      echartsData: {},
      loading: true,
      lineStations: [],
      datas: []
    }
  },
  computed: {
    ...mapGetters(['defaultSearch'])
  },
  created () {
  },
  mounted () {
    let listenResize = elementResizeDetector()
    listenResize.listenTo(this.$refs.topWrapper, (el) => {
      this.$echarts.init(document.getElementsByClassName('passenger-vol')[0]).resize()
    })
    setTimeout(() => {
      let lineArr = this.defaultSearch.lineLineId.split('+')
      this._getPfODYCountListData({
        company: this.defaultSearch.lineOrgId,
        lineID: lineArr[0],
        arrow: this.defaultSearch.lineType,
        pDate: this.defaultSearch.dataCurrent
      })
    }, 500)
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        // if () {}
        let lineArr = newV.lineLineId.split('+')
        this._getPfODYCountListData({
          company: newV.lineOrgId,
          lineID: lineArr[0],
          arrow: newV.lineType,
          pDate: moment(newV.dataCurrent).format('YYYY-MM-DD')
        })
      }
    }
  },
  methods: {
    drawLine () {
      let charts = this.$echarts.init(document.getElementsByClassName('passenger-vol')[0])
      charts.off('click')
      window.addEventListener('resize', () => { charts.resize() })
      charts.setOption({
        title: [{
          text: '站点OD图',
          top: 10,
          left: 'center'
        }
        ],
        // visualMap: visualMap,
        tooltip: {},
        grid: {
          x: '50',
          y: '50',
          y2: '100',
          x2: '100'
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        toolbox: {
        // y: 'bottom',
          // feature: {
          //   magicType: {
          //     type: ['stack', 'tiled']
          //   },
          //   dataView: {},
          //   saveAsImage: {
          //     pixelRatio: 2
          //   }
          // }
        },
        series: [{
          type: 'graph',
          top: 670,
          layout: 'none',
          symbol: 'circle',
          color: '#7c79fc',
          symbolSize: [60, 30],
          roam: true,
          label: {
            normal: {
              textStyle: {
                color: '#fff',
                fontSize: 10
              },
              show: true
            }

          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [5, 12],
          edgeLabel: {
            normal: {
              textStyle: {
                color: '#000',
                fontSize: 10,
                show: true
              }
            }
          },
          data: this.lineStations,
          links: this.datas,
          lineStyle: {
            normal: {
              opacity: 0.9,
              width: 2,
              curveness: 0
            }
          }
        }]
      }, true)
    },
    _getPfODYCountListData (params) {
      this.loading = true
      this.lineStations = []
      this.datas = []
      this.$api['lineNet.getPfODYCountListData'](params).then(res => {
        if (res.nodes.length > 0) {
          res.nodes.forEach((item, index) => {
            this.lineStations.push({
              'name': item.sStationName,
              'y': 50,
              'x': 400 + index * 200
            })
          })
        } else {
          this.lineStations = []
        }
        if (res.edges.length > 0) {
          res.edges.forEach((item, index) => {
            this.datas.push({
              'source': item.sStationName,
              'target': item.eStationName,
              'lineStyle': {
                'normal': {
                  'width': 0.1 * item.brushCount,
                  'curveness': 0.9,
                  'color': (() => {
                    if (item.brushCount < 30) {
                      return COLOR_ARR[0]
                    } else if (item.brushCount < 60 && item.brushCount >= 30) {
                      return COLOR_ARR[1]
                    } else if (item.brushCount < 90 && item.brushCount >= 60) {
                      return COLOR_ARR[2]
                    } else if (item.brushCount < 120 && item.brushCount >= 90) {
                      return COLOR_ARR[3]
                    } else if (item.brushCount >= 120) {
                      return COLOR_ARR[3]
                    }
                  })()
                }
              },
              'label': {
                'emphasis': {
                  'textStyle': {
                    'color': '#000',
                    'fontSize': 16
                  },
                  'show': true,
                  'formatter': `上车人数:${item.brushCount}`
                }
              }
            })
          })
        } else {
          this.datas = []
          this.$message.warning('暂无数据')
        }
        console.log(this.lineStations)
        console.log(this.datas)
        setTimeout(() => {
          this.loading = false
        }, 1000)
        this.drawLine()
      })
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.dom {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  .passenger-vol {
    width:100%;
    box-sizing: border-box;
    height: 100%;
  }
}
</style>
