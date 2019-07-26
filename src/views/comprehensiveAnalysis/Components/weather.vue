<template>
  <div class="weather">
    <el-row style="margin: 0; height: 90px;">
      <el-col :offset="4" :span="5">
        <div class="center top">
          <span>10:56</span>
          <span style="font-weight: 200;font-size: 15px;margin-left:15px;">周日</span>
        </div>
        <div class="center bottom">2019/10/01</div>
      </el-col>
      <el-col :span="2">
        <div class="icon">
          <i class="iconfont icon-tianqi-qing" style="color: #ff0;font-size: 30px;"></i>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="center top" style="margin-bottom: 2px;">
          22:C
        </div>
        <div class="center bottom">25/12</div>
      </el-col>
      <el-col :span="2">
        <div style="width: 14px; text-align:center; color: #fff; margin-top: 10px; margin-left: 13px;">未来两日</div>
      </el-col>
      <el-col :span="7">
        <div class="future-wrapper">
          <div class="kobe">
            <p class="top">天气1</p>
            <p class="bottom">25/12</p>
          </div>
          <div class="kobe">
            <p class="top">天气2</p>
            <p class="bottom">25/12</p>
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
  height: 100px;
  .center {
    text-align: center;
    color: #fff;
  }
  .top {
    font-size: 20px;
    font-weight: 500;
    line-height: 50px;
  }
  .bottom {
    font-size: 15px;
    font-weight: 200;
    line-height: 10px;
  }
  .icon {
    height: 90px;
    width: 100%;
    line-height: 90px;
    text-align: center;
  }
  .future-wrapper {
    width: 100%;
    display: flex;
    .kobe {
      width:50%;
      text-align: center;
      .top {
        font-size: 22px;
        color: #fff;
        margin: 0
      }
      .bottom {
        font-size: 15px;
        color: #fff;
        margin: 3px;
      }
    }
  }
}
</style>
