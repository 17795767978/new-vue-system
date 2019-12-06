<template>
  <div>
    <el-table
      :data="tableData"
      height="36vh"
      border
      highlight-current-row
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="company"
        label="机构"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lineNumber"
        label="线路号"
        align="center"
        width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="goToDetail(scope.row)">{{scope.row.lineNumber}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="staRational"
        align="center"
        label="站点建设合理性">
        <!-- <template slot-scope="scope">
          <el-link type="primary" @click="detailByProd(scope.row)">{{scope.row.staRational}}</el-link>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="safeRational"
        align="center"
        label="舒适性">
        <!-- <template slot-scope="scope">
          <el-link type="warning" @click="detailByRela(scope.row)">{{scope.row.safeRational}}</el-link>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="conRational"
        align="center"
        label="便捷性">
        <!-- <template slot-scope="scope">
          <el-link type="danger" @click="detailByCond(scope.row)">{{scope.row.conRational}}</el-link>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="rapRational"
        align="center"
        label="快捷性">
        <!-- <template slot-scope="scope">
          <el-link type="info" @click="detailByFast(scope.row)">{{scope.row.rapRational}}</el-link>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="score"
        align="center"
        label="总得分">
        <template slot-scope="scope">
          <el-button type="success" @click="getEcharts(scope.row)">{{scope.row.score}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="levelName"
        align="center"
        label="线路等级">
        <template slot-scope="scope">
          <span style="color: green">{{scope.row.levelName}}</span>
        </template>
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
    this._getNetIndexDeaData({
      company: '',
      lineID: ''
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        let str
        if (newV.lineLineId && newV.lineLineId !== '') {
          str = newV.lineLineId.split('+')[0]
        } else {
          str = ''
        }
        this._getNetIndexDeaData({
          company: newV.lineOrgId,
          lineID: str
        })
      }
    }
  },
  methods: {
    _getNetIndexDeaData (params) {
      this.$api['lineNet.getDeaLineScoreListData'](params).then(res => {
        this.tableData = res
      })
    },
    goToDetail (row) {
      console.log(row)
      this.$router.push({
        name: 'lineNetWorkDetail',
        params: {
          data: row
        }
      })
    },
    getEcharts (data) {
      this.$emit('changeEcharts', data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
