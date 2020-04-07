<template>
  <div class="title">
    <div class="title-name">
      <span>{{name}}</span>
    </div>
    <div class="time-wrapper">
    <el-date-picker
      class="time"
      v-model="dateArray"
      :picker-options="pickerOptionsDate"
      size="mini"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    </div>
    <div class="title-button">
      <el-button type="primary" size="mini" @click="getDetail">查询</el-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    name: {
      type: String
    }
  },
  data () {
    return {
      pickerOptionsDate: {
        disabledDate (time) {
          const endTime = moment(moment().format('YYYY-MM-DD')).valueOf()
          const startTime = moment(moment().format('YYYY-MM-DD')).valueOf() - 30 * 3600 * 24 * 1000
          return time.getTime() > endTime || time.getTime() < startTime
        }
      },
      dateArray: []
    }
  },
  mounted () {
    let startTime = moment().valueOf() - 6 * 3600 * 24 * 1000
    this.dateArray = [moment(startTime).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
  },
  methods: {
    getDetail () {
      this.$emit('getDetail', this.dateArray)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 5vh;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: border-box;
  line-height: 5vh;
  padding: 0 2vw;
  display: flex;
  .title-name {
    flex: 0 0 30%;
    font-size: .9vw;
    font-weight: 500;
    color: #222
  }
  .time-wrapper {
    flex: 0 0 50%;
    .time {
      float: right;
      margin-right: 1vw;
      height: 3.4vh;
      margin-top: .8vh;
    }
  }
  .title-button {
    flex: 0 0 20%;
  }
}
</style>
