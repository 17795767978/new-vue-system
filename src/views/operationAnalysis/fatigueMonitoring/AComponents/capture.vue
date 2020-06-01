<template>
  <div class="capture">
    <el-button type="primary" size="mini" style="margin-left: 50vw;" @click="getCapture">抓拍</el-button>
    <div class="block">
      <el-image class="image-slot">
        <div slot="error" class="img">
          <i class="el-icon-picture-outline" style="display: block;width: 30vw; height: 30vh;font-size:5vw;margin-top: 12vh;"></i>
        </div>
      </el-image>
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
      radio: ''
    }
  },
  methods: {
    getCapture () {
      this.$api['wholeInformation.manual']({
        devList: [
          {
            devUuid: this.warnDetails.devUuid,
            devCode: this.warnDetails.devCode
          }
        ]
      }).then(res => {
        // console.log(res)
        this.$message.success('添加成功')
      })
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
}
</style>
