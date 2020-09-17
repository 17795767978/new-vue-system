<template>
  <div id="level-chart" :style="{width: '90%', height: '33vh', margin: '0 auto'}"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
  </div>
</template>

<script>
const TIME = 3 * 60 * 1000
const COLOR = ['#00ff72', '#1479f6', '#fc3c57', '#11e692', '#00c0fe', '#17f4f7']
export default {
  data () {
    return {
      loading: true,
      timer: null,
      changeData: [],
      dataList: []
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._getAlarmLevelRatioAnalysis({
      orgId
    })
  },
  mounted () {
    // setTimeout(() => {
    //   this.drawLine();
    //   this.loading = false;
    // }, 2000);
  },
  activated () {
    this.drawLine()
  },
  methods: {
    _getAlarmLevelRatioAnalysis (params) {
      this.loading = true
      this.$api['homeTired.getStatisticDatasByWarnTypeAnalysis'](params).then(res => {
        this.loading = false
        this.changeData = res.sort((prev, next) => next.warnNumber - prev.warnNumber)
        this.dataList = this.changeData.map(item => ({
          name: item.warnLabel,
          value: item.warnNumber
        }))
        console.log(this.dataList)
        this.drawLine()
        this.timer = setTimeout(() => {
          this._getAlarmLevelRatioAnalysis(params)
        }, TIME)
      })
    },
    drawLine () {
      let levelLine = this.$echarts.init(document.getElementById('level-chart'))
      window.addEventListener('resize', () => { levelLine.resize() })
      levelLine.setOption({
        title: {
          text: '',
          left: 'center',
          textStyle: {
            'color': '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: '1%',
          itemGap: 10,
          icon: 'circle',
          type: 'plain',
          textStyle: {
            color: '#ffffff'
          },
          formatter: (param) => {
            let countArr = this.changeData.map(item => item.warnNumber)
            let countAll = countArr.reduce((prev, next) => Number(prev) + Number(next))
            let arr = this.changeData.filter(item => item.warnLabel === param)[0]
            return `${param} ${arr.warnNumber} (${(Number(arr.warnNumber) * 100 / countAll).toFixed(2)}%)`
          }
        },
        color: COLOR,
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '55%'],
            center: ['50%', '30%'],
            avoidLabelOverlap: false,
            color: [],
            label: {
              show: false,
              position: 'top'
            },
            emphasis: {
              // label: {
              //   show: true,
              //   fontSize: '30',
              //   fontWeight: 'bold'
              // }
            },
            labelLine: {
              show: true
            },
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  formatter: '{b} / {c} / ({d}%)'
                },
                labelLine: { show: true }
              }
            },
            data: this.dataList
          }
        ]
      }, true)
    }
  },
  watch: {
    changeData () {
    }
  },
  destroyed () {
    clearTimeout(this.timer)
    this.timer = null
  }
}
</script>

<style lang="scss" scoped>
.drive-chart {
  width: 100%;
}
</style>
