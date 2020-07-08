<template>
  <div v-loading="isloading">
    <h2 style="width: 100%; height: 2vh; text-align: center;line-height: 2vh">不良驾驶行为分析报警司机排行</h2>
    <el-table
      ref="tableWrapper"
      :data="tableData"
      height="70vh"
      border
      @sort-change="changeTableSort"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="id"
        label="序号"
        :width="columnArr.length === 0 ? '' : '80'">
      </el-table-column>
      <el-table-column
        v-for="(item, index) in columnArr"
        :key="item.plvalue"
        align="center"
        :sortable="getSort(index)"
        :prop="item.plvalue"
        :width="getWidth(item, index)"
        :label="item.pldisplay">
        <template slot-scope="scope">
          <span v-if="['orgname', 'linename', 'busplatenumber', 'drivernum', 'drivername'].some(val => val == item.plvalue)" type="primary" size="mini">{{scope.row[item.plvalue]}}</span>
          <el-link type="primary" v-else @click="getrowData(scope.row, item.plvalue)">{{scope.row[item.plvalue]}}</el-link>
        </template>
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
      columnArr: [],
      tableAllData: [],
      plain: true,
      tableLength: 0,
      scrollHeight: 0,
      isloading: true,
      numHeight: 0
    }
  },
  computed: {
    ...mapGetters(['formData', 'userId'])
  },
  created () {
    let defaultForm = this.formData
    this._getTableData({
      orgId: this.userId === '1' ? '' : this.userId,
      lineId: defaultForm.lineId,
      startTime: defaultForm.dateArray[0],
      endTime: defaultForm.dateArray[1],
      warnTypes: defaultForm.warningArr,
      auditStatus: this.userId === '1' ? [] : ['1']
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
    })
  },
  activated () {
    this.scrollHeight = 0
    let eleArr = this.$refs.tableWrapper.$el
    let vWrapper = eleArr.getElementsByClassName('v-wrapper')[0]
    if (this.tableAllData.length > 0) {
      this.tableData = this.tableAllData.slice(0, 15)
    }
    if (vWrapper) {
      vWrapper.style.transform = `translateY(${this.scrollHeight}px)`
    }
  },
  watch: {
    searchData: {
      deep: true,
      handler (newV) {
        let defaultForm = this.formData
        this._getTableData({
          orgId: newV.orgId === '1' ? '' : newV.orgId,
          lineId: newV.lineId,
          startTime: newV.dateArray[0] === undefined ? '' : newV.dateArray[0],
          endTime: newV.dateArray[1] === undefined ? '' : newV.dateArray[1],
          warnTypes: newV.warnTypeId.length === 0 ? defaultForm.warningArr : newV.warnTypeId,
          auditStatus: this.userId === '1' ? newV.checkList : ['1']
        })
      }
    }
  },
  methods: {
    _getTableData (params) {
      this.isloading = true
      this.$api['tiredMonitoring.getBadDrivingDriverRanking'](params).then(res => {
        setTimeout(() => {
          this.isloading = false
        }, 100)
        this.columnArr = res.column
        this.tableAllData = res.data
        this.tableAllData.forEach((item, index) => {
          item.id = index + 1
        })
        if (this.tableAllData.length >= 20) {
          this.tableData = this.tableAllData.slice(0, 15)
          this.tableLength = this.tableAllData.length
          this.bigTable()
        } else {
          this.tableLength = 0
          this.tableData = this.tableAllData
          this.bigTable()
        }
      }).catch(err => {
        this.isloading = false
        this.$message.error(err.message)
        this.tableData = []
      })
    },
    bigTable () {
      // console.log(this.columnArr.length > 15)
      if (this.columnArr.length > 15) {
        this.numHeight = 71
      } else {
        this.numHeight = 48
      }
      let eleArr = this.$refs.tableWrapper.$el
      let vDom = eleArr.getElementsByClassName('v-dom')[0]
      let vWrapper = vDom.getElementsByClassName('v-wrapper')[0]
      let table = eleArr.getElementsByClassName('el-table__body-wrapper')[0]
      table.scrollTop = 0
      this.scrollHeight = 0
      let tableHeight = table.clientHeight
      if (this.tableLength >= 20) {
        vDom.style.height = this.numHeight * this.tableLength + 'px'
        table.addEventListener('scroll', this.getScroll(table, vDom, vWrapper, tableHeight), true)
      } else {
        table.removeEventListener('scroll', this.getScroll(table, vDom, vWrapper, tableHeight), true)
      }
    },
    getScroll (table, vDom, vWrapper, tableHeight) {
      return () => {
        if (this.tableLength >= 20) {
          if (table.scrollTop < this.numHeight * this.tableLength) {
            this.scrollHeight = table.scrollTop
          } else {
            this.scrollHeight = this.numHeight * this.tableLength
          }
          let domNum = this.scrollHeight / this.numHeight
          if (this.scrollHeight > this.numHeight * this.tableLength - tableHeight) {
            vWrapper.style.transform = `translateY(${this.scrollHeight}px)`
            domNum = Math.floor(domNum)
            this.tableData = this.tableAllData.slice(this.tableLength - 16, this.tableLength)
          } else {
            // console.log(this.scrollHeight)
            vWrapper.style.transform = `translateY(${this.scrollHeight}px)`
            domNum = Math.floor(domNum)
            this.tableData = this.tableAllData.slice(domNum, domNum + 15)
          }
        } else {
          console.log('关闭滚动监听事件')
          vDom.style.height = 0
          vWrapper.style.transform = `translateY(0px)`
        }
      }
    },
    changeTableSort (column) {
      if (column.order === 'descending') {
        this.tableAllData = this.tableAllData.sort((prev, next) => next[column.prop] - prev[column.prop])
      } else {
        this.tableAllData = this.tableAllData.sort((prev, next) => prev[column.prop] - next[column.prop])
      }
      console.log(this.tableAllData)
      this.tableAllData.forEach((item, index) => {
        item.id = index + 1
      })
      if (this.tableAllData.length >= 20) {
        this.tableData = this.tableAllData.slice(0, 15)
        this.tableLength = this.tableAllData.length
        this.bigTable()
      } else {
        this.tableLength = 0
        this.tableData = this.tableAllData
        this.bigTable()
      }
      console.log(column)
    },
    getSort (index) {
      if (index > 3) {
        return true
      }
      return false
    },
    getWidth (item, index) {
      if (index > 3 && item.pldisplay.length > 4) {
        return 130
      }
    },
    // getrowData (row) {
    //   this.$emit('driverChanged', row)
    // },
    getrowData (row, plvalue) {
      // this.$emit('driverChanged', row)
      let defaultForm = this.formData
      let startTime = `${Object.keys(this.searchData).length > 0 ? this.searchData.dateArray[0] ? this.searchData.dateArray[0] : this.searchData.dateArray[0] : defaultForm.dateArray[0]} 00:00:00`
      let endTime = `${Object.keys(this.searchData).length > 0 ? this.searchData.dateArray[1] ? this.searchData.dateArray[1] : this.searchData.dateArray[1] : defaultForm.dateArray[1]} 23:59:59`
      let checkType = []
      // console.log(startTime, endTime)
      // console.log(Object.keys(this.searchData).length > 0 ? this.searchData.checkList : [])
      if (this.userId === '1') {
        Object.keys(this.searchData).length > 0 ? this.searchData.checkList.forEach(item => {
          if (item === '0') {
            checkType.push('未审核')
          } else if (item === '1') {
            checkType.push('属实')
          } else if (item === '2') {
            checkType.push('误报')
          } else {
            checkType.push('其他')
          }
        }) : checkType = []
      } else {
        checkType.push('属实')
      }
      let params = {
        orgId: row.orguuid,
        lineId: row.lineuuid,
        busPlateNumber: row.busnumber,
        busUuid: '',
        devCode: '',
        busSelfCode: '',
        warnLevel: '',
        driverName: row.drivername,
        warnTypeId: plvalue === 'warnTotalNum' ? this.searchData.warnTypeId ? this.searchData.warnTypeId : [] : [plvalue],
        pageSize: 10,
        pageNum: 1,
        auditStatus: Object.keys(this.searchData).length > 0 ? this.searchData.auditStatus : [],
        checkType: Object.keys(this.searchData).length > 0 ? checkType : [],
        timeValue: [startTime, endTime]
        // startTime: ,
        // endTime:
      }
      this.$router.push({
        params,
        name: 'alarmCenter'
      })
    }
  }
}
</script>

<style>

</style>
