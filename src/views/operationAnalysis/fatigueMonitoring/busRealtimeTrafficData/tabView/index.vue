<template>
  <div class="tab-view">
    <div class="tab-view-nav">
       <el-radio-group v-model="tabSelect" size="small">
        <el-radio-button label="0">SOC趋势</el-radio-button>
        <el-radio-button label="1">速度趋势</el-radio-button>
        <el-radio-button label="2">转速趋势</el-radio-button>
        <el-radio-button label="3">电流趋势</el-radio-button>
        <el-radio-button label="4">电压趋势</el-radio-button>
      </el-radio-group>
      <div>
        <div class="dateView">
          <el-date-picker
            size="small"
            v-model="monData"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="dateView timerView">
          <el-time-picker
            is-range
            value-format="HH:mm:ss"
            v-model="times"
            size="small"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
        </div>
        <div class="searchView">
          <el-button size="small" :round="false">查询</el-button>
          <el-button size="small" :round="false">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabSelect: '0',
      monData: '',
      times: ['00:00:00', '23:00:00']
    }
  }
}
</script>
<style scoped>
  .tab-view {
    margin-top: 16px;
  }
  .tab-view-nav {
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .tab-view-nav>div {
    display: flex;
    flex-direction: row;
  }
  .dateView {
    vertical-align: middle;
    margin-right: 10px;
  }
</style>
<style>
  .tab-view .tab-view-nav .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    background-color: #1479F6;
  }
  .tab-view .el-radio-button, .tab-view .el-radio-button__inner {
    background-color: #010B0E;
    color: #ffffff;
    border-color: #1479F6;
  }
  .tab-view .tab-view-nav .el-date-editor {
    background-image: url('../assets/dateInputBg.png');
    background-size: 100% 100%;
    border: 0;
  }
  .tab-view .tab-view-nav .el-input--small .el-input__inner {
    background-color: transparent;
    border: 0;
  }
  .tab-view .tab-view-nav .el-range-editor--small .el-range-input {
    background-color: transparent;
    border: 0;
  }
  .tab-view .tab-view-nav .el-range-editor .el-range-input {
    background-color: transparent;
    border: 0;
  }
  .tab-view .tab-view-nav .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 120px;
    border: 0;
  }
  .tab-view .tab-view-nav .timerView .el-date-editor.el-input, .tab-view .tab-view-nav .timerView .el-date-editor.el-input__inner {
    width: 190px;
  }
  .tab-view .tab-view-nav .searchView .el-button--small {
    background-image: url('../assets/btnBg.png');
    background-size: 100% 100%;
    background-color: transparent;
    border: 0;
    color: #ffffff;
  }
</style>
