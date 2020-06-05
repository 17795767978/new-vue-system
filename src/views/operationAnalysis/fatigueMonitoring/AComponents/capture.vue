<template>
  <div class="capture" v-loading="loading">
    <el-button type="primary" style="margin-left: 5vw;" @click="getCapture">主动抓拍</el-button>
    <div class="block" v-if="!imgList.length">
      <el-image class="image-slot">
        <div slot="error" class="img" @click="getImgList">
          <i class="el-icon-picture-outline" style="display: block;width: 30vw; height: 30vh;font-size:5vw;margin-top: 12vh;"></i>
        </div>
      </el-image>
    </div>
    <div class="img-list" v-else>
      <ul class="wrapper">
        <li v-for="item in imgList" :key="item.url" class="item">
          <img :src="item.url" alt="报警图片" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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
      loading: false
    }
  },
  methods: {
    getCapture () {
      this.loading = true
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
        this.$message.success('抓拍添加成功')
      })
    },
    getImgList () {
      this.loading = true
      this.imgList = this.warnDetails.pigePicList
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    beforeDestroy () {
      this.imgList = []
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
