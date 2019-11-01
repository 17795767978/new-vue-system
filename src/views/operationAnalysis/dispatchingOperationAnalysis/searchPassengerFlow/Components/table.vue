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
      :summary-method="getSummaries(this.tableAllData)"
      show-summary
      height="75vh"
      v-loading="loading"
      style="width: 100%">
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
      <el-table-column
        prop="lineName"
        align="center"
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
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters(['formData'])
  },
  data () {
    return {
      tableData: [],
      tableAllData: [],
      plain: true,
      tableLength: 0,
      scrollHeight: 0,
      loading: true
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
    this._getOnOffPersonCountlist({
      orgId: this.formData.orgId,
      lineId: this.formData.lineId,
      startDate: this.formData.dateArray[0],
      endDate: this.formData.dateArray[1]
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this._getOnOffPersonCountlist({
          orgId: newV.orgId,
          lineId: newV.lineId,
          startDate: newV.dateArray[0],
          endDate: newV.dateArray[1]
        })
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
    _getOnOffPersonCountlist (params) {
      this.loading = true
      this.$api['passengerFlow.getOnOffPersonCountlist'](params).then(res => {
        this.tableAllData = res
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
        const columns = ['id', 'orgName', 'lineName', 'uploadTime', 'onPersonCount', 'offPersonCount']
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
            sums[index] += ' 人次'
          } else {
            sums[index] = '——'
          }
          if (index === 0) {
            sums[index] = '总计'
          }
        })
        return sums
      }
    }
  }
}
</script>

<style>

</style>
