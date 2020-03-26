<template>
<div class="dom" ref="topWrapper">
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
import { mapGetters } from 'vuex'
import elementResizeDetector from 'element-resize-detector'
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
      datas: [],
      lineId: ''
    }
  },
  computed: {
    ...mapGetters(['formData', 'userId'])
  },
  created () {
    if (this.userId !== '1') {
      this.$store.dispatch('getLineList').then(res => {
        this.lineId = res[0].value
      })
    }
  },
  mounted () {
    let listenResize = elementResizeDetector()
    listenResize.listenTo(this.$refs.topWrapper, (el) => {
      this.$echarts.init(document.getElementsByClassName('passenger-vol')[0]).resize()
    })
    setTimeout(() => {
      this._getPfODYCountListData({
        orgUuid: this.userId === '1' ? '' : this.userId,
        lineUuid: this.lineId === '' ? this.formData.lineId : this.lineId,
        lineType: this.formData.lineType,
        uploadDate: moment(this.formData.dateYes).format('YYYY-MM-DD')
      })
    }, 500)
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        // if () {}
        console.log(newV)
        let date = moment(newV.dataCurrent).format('YYYY-MM-DD')
        this._getPfODYCountListData({
          orgUuid: newV.orgId,
          lineUuid: newV.lineId,
          lineType: newV.lineType,
          uploadDate: date
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
          text: '线路OD图',
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
      this.$api['passengerFlow.getLineOdCountListData'](params).then(res => {
        if (res.nodes.length > 0) {
          res.nodes.forEach((item, index) => {
            this.lineStations.push({
              'name': item.upStaSequence + item.upStaName,
              // 'squence': item.upStaSequence,
              'y': 50,
              'x': 400 + index * 200
            })
          })
        } else {
          this.lineStations = []
          this.$message.warning('暂无数据')
        }
        if (res.edges.length > 0) {
          res.edges.forEach((item, index) => {
            this.datas.push({
              'source': item.upStaSequence + item.upStaName,
              'target': item.downStaSequence + item.downStaName,
              'lineStyle': {
                'normal': {
                  'width': 0.1 * item.payNumbers,
                  'curveness': 0.9,
                  'color': (() => {
                    if (item.payNumbers < 30) {
                      return COLOR_ARR[0]
                    } else if (item.payNumbers < 60 && item.payNumbers >= 30) {
                      return COLOR_ARR[1]
                    } else if (item.payNumbers < 90 && item.payNumbers >= 60) {
                      return COLOR_ARR[2]
                    } else if (item.payNumbers < 120 && item.payNumbers >= 90) {
                      return COLOR_ARR[3]
                    } else if (item.payNumbers >= 120) {
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
                  'formatter': `上车人数:${item.payNumbers}`
                }
              }
            })
          })
        } else {
          this.datas = []
        }
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
