<template>
  <el-dialog
    title="选择查询条件"
    :visible.sync="dialogVisible"
    width="30%">
    <el-date-picker
      v-model="month"
      type="month"
      placeholder="选择月">
    </el-date-picker>
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
      dialogVisible: false,
      month: ''
    }
  },
  mounted () {
    this.month = moment().subtract(30, 'days').format('YYYY-MM')
  },
  methods: {
    handler () {
      this.dialogVisible = false
      this.$emit('getDatas', this.month)
    }
  }
}
</script>

<style>
</style>
