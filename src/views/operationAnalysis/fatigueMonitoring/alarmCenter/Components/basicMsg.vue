<template>
<div>
  <!-- <el-row class="pic" v-if="busDetails.warnTimesArr && busDetails.warnTimesArr.length > 0">
    <el-card shadow="hover" class="time-arr">
      <el-row :gutter="24" class="pic">
        <h3 class="demonstration">报警时间集合</h3>
        <el-col :span="24 / busDetails.warnTimesArr.length" v-for="(item, index) in busDetails.warnTimesArr" :key="item">
          <el-link :type="currentIndex === index ? 'primary' : 'info'" @click="handlerChange(item, busDetails.warnUuidsArr[index], index)">{{item}}</el-link>
        </el-col>
      </el-row>
    </el-card>
  </el-row> -->
  <div class="basic-msg">
   <div class="left-top">
     <p class="msg">
       <span>所属公司: </span>
       <span>{{busDetails.orgName}}</span>
     </p>
     <p class="msg">
       <span>所属线路: </span>
       <span>{{busDetails.lineName}}</span>
     </p>
     <p class="msg">
       <span>司机: </span>
       <span>{{busDetails.driverName}}</span>
     </p>
     <p class="msg">
       <span>车牌号: </span>
       <span>{{busDetails.busPlateNumber}}</span>
     </p>
     <p class="msg">
       <span>车辆自编号: </span>
       <span>{{busDetails.busSelfCode}}</span>
     </p>
     <p class="msg">
       <span>设备编号: </span>
       <span>{{busDetails.devCode}}</span>
     </p>
     <p class="msg">
       <span>报警时间: </span>
       <span>{{timeFormat(busDetails.warnTime)}}</span>
     </p>
     <p class="msg">
       <span>报警级别: </span>
       <span>{{busDetails.warnLevel}}级</span>
     </p>
     <p class="msg">
       <span>报警类型: </span>
       <span>{{busDetails.warnTypeName}}</span>
     </p>
     <p class="msg">
       <span>报警速度: </span>
       <span>{{busDetails.speed}}</span>
     </p>
     <!-- <p class="msg">
       <span>当日报警总次数</span>
       <span>{{warnDetails.warnNumber}}</span>
     </p> -->
     <p class="msg">
       <span>该类型报警总次数: </span>
       <span>{{busDetails.warnNumber}}</span>
     </p>
     <p class="msg">
       <span>该设备报警总次数: </span>
       <span>{{busDetails.deviceWarnNumber}}</span>
     </p>
   </div>
   <div class="middle-top">
    <h3 class="demonstration">报警图片<span style="margin-left:20px; font-size: 16px; font-weight: 600">共{{busDetails.warnPicList && busDetails.warnPicList.length || 0}}张</span></h3>
    <el-carousel v-if="busDetails.warnPicList && busDetails.warnPicList.length > 0" type="card" height="200px" trigger="click" :autoplay="false" style="margin-top: 5vh;">
      <el-carousel-item v-for="(item, index) in busDetails.warnPicList" :key="index">
        <img :src="item.url" width="100%" height="100%" alt="图片加载失败" />
      </el-carousel-item>
    </el-carousel>
    <img v-else src="../../../../../assets/images/noImgData.png" width="80%" height="70%" style="margin-left: 10%;margin-top: 5%;">
   </div>
   <div class="right-top">
    <h3 class="demonstration">报警视频<span style="margin-left:20px; font-size: 16px; font-weight: 600">共{{busDetails.warnMediaList && busDetails.warnMediaList.length || 0}}张</span></h3>
    <el-carousel v-if="busDetails.warnMediaList && busDetails.warnMediaList.length > 0"
      height="200px"
      style="width: 80%; margin-left: 10%;margin-top: 5vh;"
      indicator-position="none"
      :autoplay="false"
      trigger="click">
      <el-carousel-item v-for="(item, index) in busDetails.warnMediaList" :key="index" >
        <video :src="item.url" width="100%" height="100%" controls></video>
      </el-carousel-item>
    </el-carousel>
    <img v-else src="../../../../../assets/images/noVideoData.png" width="80%" height="70%" style="margin-left: 10%;margin-top: 5%;">
   </div>
   <div class="left-middle-bottom">
     <MapDetail :busDetails="busDetails"/>
   </div>
   <div class="right-bottom">
     <h3 style="margin-top: .8vh;;margin-left:.8vw;">报警处理</h3>
     <el-row :gutter="24" style="margin-top: .8vh;;margin-left:.8vw;">
      <el-radio-group v-model="radio">
        <el-radio :label="1" v-if="userId === '1'" :disabled="busDetails.auditStatus !== '0'">报警审核</el-radio>
        <el-radio :label="4" v-else>报警处理</el-radio>
        <el-radio :label="2">IP电话提醒</el-radio>
        <el-radio :label="3">语音提醒</el-radio>
        <!-- <el-radio :label="4">发送给其他系统</el-radio> -->
      </el-radio-group>
      <div class="form" v-if="radio === 1 || radio === 4">
        <el-form :model="ruleFormCheck" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item v-if="userId === '1'" label="审核状态" prop="status">
            <el-select v-model="ruleFormCheck.status">
              <el-option
                v-for="item in checkOptions.slice(1)"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="userId === '1' ? '审核意见' : '处理意见'" prop="suggestion">
            <el-input type="textarea" v-model="ruleFormCheck.suggestion" maxlength="100"></el-input>
            <span>{{ruleFormCheck.suggestion && ruleFormCheck.suggestion.length}}/100</span>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if="radio === 2" style="width: 100%; text-align: center; line-height: 25vh">
        <span>点击确认进行IP电话</span>
      </div>
      <div v-else-if="radio === 3" class="form">
        <el-form :model="ruleFormWarn" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="提醒类型" prop="status">
            <el-select v-model="ruleFormWarn.status">
              <el-option
                v-for="item in warnsOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容描述" prop="suggestion">
            <el-input type="textarea" v-model="ruleFormWarn.suggestion" maxlength="100"></el-input>
            <span>{{ruleFormWarn.suggestion.length}}/100</span>
          </el-form-item>
        </el-form>
      </div>
     </el-row>
   </div>
   <el-button type="primary" style="position: absolute; index: 999; right: 5vw; bottom: 0vh" size="mini" :loading="pendding" @click="handleCheck">确认</el-button>
  </div>
