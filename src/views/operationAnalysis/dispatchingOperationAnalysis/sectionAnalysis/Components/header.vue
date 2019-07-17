<template>
  <div class="header">
    <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
      <el-form-item label="选择线路">
        <el-select v-model="formInline.lineId" placeholder="请选择" filterable>
          <el-option
            v-for="item in lineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="方向">
        <el-select v-model="formInline.type" placeholder="请选择">
          <el-option
            v-for="item in turnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="月份">
        <el-date-picker
          v-model="formInline.month"
          type="month"
          placeholder="选择月">
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
        lineId: '',
        type: '1',
        month: ''
      },
      lineOptions: [],
      turnOptions: [{
        value: '1',
        label: '上行'
      }, {
        value: '2',
        label: '下行'
      }]
    }
  },
  computed: {
  },
  mounted () {
    let date = new Date() - 24 * 3600 * 1000 * 30
    date = moment(date).format('YYYY-MM')
    this.formInline.month = date
    this.$store.dispatch('getLineList').then(res => {
      this.lineOptions = res
      this.formInline.lineId = this.lineOptions[0].value
    })
  },
  methods: {
    onSubmit () {
      this.formInline.month = moment(this.formInline.month).format('YYYY-MM')
      if (this.formInline.lineId === '' || this.formInline.type === '' || this.formInline.month === 'Invalid date' || this.formInline.month === null) {
        this.$message.error('请添加完整的查询条件')
      } else {
        this.$emit('configCheck', this.formInline)
      }
    },
    onClear () {
      this.formInline.month = ''
      this.formInline.lineId = ''
      this.formInline.type = ''
    }
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
