<template>
  <div>
    <Search
      :isOrgSec='true'
      :isLineSec="true"
      :isBus="false"
      :isDate="false"
      :isTime="false"
      :isTurn="true"
      :isDataCurrent="true"
      :isDownload="true"
      :isEmpty="true"
      :isWarntype="false"
      :downLoadName="downLoadName"
      @configCheck="getSearch"
    />
    <div class="content">
      <div class="table">
        <Table @getRow="getRow" :selectData="selectData"/>
      </div>
      <div class="echarts">
        <div class="setting">
          <Settings :selectData="selectData" :isDefault="isDefault" @changeDefault="changeDefault"/>
        </div>
        <div class="canvas">
          <LinePassagerFlow :rowData="rowData" :selectData="selectData" @defaultConfig="defaultConfig"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Table from './Components/table'
import Settings from './Components/setting'
import LinePassagerFlow from './Components/linePassagerFlow'
import mixinsTime from '@/mixins/global/'
export default {
  name: 'flowComprehensiveQuery',
  mixins: [mixinsTime],
  data () {
    return {
      selectData: {},
      echartsData: {},
      rowData: {},
      downLoadName: 'downLoad.lineTotalExport',
      isDefault: false
    }
  },
  methods: {
    getSearch (data) {
      this.selectData = data
    },
    getRow (data) {
      this.rowData = data
    },
    defaultConfig () {
      this.isDefault = true
    },
    changeDefault () {
      this.isDefault = false
    }
  },
  mounted () {
  },
  components: {
    Search,
    Table,
    Settings,
    LinePassagerFlow
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: calc(100vh - 16vh);
  padding: 2vh 2vw;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .table {
    width: 100%;
    height: 50%;
    border-bottom: 1px solid #EBEEF5;
    box-sizing: border-box;
  }
  .echarts {
    width: 100%;
    height: 50%;
    .setting {
      width: 100%;
      height: 3vh;
    }
    .canvas {
      width: 100%;
      height: calc(100% - 3vh)
    }
  }
}
</style>
