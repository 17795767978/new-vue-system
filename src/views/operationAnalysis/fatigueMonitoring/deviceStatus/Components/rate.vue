<template>
  <div class="rate">
    <el-row style="margin-bottom: 0" :gutter="12">
      <el-col class="font-style" :span="6">
        <span>在线设备数：<span class="color" @click="getOnlineDeviceCount">{{onlineDeviceCount}}</span>台</span>
      </el-col>
      <el-col class="font-style" :span="6">
        <span>离线设备数：<span class="color" @click="getOfflineDeviceCount">{{deviceCount - onlineDeviceCount}}</span>台</span>
      </el-col>
      <el-col class="font-style" :span="6">
        <span>总设备数：<span  class="color" @click="getAlllineDeviceCount">{{deviceCount}}</span>台</span>
      </el-col>
      <el-col class="font-style" :span="6">
        <span>设备在线率：<span  class="color-sec">{{perNum}}%</span></span>
      </el-col>
      <el-col class="font-style" :span="6">
        <span>总车辆数：<span  class="color-sec">{{allBusNum}}</span>辆</span>
      </el-col>
      <el-col class="font-style" :span="6">
        <span>车辆在线数：<span  class="color-sec">{{onlineBus}}</span>辆</span>
      </el-col>
      <el-col class="font-style" :span="6">
        <span>设备脱管数：<span  class="color" @click="goToDetail">{{ridControlDeviceCount}}</span>辆</span>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
// import moment from 'moment';
import Bus from './bus.js'
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
      onlineBus: '',
      allBusNum: '',
      deviceCount: '',
      onlineDeviceCount: '',
      ridControlDeviceCount: ''
    }
  },
  created () {
    this._onLineRate(
      {
        orgId: this.userId,
        lineId: '',
        devModel: 'ADAS'
      }
    )
    this._getOnlineBus({
      orgId: this.userId,
      lineId: ''
    })
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
    isUpdate (newV) {
      if (newV) {
        this._getOnlineBus({
          orgId: this.selectData.orgUuid === '1' ? '' : this.selectData.orgUuid,
          lineId: this.selectData.lineUuid
        })
        this._onLineRate({
          orgId: this.selectData.orgUuid === '1' ? '' : this.selectData.orgUuid,
          lineId: this.selectData.lineUuid,
          devModel: this.selectData.devModel
        })
      }
    }
  },
  methods: {
    _getOnlineBus (params) {
      this.$api['dispatch.getOnlineCarNumber'](params).then(res => {
        this.allBusNum = res.totalBusNumber
        this.onlineBus = res.onlineBusNumber
      })
    },
    _onLineRate (params) {
      this.$api['tiredMonitoring.getDeviceStatus'](params).then(res => {
        this.deviceCount = res.deviceCount
        this.onlineDeviceCount = res.onlineDeviceCount
        this.ridControlDeviceCount = res.ridControlDeviceCount
      })
    },
    getOnlineDeviceCount () {
      Bus.$emit('getOnlineDev')
    },
    getOfflineDeviceCount () {
      Bus.$emit('getOfflineDev')
    },
    getAlllineDeviceCount () {
      Bus.$emit('getAlllineDev')
    },
    goToDetail () {
      if (this.ridControlDeviceCount > 0) {
        this.$router.push({
          name: 'equipmentAlarm',
          params: {
            type: 'rate',
            ...this.selectData
          }
        })
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
      cursor: pointer;
      font-size: 20px;
      margin: 0 5px;
      font-weight: bold;
      color: #409EFF;
    }
    .color-sec {
      font-size: 20px;
      margin: 0 5px;
      font-weight: bold;
      color: #909399;
    }
  }
}
</style>
