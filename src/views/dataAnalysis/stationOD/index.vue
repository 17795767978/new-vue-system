<template>
  <div>
    <Search
      :isMonth="true"
      :isEmpty="true"
      :isDownload="true"
      @configCheck="getSearch"
      @emptySelect="handlerEmpty"
    >
      <span style="margin-right: 0.5vw;">出发时间</span>
      <el-time-select
        size="mini"
        style="width: 7vw"
        placeholder="起始时间"
        v-model="slotData.stHour"
        :picker-options="{
          start: '06:00',
          step: '01:00',
          end: '23:00'
        }">
      </el-time-select>
      -
      <el-time-select
        size="mini"
        style="width: 7vw;margin-right: 1vw;"
        placeholder="结束时间"
        v-model="slotData.edHour"
        :picker-options="{
          start: '06:00',
          step: '01:00',
          end: '23:00',
          minTime: slotData.stHour
        }">
      </el-time-select>

      <span style="margin-right: 0.5vw;">直线距离（km）</span>
      <el-input class="default" min="0" v-model="slotData.startDis" size="mini"
        style="width: 7vw" placeholder="起始距离" type="number"></el-input>
      -
      <el-input class="default" min="0" v-model="slotData.endDis" size="mini"
        style="width: 7vw;margin-right: 1vw;" placeholder="结束距离" type="number"></el-input>

      <span style="margin-right: 0.5vw;">刷卡人数</span>
      <el-input  class="default" min="0" v-model="slotData.startNum" size="mini"
        style="width: 7vw"  type="number"></el-input>
      -
      <el-input class="default" min="0" v-model="slotData.endNum" size="mini"
        style="width: 7vw;margin-right: 1vw;" type="number"></el-input>
    </Search>
    <div class="table">
      <Table :selectData="selectData"/>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Table from './Components/table'
export default {
  name: 'stationOD',
  data () {
    return {
      selectData: {},
      slotData: {
        stHour: '07:00',
        edHour: '09:00',
        startDis: '',
        endDis: '',
        startNum: '',
        endNum: ''
      }
    }
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
      }
    },
    getSearch (data) {
      if (this.slotData.endNum !== '') {
        this.handleAbout(this.slotData.endNum, 'endNum', 'startNum')
      }
      if (this.slotData.endDis !== '') {
        this.handleAbout(this.slotData.endDis, 'endDis', 'startDis')
      }
      this.selectData = { ...data, ...this.slotData }
    },
    handlerEmpty () {
      this.selectData = {}
      this.slotData = {
        stHour: '',
        edHour: '',
        startDis: '',
        endDis: '',
        startNum: '',
        endNum: ''
      }
    }
  },
  components: {
    Search,
    Table
  }
}
</script>

<style lang="scss" scoped>
.table {
  padding: 2vh 10vw 0;
  box-sizing: border-box;
}
</style>
