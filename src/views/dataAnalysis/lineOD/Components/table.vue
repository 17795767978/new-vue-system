<template>
  <div>
    <el-table
      ref="tableWrapper"
      :data="tableData"
      height="70vh"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="company"
        label="分公司"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lineNumber"
        label="线路号"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="arrow"
        align="center"
        label="上下行">
      </el-table-column>
      <el-table-column
        prop="sStationName"
        align="center"
        label="上车站位名">
      </el-table-column>
      <el-table-column
        prop="sStationIndex"
        align="center"
        width="100"
        label="上车站序名">
      </el-table-column>
      <el-table-column
        prop="eStationName"
        align="center"
        label="下车站位名">
      </el-table-column>
      <el-table-column
        prop="eStationIndex"
        align="center"
        width="100"
        label="下车站序名">
      </el-table-column>
      <el-table-column
        prop="brushCount"
        align="center"
        width="100"
        label="刷卡量（人次）">
      </el-table-column>
      <el-table-column
        prop="pDate"
        align="center"
        label="日期">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  props: {
    selectData: {
      type: Object
    }
  },
  data () {
    return {
      tableData: [],
      tableLength: 0,
      scrollHeight: 0,
      tableAllData: []
    }
  },
  computed: {
    ...mapGetters(['formData'])
  },
  created () {
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
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        let lineArr = newV.lineLineId.split('+')
        let date = moment(newV.dataCurrent).format('YYYY-MM-DD')
        this._getPfLineOdCountListData({
          company: newV.lineOrgId,
          lineID: lineArr[0],
          arrow: newV.lineType,
          pDate: date
        })
      }
    }
  },
  activated () {
    this.scrollHeight = 0
    let eleArr = this.$refs.tableWrapper.$el
    let vWrapper = eleArr.getElementsByClassName('v-wrapper')[0]
    vWrapper.style.transform = `translateY(${this.scrollHeight}px)`
    this.tableData = this.tableAllData.slice(0, 20)
  },
  methods: {
    _getPfLineOdCountListData (params) {
      this.$api['lineNet.getPfLineOdCountListData'](params).then(res => {
        this.tableAllData = res
        console.log(res)
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
      })
    },
    // bigTable () {
    //   let eleArr = this.$refs.tableWrapper.$el
    //   let vDom = eleArr.getElementsByClassName('v-dom')[0]
    //   let vWrapper = vDom.getElementsByClassName('v-wrapper')[0]
    //   vDom.style.height = 50 * this.tableLength + 'px'
    //   let table = eleArr.getElementsByClassName('el-table__body-wrapper')[0]
    //   table.scrollTop = 0
    //   this.scrollHeight = 0
    //   table.addEventListener('scroll', () => {
    //     if (table.scrollTop < 50 * this.tableLength) {
    //       this.scrollHeight = table.scrollTop
    //     } else {
    //       this.scrollHeight = 50 * this.tableLength
    //     }
    //     let domNum = Math.ceil(this.scrollHeight / 50)
    //     vWrapper.style.transform = `translateY(${this.scrollHeight - 2}px)`
    //     if (domNum + 30 >= this.tableLength) {
    //       this.tableData = this.tableAllData.slice(domNum - 20, this.tableLength)
    //     } else {
    //       this.tableData = this.tableAllData.slice(domNum, domNum + 20)
    //     }
    //   })
    // },
    bigTable () {
      let eleArr = this.$refs.tableWrapper.$el
      let vDom = eleArr.getElementsByClassName('v-dom')[0]
      let vWrapper = vDom.getElementsByClassName('v-wrapper')[0]
      let table = eleArr.getElementsByClassName('el-table__body-wrapper')[0]
      table.scrollTop = 0
      this.scrollHeight = 0
      if (this.tableLength >= 40) {
        vDom.style.height = 50 * this.tableLength + 'px'
        table.addEventListener('scroll', this.getScroll(table, vDom, vWrapper), true)
      } else {
        table.removeEventListener('scroll', this.getScroll(table, vDom, vWrapper), true)
      }
    },
    getScroll (table, vDom, vWrapper) {
      return () => {
        if (this.tableLength >= 40) {
          console.log(table.scrollHeight)
          console.log(table.scrollTop)
          console.log(table.clientHeight)
          if (table.scrollTop < 50 * this.tableLength) {
            this.scrollHeight = table.scrollTop
          } else {
            this.scrollHeight = 50 * this.tableLength
          }
          let domNum = Math.floor(this.scrollHeight / 50)
          if (this.scrollHeight >= 50 * this.tableLength - 12 * 50) {
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
    detailByProd (data) {
      console.log(data)
    },
    detailByRela (data) {
      console.log(data)
    },
    detailByCond (data) {
      console.log(data)
    },
    detailByFast (data) {
      console.log(data)
    },
    getEcharts (data) {
      this.$emit('changeEcharts', data)
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
