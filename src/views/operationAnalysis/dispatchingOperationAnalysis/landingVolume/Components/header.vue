<template>
  <div class="header">
    <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
      <el-form-item label="选择站点">
        <el-select
          @change="getLabel"
          ref="elSelectWrapperUp"
          style="width:200px;"
          multiple
          filterable
          collapse-tags
          clearable
          v-model="formInline.station"
          remote
          reserve-keyword
          :remote-method="remoteMethod"
          placeholder="请选择">
          <el-option
            v-for="item in searchStationOptions"
            :key="item.value"
            :label="item.label"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-row>
      <el-form-item label="选择日期">
        <el-date-picker
          v-model="formInline.date"
          style="width: 410px;"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        </el-form-item>
        <el-form-item label="选择时间">
          <el-time-select
          style="width: 120px"
          placeholder="起始时间"
          v-model="formInline.startTime"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '23:59'
          }">
        </el-time-select>
        -
        <el-time-select
          placeholder="结束时间"
          style="width: 120px"
          v-model="formInline.endTime"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '23:59',
            minTime: formInline.startTime
          }">
        </el-time-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="warning" @click="onSubmit">重置</el-button>
      </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import { Row, Button, Form, TimeSelect, DatePicker, Select, FormItem, Option } from 'element-ui'
// import { lineStation, lineList, stationList } from 'server/interface'
import moment from 'moment'
export default {
  data () {
    return {
      formInline: {
        station: [{
          label: '火车站',
          value: '081faf17f7ef4e94aad0,144edc478cdf4ee8a402,14a954a9df1345b4b4d3,2fa4156ad52444038e73,38f023d49d6d487fa0c8,44ab3f8794934e8f9b00,7669c40cd18a4bf993c9,d089160bf03a48ad9315,dbd8ef27294e4422b0fc,e5fd384bbfc54f4f89e1'
        }],
        date: ['2019-04-01', '2019-05-01'],
        startTime: '00:00',
        endTime: '23:00'
      },
      loading: false,
      searchStation: '',
      selectStation: [],
      lineOptions: [],
      stationOptions: [],
      searchStationOptions: [],
      tableData: {}
    }
  },
  mounted () {
    this._lineList()
    this._stationList()
    this._lineStation({
      startDate: this.formInline.date[0],
      endDate: this.formInline.date[1],
      stationIds: this.formInline.station,
      startHour: this.formInline.startTime.substring(0, 2),
      endHour: this.formInline.endTime.substring(0, 2)
    })
  },
  watch: {
  },
  methods: {
    _lineList () {
      // this.$api['wholeInformation.getLine'].then(res => {
      //   let arr = res.data.data
      //   arr.forEach(item => {
      //     this.lineOptions.push({
      //       value: item.lineUuid,
      //       label: item.lineName
      //     })
      //   })
      // })
      this.$store.dispatch('getLineList').then(res => {
        this.lineOptions = res
        // arr.forEach(item => {
        //   this.lineOptions.push({
        //     value: item.lineUuid,
        //     label: item.lineName
        //   })
        // })
      })
    },
    _stationList () {
      // this.$api['wholeInformation.getStation'].then(res => {
      //   let arr = res.data.data
      //   arr.forEach(item => {
      //     this.stationOptions.push({
      //       value: item.staUuid,
      //       label: item.staName
      //     })
      //   })
      // })
      this.$store.dispatch('getStationList').then(res => {
        let arr = res
        arr.forEach(item => {
          this.stationOptions.push({
            value: item.staUuid,
            label: item.staName
          })
        })
      })
    },
    _lineStation (params) {
      this.$api['schedulingAnalysis.getStationOnOffTableDatas'](params).then(res => {
        if (res.length !== 0) {
          this.tableData = res
          this.$emit('configTableData', this.tableData)
        }
      })
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.searchStationOptions = this.stationOptions.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    getLabel (val) {
      // this.selectStation = [];
      // val.forEach(i => {
      //   this.selectStation.push(this.stationOptions.filter(item => item.label === i));
      // });
      // console.log(this.selectStation);
    },
    onSubmit () {
      this.formInline.date[0] = moment(this.formInline.date[0]).format('YYYY-MM-DD')
      this.formInline.date[1] = moment(this.formInline.date[1]).format('YYYY-MM-DD')
      this.selectStation = this.formInline.station.map(item => item.label)
      let idArry = this.formInline.station.map(item => item.value)
      // console.log(this.selectStation);
      this.$emit('selectStation', this.selectStation)
      this._lineStation({
        startDate: this.formInline.date[0],
        endDate: this.formInline.date[1],
        stationIds: idArry,
        startHour: this.formInline.startTime.substring(0, 2),
        endHour: this.formInline.endTime.substring(0, 2)
      })
    }
  },
  components: {
    'el-row': Row,
    'el-button': Button,
    'el-form': Form,
    'el-time-select': TimeSelect,
    'el-date-picker': DatePicker,
    'el-select': Select,
    'el-form-item': FormItem,
    'el-option': Option
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  min-height: 110px;
  border-bottom: 1px solid #eee;
  padding: 20px 20px;
  box-sizing: border-box;
  box-shadow: 0 1px 10px rgba(0,0,0, 0.5);
  .form-inline {
   height: 38px;
  }
}
</style>
