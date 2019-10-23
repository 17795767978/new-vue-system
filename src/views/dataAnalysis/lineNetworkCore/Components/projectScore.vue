<template>
  <div class="passenger-vol" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :title="title" :legend="legend" :XData="xData" :YData="yData" :maxNum="maxNum" :grid="grid" :tooltip="tooltip" :radar="radar"></lineEcharts>
  </div>
</template>

<script type="text/ecmascript-6">
import lineEcharts from '@/components/echarts/brokenLineDiagram'
import { mapGetters } from 'vuex'
export default {
  name: '',
  props: {
    echartsData: {
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
      id: 'projectScore',
      grid: {},
      loading: true,
      tooltip: {},
      radar: [],
      lineNum: ''
    }
  },
  computed: {
    ...mapGetters(['formData'])
  },
  created () {
    let lineArr = this.formData.lineLineId.split('+')
    this._getNetIndexDeaData({
      company: this.formData.lineOrgId,
      lineID: lineArr[0]
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        let lineArr = newV.lineLineId.split('+')
        this._getNetIndexDeaData({
          company: newV.lineOrgId,
          lineID: lineArr[0]
        })
      }
    },
    echartsData: {
      deep: true,
      handler (newV) {
        this._getNetIndexDeaData({
          company: newV.lineOrgId,
          lineID: newV.lineUuid
        })
      }
    }
  },
  methods: {
    _getNetIndexDeaData (params) {
      this.loading = true
      this.$api['lineNet.getDeaLineScoreListData'](params).then(res => {
        this.loading = false
        let data = []
        data = [res[0].staRational, res[0].safeRational, res[0].conRational, res[0].rapRational, res[0].score]
        this.lineNum = res[0].lineNumber
        this.title = {
          text: `${this.lineNum}项目得分情况`,
          left: 'center',
          top: 20,
          textStyle: {
            'color': '#000',
            'fontSize': '22'
          }
        }
        this.grid = {
          x: 200,
          y: 50,
          x2: 10,
          y2: 30
        }
        this.tooltip = {
          trigger: 'axis'
        }
        this.radar = [
          {
            indicator: [
              { text: '站点建设合理性', max: 1 },
              { text: '舒适性', max: 1 },
              { text: '便捷性', max: 1 },
              { text: '快捷性', max: 1 },
              { text: '总得分', max: 1 }
            ],
            center: ['50%', '60%'],
            radius: 120
          }
        ]
        this.lineData = [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            itemStyle: { normal: { areaStyle: { type: 'default' } } },
            data: [
              {
                value: data,
                name: '项目得分情况'
              }
            ]
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
