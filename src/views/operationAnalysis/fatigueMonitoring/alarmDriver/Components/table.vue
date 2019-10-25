<template>
  <div>
    <h2 style="width: 100%; height: 2vh; text-align: center;line-height: 2vh">不良驾驶行为分析报警司机排行</h2>
    <el-table
      ref="tableWrapper"
      :data="tableData"
      height="50vh"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        prop="id"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        align="center"
        prop="orgName"
        label="机构"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="lineName"
        label="线路"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="driverNum"
        label="工号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="driverName"
        label="司机">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="getrowData(scope.row)">{{scope.row.driverName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="warnFatigue"
        label="疲劳">
      </el-table-column>
      <el-table-column
        align="center"
        prop="warnSmoking"
        label="抽烟">
      </el-table-column>
      <el-table-column
        align="center"
        prop="warnPhone"
        label="打电话">
      </el-table-column>
      <el-table-column
        align="center"
        prop="warnDistraction"
        label="分神">
      </el-table-column>
      <el-table-column
        align="center"
        prop="warnAbnormal"
        label="驾驶员异常">
      </el-table-column>
      <el-table-column
        align="center"
        prop="warnTotalNum"
        label="报警总数">
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  props: {
    searchData: {
      type: Object
    }
  },
  data () {
    return {
      tableData: [],
      plain: true,
      tableLength: 0,
      scrollHeight: 0
    }
  },
  computed: {
    ...mapGetters(['formData'])
  },
  created () {
    let defaultForm = this.formData
    this._getTableData({
      orgId: defaultForm.orgId === '1' ? '' : defaultForm.orgId,
      lineId: defaultForm.lineId,
      startTime: defaultForm.dateArray[0],
      endTime: defaultForm.dateArray[1],
      warnTypes: []
    })
  },
  mounted () {
    this.$nextTick(() => {
      let eleArr = this.$refs.tableWrapper.$el
      let table = eleArr.getElementsByClassName('el-table__body-wrapper')[0]
      let tableBody = eleArr.getElementsByClassName('el-table__body')[0]
      let emptyBlock = eleArr.getElementsByClassName('el-table__empty-block')[0]
      let vDom = document.createElement('div')
      let vWrapper = document.createElement('div')
      vDom.className = 'v-dom'
      vWrapper.className = 'v-wrapper'
      table.insertBefore(vDom, tableBody)
      vDom.appendChild(vWrapper)
      vWrapper.appendChild(tableBody)
      tableBody.appendChild(emptyBlock)
      console.log(vDom)
      console.log(table)
    })
  },
  activated () {
    this.scrollHeight = 0
    let eleArr = this.$refs.tableWrapper.$el
    let vWrapper = eleArr.getElementsByClassName('v-wrapper')[0]
    this.tableData = this.tableAllData.slice(0, 10)
    console.log(vWrapper)
    if (vWrapper) {
      vWrapper.style.transform = `translateY(${this.scrollHeight}px)`
    }
  },
  watch: {
    searchData: {
      deep: true,
      handler (newV) {
        this._getTableData({
          orgId: newV.orgId === '1' ? '' : newV.orgId,
          lineId: newV.lineId,
          startTime: newV.dateArray[0] === undefined ? '' : newV.dateArray[0],
          endTime: newV.dateArray[1] === undefined ? '' : newV.dateArray[1],
          warnTypes: newV.warnTypeId
        })
      }
    }
  },
  methods: {
    _getTableData (params) {
      this.$api['tiredMonitoring.getBadDrivingDriverRanking'](params).then(res => {
        this.tableAllData = res
        this.tableAllData.forEach((item, index) => {
          item.id = index + 1
        })
        this.tableData = this.tableAllData.slice(0, 10)
        this.tableLength = this.tableAllData.length
        this.bigTable()
      })
    },
    bigTable () {
      let eleArr = this.$refs.tableWrapper.$el
      let vDom = eleArr.getElementsByClassName('v-dom')[0]
      let vWrapper = vDom.getElementsByClassName('v-wrapper')[0]
      vDom.style.height = 50 * this.tableLength + 'px'
      let table = eleArr.getElementsByClassName('el-table__body-wrapper')[0]
      table.scrollTop = 0
      this.scrollHeight = 0
      table.addEventListener('scroll', () => {
        if (table.scrollTop < 50 * this.tableLength) {
          this.scrollHeight = table.scrollTop
        } else {
          this.scrollHeight = 50 * this.tableLength
        }
        let domNum = this.scrollHeight / 50
        vWrapper.style.transform = `translateY(${this.scrollHeight - 2}px)`
        if (domNum === this.tableLength) {
          domNum = Math.floor(domNum)
          this.tableData = this.tableAllData.slice(domNum - 10, this.tableLength)
        } else {
          domNum = Math.floor(domNum)
          this.tableData = this.tableAllData.slice(domNum, domNum + 10)
        }
      })
    },
    getrowData (row) {
      this.$emit('driverChanged', row)
    }
  }
}
</script>

<style>

</style>
