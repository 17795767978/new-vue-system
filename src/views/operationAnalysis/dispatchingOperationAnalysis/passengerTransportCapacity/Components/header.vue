<template>
  <div class="header">
    <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
      <el-form-item label="选择线路">
        <el-select v-model="formInline.value" placeholder="请选择" filterable>
          <el-option
            v-for="item in lineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择日期">
        <el-date-picker
          v-model="formInline.date"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="warning" @click="onClear">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
export default {
  data () {
    return {
      formInline: {
        value: '',
        date: ''
      },
      lineOptions: [],
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
  mounted () {
    let date = new Date() - 3600 * 1000 * 24
    this.formInline.date = moment(date).format('YYYY-MM-DD')
    this.$store.dispatch('getLineList').then(res => {
      this.lineOptions = res
      this.formInline.value = this.lineOptions[0].value
    })
  },
  methods: {
    onSubmit () {
      if (this.formInline.date === '' || this.formInline.date === null || this.formInline.value === '') {
        this.$message.error('请填写完整的查询条件')
      } else {
        this.formInline.date = moment(this.formInline.date).format('YYYY-MM-DD')
        this.$emit('configCheck', this.formInline)
      }
    },
    onClear () {
      this.formInline = {
        value: '',
        date: ''
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
  }
}
</style>
