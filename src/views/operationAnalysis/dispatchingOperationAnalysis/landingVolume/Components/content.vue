<template>
  <div class="content-wrapper" ref="tableWrapper">
    <el-row :gutter="24">
      <el-col :span="12" style="height: 730px; background: #f6f6f6">
        <p class="before-title" style="font-size: 18px;font-weight:600;display: inline-block;">总上下车人数</p>
        <el-table
          :header-cell-style="{background:'#e9f5fe'}"
          :data="allTableData"
          border
          stripe
          class="inside-table"
          @expand-change="rowData"
          :style="style"
          height="650"
          >
          <el-table-column type="expand" width="60" fixed>
            <template slot-scope="props">
              <el-table
                :show-header="false"
                :data="props.row.children"
                ref="insideTable"
                stripe
                style="width: 100%;"
                >
                <el-table-column
                  align="center"
                  label="时刻"
                  width="180">
                  <template slot-scope="scope">
                    {{scope.row.timeHour}}时
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="站点"
                  width="">
                  <template slot-scope="scope">
                    <el-link @click="handlerDetail(scope.row)" type="primary">{{scope.row.staName}}</el-link>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="上车人数"
                  width="">
                  <template slot-scope="scope">
                    <!--  -->
                    {{scope.row.getOnNumber}}
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="下车人数"
                  width="">
                  <template slot-scope="scope">
                    <!-- {{scope.row.getOffNumber}} -->
                    {{scope.row.getOffNumber}}
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            align="center"
            width="120"
            label="日期"
            prop="timeDate">
          </el-table-column>
          <!-- 有数据的station -->
          <el-table-column
            align="center"
            prop="staName"
            label="站点"
          >
            <template slot-scope="scope">
              <el-link @click="handlerDetail(scope.row)" type="primary">{{scope.row.staName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="上车人数"
            prop="getOnNumber">
            <template slot-scope="scope">
              <!-- {{scope.row.getOffNumber}} -->
              {{scope.row.getOnNumber}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="下车人数"
            prop="getOffNumber">
            <template slot-scope="scope">
              <!-- {{scope.row.getOffNumber}} -->
              {{scope.row.getOffNumber}}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12" style="height: 730px; background: #f6f6f6">
        <p class="before-title" style="font-size: 18px; font-weight:bold">{{detailType}}详情：</p>
        <el-table
          :header-cell-style="{background:'#e9f5fe'}"
          :data="detailData"
          border
          stripe
          class="inside-table"
          :style="style"
          height="650"
          >
          <el-table-column
            align="center"
            label="机构"
            prop="orgName">
          </el-table-column>
          <el-table-column
            align="center"
            label="线路"
            prop="lineName">
          </el-table-column>
          <el-table-column
            align="center"
            label="方向"
            prop="lineType">
            <template slot-scope="scope">
              {{scope.row.lineType === '1' ? '上行' : '下行'}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="站点"
            prop="staName">
          </el-table-column>
          <el-table-column
            align="center"
            label="上车人数"
            prop="getOnNumber">
          </el-table-column>
          <el-table-column
            align="center"
            label="下车人数"
            prop="getOffNumber">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
// import { uniq } from '../../../../../utils/removal'
// import { getArrDifference } from '../../../../../utils/diffConcat'
export default {
  props: {
    selectData: {
      type: Array
    },
    selectStations: {
      type: Array
    }
  },
  data () {
    return {
      dateRowTableData: [],
      stations: [],
      emptyStations: [],
      upTableData: [],
      allTableData: [],
      detailData: [],
      downTableData: [],
      expands: [],
      tableData1: [],
      getUpSummaries: [],
      upTotle: '',
      style: {
        width: '100%'
      },
      detailType: ''
    }
  },
  components: {
  },
  computed: {
  },
  created () {},
  mounted () {
  },
  watch: {
    selectData: {
      deep: true,
      handler () {
        this.style.width = '99.999%'
        this.detailType = ''
        this.detailData = []
        this.allTableData = this.getTableAll()
        this.$forceUpdate()
        setTimeout(() => {
          this.style.width = '100%'
        }, 200)
      }
    }
  },
  methods: {
    getTableAll () {
      let tableAll = []
      let timeData = [...new Set(this.selectData.map(item => item.timeDate))]
      let StationsData = [...new Set(this.selectData.map(item => item.staName))]
      timeData.forEach(item => {
        StationsData.forEach(sta => {
          tableAll.push({
            timeDate: item,
            staName: sta,
            children: []
          })
        })
      })
      tableAll.forEach(item => {
        this.selectData.forEach(val => {
          if (val.timeDate === item.timeDate && val.staName === item.staName) {
            item.children.push(val)
            item.staUuid = val.staUuid
          }
        })
      })
      tableAll.forEach(item => {
        let getOnAll = item.children.map(item => item.getOnNumber)
        let getOffAll = item.children.map(item => item.getOffNumber)
        item.getOnNumber = getOnAll.reduce((prev, next) => prev + next)
        item.getOffNumber = getOffAll.reduce((prev, next) => prev + next)
      })
      return tableAll
    },
    handlerDetail (row) {
      // console.log(row)
      // passengerFlow.getStationOnOffListDatas
      // this.detailType = row.
      let timeArr = []
      if (row.children) {
        timeArr.push(row.children[0].timeHour)
        timeArr.push(row.children[row.children.length - 1].timeHour)
        this.detailType = `${row.staName}-${row.timeDate}`
      } else {
        timeArr = [row.timeHour, row.timeHour]
        this.detailType = `${row.staName}-${row.timeDate}-${row.timeHour}时`
      }
      this.$api['passengerFlow.getStationOnOffListDatas']({
        startDate: row.timeDate,
        endDate: row.timeDate,
        staName: row.staName,
        startHour: timeArr[0],
        endHour: timeArr[1],
        staUuid: row.staUuid
      }).then(res => {
        console.log(res)
        this.detailData = res
      })
    },
    rowData (row, expandedRows) {
    }
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 100%;
  box-sizing: border-box;
  .before-title::before {
    content: ' ';
    width: 5px;
    height: 20px;
    background-color: #249cf9;
    display: inline-flex;
    margin-right: 10px;
    margin-top: -2px;
    vertical-align: middle;
  }
  .Summaries {
    width: 50%;
    height: 40px;
    background-color: #409EFF;
    line-height: 40px;
    .title {
      width: 180px;
      float: left;
      text-align: center;
      border-right: 1px solid #eee
    }
    .item {
      width: calc(100% - 242px);
      display: flex;
      float: left;
      justify-content: center;
      .item-stlye {
        text-align: center;
        border-right: 1px solid #eee;
      }
    }
    .totle {
      width: 60px;
      float: right;
      text-align: center;
    }
  }
}
</style>
<style lang="scss">
.inside-table {
  .el-table__expanded-cell[class*=cell] {
    padding: 0 !important;
  }
  // .el-table__body-wrapper::-webkit-scrollbar {
  //   width: 6px;
  //   background-color: #ebeef5;
  // }
  // .el-table__body-wrapper::-webkit-scrollbar-thumb {
  //   border-radius: 3px;
  //   background-color: #ccc;
  //   height: 120px;
  // }
  // .el-table__body-wrapper::-webkit-scrollbar-track {
  //   box-shodow: inset 0 0 5px rgba(0,0,0, 0.2);
  //   border-radius: 3px;
  //   background-color: rgba(255,255,255, 1)
  // }
}
</style>
