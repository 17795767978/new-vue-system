<template>
  <div>
    <el-table
      ref="tableWrapper"
      :data="tableData"
      height="36vh"
      border
      style="width: 100%">
      <!-- <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80">
      </el-table-column> -->
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
        label="下车站序名">
      </el-table-column>
      <el-table-column
        prop="brushCount"
        align="center"
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
      scrollHeight: 0
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
  methods: {
    _getPfLineOdCountListData (params) {
      this.$api['lineNet.getPfLineOdCountListData'](params).then(res => {
        console.log(res)
        this.tableAllData = res
        this.tableData = this.tableAllData.slice(0, 10)
        this.tableLength = this.tableAllData.length
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
          console.log(this.scrollHeight)
          let domNum = Math.ceil(this.scrollHeight / 50)
          console.log(domNum)
          vWrapper.style.transform = `translateY(${this.scrollHeight - 2}px)`
          if (domNum + 30 >= this.tableLength) {
            this.tableData = this.tableAllData.slice(domNum - 10, this.tableLength)
          } else {
            this.tableData = this.tableAllData.slice(domNum, domNum + 10)
          }
        })
      })
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
