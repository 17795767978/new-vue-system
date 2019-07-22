<template>
  <div class="header">
    <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
      <el-form-item label="行车日期">
        <el-date-picker
          class="font-style"
          v-model="formInline.dateTime"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="选择线路">
        <el-select v-model="formInline.lineId" class="font-style" placeholder="请选择" filterable>
          <el-option
            v-for="item in lineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择车辆">
        <el-select v-model="formInline.busPlateNumbers" multiple collapse-tags class="font-style" style="width: 180px" placeholder="请选择" filterable>
          <el-option
            v-for="item in busOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上下行">
        <el-select  class="font-style" v-model="formInline.type" placeholder="请选择">
          <el-option
            v-for="item in turnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-time-select
          placeholder="起始时间"
          class="font-style"
          v-model="formInline.startHour"
          :picker-options="{
            start: '06:00',
            step: '01:00',
            end: '24:00'
          }">
        </el-time-select>
        -
        <el-time-select
          placeholder="结束时间"
          v-model="formInline.endHour"
          class="font-style"
          :picker-options="{
            start: '06:00',
            step: '01:00',
            end: '24:00',
            minTime: formInline.startHour
          }">
        </el-time-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      formInline: {
        lineId: '',
        dateTime: '',
        type: '1',
        startHour: '07:00',
        endHour: '09:00',
        busPlateNumbers: []
      },
      lineOptions: [],
      turnOptions: [{
        value: '1',
        label: '上行'
      }, {
        value: '2',
        label: '下行'
      }],
      busOptions: [],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  computed: {
    ...mapGetters(['initLineId'])
  },
  created () {
    this.$store.dispatch('getLineList').then(res => {
      this.lineOptions = res
      this.formInline.lineId = this.lineOptions[0].value
    })
    // this._getCar(this.initLineId)
    let data = new Date() - 1000 * 3600 * 24
    this.formInline.dateTime = moment(data).format('YYYY-MM-DD')
  },
  watch: {
    'formInline.lineId': {
      handler (newValue) {
        this._getCar(newValue)
        this.formInline.busPlateNumbers = []
      }
    }
  },
  methods: {
    _getCar (params) {
      this.$api['wholeInformation.getCar']({
        lineId: params,
        lineName: '',
        orgId: ''
      }).then(res => {
        let list = []
        res.forEach(item => {
          list.push({
            value: item.busPlateNumber,
            label: item.busPlateNumber
          })
        })
        this.busOptions = list
      })
    },
    onSubmit () {
      if (this.formInline.lineId === '' || this.formInline.dateTime === '' || this.formInline.dateTime === null || this.formInline.type === '' || this.formInline.startHour === null || this.formInline.endHour === null) {
        this.$message.error('请填写完整的查询条件')
      } else {
        this.formInline.dateTime = moment(this.formInline.dateTime).format('YYYY-MM-DD')
        this.$emit('configType', this.formInline)
      }
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
  box-shadow: 0 1px 10px rgba(0,0,0, 0.5);
  .form-inline {
   height: 38px;
   .font-style {
     width: 160px;
   }
  }
}
</style>
