<template>
  <div class="alarm-home">
    <search
      :isOrg='true'
      :isLine="true"
      :isBus="true"
      :isDate="false"
      :isTime="true"
      :isTurn="false"
      :isDownload="true"
      :isWarntype="true"
      @configCheck="getSearch"
    />
    <div class="content">
      <div class="echart-table">
        <div class="echart">
          <div class="title">
            不良驾驶行为类型
          </div>
          <driverEchart />
        </div>
        <div class="table">
          <div class="title">
            不良驾驶行为当日排行
          </div>
          <div class="table-wrapper">
             <driverTable></driverTable>
          </div>
        </div>
      </div>
      <div class="map">
        <div class="title">
          不良驾驶行为分析实时报警监控
          <el-badge :value="99" style="margin-top:0px; margin-right: 20px;float:right">
            <el-button size="small" icon="el-icon-message-solid" type="info" style="font-size: 1rem"></el-button>
          </el-badge>
        </div>
        <div class="map-wrapper">
          <mapChart
          :isHotMap="false"
          :isSearchLine="false"
          :isCarsDetail="true"
          :isLineMap="false"
          :isSelect="false"
          :isFlv="false"
          ></mapChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import moment from 'moment';
import search from '@/components/searchAlarm/'
import mapChart from '@/components/map/'
// import driverEchart from '@/views/operationMonitoring/Components/echartsComponent/driveChart'
import driverEchart from './Components/driver'
import driverTable from './Components/turnTable'
export default {
  name: 'alarmHome',
  data () {
    return {
      searchData: {}
    }
  },
  components: {
    search,
    driverEchart,
    mapChart,
    driverTable
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    getSearch (item) {
      this.searchData = item
    }
  }
}
</script>

<style lang="scss" scoped>
.alarm-home {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  .content {
    width: 100%;
    height: calc(100% - 79px);
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    box-sizing: border-box;
    .echart-table {
      width: 30%;
      border: 1px solid #ccc;
      box-sizing: border-box;
      height: 100%;
      .echart {
        width:100%;
        height: 50%;
        border-bottom: 1px solid #ccc;
        .title {
          width: 100%;
          border-bottom: 1px solid #ccc;
          height: 12%;
          text-align: center;
          font-size: 1.5rem;
          line-height: 2.5;
          font-weight: bold;
        }
      }
      .table {
        width:100%;
        height: 50%;
        .title {
          width: 100%;
          border-bottom: 1px solid #ccc;
          height: 12%;
          text-align: center;
          font-size: 1.5rem;
          line-height: 2.5;
          font-weight: bold;
        }
        .table-wrapper {
          padding: 10px;
          box-sizing: border-box;
        }
      }
    }
    .map {
      width: 70%;
      height: 100%;
      border: 1px solid #ccc;
      border-left: hidden;
      box-sizing: border-box;
      .title {
        width: 100%;
        border-bottom: 1px solid #ccc;
        height: 6%;
        text-align: center;
        font-size: 1.5rem;
        line-height: 2.5;
        font-weight: bold;
      }
      .map-wrapper {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        height: calc(100% - 6%);
      }
    }
  }
}
</style>
<style>
.el-badge__content.is-fixed {
  top: 12px;
  right: 20px;
}
.el-icon-message-solid {
  font-size: 1.3rem
}
</style>
