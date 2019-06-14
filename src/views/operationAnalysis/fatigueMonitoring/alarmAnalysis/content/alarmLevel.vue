<template>
  <div class="echart-level" ref="echartLevel">
    <div
      id="level-chart"
      :style="{width: '100%', height: '350px'}"
      element-loading-background="rgba(0, 0, 0, 0)"
      >
    </div>
  </div>
</template>

<script type="type/ecmascript-6">
// import { levelRate } from 'server/interface'
import elementResizeDetector from 'element-resize-detector'
import moment from 'moment'
export default {
  props: {
    selectData: {
      type: Object
    }
  },
  data () {
    return {
      levelData: [],
      observer: null,
      legendData: [],
      echartData: [
        {
          name: '一级',
          value: 0
        },
        {
          name: '二级',
          value: 0
        }
      ]
    }
  },
  components: {
  },
  created () {
    let start = new Date()
    let endTime = moment(start).format('YYYY-MM-DD 23:59:59')
    let startTime = moment(start - 3600 * 1000 * 24 * 7).format('YYYY-MM-DD 00:00:00')
    this._levelRate({
      orgId: this.selectData.orgId || '',
      lineId: this.selectData.lineId || '',
      busPlateNumber: this.selectData.busPlateNumber || '',
      // startTime: this.selectData.valueTime[0], // 默认7天，昨天开始.时间格式
      // endTime: this.selectData.valueTime[1],
      startTime,
      endTime
    })
  },
  mounted () {
    let listenResize = elementResizeDetector()
    listenResize.listenTo(this.$refs.echartLevel, (el) => {
      this.$echarts.init(document.getElementById('level-chart')).resize()
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler () {
        this._levelRate({
          orgId: this.selectData.orgId,
          lineId: this.selectData.lineId,
          busPlateNumber: this.selectData.busPlateNumber,
          startTime: moment(this.selectData.valueTime[0]).format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment(this.selectData.valueTime[1]).format('YYYY-MM-DD HH:mm:ss')
        })
      }
    }
  },
  methods: {
    _levelRate (params) {
      this.$api['tiredMonitoring.getWarnPie'](params).then(res => {
        this.levelData = res
        this.levelData = this.levelData.sort((prev, next) => parseInt(prev.warnLevel) - parseInt(next.warnLevel))
        if (res.length > 0) {
          this.legendData = this.levelData.map(item => item.warnLevel)
          this.levelData.forEach(list => {
            if (list.warnLevel === '1') {
              this.echartData[0].value = list.warnNum
            } else if (list.warnLevel === '2') {
              this.echartData[1].value = list.warnNum
            }
          })
        } else {
          this.echartData = [{ name: '一级', value: 0 }, { name: '二级', value: 0 }]
          this.$message.warning('暂无数据')
        }
        this.drawLine()
        this.$message.success('数据已更新')
      })
    },
    drawLine () {
      let chart = this.$echarts.init(document.getElementById('level-chart'))
      window.addEventListener('resize', () => { chart.resize() })
      this.$refs.echartLevel.addEventListener('resize', () => { chart.resize() })
      chart.setOption({
        title: {
          text: '报警等级占比',
          x: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          data: ['一级', '二级']
        },
        series: [
          {
            name: '报警等级',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            labelLine: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                label: {
                  formatter: '{b} : {c} ({d}%)'
                }
              }
            },
            data: this.echartData
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.echart-level {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #eeeeee;
  border-radius: 12px;
}
</style>
