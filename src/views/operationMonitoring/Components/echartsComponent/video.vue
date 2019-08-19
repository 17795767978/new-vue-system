<template>
 <div style="width: 100%;background: #000">
   <video ref="video" src="" style="width: 80%;" v-loading="isLoading" element-loading-background="rgba(0, 0, 0, 0.8)"></video>
 </div>
</template>

<script>
import Flv from 'flv.js'
export default {
  props: {
    monitorData: Object,
    dialogTableVisible: Boolean
  },
  data () {
    return {
      player: null,
      isFocused: false,
      isLoading: true
    }
  },
  mounted () {
    this.initCamera(this.monitorData)
  },
  beforeDestroy () {

  },
  watch: {
    dialogTableVisible (newV) {
      if (!newV) {
        if (this.player !== null) {
          this.player.pause()
          this.player.unload()
          this.player.detachMediaElement()
          this.player.destroy()
          this.player = null
        }
      } else {
        this.initCamera(this.monitorData)
      }
    }
  },
  methods: {
    initCamera (data) {
      if (Flv.isSupported()) {
        const videoDom = this.$refs.video
        this.player = Flv.createPlayer({
          isLive: true,
          type: 'flv',
          url: data.url
        })

        this.player.attachMediaElement(videoDom)
        this.player.load()
        this.player.on('metadata_arrived', () => {
          this.isLoading = false
          this.player.play()
        })

        this.player.on('error', () => {
          this.$message({
            message: `视频播放出错`,
            type: 'error'
          })
          // this.$parent.$emit('monitorShowError', this.monitorData);
        })
      }
    }
  }
}
</script>

<style>

</style>
