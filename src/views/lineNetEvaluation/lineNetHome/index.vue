<template>
  <div class="content">
    <div class="left">
      <LineNum />
    </div>
    <div class="middle">
      <RepeatLine />
    </div>
    <div class="right">
      <PassagerFlowLine />
    </div>
    <div class="bottom">
      <LineScoreDisplay />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import LineNum from './Components/lineNumEcharts'
import RepeatLine from './Components/repeatLine'
import PassagerFlowLine from './Components/passagerFlowLine'
import LineScoreDisplay from './Components/lineScoreDisplay'
import mixinsTime from '@/mixins/global/'
export default {
  name: 'lineNetHome',
  mixins: [mixinsTime],
  data () {
    return {
      selectData: {}
    }
  },
  methods: {
  },
  components: {
    LineNum,
    RepeatLine,
    PassagerFlowLine,
    LineScoreDisplay
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: calc(100vh - 10vh);
  padding: 2vh 2vw;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .left,
  .middle,
  .right {
    width: 33.3%;
    height: 50%;
    border-top: 1px solid #EBEEF5;
    box-sizing: border-box;
    &.middle {
      border-left: 1px solid #EBEEF5;
      border-right: 1px solid #EBEEF5;
    }
  }
  .bottom {
    width: 100%;
    height: 50%;
    box-sizing: border-box;
    border-top: 1px solid #EBEEF5;
  }
}
</style>
