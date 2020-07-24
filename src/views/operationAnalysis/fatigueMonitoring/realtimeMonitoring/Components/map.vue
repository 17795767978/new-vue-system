<template>
  <div class="all-map" ref="wrapper" v-loading="loading">
    <lineEcharts :id="id" :data="lineData" :bmap="bmap" :isMap="true" :tooltip="tooltip" @getEchartsData="getEchartsData"></lineEcharts>
    <!-- 判断当前选中的车辆有无位置信息，无则提示暂未运营 弹窗 @author lishuaiwu 2020/7/16  -->
    <el-dialog
      :visible.sync="msgDialogVisible"
      :close-on-click-modal="false"
      width="390px"
      :before-close="handleClose">
      <div slot="title" class="dialog-title">
        <span class="dialog-title-0" style="color:#409eff;">{{nowPageIndex}}</span>
        <span class="dialog-title-1">/</span>
        <span class="dialog-title-2">{{noPosBuses.length}}</span>
        <span class="dialog-title-3">
          <el-link type="primary" @click="_lastCon">上一条</el-link>
          &nbsp;&nbsp;
          <el-link type="primary" @click="_nextCon">下一条</el-link>
        </span>
      </div>
      <template v-for="(item, index) in noPosBuses">
        <div :key="index" v-show="nowPageIndex === (index + 1)">
          <div><span>车辆<span style="color:#409eff;">{{item.name}}</span>当日未运营，是否查看车辆详情？</span></div>
          <div class="dialog-btn">
            <el-button-group>
              <el-button size="small" type="primary" @click="_showBusInfo(item)">是</el-button>
              <el-button size="small" type="primary" @click="_nextCon(true)">否</el-button>
            </el-button-group>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import lineEcharts from '@/components/echarts/brokenLineDiagram'
import icon from '../../../../../assets/images/map_icon.png'
import iconSec from '../../../../../assets/images/map_icon_pre.png'
import { mapGetters } from 'vuex'
export default {
  props: {
    datas: {
      type: Array
    },
    pointDatas: {
      type: Array
    }
  },
  data () {
    return {
      loading: false,
      lineData: [],
      id: 'mapStations',
      bmap: {},
      tooltip: {},
      stations: [],
      msgDialogVisible: false,
      noPosBuses: [],
      nowPageIndex: 1
    }
  },
  computed: {
    ...mapGetters(['center'])
  },
  created () {
    // this.stations = [{
    //   name: '新有中路',
    //   value: [113.30554, 22.764464, 80, 0]
    // }]
  },
  mounted () {
    this.loading = true
    setTimeout(() => {
      this.loading = false
      this._getLineMap()
    }, 2000)
  },
  watch: {
    pointDatas: {
      deep: true,
      handler (newV) {
        const dataArr = newV.filter(item => item.levelsType === '3' && item.busPosition)
        this.stations = dataArr.map(item => ({
          name: item.name,
          content: item,
          value: [item.busPosition.lng, item.busPosition.lat, 80, 0]
        }))
        this._getLineMap()
        /* @author lishuaiwu 2020/7/16 */
        this._setBusPositionInfoAlert(this.stations)
      }
    }
  },
  methods: {
    /* 判断当前选中的车辆有无位置信息，无则提示暂未运营 @author lishuaiwu 2020/7/16 */
    _setBusPositionInfoAlert (buses) {
      // todo 测试两个没有坐标的数据
      // buses[0].value[0] = ''
      // buses[1].value[0] = ''
      // buses[2].value[0] = ''
      // buses[2].value[1] = ''
      // 过滤出没有坐标的数据
      const noPosArr = buses.filter(item => {
        const [lng, lat] = [item.value[0], item.value[1]]
        return lng === '' || lat === '' || lng === undefined || lat === undefined
      })
      if (noPosArr.length > 0) {
        this._openMsgBox(noPosArr)
      }
    },
    /* 当无坐标时，打开提示弹窗 @author lishuaiwu 2020/7/16 */
    _openMsgBox (noPosArr) {
      this.noPosBuses = noPosArr
      this.msgDialogVisible = true
    },
    /* next @author lishuaiwu 2020/7/16 */
    _nextCon (flag) {
      this.nowPageIndex > this.noPosBuses.length - 1 ? this.nowPageIndex = 1 : this.nowPageIndex += 1
      if (flag === true && this.nowPageIndex === 1) {
        this.msgDialogVisible = false
      }
    },
    /* last @author lishuaiwu 2020/7/16 */
    _lastCon () {
      this.nowPageIndex === 1 ? this.nowPageIndex = this.noPosBuses.length : this.nowPageIndex -= 1
    },
    /* 打开车辆信息弹窗 @author lishuaiwu 2020/7/16 */
    _showBusInfo (data) {
      this.$parent.getContent(data)
    },
    _getLineMap () {
      this.bmap = {
        center: this.center,
        zoom: 14,
        roam: true
      }
      // setTimeout(() => {
      //   this.lineData = [{
      //     type: 'lines',
      //     coordinateSystem: 'bmap',
      //     polyline: true,
      //     data: this.stations,
      //     lineStyle: {
      //       normal: {
      //         // color: '#c23531',
      //         // color: 'rgb(200, 35, 45)',
      //         opacity: 1,
      //         width: 5,
      //         emphasis: {
      //           width: 6
      //         }
      //       }
      //     }
      //   }]
      // }, 20)
      this.tooltip = {
        formatter: function (params, ticket, callback) {
          if (params.seriesType === 'lines') {
            return '线路名：' + params.name
          } else {
            return '车：' + params.name
          }
        },
        trigger: 'item'
      }
      this.lineData = [
        {
          name: '站点',
          type: 'scatter',
          data: this.stations,
          coordinateSystem: 'bmap',
          symbolSize: [40, 25],
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              show: false
            }
          },
          // itemStyle: {
          //   normal: {
          //     color: '#13d5e8'
          //   }
          // },
          symbol: (params, data) => {
            if (data.data.content.busStatus === '0') {
              return `image://${iconSec}`
            } else {
              return `image://${icon}`
            }
          }
        }
      ]
    },
    handleClose () {},
    getEchartsData (data) {
      this.$emit('getContent', data.data)
    }
  },
  components: {
    lineEcharts
  }
}
</script>

<style lang="scss" scoped>
.all-map {
  width: 100%;
  height: 100%;
}
.dialog-title-0,.dialog-title-1,.dialog-title-2 {
  margin-right: 6px;
  font-size: 14px;
}
.dialog-title-3 {
  margin-left: 86px;
}
.dialog-btn {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 20px;
}
</style>
