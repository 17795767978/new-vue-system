<template>
  <div>
    <el-table
      ref="tableWrapper"
      :data="seeTableData"
      height="80vh"
      size="mini"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="company"
        align="center"
        width="150"
        label="分公司">
        <!-- <template slot-scope="scope">
        <el-button type="primary" @click="goToDetail(scope.row)" size="mini">{{scope.row.date}}</el-button>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="lineNumber"
        align="center"
        label="线路号">
      </el-table-column>
      <el-table-column
        prop="arrow"
        align="center"
        label="上下行">
      </el-table-column>
      <el-table-column
        prop="linename"
        align="center"
        width="300"
        label="线路名">
      </el-table-column>
      <el-table-column
        prop="sStationIndex"
        align="center"
        width="100"
        label="站序A">
      </el-table-column>
      <el-table-column
        prop="eStationIndex"
        width="100"
        align="center"
        label="站序B">
      </el-table-column>
      <el-table-column
        prop="sStation"
        align="center"
        label="站位A">
      </el-table-column>
      <el-table-column
        prop="eStation"
        align="center"
        label="站位B">
      </el-table-column>
      <el-table-column
        prop="repeatLine"
        align="center"
        label="重复线路">
      </el-table-column>
      <el-table-column
        prop="repeatLineCount"
        align="center"
        label="重复数量(条)">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    selectData: {
      type: Object
    },
    queryData: {
      type: Object
    }
  },
  data () {
    return {
      tableData: [],
      seeTableData: [],
      isRequstStatus: false,
      tableLength: 0,
      cellHeight: 0,
      currentCell: 0,
      viewCellNum: 0
    }
  },
  computed: {
  },
  mounted () {
    let dom = this.$refs.tableWrapper
    dom.$el.children[2].addEventListener('scroll', (e) => {
      let parentNode = e.srcElement
      let tableBodyDom = dom.$el.querySelectorAll('.el-table__body')[0]
      let tbodyDom = tableBodyDom.children[1].children
      this.cellHeight = tableBodyDom.offsetHeight / this.tableLength
      this.currentCell = Math.floor(parentNode.scrollTop / this.cellHeight)
      this.viewCellNum = Math.ceil(parentNode.offsetHeight / this.cellHeight)
      for (let i = 0; i < tbodyDom.length; i++) {
        // console.log(tbodyDom[i])
        // if (i < this.currentCell - 5) {
        //   // tbodyDom[i].style.visibility = 'hidden'

        // } else if (i >= this.currentCell - 5 && i < this.currentCell + this.viewCellNum + 5) {
        //   tbodyDom[i].style.visibility = 'visible'
        // } else {
        //   tbodyDom[i].style.visibility = 'hidden'
        // }
      }
      // if (this.tableLength - this.currentCell > this.viewCellNum) {
      // } else {
      // }
      // console.log(tableBodyDom.offsetHeight) // 总高度
      // console.log(parentNode.offsetHeight) // 视图的高度
      // console.log(parentNode.scrollTop) // 滚动的高度
      // console.log(this.currentCell) // 滚动了多少行
      // console.log(this.cellHeight) // 行高
      // console.log(this.viewCellNum) // 视图可见行数
      // console.log('------------------')
      // if (tableBodyDom.offsetHeight <= (parentNode.offsetHeight +
      // parentNode.scrollTop + 5)) {
      //   console.log(123)
      // }
    })
    setTimeout(() => {
      this.changeSearchCondition(this.$store.getters.defaultSearch)
    }, 1000)
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.changeSearchCondition(newV)
      }
    },
    queryData: {
      deep: true,
      handler (newV) {
        let data = {
          lineOrgId: newV.company,
          lineLineId: newV.lineUuid + '+' + newV.lineNumber,
          lineType: newV.arrow,
          startStation: {},
          endStation: {}
        }
        this.changeSearchCondition(data)
      }
    }
  },
  methods: {
    _getRepeatTable (params) {
      this.$api['lineNet.getRepeatDetailLink'](params).then(res => {
        this.tableLength = res.length
        this.tableData = res
        this.seeTableData = res
      })
    },
    changeSearchCondition (params) {
      if (params.lineType === '1' || params.lineType === '2') {
        return
      } else if (params.lineType === '上行') {
        params.lineType = '1'
      } else if (params.lineType === '下行') {
        params.lineType = '2'
      }
      let arr = params
      let lineArr = params.lineLineId.split('+')
      this._getRepeatTable({
        company: arr.lineOrgId,
        lineID: lineArr[0],
        arrow: arr.lineType,
        sStation: arr.startStation.value !== undefined ? arr.startStation.value : '',
        eStation: arr.endStation.value !== undefined ? arr.endStation.value : ''
      })
    },
    goToDetail (data) {
      this.$router.push({
        name: 'repeatabilityDetail',
        query: {
          id: '001'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
<style>
  .el-table .warning-row {
    display: none;
  }

  .el-table .success-row {
    display: block;
  }
</style>
