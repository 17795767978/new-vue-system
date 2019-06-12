<template>
  <div class="data-wrapper">
    <el-button type="success" @click="fullScreen" size="small" style="position: absolute; right: 20px; top: 20px; z-index: 1003" icon="el-icon-video-camera"></el-button>
    <div class="content-wrapper">
     <TopTitleMsg></TopTitleMsg>
     <StreamNum></StreamNum>
     <chartsComplete></chartsComplete>
     <chartsMain></chartsMain>
     <bottomChart></bottomChart>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TopTitleMsg from './Components/topTitleMsg.vue'
import StreamNum from './Components/streamNum.vue'
import chartsComplete from './Components/chartsComplete.vue'
import chartsMain from './Components/chartsMain.vue'
import bottomChart from './Components/bottomChart.vue'
// import screenFull from 'screenfull'
export default {
  name: 'chartAnalysis',
  data () {
    return {
      isFullScreen: false
    }
  },
  created () {
    // 监听全屏事件 根据高度计算是否退出
    document.addEventListener('fullscreenchange', (e) => {
      if (window.innerHeight - window.outerHeight < -50) {
        this.$router.push('/homepage/home')
      }
    })
    document.addEventListener('mozfullscreenchange', (e) => {
      if (window.innerHeight - window.outerHeight < -50) {
        this.$router.push('/homepage/home')
      }
    })
    document.addEventListener('webkitfullscreenchange', (e) => {
      if (window.innerHeight - window.outerHeight < -50) {
        this.$router.push('/homepage/home')
      }
    })
    document.addEventListener('msfullscreenchange', (e) => {
      if (window.innerHeight - window.outerHeight < -50) {
        this.$router.push('/homepage/home')
      }
    })
  },
  mounted () {
    this.fullScreen()
  },
  activated () {
    this.fullScreen()
  },
  watch: {
  },
  methods: {
    fullScreen () {
      if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen()
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen()
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        }
      } else {
        this.$router.push('/homepage/home')
        if (document.cancelFullScreen) {
          document.cancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        }
      }
    }
    // closeWrapper () {
    //   this.$router.push('/homepage/home')
    // }
  },
  components: {
    TopTitleMsg,
    StreamNum,
    chartsComplete,
    chartsMain,
    bottomChart
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
.data-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  min-height: calc(100vh);
  overflow: auto;
  background: url(../../assets/images/space.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 1002;
  padding: 5px 20px;
  box-sizing: border-box;
  .content-wrapper {
    padding: 0;
    box-sizing: border-box;
  }
}
</style>
