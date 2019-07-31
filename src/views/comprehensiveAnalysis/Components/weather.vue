<template>
  <div class="weather">
    <el-row style="margin: 0;">
      <el-col :offset="5" :span="6">
        <div class="center top">
          <span>10:56</span>
          <span style="font-weight: 200;font-size: 1vw;margin-left:0.5vw;">周日</span>
        </div>
        <div class="center bottom">2019/10/01</div>
      </el-col>
      <el-col :span="2">
        <div class="icon">
          <i class="iconfont icon-tianqi-qing" style="color: #ff0;font-size: 20px;"></i>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="center top" style="margin-bottom: 0.1vw;">
          22:C
        </div>
        <div class="center bottom">25/12</div>
      </el-col>
      <el-col :span="2">
        <div style="width: 1vw; text-align:center; color: #fff; margin-top: 0.425vw; margin-left: 0.675vw; line-height: 1.5vh">未来两日</div>
      </el-col>
      <el-col :span="6">
        <div class="future-wrapper">
          <div class="kobe">
            <p class="top">天气1</p>
            <span class="bottom">25/12</span>
          </div>
          <div class="kobe">
            <p class="top">天气2</p>
            <span class="bottom">25/12</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script type='text/ecmascript-6'>
// import '../../../assets/iconfontWeather/iconfont.css'

</script>
<style lang="scss" scoped>
.weather {
  width: 100%;
  .center {
    text-align: center;
    color: #fff;
  }
  .top {
    font-size: 1vw;
    font-weight: 500;
    margin-top: 1vh;
  }
  .bottom {
    font-size: 1vw;
    font-weight: 200;
    line-height: 2vh;
  }
  .icon {
    width: 100%;
    line-height: 7vh;
    text-align: center;
  }
  .future-wrapper {
    width: 100%;
    display: flex;
    .kobe {
      width:50%;
      text-align: center;
      margin-top: 1vh;
      .top {
        font-size: 1vw;
        color: #fff;
        margin: 0;
        margin-bottom: 0.25vh
      }
      .bottom {
        font-size: 1vw;
        color: #fff;
        margin-top: 1vh;
        line-height: 2vh;
      }
    }
  }
}
</style>
