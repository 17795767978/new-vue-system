<template>
  <div>
    <el-table
      :data="tableData"
      height="36vh"
      border
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80">
      </el-table-column>
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
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="getRowData(scope.row)">{{scope.row.lineNumber}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="arrow"
        align="center"
        label="上下行">
      </el-table-column>
      <el-table-column
        prop="brushCount"
        align="center"
        label="刷卡总量（人次）">
      </el-table-column>
      <el-table-column
        prop="pjyj"
        align="center"
        label="周转量（人次）">
      </el-table-column>
      <el-table-column
        prop="zzl"
        align="center"
        label="平均运距（KM）">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters(['formData'])
  },
  created () {
    let lineArr = this.formData.lineLineId.split('+')
    this._getIndexPfLineDayListData({
      company: this.formData.lineOrgId,
      lineID: lineArr[0],
      arrow: this.formData.lineType,
      pDate: this.formData.currentDate
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        let dataCurrent = ''
        if (newV.dataCurrent !== '') {
          dataCurrent = moment(newV.dataCurrent).format('YYYY-MM-DD')
        } else {
          dataCurrent = ''
        }
        let lineArr = newV.lineLineId.split('+')
        this._getIndexPfLineDayListData({
          company: newV.lineOrgId,
          lineID: lineArr[0],
          arrow: newV.lineType,
          pDate: dataCurrent
        })
      }
    }
  },
  methods: {
    _getIndexPfLineDayListData (params) {
      this.$api['lineNet.getIndexPfLineDayListData'](params).then(res => {
        res.forEach(item => {
          item.zzl = (item.zzl / 1000).toFixed(2)
        })
        this.tableData = res
      })
    },
    getRowData (row) {
      this.$emit('getRow', row)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
