<template>
  <div class="header">
    <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
      <el-form-item label="选择机构">
        <el-select class="font-style" v-model="formInline.orgId" placeholder="请选择">
          <el-option
            v-for="item in comOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择线路">
        <el-select class="font-style" v-model="formInline.lineId" placeholder="请选择">
          <el-option
            v-for="item in lineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择车辆">
        <el-select class="font-style" v-model="formInline.busNumber" placeholder="请选择">
          <el-option
            v-for="item in carOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="方向">
        <el-select class="font-style" v-model="formInline.lineType" placeholder="请选择">
          <el-option
            v-for="item in turnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择日期">
         <el-date-picker
          v-model="formInline.valueTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="warning" @click="onclear">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
// import moment from 'moment';
// import { lineList, comList } from 'server/interface';
import moment from 'moment'
export default {
  data () {
    return {
      formInline: {
        orgId: '',
        lineId: '',
        busNumber: '',
        valueTime: [],
        lineType: '',
        startTime: '',
        endTime: ''
      },
      comOptions: [],
      turnOptions: [{
        value: '1',
        label: '上行'
      }, {
        value: '2',
        label: '下行'
      }],
      lineOptions: [],
      carOptions: []
    }
  },
  created () {
    // this._lineList();
    // this._comList();
    this.$store.dispatch('getLineList').then(res => {
      this.lineOptions = res
    })
    this.$store.dispatch('getComList').then(res => {
      this.comOptions = res
    })
    this.$store.dispatch('getCarList').then(res => {
      this.carOptions = res
    })
    let dataNow = new Date()
    let endTime = dataNow.getTime() - 24 * 3600 * 1000
    let timeStart = moment(endTime).format('YYYY-MM-DD 00:00:00')
    let timeEnd = moment(endTime).format('YYYY-MM-DD 23:59:59')
    setTimeout(() => {
      this.formInline.valueTime = [timeStart, timeEnd]
    }, 20)
  },
  computed: {
  },
  mounted () {
    console.log(this.$store.getters.userId)
  },
  methods: {
    onSubmit () {
      // this.formInline.date = moment(this.formInline.date).format('YYYY-MM-DD');
      this.formInline.startTime = moment(this.formInline.valueTime[0]).format('YYYY-MM-DD HH:mm:ss')
      this.formInline.endTime = moment(this.formInline.valueTime[1]).format('YYYY-MM-DD HH:mm:ss')
      this.$emit('configCheck', this.formInline)
    },
    onclear () {
      this.formInline = {
        value: '',
        date: '',
        type: '',
        startTime: '',
        endTime: ''
      }
      this.$store.dispatch('getLineList').then(res => {
        this.lineOptions = res
      })
      this.$store.dispatch('getComList').then(res => {
        this.comOptions = res
      })
      let dataNow = new Date()
      let endTime = dataNow.getTime() - 24 * 3600 * 1000
      let timeStart = moment(endTime).format('YYYY-MM-DD 00:00:00')
      let timeEnd = moment(endTime).format('YYYY-MM-DD 23:59:59')
      setTimeout(() => {
        this.formInline.valueTime = [timeStart, timeEnd]
      }, 20)
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  border-bottom: 1px solid #eee;
  padding: 20px 20px;
  box-sizing: border-box;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.5);
  .form-inline {
    height: 38px;
    .font-style {
      width: 130px;
    }
  }
}
</style>
