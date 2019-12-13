<template>
  <div>
    <el-table
      :data="tableData"
      border
      height="36vh"
      size="mini"
      style="width: 100%">
      <el-table-column
        type="index"
        align="center"
        width="80"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="stationName"
        align="center"
        label="站点名称">
      </el-table-column>
      <el-table-column
        prop="predistance"
        align="center"
        width="130"
        label="距离首站距离(km)">
        <template slot-scope="scope">
          {{(Number(scope.row.predistance) / 1000).toFixed(2)}}
        </template>
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
    echartsData: {
      type: Object
    },
    stationData: {
      type: Object
    }
  },
  data () {
    return {
      tableData: [],
      defaultCom: ''
    }
  },
  created () {
    this.$store.dispatch('getComSecList').then(res => {
      this.defaultCom = res[0].value
      this._getLineCondition({
        company: this.defaultCom,
        lineID: '',
        arrow: '1'
      })
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        if (newV.lineLineId === '') {
          this._getLineCondition({
            company: this.defaultCom,
            lineID: '',
            lineName: '',
            arrow: '1'
          })
        }
      }
    },
    'selectData.lineLineId': {
      handler (newV) {
        if (newV !== '') {
          let str = newV.split('+')[0]
          this._getLineCondition({
            lineID: str,
            lineName: '',
            arrow: '1',
            company: ''
          })
        }
      }
    },
    'echartsData.name': {
      deep: true,
      handler (newV) {
        this._getLineCondition({
          company: newV,
          lineID: '',
          lineName: '',
          arrow: ''
        })
      }
    },
    stationData (newV) {
      let arrow = newV.seriesName.substring(0, 2) === '上行' ? '1' : '2'
      this._getLineCondition({
        company: '',
        lineID: '',
        lineName: newV.name,
        arrow: arrow
      })
    }
  },
  methods: {
    _getLineCondition (params) {
      this.tableData = []
      this.$api['lineNet.getLineCondition'](params).then(res => {
        res.forEach(item => {
          this.tableData.push({
            stationName: item.stationName,
            predistance: item.predistance
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
