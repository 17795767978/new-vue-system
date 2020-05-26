<template>
  <div v-loading="isloading">
    <h2 style="width: 100%; height: 2vh; text-align: center;line-height: 2vh">不良驾驶行为分析报警车辆排行</h2>
    <el-table
      ref="tableWrapper"
      :data="tableData"
      height="65vh"
      border
      @sort-change="changeTableSort">
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
          <span v-if="['orgname', 'linename', 'busnumber'].some(val => val == item.plvalue)" type="primary" size="mini">{{scope.row[item.plvalue]}}</span>
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
      isloading: true
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
      handleResults: []
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
          handleResults: newV.checkList
        })
      }
    }
  },
  methods: {
    _getTableData (params) {
      this.isloading = true
      this.$api['tiredMonitoring.getCarAlarmList'](params).then(res => {
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
      let eleArr = this.$refs.tableWrapper.$el
      let vDom = eleArr.getElementsByClassName('v-dom')[0]
      let vWrapper = vDom.getElementsByClassName('v-wrapper')[0]
      let table = eleArr.getElementsByClassName('el-table__body-wrapper')[0]
      table.scrollTop = 0
      this.scrollHeight = 0
      let tableHeight = table.clientHeight
      if (this.tableLength >= 20) {
        vDom.style.height = 53 * this.tableLength + 'px'
        table.addEventListener('scroll', this.getScroll(table, vDom, vWrapper, tableHeight), true)
      } else {
        table.removeEventListener('scroll', this.getScroll(table, vDom, vWrapper, tableHeight), true)
      }
    },
    getScroll (table, vDom, vWrapper, tableHeight) {
      return () => {
        if (this.tableLength >= 20) {
          if (table.scrollTop < 53 * this.tableLength) {
            this.scrollHeight = table.scrollTop
          } else {
            this.scrollHeight = 53 * this.tableLength
          }
          let domNum = Math.floor(this.scrollHeight / 53)
          if (this.scrollHeight >= 53 * this.tableLength - tableHeight) {
            vWrapper.style.transform = `translateY(${this.scrollHeight}px)`
            domNum = Math.floor(domNum)
            this.tableData = this.tableAllData.slice(this.tableLength - 15, this.tableLength + 1)
          } else {
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
    getrowData (row, plvalue) {
      this.$emit('driverChanged', row)
      // formInline: {
      //   orgId: '',
      //   lineId: '',
      //   devCode: '',
      //   busPlateNumber: '',
      //   busUuid: '',
      //   busSelfCode: '',
      //   warnLevel: '',
      //   warnTypeId: [],
      //   timeValue: [],
      //   checkType: [],
      //   auditStatus: []
      // },
      let defaultForm = this.formData
      let startTime = `${Object.keys(this.searchData).length > 0 ? this.searchData.dateArray[0] ? this.searchData.dateArray[0] : this.searchData.dateArray[0] : defaultForm.dateArray[0]} 00:00:00`
      let endTime = `${Object.keys(this.searchData).length > 0 ? this.searchData.dateArray[1] ? this.searchData.dateArray[1] : this.searchData.dateArray[1] : defaultForm.dateArray[1]} 23:59:59`
      let checkType = []
      // console.log(startTime, endTime)
      // console.log(Object.keys(this.searchData).length > 0 ? this.searchData.checkList : [])
      Object.keys(this.searchData).length > 0 ? this.searchData.checkList.forEach(item => {
        if (item === '0') {
          checkType.push('未处理')
        } else if (item === '1') {
          checkType.push('已处理')
        } else {
          checkType.push('误报')
        }
      }) : checkType = []
      let params = {
        orgId: row.orguuid,
        lineId: row.lineuuid,
        busPlateNumber: row.busnumber,
        busUuid: '',
        devCode: '',
        busSelfCode: '',
        warnLevel: '',
        driverName: '',
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