</div>
</template>

<script>
import MapDetail from './mapDetail'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  props: {
    warnDetails: {
      type: Object
    }
  },
  data () {
    let markSuggestion = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length && value.length > 150) {
        return callback(new Error('输入最大100字'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        status: [
          { required: true, message: '请选择审核状态', trigger: 'blur' }
        ],
        suggestion: [
          { validator: markSuggestion, trigger: 'blur' }
        ]
      },
      contents: {},
      imgList: [],
      videoList: [],
      warnsTimes: [1, 2, 3],
      radio: 1,
      ip: '',
      ipconfig: {},
      ruleFormCheck: {
        status: '',
        suggestion: ''
      },
      ruleFormWarn: {
        status: '',
        suggestion: ''
      },
      checkOptions: [
        {
          value: '0',
          label: '未审核'
        },
        {
          value: '1',
          label: '属实'
        },
        {
          value: '2',
          label: '误报'
        },
        {
          value: '3',
          label: '其他'
        }
      ],
      warnsOptions: [],
      pendding: false,
      time: {},
      busDetails: {},
      currentIndex: 0
    }
  },
  computed: {
    ...mapGetters(['userId']),
    timeFormat () {
      return (time) => {
        return moment(time).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.getIP((ip) => {
        this.ip = ip
      })
    }, 1000)
    this.time = moment
    this._alarmType({
      warnLevel: ''
    })
  },
  watch: {
    radio (newV) {
    },
    warnDetails: {
      deep: true,
      handler (newV) {
        this.busDetails = newV
        if (newV.auditStatus === '0' && this.userId === '1') {
          this.radio = 1
          this.ruleFormCheck.status = newV.auditStatus === '0' ? '' : newV.auditStatus
          this.ruleFormCheck.suggestion = newV.auditSuggestion ? newV.auditSuggestion : ''
        } else if (newV.auditStatus !== '0' && this.userId === '1') {
          this.radio = 3
        } else if (this.userId !== '1') {
          this.radio = 4
          this.ruleFormCheck.status = ''
          this.ruleFormCheck.suggestion = newV.handleSuggestion ? newV.handleSuggestion : ''
        }
      }
    }
    // busDetails: {
    //   deep: true,
    //   handler (newV) {
    //     if (newV.auditStatus === '0') {
    //       this.radio = 1
    //     } else {
    //       this.radio = 3
    //     }
    //   }
    // }
  },
  methods: {
    // ip
    getIP (callback) {
      let recode = {}
      let RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
      // 如果不存在则使用一个iframe绕过
      if (!RTCPeerConnection) {
        // 因为这里用到了iframe，所以在调用这个方法的script上必须有一个iframe标签
        // <iframe id="iframe" sandbox="allow-same-origin" style="display:none;"></iframe>
        // eslint-disable-next-line no-undef
        let win = iframe.contentWindow
        RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection
      }

      // 创建实例，生成连接
      let pc = new RTCPeerConnection()

      // 匹配字符串中符合ip地址的字段
      function handleCandidate (candidate) {
        // eslint-disable-next-line camelcase
        let ip_regexp = /([0-9]{1,3}(\.[0-9]{1,3}){3}|([a-f0-9]{1,4}((:[a-f0-9]{1,4}){7}|:+[a-f0-9]{1,4}){6}))/
        // eslint-disable-next-line camelcase
        let ip_isMatch = candidate.match(ip_regexp)[1]
        if (!recode[ip_isMatch]) {
          callback(ip_isMatch)
          recode[ip_isMatch] = true
        }
      }

      // 监听icecandidate事件
      pc.onicecandidate = (ice) => {
        if (ice.candidate) {
          handleCandidate(ice.candidate.candidate)
        }
      }
      // 建立一个伪数据的通道
      pc.createDataChannel('')
      pc.createOffer((res) => {
        pc.setLocalDescription(res)
      }, () => {})

      // 延迟，让一切都能完成
      setTimeout(() => {
        let lines = pc.localDescription.sdp.split('\n')
        lines.forEach(item => {
          if (item.indexOf('a=candidate:') === 0) {
            handleCandidate(item)
          }
        })
      }, 1000)
    },
    _alarmType (params) {
      this.$api['tiredMonitoring.getWarntypes'](params).then(res => {
        let dataArr = res
        this.warnsOptions = []
        dataArr.forEach((list, index) => {
          this.warnsOptions.push({
            label: list.value,
            value: list.code
          })
        })
      })
    },
    handleCheck (evt) {
      if (this.radio === 2) {
        const param = {
          loginname: 'admin',
          pwd: '120223',
          PlateNO: this.warnDetails.busPlateNumber,
          locip: this.ip,
          locport: '5555',
          number: this.warnDetails.devRefId,
          svrip: '61.157.184.120',
          svrport: '5556'
        }
        const event = document.createEvent('CustomEvent')
        event.initCustomEvent('myCustomEvent', true, false, param)
        document.dispatchEvent(event)
      } else if (this.radio === 1) {
        if (this.ruleFormCheck.status !== '') {
          this.pendding = true
          this.$api['tiredMonitoring.wsUpdate']({
            warnUuid: this.warnDetails.warnUuid,
            auditTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            auditStatus: this.ruleFormCheck.status,
            auditSuggestion: this.ruleFormCheck.suggestion,
            auditUser: localStorage.getItem('userRealName')
          }).then(res => {
            this.pendding = false
            this.ruleFormCheck = { status: '', suggestion: '' }
            this.$message.success('操作成功')
            this.$emit('upadate', true)
            this.$store.dispatch('updateMsg', true)
          }).catch(() => {
            this.$message.error('接口错误')
            this.pendding = false
          })
        } else {
          this.$emit('upadate', false)
        }
      } else if (this.radio === 3) {
        if (this.ruleFormWarn.status !== '') {
          this.pendding = true
          this.$api['tiredMonitoring.Voiceprompt']({
            devType: '1',
            sendType: this.ruleFormWarn.status,
            busUuid: this.warnDetails.busUuid,
            content: this.ruleFormWarn.suggestion
          }).then(res => {
            this.pendding = false
            this.ruleFormWarn = { status: '', suggestion: '' }
            this.$message.success('下发消息成功')
            if (this.busDetails.auditStatus !== '0') {
              this.$emit('upadate', true)
            } else {
              this.radio = 1
              this.$message.warning('请选择审核状态')
            }
          }).catch(() => {
            this.$message.error('接口错误')
            this.pendding = false
          })
        } else {
          this.$emit('upadate', false)
        }
      } else {
        this.pendding = true
        this.$api['tiredMonitoring.wsUpdate']({
          warnUuid: this.warnDetails.warnUuid,
          handleTime: moment().format('YYYY-MM-DD HH:mm:ss'),
          handleUser: localStorage.getItem('userRealName'),
          handleSuggestion: this.ruleFormCheck.suggestion
        }).then(res => {
          this.pendding = false
          this.ruleFormCheck = { status: '', suggestion: '' }
          this.$message.success('操作成功')
          this.$emit('upadate', true)
        })
      }
    },
    handlerChange (time, uuid, index) {
      // console.log(time, uuid)
      this.currentIndex = index
      this.$api['tiredMonitoring.getWarnDetail']({
        warnUuid: uuid,
        warnTime: time
      }).then(res => {
        this.busDetails = Object.assign({ warnTimesArr: this.warnDetails.warnTimesArr, warnUuidsArr: this.warnDetails.warnUuidsArr }, res)
      }).catch(err => {
        this.$message.error(err.message)
      })
    }
  },
  components: {
    MapDetail
  }
}
</script>

<style lang="scss" scoped>
.pic {
  margin-bottom: .2vh;
}
.pic-middle {
  margin-bottom: .2vh;
}
.pic-end {
  margin-bottom: .2vh;
}
.time-arr {
  min-height: 1vh;
  .demonstration {
    margin: 0;
    padding-left: 12px;
    box-sizing: border-box;
  }
}
.basic-msg {
  width: 100%;
  height: 65vh;
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  .left-bottom,
  .left-top {
    width: 20%;
    height: 55%;
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
    .msg {
      margin-top: 0;
      margin-bottom: 0.8vh;
    }
  }
  .middle-bottom,
  .middle-top {
    width: 40%;
    height: 55%;
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
    padding: .5vh .5vw;
    .demonstration {
      margin: 0;
    }
  }
  .left-middle-bottom {
    width: 60%;
    height: 50%;
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
    padding: .5vh .5vw;
    .demonstration {
      margin: 0;
    }
  }
  .right-bottom,
  .right-top {
    width: 39%;
    height: 55%;
    border-bottom: 1px solid #e5e5e5;
    .demonstration {
      margin: 0;
    }
    .form {
      padding: 2vh .5vw;
    }
  }
  .check {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
