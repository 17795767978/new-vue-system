<template>
 <div>
   <video ref="video" src="" style="width: 100%;height: 100%;" controls autoplay v-loading="isLoading" element-loading-background="rgba(0, 0, 0, 0.8)"></video>
 </div>
</template>

<script>
import Flv from 'flv.js'
export default {
  props: {
    item: Object,
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
    console.log(this.item)
    if (this.item.warnType && this.item.warnType.length > 0) {
      if (!this.item.warnMediaList) {
        this.$message.error(`${this.item.warnTypeName}暂无视频`)
      } else {
        this.$refs.video.src = this.item.warnMediaList[0].url
      }
    } else {
      this.initCamera(this.item)
    }
  },
  updated () {
    // console.log(this.monitorData)
  },
  beforeDestroy () {
    if (this.player !== null) {
      this.player.pause()
      this.player.unload()
      this.player.detachMediaElement()
      this.player.destroy()
      this.player = null
    }
  },
  watch: {
    item: {
      deep: true,
      handler (newV) {
        console.log(newV)
        if (this.item.warnType && this.item.warnType.length > 0) {
          if (!this.item.warnMediaList) {
            this.$message.error(`${this.item.warnTypeName}暂无视频`)
          } else {
            this.$refs.video.src = this.item.warnMediaList[0].url
          }
        } else {
          this.initCamera(this.item)
        }
      }
    },
    dialogTableVisible (newV) {
      if (!newV) {
        if (this.player !== null) {
          this.player.pause()
          this.player.unload()
          this.player.detachMediaElement()
          this.player.destroy()
          this.player = null
        }
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
          this.player.pause()
          this.player.unload()
          this.player.detachMediaElement()
          this.player.destroy()
          this.player = null
          // this.$parent.$emit('monitorShowError', this.monitorData);
        })
      }
    }
  }
}
</script>

<style>

</style>
