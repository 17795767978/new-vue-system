<template>
  <div class="table">
    <!-- <el-table
      :data="tableData"
      style="width: 100%"
      height="70vh"
      row-key="id"
      size="mini"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        v-if="isOrgOpen"
        prop="date"
        align="center"
        label="公司"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="线路"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="address"
        label="上车人数">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="下车人数">
      </el-table-column>
    </el-table> -->
    <el-table
      :data="tableData"
      ref="tableWrapper"
      border
      :row-class-name="tableRowClassName"
      :summary-method="getSummaries(this.totalTableAllData)"
      show-summary
      height="75vh"
      v-loading="loading"
      :style="style">
      <el-table-column
        prop="id"
        label="序号"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="orgName"
        align="center"
        label="公司">
      </el-table-column>
       <!-- v-if="selectData.lineIds && selectData.lineIds.length > 0" -->
      <el-table-column
        prop="lineName"
        align="center"
        v-if="selectData.lineIds && selectData.lineIds.length > 0"
        label="线路">
      </el-table-column>
      <el-table-column
        prop="uploadTime"
        align="center"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="onPersonCount"
        align="center"
        label="上车人数">
      </el-table-column>
      <el-table-column
        prop="offPersonCount"
        align="center"
        label="下车人数">
      </el-table-column>
      <el-table-column
        prop="totalBusNum"
        align="center"
        label="车辆数">
      </el-table-column>
      <el-table-column
        prop="totalTripTime"
        align="center"
        label="趟次">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
