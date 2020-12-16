<template>
  <div id="level-chart" :style="{width: '90%', height: '200px',padding: '10px 0', margin: '0 auto'}"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
  </div>
</template>

<script>
const TIME = 30 * 1000
export default {
  data () {
    return {
      loading: true,
      changeData: [],
      getLevelList: [
        {
          name: '一级',
          value: 0
        },
        {
          name: '二级',
          value: 0
        }
      ],
      timer: null
    }
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._getLevelList({
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
    _getLevelList (params) {
      this.$api['homeTired.getAnalysisDatasByWarnLeave'](params).then(res => {
        this.loading = false
        this.changeData = res
        this.changeData.forEach(data => {
          this.getLevelList.forEach(list => {
            if (data.warnLevelLabel === list.name) {
              list.value = data.warnNumber
            }
          })
        })
        this.drawLine()
        this.timer = setTimeout(() => {
          this._getLevelList(params)
        }, TIME)
      })
    },
    drawLine () {
      let levelLine = this.$echarts.init(document.getElementById('level-chart'))
      window.addEventListener('resize', () => { levelLine.resize() })
      levelLine.setOption({
        title: {
          text: '不良行为等级分析',
          left: 'center',
          textStyle: {
            'color': '#fff'
          }
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: ['一级', '二级'],
          bottom: 20,
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#2bacd0', '#fedd00'],
        series: [
          {
            name: '不良驾驶等级',
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            // roseType: 'radius',
            label: {
              formatter: '{b}: {@2012} ({d}%)'
              // normal: {
              //   show: false
              // },
              // emphasis: {
              //   show: true
              // }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: this.getLevelList
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
