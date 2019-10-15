<template>
  <div>
    <el-table
      :data="tableData"
      height="37vh"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="lineNumber"
        align="center"
        label="线路">
        <template slot-scope="scope">
        <el-button type="primary" @click="goToDetail(scope.row)" size="mini">{{scope.row.lineNumber}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="arrow"
        align="center"
        label="方向">
      </el-table-column>
      <el-table-column
        prop="lineName"
        align="center"
        label="线路名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="scCount"
        align="center"
        label="线路站对数">
      </el-table-column>
      <el-table-column
        prop="repeatScCount"
        align="center"
        label="重复站对数">
      </el-table-column>
      <el-table-column
        prop="repeatability"
        align="center"
        label="重复度">
        <template slot-scope="scope">
          <span>{{formatterRepeatability(scope.row.repeatability)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="top3"
        width="300"
        align="center"
        label="重复线路(排名前三)">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    selectData: {
      type: Object
    }
  },
  data () {
    return {
      tableData: [
        {
          date: '01',
          type: '上行',
          name: '口杯',
          address: 12312312,
          num: 12121,
          repeat: '10%',
          repeatLine: ['0', '23', '4']
        }
      ]
    }
  },
  computed: {
    formatterRepeatability () {
      return function (repeatability) {
        let num = Math.ceil(repeatability * 1000) / 10 + '%'
        return num
      }
    }
  },
  created () {
    this._getRepeatTable({
      company: '',
      lineID: ''
    })
  },
  watch: {
    'selectData.lineLineId': {
      handler (newV) {
        let str = newV.split('+')[0]
        this._getRepeatTable({
          lineID: str
        })
      }
    }
  },
  methods: {
    _getRepeatTable (params) {
      this.loading = true
      this.$api['lineNet.getRepeatTable'](params).then(res => {
        this.tableData = res
      })
    },
    goToDetail (data) {
      this.$router.push({
        name: 'repeatabilityDetail',
        query: {
          data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
