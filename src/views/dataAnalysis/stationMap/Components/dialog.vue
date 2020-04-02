<template>
  <el-dialog
    title="选择查询条件"
    :visible.sync="dialogVisible"
    width="30%">
    <div style="margin-bottom: 1vh">
    <span style="margin-right: 0.5vw;padding: 0 2vw 0 0; box-sizing: border-box;">月份</span>
    <el-date-picker
      size="mini"
      v-model="slotData.month"
      :picker-options="pickerOptionsMonth"
      type="month"
      style="width: 15vw"
      placeholder="选择月">
    </el-date-picker>
    </div>
    <div style="margin-bottom: 1vh">
    <span style="padding: 0 2vw 0 0; box-sizing: border-box;"><span style="color: #f00;margin-right:0.1vw;">*</span>站点</span>
    <el-select
      size="mini"
      v-model="slotData.stations"
      filterable
      remote
      reserve-keyword
      style="width: 15vw"
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading">
      <el-option
        v-for="item in currentOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    </div>
    <div style="margin-bottom: 1vh">
    <span style="margin-right: 0.5vw;">距离(km)</span>
    <el-input class="default" min="0" v-model="slotData.startDis" size="mini"
      style="width: 7vw" placeholder="起始距离" type="number"></el-input>
    -
    <el-input class="default" min="0" v-model="slotData.endDis" size="mini"
      style="width: 7vw;margin-right: 1vw;" placeholder="结束距离" type="number"></el-input>
    </div>
    <div style="margin-bottom: 1vh">
    <span style="margin-right: 0.5vw;padding: 0 0.3vw 0 0; box-sizing: border-box;">刷卡人数</span>
    <el-input  class="default" min="0" v-model="slotData.startNum" size="mini"
      style="width: 7vw"  type="number"></el-input>
    -
    <el-input class="default" min="0" v-model="slotData.endNum" size="mini"
      style="width: 7vw;margin-right: 1vw;" type="number"></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handler">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      pickerOptionsMonth: {
        disabledDate (time) {
          const endTime = moment(moment().format('YYYY-MM')).valueOf() - 3600 * 1000 * 24 * 30
          return time.getTime() > endTime
        }
      },
      dialogVisible: false,
      loading: false,
      slotData: {
        month: '',
        startDis: '',
        endDis: '',
        startNum: '',
        endNum: '',
        stations: ''
      },
      stationOptions: [],
      currentOptions: []
    }
  },
  mounted () {
    this.slotData.month = moment().subtract(30, 'days').format('YYYY-MM')
    this.$store.dispatch('getStationList').then(res => {
      // console.log(res)
      let station = res[0]
      this.$emit('defaultStation', station)
      res.forEach(item => {
        this.stationOptions.push({
          label: item.staName,
          value: item.staName
        })
      })
    })
  },
  watch: {
    'slotData.startDis': {
      handler (newV) {
        this.handleFieldZero(newV, 'startDis')
      }
    },
    'slotData.endDis': {
      handler (newV) {
        this.handleFieldZero(newV, 'endDis')
      }
    },
    'slotData.startNum': {
      handler (newV) {
        this.handleFieldZero(newV, 'startNum')
      }
    },
    'slotData.endNum': {
      handler (newV) {
        this.handleFieldZero(newV, 'endNum')
      }
    }
  },
  methods: {
    handler () {
      let isPassNum = true
      let isPassDis = true
      if (this.slotData.stations !== '') {
        if (this.slotData.endNum !== '') {
          isPassNum = this.handleAbout(this.slotData.endNum, 'endNum', 'startNum')
        } else {
          isPassNum = true
        }
        if (this.slotData.endDis !== '') {
          isPassDis = this.handleAbout(this.slotData.endDis, 'endDis', 'startDis')
        } else {
          isPassDis = true
        }
        if (isPassNum && isPassDis) {
          this.dialogVisible = false
          this.$emit('getDatas', this.slotData)
        }
      } else {
        this.$message.warning('请选择站点')
      }
    },
    // 验证不能小于零
    handleFieldZero (num, type) {
      if (Number(num) < 0) {
        this.slotData[type] = ''
        this.$message.warning('值不能小于0')
      }
    },
    // 验证结束大于开始
    handleAbout (num, type, com) {
      if (Number(num) <= Number(this.slotData[com])) {
        this.slotData[type] = ''
        this.$message.warning('结束值必须大于开始值')
        return false
      } else {
        return true
      }
    },
    getSearch (data) {
    },
    // 模糊查询
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.currentOptions = this.stationOptions.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.currentOptions = []
      }
    }
  }
}
</script>

<style>

</style>
