<template>
<div>
  <el-row class="pic" v-if="busDetails.warnTimesArr && busDetails.warnTimesArr.length > 0">
    <el-card shadow="hover" class="time-arr">
      <el-row :gutter="24" class="pic">
        <h3 class="demonstration">报警时间集合</h3>
        <el-col :span="24 / busDetails.warnTimesArr.length" v-for="(item, index) in busDetails.warnTimesArr" :key="item">
          <el-link :type="currentIndex === index ? 'primary' : 'info'" @click="handlerChange(item, busDetails.warnUuidsArr[index], index)">{{item}}</el-link>
        </el-col>
      </el-row>
    </el-card>
  </el-row>
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
       <span>{{busDetails.warnType}}</span>
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
        <el-radio :label="1">报警处理</el-radio>
        <el-radio :label="2">IP电话提醒</el-radio>
        <el-radio :label="3">语音提醒</el-radio>
        <!-- <el-radio :label="4">发送给其他系统</el-radio> -->
      </el-radio-group>
      <div class="form" v-if="radio === 1">
        <el-form :model="ruleFormCheck" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="处理状态" prop="status">
            <el-select v-model="ruleFormCheck.status">
              <el-option
                v-for="item in checkOptions.slice(1)"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="处理意见" prop="suggestion">
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
          { required: true, message: '请选择处理状态', trigger: 'blur' }
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
          label: '未处理'
        },
        {
          value: '1',
          label: '已处理'
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
    timeFormat () {
      return (time) => {
        return moment(time).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  mounted () {
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
        this.ruleFormCheck.status = newV.handleResult === '0' ? '' : newV.handleResult
        this.ruleFormCheck.suggestion = newV.handleSuggestion ? newV.handleSuggestion : ''
        this.busDetails = newV
      }
    }
  },
  methods: {
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
          locip: '192.168.10.51',
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
            handleResult: this.ruleFormCheck.status,
            handleSuggestion: this.ruleFormCheck.suggestion
          }).then(res => {
            this.pendding = false
            this.ruleFormCheck = { status: '', suggestion: '' }
            this.$message.success('已处理')
            this.$emit('upadate', true)
          }).catch(() => {
            this.$message.error('接口错误')
            this.pendding = false
          })
        } else {
          this.$emit('upadate', false)
        }
      } else {
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
            this.$emit('upadate', true)
          }).catch(() => {
            this.$message.error('接口错误')
            this.pendding = false
          })
        } else {
          this.$emit('upadate', false)
        }
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
    height: 50%;
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
    height: 50%;
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
    height: 50%;
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
