<template>
  <div>
    <el-table
      :data="tableData"
      height="36vh"
      border
      style="width: 100%">
      <el-table-column
        prop="orgName"
        label="所属机构"
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
        label="上下行">
        <template slot-scope="scope">
          {{scope.row.lineType === '1' ? '上行' : '下行'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="staSequence"
        align="center"
        label="站序号">
      </el-table-column>
      <el-table-column
        prop="staName"
        align="center"
        label="站名">
      </el-table-column>
      <el-table-column
        prop="upPayNumber"
        align="center"
        label="登量（人次）">
      </el-table-column>
      <el-table-column
        prop="downPayNumber"
        align="center"
        label="降量（人次）">
      </el-table-column>
      <el-table-column
        prop="passNumber"
        align="center"
        label="通过量（人次）">
      </el-table-column>
      <!-- <el-table-column
        prop="approval"
        align="center"
        label="满载率">
      </el-table-column> -->
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
      if (arr.orgId !== '' && arr.lineId !== '' && arr.lineType !== '' && arr.dataCurrent !== '') {
        this._getMidLinePFData({
          orgUuid: arr.orgId,
          lineUuid: arr.lineId,
          lineType: arr.lineType,
          date: moment(arr.dataCurrent).format('YYYY-MM-DD')
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
        if (newV.orgId !== '' && newV.lineId !== '' && newV.lineType !== '' && newV.dataCurrent !== '') {
          this._getMidLinePFData({
            orgUuid: newV.orgId,
            lineUuid: newV.lineId,
            lineType: newV.lineType,
            date: moment(newV.dataCurrent).format('YYYY-MM-DD')
          })
        } else {
          this.$message.error('请添加完整的查询条件')
        }
      }
    }
  },
  methods: {
    _getMidLinePFData (params) {
      this.$api['lineNet.getPfBaseListData'](params).then(res => {
        this.tableData = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
