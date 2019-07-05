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
      <el-form-item label="方向">
        <el-select v-model="formInline.turn" placeholder="请选择">
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
          v-model="formInline.date"
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
// import { lineList } from 'server/interface'
import moment from 'moment'
export default {
  data () {
    return {
      formInline: {
        value: '0103',
        date: '',
        turn: '1'
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
  created () {
    this._lineList()
    let date = new Date() - 3600 * 1000 * 24 * 30
    this.formInline.date = moment(date).format('YYYY-MM')
  },
  methods: {
    _lineList () {
      this.$store.dispatch('getLineList').then(res => {
        this.lineOptions = res
      })
    },
    onSubmit () {
      if (this.formInline.date === '' || this.formInline.date === null || this.formInline.value === '' || this.formInline.turn === '') {
        this.$message.error('请添加完整的查询条件')
      } else {
        this.formInline.date = moment(this.formInline.date).format('YYYY-MM')
        this.$emit('configCheck', this.formInline)
      }
    },
    onClear () {
      this.formInline = {
        value: '',
        date: '',
        turn: ''
      }
      this.$emit('configCheck', this.formInline)
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
