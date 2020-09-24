<template>
<div>
  <el-table
    style="width: 95%; margin-left: 2.5%; margin-top: 5vh;"
    ref="tableWrapper"
    :data="tableData"
    size="mini"
    border>
    <el-table-column
      align="center"
      type="index"
      label="序号"
      width="80">
    </el-table-column>
    <el-table-column
      align="center"
      prop="busPlateNumber"
      label="车牌号"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="lineName"
      label="运营线路"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="orgName"
      label="所属机构"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="orgName"
      label="车辆类型"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="chargeDayNums"
      label="当日充电次数"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="chargeStartTime"
      :formatter="getStartTime"
      label="充电开始时间"
      width="200"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="socStartVal"
      label="充电前SOC值（%）"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="chargeEndTime"
      :formatter="getEndTime"
      label="充电结束时间"
      width="200"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="socEndVal"
      label="充电后SOC值（%）"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="chargeTimes"
      label="单次充电时长"
      >
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
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
    let startTime = moment(new Date() - 24 * 3600 * 1000).format('YYYY-MM-DD')
    let endTime = moment().format('YYYY-MM-DD')
    this._getEnergyData({
      orgUuid: this.userId,
      lineUuid: '',
      busPlateNumber: '',
      startTime,
      endTime
    })
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this.pageNum = 1
        this._getEnergyData({
          orgUuid: newV.orgId,
          lineUuid: newV.lineId,
          busPlateNumber: newV.busNumber,
          startTime: moment(newV.dateQuick[0]).format('YYYY-MM-DD'),
          endTime: moment(newV.dateQuick[1]).format('YYYY-MM-DD')
        })
      }
    }
  },
  methods: {
    _getEnergyData (params) {
      this.$api['schedulingAnalysis.getChargeData'](params).then((res) => {
        this.tableData = res
      }).catch((err) => {
        this.$message.error(err.message)
      })
    },
    getStartTime (row) {
      return moment(row.chargeStartTime).format('YYYY-MM-DD HH:mm:ss')
    },
    getEndTime (row) {
      return moment(row.chargeEndTime).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style>

</style>
