<template>
  <div class="comprehensive-analysis">
    <div class="wrapper" ref="wrapperAnalysis">
      <div class="top-title">
        <el-row :gutter="20">
          <el-col :offset="7" :span="10">
            <div class="title-wrapper">综合运营管理</div>
          </el-col>
          <el-col :span="7">
            <weather></weather>
          </el-col>
        </el-row>
      </div>
      <div class="main">
        <el-row :gutter="5" style="height: 100%">
          <el-col :span="2"  style="height: 100%">
            <div style="height: 100%">
              <mostLeft style="height: 100%"></mostLeft>
            </div>
          </el-col>
          <el-col :span="5" style="height: 100%">
            <div style="height: 100%"></div>
          </el-col>
          <el-col :span="12" style="height: 100%">
            <div style="height: 100%"></div>
          </el-col>
          <el-col :span="5" style="height: 100%">
            <div style="height: 100%"></div>
          </el-col>
        </el-row>
      </div>
      <div class="footer">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import weather from './Components/weather'
import mostLeft from './Components/leftmost'
export default {
  components: {
    weather,
    mostLeft
  },
  created () {
    console.log(window.outerWidth, window.outerHeight)
    // console.log('4:3', 4 / 3)
    // console.log('16:9', 16 / 9)
    console.log('21:9', 21 / 9)
    // console.log('32:9', 32 / 9)
    // console.log('1891:630', 1891 / 630)
    console.log(1792 / 768)
    // 3440X1440
    // 2560X1080
    // 1792X768
  },
  mounted () {
    this.getAdaptation()
  },
  methods: {
    getAdaptation () {
      if (window.outerWidth / window.outerHeight < 2) {
        // this.$refs.wrapperAnalysis.style.paddingBottom = '42.85%'
        this.$refs.wrapperAnalysis.style.height = window.outerWidth * 42.85 / 100 + 'px'
        console.log(this.$refs.wrapperAnalysis.style)
      } else {
        this.$refs.wrapperAnalysis.style.height = '100%'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comprehensive-analysis {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items:center;
  justify-content:center;
  // background-color: #00082d;
  background-color: #fff;
  .wrapper {
    position: relative;
    width: 100vw;
    background-color: #00082d;
    .top-title {
      width: 100vw;
      height: 80px;
      .title-wrapper {
        height: 100%;
        text-align: center;
        line-height: 3vw;
        color: #fff;
        font-weight: bold;
        font-size: 1.5vw;
        font-family:fantasy
      }
    }
    .main {
      width: 100%;
      height: 73%;
    }
    .footer {
      width: 100%;
      height: 14%;
      margin-top: 1%
    }
  }
}
</style>
