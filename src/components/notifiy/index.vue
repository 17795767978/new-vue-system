<template>
  <div class="drawer">
    <el-drawer
      style="width: 20%;"
      :title="`报警通知 (${currentIndex + 1}/${notifitysData.length})`"
      :visible.sync="drawer"
      :modal="false"
      :direction="direction"
      :before-close="handleClose">
      <div class="wrapper">
        <p class="content">
          <span>报警类型：</span>
          <span>{{notifitysData.length && notifitysData[currentIndex].warnTypeName}}</span>
        </p>
        <p class="content">
          <span>报警等级：{{notifitysData.length && notifitysData[currentIndex].warnLevel}}级</span>
          <span></span>
        </p>
        <p class="content">
          <span>报警时间：{{getTime}}</span>
          <span></span>
        </p>
        <p class="content">
          <span>报警车辆：{{notifitysData.length && notifitysData[currentIndex].busPlateNumber}}</span>
          <span></span>
        </p>
        <p class="content">
          <span>所属机构：{{notifitysData.length && notifitysData[currentIndex].orgName}}</span>
          <span></span>
        </p>
        <p class="content">
          <span>报警位置：{{notifitysData.length && notifitysData[currentIndex].warnAddress}}</span>
          <span></span>
        </p>
      </div>
      <div class="operation">
          <el-row :gutter="24">
            <el-col :span="6">
              <el-link type="primary" size="mini" @click="handleBeforePage" class="no-select">上一条</el-link>
            </el-col>
            <el-col :span="6">
              <el-link type="primary" size="mini" @click="handleNextPage" class="no-select">下一条</el-link>
            </el-col>
            <el-col :span="6">
              <el-link type="primary" size="mini" @click="handleDetail" class="no-select">查看详情</el-link>
            </el-col>
            <el-col :span="6">
              <el-link type="primary" size="mini" @click="handleClear" class="no-select">不再显示</el-link>
            </el-col>
          </el-row>
        </div>
    </el-drawer>
  </div>
</template>

<script>
import { WS_API_GLOBLE } from '../../config/settings'
import moment from 'moment'
import { mapActions } from 'vuex'
export default {
  name: 'notifity',
  data () {
    return {
      title: '',
      notifitysData: [],
      drawer: false,
      direction: 'btt',
      currentIndex: 0,
      wsGlobel: {}
    }
  },
  computed: {
    getTime () {
      return this.notifitysData.length && moment(this.notifitysData[this.currentIndex].warnTime).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted () {
    this.openWs()
  },
  watch: {
    notifitysData: {
      deep: true,
      handler (newV) {
        if (newV.length === 0) {
          this.currentIndex = 0
          this.drawer = false
        }
      }
    },
    '$store.state.globel.isUpdate': {
      handler (newV) {
        if (newV) {
          this.openWs()
        }
      }
    }
  },
  methods: {
    ...mapActions({
      getMsgOptions: 'getMsgOptions'
    }),
    handleBeforePage () {
      if (this.currentIndex >= 1) {
        this.currentIndex -= 1
      }
    },
    handleNextPage () {
      if (this.currentIndex < this.notifitysData.length - 1) {
        this.currentIndex += 1
      }
    },
    handleDetail () {
      this.closeWs()
      if (this.$route.name !== 'alarmCenter') {
        this.$router.push({
          name: 'alarmCenter',
          params: {
            type: 'msg',
            ...this.notifitysData[this.currentIndex]
          }
        })
      } else {
        // this.$emit('handleDetails', this.notifitysData[this.currentIndex])
        this.getMsgOptions(this.notifitysData[this.currentIndex])
      }
    },
    handleClear () {
      // 关闭推送 下次登录才会重新开始
      sessionStorage.setItem('closeMsg', true)
      this.drawer = false
      this.closeWs()
    },
    openWs () {
      if (!sessionStorage.getItem('closeMsg')) {
        if ('WebSocket' in window) {
          let url = `${WS_API_GLOBLE}/${sessionStorage.getItem('id')}`
          this.wsGlobel = new WebSocket(url)
          this.wsGlobel.onopen = () => {
            console.log('===============全局报警推送开始=============')
            this.wsGlobel.send('发送数据')
          }
          this.wsGlobel.onmessage = (evt) => {
            this.currentIndex = 0
            let data = evt.data
            this.notifitysData = JSON.parse(data)
            if (this.notifitysData.length) {
              this.drawer = true
            } else {
              this.drawer = false
            }
          }
          this.$store.dispatch('updateMsg', false)
        } else {
          this.$message.error('浏览器不支持websocket')
        }
      }
    },
    closeWs () {
      this.wsGlobel.close()
      console.log('===============全局报警推送关闭=============')
    },
    handleClose (done) {
      done()
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-drawer__wrapper {
  top: 75% !important;
  left: 80% !important;
  border: 1px solid #e5e5e5;
  .el-drawer {
    height: 100% !important;
  }
}
.wrapper {
  margin-top: -2vh;
  padding: 0 1vw;
  box-sizing: border-box;
  position: relative;
  .content {
    margin-top: 0;
    margin-bottom: .5vh;
  }
}
.operation {
  width: 100%;
  padding: 0 1vw;
  box-sizing: border-box;
  position: absolute;
  bottom: 1vh;
  left: 0;
  .no-select {
    user-select: none;
  }
}
</style>
