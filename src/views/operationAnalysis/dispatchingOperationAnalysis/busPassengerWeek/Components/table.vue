<template>
<div v-loading="isLoading">
  <el-table
    :data="tableData"
    border
    height="70vh"
    size="mini"
    style="width: 100%">
    <el-table-column v-for="item in columnData" :key="item.pldisplay" align="center" :label="item.pldisplay" :prop="typeof item.plvalue === 'string' ? item.plvalue : ''" width="200">
      <div v-if="typeof item.plvalue !== 'string'">
        <el-table-column label="准确率" :prop="getDiff(item.plvalue)" align="center" width="120">
          <template slot-scope="scope">
            <div :style="scope.row[getDiff(item.plvalue)] < caleLimit ? active : ''">{{scope.row[getDiff(item.plvalue)]}}%</div>
          </template>
        </el-table-column>
        <el-table-column label="上车人数" :prop="getUp(item.plvalue)" align="center" width="120"></el-table-column>
        <el-table-column label="下车人数" :prop="getDown(item.plvalue)" align="center" width="120"></el-table-column>
      </div>
    </el-table-column>
  </el-table>
  <el-pagination
    style="float: right; margin-top: 20px;"
    background
    :current-page="pageNumber"
    @current-change="handleCurrentChange"
    layout="total, prev, pager, next"
    :page-size="pageSize"
    :total="total">
  </el-pagination>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  props: {
    searchData: {
      type: Object
    }
  },
  data () {
    return {
      tableDataAll: [],
      tableData: [],
      columnData: [],
      total: 0,
      pageNumber: 1,
      pageSize: 15,
      isLoading: false,
      caleLimit: '85',
      active: {
        width: '100%',
        height: '100%',
        backgroundColor: 'pink'
      }
    }
  },
  computed: {
    ...mapGetters(['userId']),
    getUp () {
      return (item) => {
        return item.filter(val => val.indexOf('UP') > 0)[0]
      }
    },
    getDown () {
      return (item) => {
        return item.filter(val => val.indexOf('DOWN') > 0)[0]
      }
    },
    getDiff () {
      return (item) => {
        return item.filter(val => val.indexOf('CALE') > 0)[0]
      }
    }
  },
  created () {
    const endDate = moment(new Date() - 1 * 24 * 3600 * 1000).format('YYYY-MM-DD')
    const startDate = moment(new Date() - 8 * 24 * 3600 * 1000).format('YYYY-MM-DD')
    this._pageBusPersonTotalWeekList({
      orgId: this.userId,
      lineId: '',
      busNumber: '',
      devCode: '',
      cale: '85',
      startDate,
      endDate
    })
  },
  watch: {
    searchData: {
      // deep: true,
      handler (newV) {
        this.pageNumber = 1
        this.caleLimit = newV.diffStandard
        this._pageBusPersonTotalWeekList({
          orgId: newV.orgId,
          lineId: newV.lineId,
          busNumber: newV.busNumber,
          devCode: newV.deviceCode,
          cale: newV.diffStandard,
          startDate: moment(newV.startDate).format('YYYY-MM-DD'),
          endDate: moment(newV.endDate).format('YYYY-MM-DD')
        })
      }
    }
  },
  methods: {
    _pageBusPersonTotalWeekList (params) {
      this.isLoading = true
      this.$api['passengerFlow.pageBusPersonTotalWeekList'](params).then(res => {
        this.isLoading = false
        this.tableDataAll = res.data
        this.columnData = res.columnData
        this.total = this.tableDataAll.length
        this.tableData = this.tableDataAll.slice((this.pageNumber - 1) * 15, this.pageNumber * 15)
      })
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      this.tableData = this.tableDataAll.slice((this.pageNumber - 1) * 15, this.pageNumber * 15)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
