<template>
  <div class="g2-wrapper">
    <div id="classer" ref="chartWrapper"></div>
  </div>
</template>

<script>
// import G2 from '@antv/g2'
// import DataSet from '@antv/data-set'
// import { mapGetters } from 'vuex'
// export default {
//   props: {
//     selectData: {
//       type: Object
//     }
//   },
//   data () {
//     return {
//       echartsData: {}
//     }
//   },
//   computed: {
//     ...mapGetters(['defaultSearch'])
//   },
//   created () {
//   },
//   mounted () {
//     setTimeout(() => {
//       let lineArr = this.defaultSearch.lineLineId.split('+')
//       this._getPfODYCountListData({
//         company: this.defaultSearch.lineOrgId,
//         lineID: lineArr[0],
//         arrow: this.defaultSearch.lineType
//       })
//     }, 500)
//   },
//   watch: {
//     selectData: {
//       deep: true,
//       handler (newV) {
//         // if () {}
//         let lineArr = newV.lineLineId.split('+')
//         this._getPfODYCountListData({
//           company: newV.lineOrgId,
//           lineID: lineArr[0],
//           arrow: newV.lineType
//         })
//       }
//     }
//   },
//   methods: {
//     _getPfODYCountListData (params) {
//       this.$api['lineNet.getPfODYCountListData'](params).then(res => {
//         let nodes = []
//         let links = []
//         if (res.nodes.length > 0) {
//           res.nodes.forEach(item => {
//             nodes.push({
//               id: item.sStationIndex,
//               name: item.sStationName,
//               value: item.brushCount
//             })
//           })
//           res.edges.forEach(item => {
//             links.push({
//               source: item.sStationIndex,
//               target: item.eStationIndex
//             })
//           })
//           let ds = new DataSet()
//           let dv = ds.createView().source({ links, nodes }, {
//             type: 'graph',
//             edges: function edges (d) {
//               return d.links
//             }
//           })
//           dv.transform({
//             type: 'diagram.arc',
//             marginRatio: 0.5
//           // sortBy: 'frequency' // id, weight, frequency, {function}
//           })
//           console.log(dv)
//           let chartDom = this.$refs.chartWrapper
//           console.log(chartDom.childNodes)
//           if (chartDom.childNodes.length > 0) {
//             chartDom.removeChild(chartDom.firstChild)
//           }
//           let chart = new G2.Chart({
//             container: 'classer',
//             forceFit: true,
//             height: 570,
//             padding: ['auto', 'auto', 100, 'auto']
//           })

//           chart.legend(false)
//           chart.tooltip({
//             showTitle: false
//           })

//           let edgeView = chart.view()
//           edgeView.source(dv.edges.filter(item => item.x))
//           edgeView.axis(false)
//           edgeView.edge().position('x*y').shape('arc').color('source').opacity(0.5).tooltip('source*target')

//           let nodeView = chart.view()
//           nodeView.source(dv.nodes)
//           nodeView.axis(false)
//           nodeView.point().position('x*y').shape('circle').size('value').color('id').opacity(0.5).style({
//             stroke: 'grey'
//           }).label('name', { // label configuration for non-polar coord
//             offset: -10,
//             textStyle: {
//               textAlign: 'left',
//               rotate: 90
//             }
//           })
//           chart.render()
//         } else {
//           let chartDom = this.$refs.chartWrapper
//           if (chartDom.childNodes.length > 0) {
//             chartDom.removeChild(chartDom.firstChild)
//           }
//           this.$message.warning('暂无数据')
//         }
//       })
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.g2-wrapper {
  width: 60%;
  height: 90%;
  margin: 10vh auto 5vh;
  box-sizing: border-box;
}
</style>
