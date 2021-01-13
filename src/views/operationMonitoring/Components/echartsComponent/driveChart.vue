<template>
<div>
  <div
    id="drive-chart"
    :style="{width: '90%', height: '200px',padding: '10px 0', margin: '0 auto'}"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0)"
    >
  </div>
</div>
</template>

<script>
const TIME = 15 * 1000
export default {
  data () {
    return {
      activeNight: 0,
      loading: true,
      changeData: [],
      badDrivingBehavior: [],
      timer: null
    }
  },
  components: {
    // noEcharts
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._badDrivingBehavior({
      orgId,
      warnTypes: []
    })
  },
  mounted () {
    this.$store.state.views.activeNight ? this.skinType = 1 : this.skinType = 0
    // setTimeout(() => {
    //   this.drawLine();
    //   this.loading = false;
    // }, 2000);
  },
  activated () {
    this.drawLine()
  },
  methods: {
    _badDrivingBehavior (params) {
      this.$api['homeTired.getStatisticDatasByWarnType'](params).then(res => {
        this.loading = false
        this.changeData = res
        let dataArrValue = res.map(item => item.warnLabel)
        let dataArrNumber = res.map(item => item.warnNumber)
        for (let i = 0; i < dataArrValue.length; i++) {
          this.badDrivingBehavior[i] = {
            name: dataArrValue[i],
            value: dataArrNumber[i]
          }
        }
        this.drawLine()
        this.timer = setTimeout(() => {
          this._badDrivingBehavior(params)
        }, TIME)
      })
    },
    drawLine () {
      let driveLine = this.$echarts.init(document.getElementById('drive-chart'))
      window.addEventListener('resize', () => { driveLine.resize() })
      driveLine.setOption({
        // title: {
        //   text: '不良驾驶行为统计',
        //   left: 'center',
        //   textStyle: {
        //     'color': this.skinType === 0 ? '#000000' : '#ffffff',
        //     'fontSize': 14
        //   }
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#ff2bd0', '#00ffff', '#ff840b', '#ff31a0', '#fedd00'],
        series: [
          // {
          //   name: '面积模式',
          //   type: 'pie',
          //   radius: '50%',
          //   center: ['50%', '60%'],
          //   roseType: 'radius',
          //   data: this.badDrivingBehavior
          // },
          {
            name: '不良驾驶行为',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            label: {
              formatter: '{b}: {@2012} ({d}%)'
            },
            // roseType: 'area',
            data: this.badDrivingBehavior
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
