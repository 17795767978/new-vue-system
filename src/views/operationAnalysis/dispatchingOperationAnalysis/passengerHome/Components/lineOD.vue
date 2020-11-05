<template>
<div class="od-wrapper">
  <div class="search-wrapper">
    <Search
      :isOrg='true'
      :isLine="true"
      :isTurn="true"
      :isDataCurrent="true"
      :isEmpty="true"
      :isDefault="true"
      :isDefaultCss="true"
      @configCheck="getSearch"
    />
  </div>
  <div class="dom" ref="topWrapper">
    <div class="passenger-voll" id="cssss" ref="wrapper" v-loading="loading">
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
import { mapGetters } from 'vuex'
import elementResizeDetector from 'element-resize-detector'
import Search from '@/components/searchAlarm'
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
      this.$echarts.init(document.getElementsByClassName('passenger-voll')[0]).resize()
    })
    setTimeout(() => {
      this._getPfODYCountListData({
        orgUuid: this.userId === '1' ? '' : this.userId,
        lineUuid: this.lineId === '' ? this.formData.lineId : this.lineId,
        lineType: this.formData.lineType,
        uploadDate: moment().format('YYYY-MM-DD')
      })
    }, 500)
  },
  watch: {
    // selectData: {
    //   deep: true,
    //   handler (newV) {
    //     // if () {}
    //     let date = moment(newV.dataCurrent).format('YYYY-MM-DD')
    //     this._getPfODYCountListData({
    //       orgUuid: newV.orgId,
    //       lineUuid: newV.lineId,
    //       lineType: newV.lineType,
    //       uploadDate: date
    //     })
    //   }
    // }
  },
  methods: {
    getSearch (data) {
      this._getPfODYCountListData({
        orgUuid: data.orgId,
        lineUuid: data.lineId,
        lineType: data.lineType,
        uploadDate: moment(data.dataCurrent).format('YYYY-MM-DD')
      })
    },
    drawLine () {
      let charts = this.$echarts.init(document.getElementsByClassName('passenger-voll')[0])
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
          top: '90%',
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
                    if (item.payNumbers < 10) {
                      return COLOR_ARR[0]
                    } else if (item.payNumbers < 20 && item.payNumbers >= 10) {
                      return COLOR_ARR[1]
                    } else if (item.payNumbers < 30 && item.payNumbers >= 20) {
                      return COLOR_ARR[2]
                    } else if (item.payNumbers < 40 && item.payNumbers >= 30) {
                      return COLOR_ARR[3]
                    } else if (item.payNumbers >= 40) {
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
    Search
  }
}
</script>

<style lang="scss" scoped>
.od-wrapper {
  width: 100%;
  height: 100%;
  .search-wrapper {
    width: 100%;
    height: 100%;
    height: 20%;
  }
  .dom {
    width: 100%;
    box-sizing: border-box;
    height: 75%;
    .passenger-voll {
      width:100%;
      box-sizing: border-box;
      height: 100%;
    }
  }
}
</style>
