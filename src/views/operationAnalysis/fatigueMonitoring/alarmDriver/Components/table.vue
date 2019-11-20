<template>
  <div v-loading="isloading">
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
        v-for="(item, index) in columnArr"
        :key="item.plvalue"
        align="center"
        :sortable="getSort(index)"
        :prop="item.plvalue"
        :width="getWidth(item, index)"
        :label="item.pldisplay">
        <template slot-scope="scope">
          <el-button v-if="item.plvalue === 'drivername'" type="primary" size="mini" @click="getrowData(scope.row)">{{scope.row.drivername}}</el-button>
          <span v-else>{{scope.row[item.plvalue]}}</span>
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
    ...mapGetters(['formData'])
  },
  created () {
    let defaultForm = this.formData
    this._getTableData({
      orgId: defaultForm.orgId === '1' ? '' : defaultForm.orgId,
      lineId: defaultForm.lineId,
      startTime: defaultForm.dateArray[0],
      endTime: defaultForm.dateArray[1],
      warnTypes: defaultForm.warningArr
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
      this.tableData = this.tableAllData.slice(0, 10)
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
          warnTypes: newV.warnTypeId.length === 0 ? defaultForm.warningArr : newV.warnTypeId
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
          this.tableData = this.tableAllData.slice(0, 10)
          this.tableLength = this.tableAllData.length
          this.bigTable()
        } else {
          this.tableLength = 0
          this.tableData = this.tableAllData
          this.bigTable()
        }
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
            this.tableData = this.tableAllData.slice(this.tableLength - 10, this.tableLength + 1)
          } else {
            vWrapper.style.transform = `translateY(${this.scrollHeight}px)`
            domNum = Math.floor(domNum)
            this.tableData = this.tableAllData.slice(domNum, domNum + 10)
          }
        } else {
          console.log('关闭滚动监听事件')
          vDom.style.height = 0
          vWrapper.style.transform = `translateY(0px)`
        }
      }
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
    getrowData (row) {
      this.$emit('driverChanged', row)
    }
  }
}
</script>

<style>

</style>
