<template>
  <div class="rate">
    <el-row style="margin-bottom: 0" :gutter="12">
      <el-col class="font-style" :span="8">
        <span>总在线设备：<span class="color">{{onlineDeviceCount}}</span>台</span>
      </el-col>
      <el-col class="font-style" :span="8">
        <span>总设备数量：<span  class="color">{{deviceCount}}</span>台</span>
      </el-col>
      <el-col class="font-style" :span="8">
        <span>当前设备在线率：<span  class="color">{{perNum}}%</span></span>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
// import moment from 'moment';
import { mapGetters } from 'vuex'
export default {
  props: {
    selectData: {
      type: Object
    },
    isUpdate: {
      type: Boolean
    }
  },
  data () {
    return {
      deviceCount: '',
      onlineDeviceCount: ''
    }
  },
  created () {
    this._onLineRate()
  },
  computed: {
    ...mapGetters(['userId']),
    perNum () {
      if (this.deviceCount && this.deviceCount !== '0') {
        let num = this.onlineDeviceCount / this.deviceCount * 100
        return JSON.stringify(num).substring(0, 5)
      } else {
        return '——'
      }
    }
  },
  watch: {
    isUpdate () {
      if (this.isUpdate) {
        this._onLineRate(this.selectData.orgUuid)
      }
    }
  },
  methods: {
    _onLineRate (params) {
      if (params) {
        this.$api['tiredMonitoring.getDeviceStatus']({
          orgId: params === '1' ? '' : params
        }).then(res => {
          this.deviceCount = res.deviceCount
          this.onlineDeviceCount = res.onlineDeviceCount
        })
      } else {
        if (this.userId === '1') {
          this.$api['tiredMonitoring.getDeviceStatus']({
            orgId: ''
          }).then(res => {
            this.deviceCount = res.deviceCount
            this.onlineDeviceCount = res.onlineDeviceCount
          })
        } else {
          this.$api['tiredMonitoring.getDeviceStatus']({
            orgId: this.userId
          }).then(res => {
            this.deviceCount = res.deviceCount
            this.onlineDeviceCount = res.onlineDeviceCount
          })
        }
      }
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.rate {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 12px;
  line-height: 50px;
  margin-top: 20px;
  padding: 0px 100px;
  box-sizing: border-box;
  .font-style {
    text-align: center;
    .color {
      font-size: 20px;
      margin: 0 5px;
      font-weight: bold;
      color: #409EFF;
    }
  }
}
</style>
