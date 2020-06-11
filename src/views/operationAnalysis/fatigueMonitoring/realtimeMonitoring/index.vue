<template>
  <div class="real-time-monitoring">
    <Map :pointDatas="pointDatas" @getContent="getContent"/>
    <Drawer @getPoint="getPoint"/>
    <Dialog :warnDetails="warnDetails" :msgData="msgData" :tableData="tableData"/>
    <div class="to-see" @mouseover="handlerToSee"></div>
  </div>
</template>

<script>
import moment from 'moment'
import Map from './Components/map'
import Drawer from './Components/drawer'
import Dialog from './Components/dialog'
import { mapGetters } from 'vuex'
export default {
  name: 'realtimeMonitoring',
  data () {
    return {
      isSee: false,
      pointDatas: [],
      msgData: {},
      warnDetails: {
        pigePicList: [],
        devUuid: '',
        devCode: '',
        devRefId: '',
        busUuid: ''
      },
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  methods: {
    handlerToSee () {
      this.$children[1].drawer = true
    },
    getPoint (data) {
      this.pointDatas = data
    },
    getContent (data) {
      let defaultData = this.$store.getters.formData
      this.msgData = data
      this.warnDetails.pigePicList = data.content.pigePicList
      this.warnDetails.devUuid = data.content.devUuid
      this.warnDetails.devRefId = data.content.devRefId
      this.warnDetails.devCode = data.content.devCode
      this.warnDetails.busUuid = data.content.busPosition.busId
      this.$api['tiredMonitoring.getWarnList']({
        orgId: this.userId, // 组织机构id
        lineId: '', // 线路id
        busUuid: data.content.busPosition.busId, // 车辆id
        devCode: '', // 设备号
        busPlateNumber: data.name, // 车牌号
        busSelfCode: data.content.busPosition.busSelfCode, // 自编号
        warnLevel: '', // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: defaultData.warningArr, // 报警类型
        startTime: moment().format('YYYY-MM-DD 00:00:00'), // 时间格式   开始结束默认查近7天的
        endTime: moment().format('YYYY-MM-DD 23:59:59'),
        pageSize: 10000,
        pageNum: 1,
        handleResults: ['0', '1', '2', '3']
      }).then(res => {
        if (res.list.length === 0) {
          this.$message.warning('主动安全列表暂无数据')
        }
        this.tableData = res.list
      }).catch(err => {
        this.$message.error(err.message)
      })
      this.$children[2].dialogVisible = true
    }
  },
  components: {
    Map,
    Drawer,
    Dialog
  }
}
</script>

<style lang="scss" scoped>
.real-time-monitoring {
  width: 100%;
  height: 100%;
  position: relative;
  .to-see {
    width: 1vw;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 999;
  }
}
</style>
