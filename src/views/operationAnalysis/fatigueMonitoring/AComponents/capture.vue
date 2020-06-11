<template>
  <div class="capture" v-loading="loading">
    <el-button type="primary" style="margin-left: 5vw;" @click="getCapture" :disabled="isDisabled">主动抓拍</el-button>
    <div class="waiting" v-if="timer">
      <h2>设备正在抓拍，请稍等。。。</h2>
      <el-progress type="circle" :percentage="percent" :status="status"></el-progress>
      <h2 class="font">{{timeNum}}s</h2>
    </div>
    <div class="block" v-if="!imgListDis.length && !timer">
      <el-image class="image-slot">
        <div slot="error" class="img" style="width: 100%; height: 100%;text-align:center;line-height: 100%; margin: 0" @click="getImgList">
          <i class="el-icon-picture-outline" style="display: block;font-size:5vw;margin-top: 12.5vh;"></i>
        </div>
      </el-image>
    </div>
    <div class="img-list" v-else-if="imgListDis.length > 0 && !timer">
      <el-carousel type="card" style="width: 60%; margin: 10vh auto" :autoplay="false">
        <el-carousel-item v-for="item in imgListDis" :key="item.url">
          <img :src="item.url" alt="抓拍图片" width="100%" height="100%">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    warnDetails: {
      type: Object
    }
  },
  data () {
    return {
      radio: '',
      imgList: [],
      imgListDis: [],
      loading: false,
      percent: 0,
      isDisabled: false,
      status: 'exception',
      date: '',
      timer: null,
      timeNum: 0
    }
  },
  watch: {
    percent (newV) {
      if (newV <= 25) {
        this.status = 'exception'
      } else if (newV > 25 && newV <= 50) {
        this.status = 'exception'
      } else if (newV > 50 && newV <= 75) {
        this.status = 'warning'
      } else {
        this.status = 'success'
      }
      if (newV === 100) {
        this.isDisabled = false
        clearInterval(this.timer)
        this.timer = null
        this.$api['wholeInformation.pigePicList']({
          devCode: this.warnDetails.devCode,
          warnTime: this.date
        }).then(res => {
          this.imgList = res
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.imgListDis = res
          }, 500)
        })
      }
    }
  },
  methods: {
    getCapture () {
      clearInterval(this.timer)
      this.timer = null
      this.loading = true
      this.percent = 0
      this.timeNum = 0
      this.isDisabled = true
      this.status = 'exception'
      this.date = moment().format('YYYY-MM-DD HH:mm:ss')
      this.$api['wholeInformation.manual']({
        devList: [
          {
            devUuid: this.warnDetails.devUuid,
            devCode: this.warnDetails.devCode
          }
        ]
      }).then(res => {
        this.loading = false
        // console.log(res)
        this.imgList = []
        this.imgListDis = []
        this.$message.success('抓拍添加成功')
        this.timeInterval()
      })
    },
    getImgList () {
      this.$api['wholeInformation.pigePicList']({
        devCode: this.warnDetails.devCode,
        warnTime: this.date === '' ? moment().format('YYYY-MM-DD HH:mm:ss') : this.date
      }).then(res => {
        if (!res.length) {
          this.imgList = []
          if (this.date === '') {
            this.$message.warning('请先抓拍')
          } else if (this.date !== '') {
            this.$message.warning('图片下载失败, 请稍后重试')
          }
        } else {
          this.imgList = res
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.imgListDis = res
          }, 500)
        }
      })
    },
    timeInterval () {
      this.timeNum = 0
      this.timer = setInterval(() => {
        this.timeNum += 1
        this.percent += 100 / 40
      }, 1000)
    },
    beforeDestroy () {
      this.imgList = []
      this.imgListDis = []
    }
  }
}
</script>

<style lang="scss" scoped>
.capture {
  width: 100%;
  .select {
    padding: 1vh 0.5vw;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
  }
  .waiting {
    width: 100%;
    height: 50vh;
    margin-top: 10vh;
    text-align: center;
    position: relative;
    .font {
      position: absolute;
      top: 40%;
      width: 100%;
      line-height: 1;
      font-size: 1.5vw;
      text-align: center
    }
    /deep/ .el-progress-circle {
      width: 18vw !important;
      padding-bottom: 60% !important;
    }
    /deep/ .el-progress--circle .el-progress__text {
      font-size: 1.5vw !important;
      display: none !important;
    }
  }
  .block {
    width: 100%;
    height: 50vh;
    margin-top: 15vh;
    text-align: center;
    .demonstration {
      font-size: 1.5vw;
    }
    .image-slot {
      width: 30vw;
      height: 35vh;
      border-radius: 6px;
      background-color: #eeeeee;
      .img {
        width: 30vw;
        height: 35vh;
      }
    }
  }
  .img-list {
    width: 100%;
    height: 60vh;
    margin-top: 5vh;
    .wrapper {
      width: 70%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .item {
        width: 30%;
      }
    }
  }
}
</style>
