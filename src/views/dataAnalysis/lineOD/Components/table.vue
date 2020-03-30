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
        prop="orgName"
        label="分公司"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lineName"
        label="线路号"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lineType"
        align="center"
        label="方向">
        <template slot-scope="scope">
          {{scope.row.lineType === '1' ? '上行' : '下行'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="upStaName"
        align="center"
        label="上车站点">
      </el-table-column>
      <el-table-column
        prop="upStaSequence"
        align="center"
        width="100"
        label="上车站序">
      </el-table-column>
      <el-table-column
        prop="downStaName"
        align="center"
        label="下车站点">
      </el-table-column>
      <el-table-column
        prop="downStaSequence"
        align="center"
        width="100"
        label="下车站序">
      </el-table-column>
      <el-table-column
        prop="payNumbers"
        align="center"
        width="150"
        label="刷卡量（人次）">
      </el-table-column>
      <el-table-column
        prop="uploadDate"
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
      tableAllData: [],
      lineId: ''
    }
  },
  computed: {
    ...mapGetters(['formData', 'userId'])
  },
  created () {
    if (this.userId !== '1') {
      this.$store.dispatch('getLineList').then(res => {
        this.lineId = res[0].value
      })
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
      console.log(vDom)
      console.log(table)
      setTimeout(() => {
        this._getPfLineOdCountListData({
          orgUuid: this.userId === '1' ? '' : this.userId,
          lineUuid: this.lineId === '' ? this.formData.lineId : this.lineId,
          lineType: this.formData.lineType,
          uploadDate: moment(this.formData.dateYes).format('YYYY-MM-DD')
        })
      }, 500)
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        let date = moment(newV.dataCurrent).format('YYYY-MM-DD')
        this._getPfLineOdCountListData({
          orgUuid: newV.orgId,
          lineUuid: newV.lineId,
          lineType: newV.lineType,
          uploadDate: date
        })
      }
    }
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
  methods: {
    _getPfLineOdCountListData (params) {
      this.$api['lineNet.getPfLineOdCountListData'](params).then(res => {
        this.tableAllData = this.getSort(res)
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
    getSort (res) {
      if (res.length > 0) {
        // 总数据
        let allArray = []
        // 分片的数组
        let arrayBq = []
        // 上车站序数组
        let upArraySequence = Array.from(new Set(res.map(item => item.upStaSequence)))
        upArraySequence = upArraySequence.sort((prev, next) => prev - next)
        // 循环整个list 然后根据上车站序 排下车站序
        upArraySequence.forEach((item, index) => {
          arrayBq[index] = []
          arrayBq[index].push(res.filter(val => val.upStaSequence === item))
        })
        arrayBq.forEach(item => {
          item = item[0].sort((prev, next) => Number(prev.downStaSequence) - Number(next.downStaSequence))
        })
        arrayBq.forEach(item => {
          allArray.push(...item[0])
        })
        // console.log(upArraySequence)
        // console.log(arrayBq)
        // console.log(allArray)
        return allArray
      } else {
        return []
      }
    },
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
          if (table.scrollTop < 50 * this.tableLength) {
            this.scrollHeight = table.scrollTop
          } else {
            this.scrollHeight = 50 * this.tableLength
          }
          let domNum = Math.floor(this.scrollHeight / 50)
          if (this.scrollHeight > 50 * this.tableLength - 20 * 50) {
            vWrapper.style.transform = `translateY(${this.scrollHeight}px)`
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
