<template>
  <div>
    <el-table
      :data="tableData"
      height="36vh"
      border
      style="width: 100%">
      <el-table-column
        prop="company"
        label="所属机构"
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
        prop="stationIndex"
        align="center"
        label="站序号">
      </el-table-column>
      <el-table-column
        prop="stationName"
        align="center"
        label="站名">
      </el-table-column>
      <el-table-column
        prop="upCount"
        align="center"
        label="登量（人次）">
      </el-table-column>
      <el-table-column
        prop="downCount"
        align="center"
        label="降量（人次）">
      </el-table-column>
      <el-table-column
        prop="passCount"
        align="center"
        label="通过量（人次）">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="满载率">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    selectData: {
      type: Object
    }
  },
  data () {
    return {
      tableData: []
    }
  },
  computed: {
  },
  mounted () {
    setTimeout(() => {
      let arr = this.$store.getters.defaultSearch
      let lineArr = this.$store.getters.defaultSearch.lineLineId.split('+')
      if (arr.lineOrgId !== '' && arr.lineLineId !== '' && arr.lineType !== '' && arr.dataCurrent !== '') {
        this._getPfBaseListData({
          company: arr.lineOrgId,
          lineID: lineArr[1],
          arrow: arr.lineType,
          pDate: moment(arr.dataCurrent).format('YYYY-MM-DD')
        })
      } else {
        this.$message.error('请添加完整的查询条件')
      }
    }, 1000)
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        if (newV.lineOrgId !== '' && newV.lineLineId !== '' && newV.lineType !== '' && newV.dataCurrent !== '') {
          let lineArr = newV.lineLineId.split('+')
          this._getPfBaseListData({
            company: newV.lineOrgId,
            lineID: lineArr[1],
            arrow: newV.lineType,
            pDate: moment(newV.dataCurrent).format('YYYY-MM-DD')
          })
        }
      }
    }
  },
  methods: {
    _getPfBaseListData (params) {
      this.$api['lineNet.getPfBaseListData'](params).then(res => {
        this.tableData = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
