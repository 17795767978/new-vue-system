<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      border
      size="mini"
      height="66vh"
      style="width: 100%">
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="80">
        <template slot-scope="scope">
          <span> {{scope.$index + (pageNumber - 1) * pageSize + 1}} </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="orgName"
        label="所属机构"
        align="center">
      </el-table-column>
      <el-table-column
        prop="lineName"
        label="线路号"
        align="center">
        <!-- <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handlerChangeEcharts(scope.row)">{{scope.row.lineName}}</el-button>
        </template> -->
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
        prop="upPayNumber"
        align="center"
        label="刷卡总量（人次）">
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right; margin-top: 20px;"
      background
      :current-page="pageNumber"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
    <span class="demonstration" style="float: right; margin-top: 20px; line-height: 36px;">共{{total}}条</span>
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
      pageNumber: 1,
      pageSize: 15,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
    let date = moment().valueOf()
    date = date - 24 * 60 * 60 * 1000
    date = moment(date).format('YYYY-MM-DD')
    this._getMidLinePFData({
      orgUuid: this.userId === '1' ? '' : this.userId,
      lineUuid: '',
      lineType: '',
      date,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    })
  },
  watch: {
    selectData (newV) {
      this.pageNumber = 1
      this._getMidLinePFData({
        orgUuid: newV.orgId,
        lineUuid: newV.lineId,
        lineType: newV.lineType,
        date: moment(newV.dataCurrent).format('YYYY-MM-DD'),
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      })
    }
  },
  methods: {
    async _getMidLinePFData (params) {
      let result = await this.$api['lineNet.getMidLinePFData'](params)
      // console.log(result)
      this.tableData = result.list
      this.total = result.total
    },
    handlerChangeEcharts (row) {
      this.$emit('changeEcharts', row)
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      let date = moment().valueOf()
      date = date - 24 * 60 * 60 * 1000
      date = moment(date).format('YYYY-MM-DD')
      if (Object.keys(this.selectData).length === 0) {
        this._getMidLinePFData({
          orgUuid: this.userId === '1' ? '' : this.userId,
          lineUuid: '',
          lineType: '1',
          date,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        })
      } else {
        this._getMidLinePFData({
          orgUuid: this.selectData.orgId,
          lineUuid: this.selectData.lineId,
          lineType: this.selectData.lineType,
          date: moment(this.selectData.dataCurrent).format('YYYY-MM-DD'),
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        })
      }
    }
  }
}
</script>

<style>

</style>
