<template>
  <el-dialog
    :title="device.type"
    :visible.sync="deviceShow"
    :close-on-click-modal="false"
    width="40%">
    <el-form ref="form" :model="formData" label-width="80px">
      <div class="basic-info info" v-if="device.type !== '主动抓拍'">
        <p class="title">基础信息</p>
        <el-form-item label="开始时间">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="formData.startDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="formData.endDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="formData.isvalid" label="1">启用</el-radio>
          <el-radio v-model="formData.isvalid" label="0">禁用</el-radio>
          <!-- <span style="margin-left: 5vw; color: red">提示：结束日期为空则无结束时间</span> -->
        </el-form-item>
      </div>
      <div class="hight-info info" v-if="device.type !== '主动抓拍'">
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
      <div class="time-info info" v-if="device.type !== '修改'">
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
      pickerOptions: {
        disabledDate (time) {
          let date = moment().format('YYYY-MM-DD')
          return time.getTime() < moment(date).valueOf()
        }
      },
      deviceShow: false,
      formData: {
        startDate: '',
        endDate: '',
        isvalid: '1',
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
    'device.type': {
      handler (newV) {
        if (newV === '新增') {
          this.formData = {
            startDate: moment().format('YYYY-MM-DD'),
            endDate: '',
            isvalid: '1',
            timeType: '1',
            startTime: '06:00',
            endTime: '22:00',
            duration: '5',
            weekDate: [],
            monthData: [],
            lineIds: [],
            busInfo: []
          }
        }
      }
    },
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
    'formData.lineIds': {
      handler (newV) {
        if (newV.length > 0) {
          this._minieyeBusList({
            lineIds: newV
          })
        }
      }
    },
    'device.rowData': {
      deep: true,
      handler (newV) {
        if (Object.keys(newV).length > 0) {
          this.formData.weekDate = []
          this.formData.monthData = []
          this.formData.startDate = this.device.rowData.startDate
          this.formData.endDate = this.device.rowData.endDate
          this.formData.isvalid = this.device.rowData.isvalid
          this.formData.timeType = this.device.rowData.timingClass
          this.formData.startTime = this.device.rowData.startTime
          this.formData.endTime = this.device.rowData.endTime
          this.formData.duration = Number(this.device.rowData.duration)
          if (newV.timingClass === '2') {
            this.formData.weekDate = this.device.rowData.timingRemark.split(',')
          } else if (newV.timingClass === '3') {
            let arr = this.device.rowData.timingRemark.split(',')
            arr.forEach(item => {
              this.formData.monthData.push(Number(item))
            })
          }
        }
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
    // 新增
    _addPhoto (params) {
      this.$api['wholeInformation.addPhoto'](params).then(res => {
        this.deviceShow = false
        this.$message.success('添加成功')
        this.formData = {
          startDate: moment().format('YYYY-MM-DD'),
          endDate: '',
          isvalid: '1',
          timeType: '1',
          startTime: '06:00',
          endTime: '22:00',
          duration: '5',
          weekDate: [],
          monthData: [],
          lineIds: [],
          busInfo: []
        }
        this.busDeviceData = []
      })
    },
    // 主动抓拍
    _manual (params) {
      this.$api['wholeInformation.manual'](params).then(res => {
        // console.log(res)
        this.busDeviceData = []
        this.deviceShow = false
        this.formData.lineIds = []
        this.$message.success('添加成功')
      })
    },
    // 修改
    _photoUpdate (params) {
      this.$api['wholeInformation.photoUpdate'](params).then(res => {
        // console.log(res)
        this.busDeviceData = []
        this.deviceShow = false
        this.formData = {
          startDate: moment().format('YYYY-MM-DD'),
          endDate: '',
          isvalid: '1',
          timeType: '1',
          startTime: '06:00',
          endTime: '22:00',
          duration: '5',
          weekDate: [],
          monthData: [],
          lineIds: [],
          busInfo: []
        }
        this.$message.success('修改成功')
        this.$emit('updateList')
      })
    },
    handlerSub () {
      if (this.device.type === '新增') {
        if (!this.formData.startDate || !this.formData.endDate) {
          this.$message.error('请选择日期')
          return
        }
        if (this.formData.busInfo.length === 0) {
          this.$message.error('请选择抓拍车辆')
          return
        }
        const { startDate, endDate, isvalid, timeType, startTime, endTime, duration, weekDate, monthData, busInfo } = this.formData
        let devList = []
        let timingRemark = ''
        if (busInfo.length > 0) {
          busInfo.forEach(item => {
            let arr = item.split('+')
            devList.push({
              devUuid: arr[0],
              devCode: arr[1]
            })
          })
        }
        if (timeType === '1') {
          timingRemark = '1'
        } else if (timeType === '2') {
          timingRemark = weekDate.join(',')
        } else if (timeType === '3') {
          timingRemark = monthData.join(',')
        }
        if (timingRemark === '') {
          this.$message.error('请勾选高级设置中的日期')
          return
        }
        this._addPhoto({
          startDate: moment(startDate).format('YYYY-MM-DD'),
          endDate: moment(endDate).format('YYYY-MM-DD'),
          isvalid,
          timingClass: timeType,
          startTime,
          endTime,
          duration,
          timingRemark,
          devList
        })
      } else if (this.device.type === '主动抓拍') {
        let devList = []
        if (this.formData.busInfo.length === 0) {
          this.$message.error('请选择抓拍车辆')
          return
        }
        if (this.formData.busInfo.length > 0) {
          this.formData.busInfo.forEach(item => {
            let arr = item.split('+')
            devList.push({
              devUuid: arr[0],
              devCode: arr[1]
            })
          })
        }
        this._manual({
          devList
        })
      } else if (this.device.type === '修改') {
        if (!this.formData.startDate || !this.formData.endDate) {
          this.$message.error('请选择日期')
          return
        }
        const { startDate, endDate, isvalid, timeType, startTime, endTime, duration, weekDate, monthData } = this.formData
        let timingRemark = ''
        if (timeType === '1') {
          timingRemark = '1'
        } else if (timeType === '2') {
          timingRemark = weekDate.join(',')
        } else if (timeType === '3') {
          timingRemark = monthData.join(',')
        }
        if (timingRemark === '') {
          this.$message.error('请勾选高级设置中的日期')
          return
        }
        this._photoUpdate({
          takePhotoUuid: this.device.rowData.takePhotoUuid,
          startDate,
          endDate,
          isvalid,
          timingClass: timeType,
          timingRemark,
          startTime,
          endTime,
          duration,
          deviceCode: this.device.rowData.deviceCode,
          deviceId: this.device.rowData.deviceId
        })
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
