<template>
 <div class="map">
   <div class="icon">
    <i class="el-icon-video-pause" style="font-size: 1.2vw; font-weight: bold" v-if="!pause" @click="handlerPlayStatus"></i>
    <i class="el-icon-video-play" style="font-size: 1.2vw; font-weight: bold" v-else @click="handlerPlayStatus"></i>
   </div>
   <div style="width: 70%; height:.5vh; position: absolute; left: 15%; top: 1vh; background-color: rgba(0, 0, 0, 0.5); border-radius: .25vh; z-index: 1000">
     <ul class="wrapper">
       <li v-for="item in hoursArr" :key="item.value" :class="['item-icon', item.isHighLight ? 'active' : '']" @click="getCurrentMap(item)">
         <span style="margin-top: 1vh;display: block;">{{item.value}}</span>
       </li>
     </ul>
   </div>
   <baidu-map
      ref="baiduMapWrapper"
      :style="{width: '100%', height: '100%', borderRadius: '6px'}"
      :zoom="zoom"
      :ak="ak"
      :mapClick="false"
      :center="center"
      :scroll-wheel-zoom="true"
      @ready="handler"
      v-loading="loading"
      :opacity="0.5"
      element-loading-background="rgba(0, 0, 0, 0)"
    >
      <bml-heatmap :data="hotdata" :max="max" :radius="20">
      </bml-heatmap>
    </baidu-map>
 </div>
</template>

<script type="text/ecmascrip-6">
import moment from 'moment'
import { BaiduMap, BmlHeatmap } from 'vue-baidu-map'
import { mapStyle } from '../utils/mapStyle'
import Observer from '../utils/observer.js'
const TIME = 5 * 1000
export default {
  data () {
    return {
      isLoading: true,
      center: { lng: 0, lat: 0 },
      lineOptions: [],
      zoom: 3,
      ak: '7vVOlMOKr03PaWX82WajF6m',
      loading: true,
      timer: null,
      timerToHour: null,
      hotdata: [],
      max: 0,
      hoursArr: [],
      pause: false,
      currentHour: null
    }
  },
  created () {
    this._initTime()
  },
  activated () {
    this.pause = false
  },
  deactivated () {
    this.pause = true
  },
  watch: {
    pause (newV) {
      if (newV) {
        // this._hotDataLine()
        this.timer && clearTimeout(this.timer)
      } else {
        this.getCurrentMap(this.hoursArr[this.currentHour - 6])
      }
    }
  },
  methods: {
    _initTime () {
      const that = this
      let observer = new Observer()
      let times = null
      observer.initHourArr()
      this.hoursArr = observer.assemble()
      this.timerToHour = setInterval(() => {
        let time = moment().format('HH')
        observer.changeTimeNow(time)
        Object.defineProperty(observer, 'hourArr', {
          configurable: true,
          set (newV) {
            times = newV
            that.hoursArr = observer.assemble()
          },
          get () {
            return times
          }
        })
      }, 1000)
    },
    getCurrentMap (item) {
      this.hoursArr.forEach(val => {
        if (item.value === val.value) {
          val.isHighLight = true
        } else {
          val.isHighLight = false
        }
      })
      this._hotDataLine(item.value)
    },
    _getOps () {
      this.$api['wholeInformation.getCityCoordinatePoints']().then(res => {
        this.center.lat = res.lat
        this.center.lng = res.lng
      })
    },
    _hotDataLine (hours) {
      this.timer && clearTimeout(this.timer)
      let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
      this.loading = true
      this.hotdata = []
      this.max = 200
      this.currentHour = hours
      this.$api['homeMap.getBusHeatmapDatas']({ orgId, hours }).then(res => {
        let arrHot = []
        res.forEach(item => {
          arrHot.push({
            lng: item.lng,
            lat: item.lat,
            count: item.getOnNumber
          })
        })
        this.hotdata = arrHot
        this.loading = false
        this.timer = setTimeout(() => {
          if (hours >= this.hoursArr[this.hoursArr.length - 1].value) {
            this.getCurrentMap(this.hoursArr[0])
          } else {
            this.getCurrentMap(this.hoursArr[hours - 5])
          }
        }, TIME)
      }).catch(err => {
        this.loading = false
        this.$message.error(err.message)
      })
    },
    handlerPlayStatus () {
      this.pause = !this.pause
    },
    handler ({ BMap, map }) {
      this._getOps()
      this.zoom = 13
      this.isLoading = false
      map.setMapStyle(mapStyle)
      this._hotDataLine(6)
    }
  },
  components: {
    BaiduMap,
    BmlHeatmap
  },
  destroyed () {
    clearTimeout(this.timer)
    clearInterval(this.timerToHour)
    this.timer = null
    this.timerToHour = null
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
  position: relative;
  .icon {
    width: 1vw;
    height: 1.2vh;
    position: absolute;
    left: 10%;
    top: 0vh;
    z-index: 1000;
  }
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .item-icon {
      width: 0.6vw;
      height: 1.2vh;
      border-radius: 50%;
      background-color: rgba(0,0,0, 1);
      margin-top: -0.35vh;
    }
    .active {
      background-color: #f00
    }
  }
}
</style>
