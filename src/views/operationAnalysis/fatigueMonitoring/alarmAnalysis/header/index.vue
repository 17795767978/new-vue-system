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
        <el-select filterable class="font-style" v-model="formInline.lineId" placeholder="请选择">
          <el-option
            v-for="item in lineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车牌号">
        <el-input v-model="formInline.busPlateNumber"></el-input>
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
        busPlateNumber: '',
        valueTime: []
        // typeUp: '',
        // typeDown: '',
        // typeStream: '',
        // typeFullRate: ''
      },
      comOptions: [],
      lineOptions: [
        {
          value: '0103',
          label: '103路'
        },
        {
          value: '0104',
          label: '104路'
        }
      ]
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
    let dataNow = new Date()
    let endTime = dataNow.getTime() - 3600 * 24 * 7 * 1000
    let timeStart = moment(endTime).format('YYYY-MM-DD 00:00:00')
    let timeEnd = moment(dataNow).format('YYYY-MM-DD 23:59:59')
    setTimeout(() => {
      this.formInline.valueTime = [timeStart, timeEnd]
    }, 20)
  },
  mounted () {
  },
  watch: {
    'formInline.orgId': {
      handler (newValue) {
        this.formInline.lineId = ''
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
      }
    }
  },
  methods: {
    onSubmit () {
      // this.formInline.date = moment(this.formInline.date).format('YYYY-MM-DD');
      console.log(this.formInline)
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
      let endTime = dataNow.getTime() - 3600 * 24 * 7 * 1000
      let timeStart = moment(endTime).format('YYYY-MM-DD 00:00:00')
      let timeEnd = moment(dataNow).format('YYYY-MM-DD 23:59:59')
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
