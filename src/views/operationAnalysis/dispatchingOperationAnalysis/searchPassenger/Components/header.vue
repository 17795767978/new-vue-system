<template>
  <div class="header">
    <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
      <el-form-item label="选择机构">
        <el-select class="font-style" v-model="formInline.orgId" :disabled="disabled" placeholder="请选择" filterable>
          <el-option
            v-for="item in comOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择线路">
        <el-select class="font-style" filterable v-model="formInline.lineId" placeholder="请选择">
          <el-option
            v-for="item in lineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择车辆">
        <el-select class="font-style" v-model="formInline.busNumber" filterable placeholder="请选择">
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
        <el-button type="success" @click="onSave">导出</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
       <p style="font-weight: bold">1.如果数据量过大加载时间可能过长，请耐心等待，默认下载前10000条信息</p>
       <p style="color: #f00; font-weight: bold">2.如果没有数据，请点击取消按钮</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <downloadExcel
          :data= "excelData"
          type="xls"
          style="display: inline-block; margin-left: 10px;"
          name= "客流查询报表.xls"
        >
        <el-button type="primary" @click="getExcel" :loading="laoding">{{code}}</el-button>
        </downloadExcel>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
// import moment from 'moment';
// import { lineList, comList } from 'server/interface';
import downloadExcel from 'vue-json-excel'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  props: {
    excelData: {
      type: Array
    },
    totle: {
      type: Number
    },
    isClose: {
      type: Boolean
    }
  },
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
      carOptions: [],
      centerDialogVisible: false,
      laoding: true,
      code: '加载中',
      disabled: false
    }
  },
  created () {
    this.formInline.orgId = ''
    this.formInline.busNumber = ''
    this.formInline.lineId = ''
    this.$store.dispatch('getComList').then(res => {
      this.comOptions = res
    })
    this.$store.dispatch('getLineList').then(res => {
      this.lineOptions = res
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
    ...mapGetters(['userId'])
  },
  mounted () {
    if (this.userId !== '1') {
      this.disabled = true
      this.formInline.orgId = this.userId
    }
  },
  watch: {
    'formInline.orgId': {
      handler (newValue) {
        this.formInline.lineId = ''
        this.formInline.busNumber = ''
        let orgId = newValue === '1' ? '' : newValue
        this.$api['wholeInformation.getLine']({
          lineId: '',
          lineName: '',
          orgId: orgId
        }).then(res => {
          let list = []
          res.forEach(item => {
            list.push({
              label: item.lineName,
              value: item.lineUuid
            })
          })
          this.lineOptions = list
        })
        this.$api['wholeInformation.getCar']({
          lineId: '',
          lineName: '',
          orgId: orgId
        }).then(res => {
          let list = []
          res.forEach(item => {
            list.push({
              value: item.busPlateNumber,
              label: item.busPlateNumber
            })
          })
          console.log(this.comOptions)
          this.carOptions = list
        })
      }
    },
    'formInline.lineId': {
      handler (newValue) {
        this.formInline.busNumber = ''
        if (newValue !== '') {
          this.$api['wholeInformation.getCar']({
            lineId: newValue,
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
            this.carOptions = list
          })
        }
      }
    }
  },
  updated () {
    if (this.totle <= 10000 && this.totle > 0 && this.excelData.length === this.totle && !this.isClose) {
      this.laoding = false
      this.code = '下载'
    } else if (this.totle > 10000 && this.excelData.length === 10000 && !this.isClose) {
      this.laoding = false
      this.code = '下载'
    } else {
      this.laoding = true
      this.code = '加载中'
    }
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
        orgId: this.userId === '1' ? '' : this.userId,
        lineId: '',
        busNumber: '',
        valueTime: [],
        lineType: '',
        startTime: '',
        endTime: ''
      }
      this.$store.dispatch('getLineList').then(res => {
        this.lineOptions = res
      })
      this.$store.dispatch('getComList').then(res => {
        this.comOptions = res
      })
      this.$api['wholeInformation.getCar']({
        lineId: '',
        lineName: '',
        orgId: this.userId === '1' ? '' : this.userId
      }).then(res => {
        let list = []
        res.forEach(item => {
          list.push({
            value: item.busPlateNumber,
            label: item.busPlateNumber
          })
        })
        this.carOptions = list
      })
      let dataNow = new Date()
      let endTime = dataNow.getTime() - 24 * 3600 * 1000
      let timeStart = moment(endTime).format('YYYY-MM-DD 00:00:00')
      let timeEnd = moment(endTime).format('YYYY-MM-DD 23:59:59')
      setTimeout(() => {
        this.formInline.valueTime = [timeStart, timeEnd]
      }, 20)
    },
    onSave () {
      this.$emit('isDownload')
      this.centerDialogVisible = true
    },
    getExcel () {
      this.centerDialogVisible = false
      if (this.excelData.length > 0) {
        console.log(this.excelData)
        this.$message.success('正在下载中。。。')
      } else {
        this.$message.warning('暂无数据')
      }
    }
  },
  components: {
    downloadExcel
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