// import Immutable from 'immutable.js'
export default {
  props: {
    selectData: {
      type: Object
    }
    // isOrgOpen: {
    //   type: Boolean
    // },
    // id: {
    //   type: String
    // }
  },
  computed: {
    ...mapGetters(['formData', 'formDown', 'userId'])
  },
  data () {
    return {
      tableData: [],
      tableAllData: [],
      plain: true,
      tableLength: 0,
      scrollHeight: 0,
      loading: true,
      totalTableAllData: [],
      indexArr: [],
      style: {
        width: '100%'
      }
    }
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
    let date = moment().format('YYYY-MM-DD')
    this._getOnOffPersonCountlist({
      orgId: this.userId === '1' ? '' : this.userId,
      lineIds: this.formData.lineIds,
      startDate: date,
      endDate: date
    }, '1')
  },
  activated () {
    this.scrollHeight = 0
    let eleArr = this.$refs.tableWrapper.$el
    let vWrapper = eleArr.getElementsByClassName('v-wrapper')[0]
    if (vWrapper) {
      vWrapper.style.transform = `translateY(${this.scrollHeight}px)`
    }
    this.tableData = this.tableAllData.slice(0, 20)
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this._getOnOffPersonCountlist({
          orgId: newV.orgId === '1' ? '' : newV.orgId,
          lineIds: newV.lineIds,
          startDate: newV.dateArray[0],
          endDate: newV.dateArray[1]
        }, newV.radio)
      }
    }
    // isOrgOpen (newV) {
    //   this.isOrg = newV
    // },
    // id (newV) {
    //   console.log(newV)
    // }
  },
  methods: {
    _getOnOffPersonCountlist (params, type) {
      this.loading = true
      this.style.width = '99.9%'
      if (type === '1') {
        this.$api['passengerFlow.getTodayOnOffPersonCountlist'](params).then(res => {
          this.style.width = '100%'
          this.totalTableAllData = res
          this.tableAllData = this.getOrgTotleNum(JSON.parse(JSON.stringify(res)))
          this.$store.dispatch('getDownloadData', this.tableAllData)
          this.loading = false
          this.tableAllData.forEach((item, index) => {
            item.id = index + 1
          })
          if (this.tableAllData.length >= 40) {
            this.tableData = this.tableAllData.slice(0, 20)
            this.tableLength = this.tableAllData.length
            this.bigTable()
          } else {
            this.tableLength = 0
            this.tableData = this.tableAllData
            this.bigTable()
          }
          if (res.length === 0) {
            this.$message.warning('暂无数据')
          }
        })
      } else {
        this.$api['passengerFlow.getOnOffPersonCountlist'](params).then(res => {
          this.style.width = '100%'
          this.totalTableAllData = res
          this.tableAllData = this.getOrgTotleNum(JSON.parse(JSON.stringify(res)))
          this.$store.dispatch('getDownloadData', this.tableAllData)
          this.loading = false
          this.tableAllData.forEach((item, index) => {
            item.id = index + 1
          })
          if (this.tableAllData.length >= 40) {
            this.tableData = this.tableAllData.slice(0, 20)
            this.tableLength = this.tableAllData.length
            this.bigTable()
          } else {
            this.tableLength = 0
            this.tableData = this.tableAllData
            this.bigTable()
          }
          if (res.length === 0) {
            this.$message.warning('暂无数据')
          }
        })
      }
    },
    // 计算每个分公司的上下车人数总和
    getOrgTotleNum (res) {
      console.log(res)
      this.indexArr = []
      let allTable = []
      if (res.length === 0) {
        return []
      }
      let initRepData = res.map(item => item.orgName)
      let initData = new Set(initRepData)
      let index = 0
      for (let key of initData) { // 遍历Set
        let arrOrg = res.filter(item => item.orgName === key)
        let getOnArr = arrOrg.map(item => Number(item.onPersonCount))
        let getOffArr = arrOrg.map(item => Number(item.offPersonCount))
        let getTotalBusNum = arrOrg.map(item => Number(item.totalBusNum))
        let getTotalTripTime = arrOrg.map(item => Number(item.totalTripTime))
        index += arrOrg.length
        this.indexArr.push(index)
        let currentData = {
          orgName: '合计',
          mark: arrOrg.length,
          lineName: '——',
          uploadTime: '——',
          onPersonCount: JSON.stringify(getOnArr.reduce((prev, next) => prev + next)),
          offPersonCount: JSON.stringify(getOffArr.reduce((prev, next) => prev + next)),
          totalBusNum: JSON.stringify(getTotalBusNum.reduce((prev, next) => prev + next)),
          totalTripTime: JSON.stringify(getTotalTripTime.reduce((prev, next) => prev + next))
        }
        this.getTable(allTable, this.indexArr, currentData, res)
      }
      return allTable
    },
    // 重新组装table
    getTable (allTable, indexArr, currentData, res) {
      if (this.indexArr.length === 1) {
        let spliceRes = res.slice(0, indexArr[0])
        allTable.push(...spliceRes, currentData)
      } else {
        let spliceRes = res.slice(indexArr[indexArr.length - 2], indexArr[indexArr.length - 1])
        allTable.push(...spliceRes, currentData)
      }
    },
    tableRowClassName ({ row, rowIndex }) {
      if (this.indexArr.some((item, index) => item + index === row.id - 1)) {
        return 'success-row'
      }
      return ''
    },
    bigTable () {
      let eleArr = this.$refs.tableWrapper.$el
      let vDom = eleArr.getElementsByClassName('v-dom')[0]
      let vWrapper = vDom.getElementsByClassName('v-wrapper')[0]
      let table = eleArr.getElementsByClassName('el-table__body-wrapper')[0]
      table.scrollTop = 0
      this.scrollHeight = 0
      let tableHeight = table.clientHeight
      if (this.tableLength >= 40) {
        vDom.style.height = 50 * this.tableLength + 'px'
        table.addEventListener('scroll', this.getScroll(table, vDom, vWrapper, tableHeight), true)
      } else {
        table.removeEventListener('scroll', this.getScroll(table, vDom, vWrapper, tableHeight), true)
      }
    },
    getScroll (table, vDom, vWrapper, tableHeight) {
      return () => {
        if (this.tableLength >= 40) {
          // console.log(table.scrollHeight)
          // console.log(table.scrollTop)
          // console.log(table.clientHeight)
          if (table.scrollTop < 50 * this.tableLength) {
            this.scrollHeight = table.scrollTop
          } else {
            this.scrollHeight = 50 * this.tableLength
          }
          let domNum = Math.floor(this.scrollHeight / 50)
          if (this.scrollHeight >= 50 * this.tableLength - tableHeight) {
            vWrapper.style.transform = `translateY(${this.scrollHeight}px)`
            domNum = Math.floor(domNum)
            this.tableData = this.tableAllData.slice(this.tableLength - 20, this.tableLength + 1)
          } else {
            vWrapper.style.transform = `translateY(${this.scrollHeight}px)`
            domNum = Math.floor(domNum)
            this.tableData = this.tableAllData.slice(domNum, domNum + 20)
          }
        } else {
          console.log('关闭滚动监听事件')
          vDom.style.height = 0
          vWrapper.style.transform = `translateY(0px)`
        }
      }
    },
    getSummaries (param) {
      return () => {
        let columns = []
        if (this.selectData.lineIds && this.selectData.lineIds.length > 0) {
          columns = ['id', 'orgName', 'lineName', 'uploadTime', 'onPersonCount', 'offPersonCount', 'totalBusNum', 'totalTripTime']
        } else {
          columns = ['id', 'orgName', 'uploadTime', 'onPersonCount', 'offPersonCount', 'totalBusNum', 'totalTripTime']
        }
        const sums = []
        columns.forEach((item, index) => {
          const values = param.map(list => Number(list[item]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            if (item.indexOf('Person') > -1) {
              sums[index] += ' 人次'
            } else if (item.indexOf('totalTripTime') > -1) {
              sums[index] += ' 趟'
            } else if (item.indexOf('totalBusNum') > -1) {
              sums[index] += ' 辆'
            }
            console.log(item)
          } else {
            sums[index] = '——'
          }
          if (index === 0) {
            sums[index] = '总计'
          }
          // if (index === 2) {
          //   sums[index] = '——'
          // }
        })
        return sums
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 /deep/ .el-table .success-row {
    background: #f0f9eb;
  }
</style>
