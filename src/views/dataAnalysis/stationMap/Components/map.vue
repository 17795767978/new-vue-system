<template>
<div class="dom" ref="topWrapper">
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
  </div>
</div>
</template>

<script type="text/ecmascript-6">
// import lineEcharts from '@/components/echarts/brokenLineDiagram'
import elementResizeDetector from 'element-resize-detector'
import 'echarts/extension/bmap/bmap'
// import { mapStyle } from '../utils/style.js'
// ODIwfBUu5BFoBAwVZQimU7ajcVX7YjqR
// import moment from 'moment'
const TIME_DATA = ['06:00-07:00', '07:00-08:00', '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00',
  '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00',
  '19:00-20:00', '20:00-21:00', '21:00-22:00', '22:00-23:00']
export default {
  name: 'passengerHome',
  props: {
    datas: {
      type: Object
    },
    ids: {
      type: String
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
      id: 'kobessss',
      grid: {},
      loading: true,
      lineName: '',
      lineType: '',
      bgColor: '',
      geo: {},
      bmap: {}
    }
  },
  created () {
  },
  mounted () {
    let listenResize = elementResizeDetector()
    listenResize.listenTo(this.$refs.topWrapper, (el) => {
      this.$echarts.init(document.getElementsByClassName('passenger-vol')[0]).resize()
    })
    this._getStationCharts()
  },
  watch: {
    datas (newV) {
      this._getStationCharts(newV)
    }
  },
  methods: {
    drawLine (params) {
      let charts = this.$echarts.init(document.getElementsByClassName('passenger-vol')[0])
      charts.off('click')
      window.addEventListener('resize', () => { charts.resize() })
      charts.setOption({
        baseOption: {
          timeline: {
            show: false,
            y: 0,
            axisType: 'category',
            realtime: false,
            // loop: false,
            autoPlay: true,
            // currentIndex: 2,
            playInterval: 3000,
            symbol: 'emptyCircle',
            lineStyle: {
              color: '#FFFFFF',
              width: 5,
              type: 'solid'
            },
            controlStyle: {
              color: '#FFFFFF',
              borderColor: '#FFFFFF' // 播放按钮颜色
            },
            data: TIME_DATA,
            label: {
              color: '#ffffff'
            }
          },
          title: {
            text: 'OD数据分析',
            left: 'middle',
            top: 10,
            textStyle: {
              color: '#ffffff'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function (v) {
              if (typeof (v.data.fromName) === 'undefined') {
                return v.data.name
              } else {
                return v.data.fromName + ' > ' + v.data.toName + '<br />' + v.data.value + '人次'
              }
            }
          },
          legend: {
            orient: 'vertical',
            top: 'top',
            left: 'right',
            data: [],
            textStyle: {
              color: '#fff'
            },
            selectedMode: 'single'
          },
          dataRange: {
            min: 0,
            max: 1200,
            left: 'right',
            top: 'middle',
            calculable: true,
            color: ['#FF0000', 'yellow', '#A7FF97'],
            textStyle: {
              color: '#fff'
            }
          },
          bmap: {
            center: [112.4717803427, 23.0529978779],
            zoom: 14,
            roam: true,
            mapStyle: {
              style: 'dark'
            }
          }
        },
        options: params
      }, true)
    },
    async _getStationCharts (params) {
      let series = []
      if (params && Object.keys(params.echartMaps).length > 0) {
        for (let i = 0; i < params.echartMaps.length; i++) {
          series.push(this.datasFormat(params.echartMaps[i]))
        }
      }
      setTimeout(() => {
        this.loading = false
      }, 1000)
      if (params && Object.keys(params.echartMaps).length > 0) {
        let options = []
        series.forEach((item, index) => {
          console.log(item)
          options.push({
            title: {
              text: `OD数据分析${TIME_DATA[index]}`,
              left: 'middle',
              top: 10,
              textStyle: {
                color: '#ffffff'
              }
            },
            series: item
          })
        })
        this.drawLine(options)
      } else {
        this.drawLine()
      }
    },
    datasFormat (pointArr) {
      let series = []
      let chinaDatas = []
      let chinaGeoCoordMap = {
        [pointArr.staLngAndLntValue.staName]: [pointArr.staLngAndLntValue.staLng, pointArr.staLngAndLntValue.staLng.staLnt]
      }
      Object.keys(pointArr.coordMap).forEach(item => {
        chinaGeoCoordMap[item] = [pointArr.coordMap[item].staLng, pointArr.coordMap[item].staLnt]
      })
      pointArr.datas.forEach(item => {
        chinaDatas.push([{
          name: item.staName,
          value: item.staPayNumber
        }])
      })
      let convertData = function (data) {
        let res = []
        for (let i = 0; i < data.length; i++) {
          let dataItem = data[i]
          let fromCoord = chinaGeoCoordMap[dataItem[0].name]
          let toCoord = [pointArr.staLngAndLntValue.staLng, pointArr.staLngAndLntValue.staLnt]
          if (fromCoord && toCoord) {
            res.push([{
              coord: toCoord
            }, {
              coord: [chinaGeoCoordMap[dataItem[0].name][0], chinaGeoCoordMap[dataItem[0].name][1]],
              value: dataItem[0].value
            }])
          }
        }
        return res
      };
      [[pointArr.staLngAndLntValue.staName, chinaDatas]].forEach(function (item, i) {
        series.push({
          name: item[0] + ' Top10',
          type: 'lines',
          coordinateSystem: 'bmap',
          zlevel: 2,
          effect: {
            show: true,
            period: 4, // 箭头指向速度，值越小速度越快
            trailLength: 0.1, // 特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'triangle', // 箭头图标
            symbolSize: 10 // 图标大小
          },
          lineStyle: {
            normal: {
              width: 1, // 尾迹线条宽度
              opacity: 1, // 尾迹线条透明度
              curveness: 0.3 // 尾迹线条曲直度
            }
          },
          data: convertData(item[1])
        }, {
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          zlevel: 2,
          rippleEffect: { // 涟漪特效
            period: 4, // 动画时间，值越小速度越快
            brushType: 'stroke', // 波纹绘制方式 stroke, fill
            scale: 4 // 波纹圆环最大限制，值越大波纹越大
          },
          label: {
            normal: {
              show: true,
              position: 'right', // 显示位置
              offset: [5, 0], // 偏移设置
              formatter: function (params) { // 圆环显示文字
                return params.data.name
              },
              fontSize: 13
            },
            emphasis: {
              show: true
            }
          },
          symbol: 'circle',
          symbolSize: function (val) {
            return 5 + val[2] / 6 // 圆环大小
          },
          itemStyle: {
            normal: {
              show: false,
              color: '#f00'
            }
          },
          data: item[1].map(function (dataItem) {
            return {
              name: dataItem[0].name,
              value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
            }
          })
        },
        // 被攻击点
        {
          type: 'scatter',
          coordinateSystem: 'bmap',
          zlevel: 2,
          rippleEffect: {
            period: 4,
            brushType: 'stroke',
            scale: 4
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              // offset:[5, 0],
              color: '#0f0',
              formatter: '{b}',
              textStyle: {
                color: '#0f0'
              }
            },
            emphasis: {
              show: true,
              color: '#f60'
            }
          },
          symbol: 'pin',
          symbolSize: 50,
          data: [{
            name: item[0],
            value: chinaGeoCoordMap[item[0]].concat([100])
          }]
        }

        )
      })
      return series
    }
  },
  components: {
    // lineEcharts
  }
}
</script>

<style lang="scss" scoped>
.dom {
  width:100%;
  box-sizing: border-box;
  height: 100%;
  .passenger-vol {
    width:100%;
    box-sizing: border-box;
    height: 100%;
  }
}

</style>
