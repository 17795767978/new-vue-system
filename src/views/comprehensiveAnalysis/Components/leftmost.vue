<template>
  <div class="most-left">
    <div class="top">
      <ul>
        <li>
          <p class="road-rescue">
            <span>路救</span>
            <span style="margin-left: 1vw;font-size: 1vw">123</span>
          </p>
        </li>
        <li>
          <p class="road-rescue">
            <span>事故</span>
            <span style="margin-left: 1vw; font-size: 1vw">123</span>
          </p>
        </li>
        <li>
          <p class="road-rescue">
            <span>异常</span>
            <span style="margin-left: 1vw;font-size: 1vw">123</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="bottom"></div>
  </div>
</template>
<script type='text/ecmascript-6'>

</script>
<style lang="scss" scoped>
.most-left {
  width: 100%;
  height: 100%;
  // background: #000;
  .top {
    width: 100%;
    height: 30%;
    padding: 5% 0;
    box-sizing: border-box;
    margin-top: -30%;
    .road-rescue{
      width: 80%;
      padding: 0.8vh 1vw;
      box-sizing: border-box;
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
      color: #fff;
      font-size: 0.8vw;
      display: block;
      background-color: #252c46;
      margin-bottom: 20px;
    }
  }
  .bottom {
    width: 100%;
    height: 80%;
    padding: 5% 0;
  }
}
</style>
