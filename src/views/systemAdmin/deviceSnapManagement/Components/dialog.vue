<template>
  <el-dialog
    :title="device.type"
    :visible.sync="deviceShow"
    :close-on-click-modal="false"
    width="40%">
    <el-form ref="form" :model="formData" label-width="80px">
      <div class="basic-info info">
        <p class="title">基础信息</p>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="formData.startDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="formData.endDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="formData.isvalid" label="1">启用</el-radio>
          <el-radio v-model="formData.isvalid" label="0">禁用</el-radio>
          <span style="margin-left: 5vw; color: red">提示：结束日期为空则无结束时间</span>
        </el-form-item>
      </div>
      <div class="hight-info info">
        <p class="title">高级设置</p>
        <el-form-item label="定时类型">
          <el-radio v-model="formData.timeType" label="1">每天</el-radio>
          <el-radio v-model="formData.timeType" label="2">每周</el-radio>
          <el-radio v-model="formData.timeType" label="3">每月</el-radio>
        </el-form-item>
        <!-- 每天 -->
        <div class="everyday">
          <el-form-item label="开始时间">
            <el-time-select
              v-model="formData.startTime"
              :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '23:00'
              }"
              placeholder="选择时间">
            </el-time-select>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-time-select
              v-model="formData.endTime"
              :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '23:00'
              }"
              placeholder="选择时间">
            </el-time-select>
          </el-form-item>
          <el-form-item label="采集间隔">
            <el-input-number v-model="formData.duration" :min="5" :max="59"></el-input-number>min
          </el-form-item>
        </div>
        <!-- // 每周 -->
        <div class="everyweek" v-if="status === 'everyweek'">
          <el-form-item label="选择日期">
            <el-checkbox-group v-model="formData.weekDate" size="mini">
              <el-checkbox v-for="item in weeks" :label="item.value" :key="item.key">{{item.key}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <!-- // 每月 -->
        <div class="everymonth" v-if="status === 'everymonth'">
          <el-form-item label="选择日期">
            <el-checkbox-group v-model="formData.monthData" size="mini">
              <el-checkbox v-for="item in 31" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </div>
      <div class="time-info info">
        <p class="title">定时信息</p>
        <el-form-item label="选择线路">
          <el-select style="width: 95%;" filterable v-model="formData.lineIds" multiple collapse-tag placeholder="请选择">
            <el-option
              v-for="item in lineOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择车辆">
          <el-transfer
            v-model="formData.busInfo"
            :props="{
              key: 'value',
              label: 'busPlateNumber'
            }"
            :titles="['可选车辆', '已选车辆']"
            :data="busDeviceData">
          </el-transfer>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="deviceShow = false">取 消</el-button>
      <el-button type="primary" @click="handlerSub">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    device: {
      type: Object
    }
  },
  data () {
    return {
      deviceShow: false,
      formData: {
        startDate: '',
        endDate: '',
        isvalid: '',
        timeType: '1',
        startTime: '06:00',
        endTime: '22:00',
        duration: '5',
        weekDate: [],
        monthData: [],
        lineIds: [],
        busInfo: []
      },
      weeks: [
        {
          key: '周一',
          value: '1'
        },
        {
          key: '周二',
          value: '2'
        },
        {
          key: '周三',
          value: '3'
        },
        {
          key: '周四',
          value: '4'
        },
        {
          key: '周五',
          value: '5'
        },
        {
          key: '周六',
          value: '6'
        },
        {
          key: '周日',
          value: '7'
        }
      ],
      status: 'everyday',
      lineOptions: [],
      busDeviceData: []
    }
  },
  mounted () {
    this.formData.startDate = moment().format('YYYY-MM-DD')
    this.$store.dispatch('getLineList').then(res => {
      this.lineOptions = res
    })
  },
  watch: {
    'formData.timeType': {
      handler (newV) {
        if (newV === '1') {
          this.status = 'everyday'
        } else if (newV === '2') {
          this.status = 'everyweek'
        } else {
          this.status = 'everymonth'
        }
      }
    },
    'formData.weekDate': {
      handler (newV) {
        console.log(newV)
      }
    },
    'formData.monthData': {
      handler (newV) {
        console.log(newV)
      }
    },
    'formData.lineIds': {
      handler (newV) {
        this._minieyeBusList({
          lineIds: newV
        })
      }
    },
    'formData.busInfo': {
      handler (newV) {
        console.log(newV)
      }
    }
  },
  methods: {
    _minieyeBusList (params) {
      this.$api['wholeInformation.minieyeBusList'](params).then(res => {
        let formatterData = []
        res.forEach((item, index) => {
          formatterData.push({
            busPlateNumber: item.busPlateNumber,
            value: `${item.devUuid}+${item.devCode}+${index}`
          })
        })
        this.busDeviceData = formatterData
      })
    },
    _addPhoto (params) {
      this.$api['wholeInformation.addPhoto'](params).then(res => {
        console.log(res)
      })
    },
    handlerSub () {
      if (this.device.type === '新增') {
        // const { startDate, endDate, isvalid, timeType, startTime, endTime, duration, weekDate, monthData, lineIds, busInfo } = this.formData
        // let devList = []
        // if (busInfo.length > 0) {
        //   busInfo.forEach(item => {
        //     console.log(item)
        //   })
        // }
        // this._addPhoto({
        //   startDate,
        //   endDate,
        //   isvalid,
        //   timingClass: timeType

        // })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-info {
  margin-bottom: 2vh;
}
.hight-info {
  margin-bottom: 2vh;
}
.info {
  width: 100%;
  border: 1px solid #EBEEF5;
  box-sizing: border-box;
  .title {
    margin-left: 0.5vw;
    font-size: .8vw;
    font-weight: 900;
  }
}
</style>
