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
      <el-form-item label="月份">
        <el-date-picker
          v-model="formInline.date"
          type="month"
          format="yyyy-MM"
          placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onCheck">查询</el-button>
        <el-button type="warning" @click="onClear">重置</el-button>
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
        value: '',
        date: ''
      },
      lineOptions: []
    }
  },
  computed: {
    ...mapGetters(['initLineId'])
  },
  mounted () {
    let date = new Date() - 3600 * 24 * 30 * 1000
    this.formInline.date = moment(date).format('YYYY-MM')
    this.$store.dispatch('getLineList').then(res => {
      this.lineOptions = res
      this.formInline.value = this.lineOptions[0].value
    })
  },
  watch: {
    'formInline.date': {
      handler (newValue) {
      }
    }
  },
  methods: {
    onCheck () {
      if (this.formInline.date === '' || this.formInline.value === '' || this.formInline.date === 'Invalid date' || this.formInline.date === null) {
        this.$message.error('请添加完整的查询条件')
      } else {
        this.formInline.date = moment(this.formInline.date).format('YYYY-MM')
        // console.log(this.formInline);
        this.$emit('configCheck', this.formInline)
      }
    },
    onClear () {
      this.formInline.value = ''
      this.formInline.date = ''
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
