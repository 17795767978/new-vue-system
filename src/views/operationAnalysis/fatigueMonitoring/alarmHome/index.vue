<template>
  <div class="alarm-home">
    <search
      :isOrg='true'
      :isLine="true"
      :isBus="true"
      :isDate="false"
      :isTime="false"
      :isTurn="false"
      :isDownload="false"
      :isDefault="true"
      :isWarntype="true"
      @configCheck="getSearch"
    />
    <div class="content">
      <div class="echart-table">
        <div class="echart">
          <div class="title">
            不良驾驶行为类型
          </div>
          <driverEchart :searchData="searchData"/>
        </div>
        <div class="table">
          <div class="title">
            不良驾驶行为当日排行
          </div>
          <div class="table-wrapper">
             <driverTable :searchData="searchData" @getDetail="getDetail"></driverTable>
          </div>
        </div>
      </div>
      <div class="map">
        <div class="title">
          不良驾驶行为分析实时报警监控
          <el-badge :value="diaData.length" :max="10" style="margin-top:0px; margin-right: 20px;float:right">
            <el-button size="small" @click="seeDetail" icon="el-icon-message-solid" type="info" style="font-size: 1rem"></el-button>
          </el-badge>
        </div>
        <div class="map-wrapper">
          <mapChart
          :isHotMap="false"
          :isSearchLine="false"
          :isCarsDetail="true"
          :isLineMap="false"
          :isSelect="false"
          :isFlv="false"
          ></mapChart>
        </div>
      </div>
    </div>
    <Dialog :diaData="diaData" :isSee="isSee" @close="close" :clickData="clickData"/>
  </div>
</template>

<script type="text/ecmascript-6">
// import moment from 'moment';
import search from '@/components/searchAlarm/'
import mapChart from '@/components/map/'
// import driverEchart from '@/views/operationMonitoring/Components/echartsComponent/driveChart'
import driverEchart from './Components/driver'
import driverTable from './Components/turnTable'
import Dialog from './Components/dialog'
import { WSAPI } from '../../../../config/settings'
import { mapGetters } from 'vuex'
export default {
  name: 'alarmHome',
  data () {
    return {
      searchData: {},
      ws: {},
      wsData: [],
      diaData: [], // ws的弹窗的值
      isSee: {
        is: false,
        dataType: ''
      },
      currentData: {}, // 默认筛选条件，
      clickData: [], // 点击交互的值
      wsDataClose: false
    }
  },
  components: {
    search,
    driverEchart,
    mapChart,
    driverTable,
    Dialog
  },
  computed: {
    ...mapGetters(['formData'])
  },
  mounted () {
    this.currentData = this.formData
    this.openWs()
  },
  watch: {
    'isSee.is': {
      handler (newV) {
        if (newV) {
          this.closeWs()
        }
      }
    }
  },
  methods: {
    getSearch (item) {
      this.searchData = item
      this.currentData = item
    },
    seeDetail () {
      if (this.diaData.length > 0) {
        this.isSee.is = true
        this.isSee.dataType = 'ws'
        this.wsDataClose = true
      } else {
        this.wsDataClose = false
        this.$message.warning('暂无报警推送消息')
      }
    },
    openWs () {
      if ('WebSocket' in window) {
        let url = WSAPI
        this.ws = new WebSocket(url)
        this.ws.onopen = () => {
        // Web Socket 已连接上，使用 send() 方法发送数据
          this.ws.send('发送数据')
        }
        this.ws.onmessage = (evt) => {
          let data = evt.data
          this.wsData = JSON.parse(data)
          this.diaData = this.wsData
        }
        console.log('===============推送开始=============')
      } else {
        this.$message.error('浏览器不支持websocket')
      }
    },
    closeWs () {
      this.ws.close()
      console.log('===============推送关闭=============')
    },
    close () {
      this.isSee.is = false
      if (this.wsDataClose) {
        this.wsData = []
        this.diaData = []
      }
      this.openWs()
    },
    getDetail (data) {
      let params = {
        orgId: this.currentData.orgId === '1' ? '' : this.currentData.orgId,
        lineId: this.currentData.lineId,
        busNumber: this.currentData.busNumber,
        warnTypes: this.currentData.warnTypeId,
        driverNum: data.driverNum,
        driveName: data.driverName
      }
      this.$api['tiredMonitoring.getBadDrivingBehaviorRankingDetail'](params).then(res => {
        this.clickData = res
        this.isSee.is = true
        this.isSee.dataType = 'table'
        this.wsDataClose = false
      })
    }
  },
  destroyed () {
    this.closeWs()
  }
}
</script>

<style lang="scss" scoped>
.alarm-home {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  .content {
    width: 100%;
    height: calc(100% - 79px);
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    box-sizing: border-box;
    .echart-table {
      width: 30%;
      border: 1px solid #ccc;
      box-sizing: border-box;
      height: 100%;
      .echart {
        width:100%;
        height: 50%;
        border-bottom: 1px solid #ccc;
        .title {
          width: 100%;
          border-bottom: 1px solid #ccc;
          height: 12%;
          text-align: center;
          font-size: 1.5rem;
          line-height: 2.5;
          font-weight: bold;
        }
      }
      .table {
        width:100%;
        height: 50%;
        .title {
          width: 100%;
          border-bottom: 1px solid #ccc;
          height: 12%;
          text-align: center;
          font-size: 1.5rem;
          line-height: 2.5;
          font-weight: bold;
        }
        .table-wrapper {
          padding: 10px;
          box-sizing: border-box;
        }
      }
    }
    .map {
      width: 70%;
      height: 100%;
      border: 1px solid #ccc;
      border-left: hidden;
      box-sizing: border-box;
      .title {
        width: 100%;
        border-bottom: 1px solid #ccc;
        height: 6%;
        text-align: center;
        font-size: 1.5rem;
        line-height: 2.5;
        font-weight: bold;
      }
      .map-wrapper {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        height: calc(100% - 6%);
      }
    }
  }
}
</style>
<style>
.el-badge__content.is-fixed {
  top: 12px;
  right: 20px;
}
.el-icon-message-solid {
  font-size: 1.3rem
}
</style>
