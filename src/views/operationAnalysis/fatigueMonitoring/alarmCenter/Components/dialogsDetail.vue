<template>
  <div class="content-detail">
    <el-dialog
      :title="sendTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="90%"
      top="2vh"
      :before-close="handleClose">
      <div  style="height: 80vh">
        <el-tabs v-model="activeName" @tab-click="handleClick" style="height: 80vh">
          <el-tab-pane label="报警信息" name="first">
            <BasicMsg :warnDetails="warnDetails" :activeName="activeName"/>
          </el-tab-pane>
          <el-tab-pane label="设备抓拍" name="second">
            <Capture :warnDetails="warnDetails" :activeName="activeName"/>
          </el-tab-pane>
          <el-tab-pane label="监控视频" name="third">
            <SurveillanceVideo :warnDetails="warnDetails" :activeName="activeName"/>
          </el-tab-pane>
          <el-tab-pane label="下发消息" name="fourth">
            <SendMsg :warnDetails="warnDetails"/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BasicMsg from './basicMsg'
import Capture from '../../AComponents/capture'
import SurveillanceVideo from '../../AComponents/surveillanceVideo'
import SendMsg from '../../AComponents/sendMsg'
export default {
  props: {
    sendTitle: {
      type: String
    },
    warnDetails: {
      type: Object
    }
  },
  data () {
    return {
      activeName: 'first',
      dialogVisible: false
    }
  },
  watch: {
    dialogVisible (newV) {
      if (!newV) {
        this.activeName = 'first'
      }
    }
  },
  methods: {
    handleClose (done) {
      done()
    },
    handleClick () {}
  },
  components: {
    BasicMsg,
    Capture,
    SurveillanceVideo,
    SendMsg
  }
}
</script>

<style>

</style>
