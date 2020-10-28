<template>
  <div class="wrapper" :class="{active: isActive}" ref="wrapper">
    <div class="content">
      <h2 class="title">图表分析说明</h2>
      <p class="content-ana"><span class="content-title">分析方法：</span>{{msg.methods}}</p>
      <p class="content-ana"><span class="content-title">分析目的：</span>{{msg.aim}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascrit-6">
export default {
  props: {
    msg: {
      type: Object
    }
  },
  data () {
    return {
      msgdata: '',
      isActive: false
    }
  },
  mounted () {
    this.$refs.wrapper.addEventListener('mouseover', () => {
      this.$refs.wrapper.style.right = 0
    })
    this.$refs.wrapper.addEventListener('mouseleave', () => {
      this.$refs.wrapper.style.right = '-16.9vw'
    })
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 17vw;
  height: 80vh;
  position: fixed;
  right: -16vw;
  top:15.5vh;
  bottom:5vh;
  z-index: 1000;
  .content {
    width: 80%;
    margin-left:20%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    padding: 5vh 0.5vw;
    box-sizing: border-box;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    .title {
      font-size: 1.7rem;
      text-align: center;
      color: #fff;
      font-family:"Times New Roman",Georgia,Serif;
    }
    .content-ana {
      font-size: 1.2rem;
      color: #fff;
      line-height: 2;
      font-family:"Times New Roman",Georgia,Serif;
      .content-title {
        font-size: 1.3rem;
        font-weight: 500;
        color: #f00;
        font-family:"Times New Roman",Georgia,Serif;
      }
    }
  }
}
</style>
