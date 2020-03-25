<template>
  <div class="person-detail-content">
    <h3 class="demonstration">报警详情</h3>
    <el-row :gutter="24"  class="pic">
       <el-col :span="6">
        <i class="fa fa-credit-card"></i>
        <span>车牌号：</span>
        <span>{{busDetails.busPlateNumber || overspeedDetails.busPlateNumber}}</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-drivers-license-o"></i>
        <span>自编号：</span>
        <span>{{busDetails.busSelfCode || overspeedDetails.busSelfCode}}</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-arrows-h"></i>
        <span>所属线路：</span>
        <span>{{busDetails.lineName || overspeedDetails.lineName}}</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-building"></i>
        <span>所属公司：</span>
        <span>{{busDetails.orgName || overspeedDetails.orgName}}</span>
       </el-col>
    </el-row>
    <el-row :gutter="24" class="pic">
       <el-col :span="6" v-if="busDetails.warnLevel">
        <i class="fa fa-code-fork"></i>
        <span>报警级别：</span>
        <span>{{busDetails.warnLevel}}级</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-exclamation-triangle"></i>
        <span>报警类型：</span>
        <span>{{busDetails.warnTypeName || overspeedDetails.warnTypeName}}</span>
       </el-col>
       <el-col :span="6" v-if="overspeedDetails.warnStartTime">
        <i class="fa fa-clock-o"></i>
        <span>报警开始时间：</span>
        <span>{{timeFormatStart}}</span>
       </el-col>
       <el-col :span="6" v-if="overspeedDetails.warnEndTime">
        <i class="fa fa-clock-o"></i>
        <span>报警结束时间：</span>
        <span>{{timeFormatEnd}}</span>
       </el-col>
       <el-col :span="6" v-if="busDetails.warnTime">
        <i class="fa fa-clock-o"></i>
        <span>报警时间：</span>
        <span>{{timeFormat}}</span>
       </el-col>
       <el-col :span="6" v-if="busDetails.speed">
        <i class="fa fa-flash"></i>
        <span>速度：</span>
        <span>{{busDetails.speed}}KM/H</span>
       </el-col>
    </el-row>
    <el-row :gutter="24" v-if="overspeedDetails !== {}">
      <el-col :span="6" v-if="Object.keys(overspeedDetails).length > 0">
        <i class="fa fa-clock-o"></i>
        <span>持续时间：</span>
        <span>{{overspeedDetails.duration}}</span>
       </el-col>
       <el-col :span="6" v-if="overspeedDetails.speed">
        <i class="fa fa-flash"></i>
        <span>最高速度：</span>
        <span>{{overspeedDetails.speed}}KM/H</span>
       </el-col>
       <el-col :span="6" v-if="position !== ''">
        <i class="fa fa-flash"></i>
        <span>当前位置：{{position}}</span>
       </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
export default {
  name: 'alarmContent',
  props: {
    busDetails: {
      type: Object
    },
    overspeedDetails: {
      type: Object
    },
    position: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  computed: {
    timeFormat () {
      return moment(this.busDetails.warnTime).format('YYYY-MM-DD HH:mm:ss')
    },
    timeFormatStart () {
      return moment(this.overspeedDetails.warnStartTime).format('YYYY-MM-DD HH:mm:ss')
    },
    timeFormatEnd () {
      return moment(this.overspeedDetails.warnEndTime).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  watch: {
    'overspeedDetails': {
      deep: true,
      handler (newV) {
        console.log(newV)
      }
    }
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.person-detail-content {
  .pic {
    margin-bottom: .5vh;
  }
  .demonstration {
    margin-top: 0px;
  }
  .fa {
    width: 10px;
    margin-right: 10px;
  }
}
</style>
