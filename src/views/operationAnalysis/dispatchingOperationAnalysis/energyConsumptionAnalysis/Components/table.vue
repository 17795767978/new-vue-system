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
      prop="orgName"
      label="机构"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="lineName"
      label="线路"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="busPlateNumber"
      label="车辆"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="chargeDayNums"
      label="充电次数"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="runMileage"
      label="运营里程"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="socUse"
      label="SOC消耗"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="powerUse"
      label="电耗"
      >
    </el-table-column>
  </el-table>
  <!-- 选中框 -->
  <!-- <div class="config" @mousedown="getStart" @mouseup="getEnd" ref="wrapper">
    <div :style="classStyle" v-if="isShow"></div>
  </div> -->
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
      tableData: [],
      classStyle: {
        border: '1px dashed #f00',
        position: 'absolute',
        top: -66,
        left: -220,
        width: 0,
        height: 0,
        backgroundColor: 'rgba(255,0,0,0.5)'
      },
      isShow: false,
      initObj: {
        clientX: 0,
        clientY: 0
      }
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
    let startTime = moment(new Date() - 24 * 3600 * 1000).format('YYYY-MM-DD 00:00:00')
    let endTime = moment().format('YYYY-MM-DD 23:59:59')
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
      // deep: true,
      handler (newV) {
        console.log(newV)
        this.pageNum = 1
        this._getEnergyData({
          orgUuid: newV.orgId,
          lineUuid: newV.lineId,
          busPlateNumber: newV.busNumber,
          startTime: newV.startTime,
          endTime: newV.endTime
        })
      }
    },
    isShow (newV) {
      if (newV) {
        this.$refs.wrapper.addEventListener('mousemove', this.getMove)
      } else {
        this.$refs.wrapper.removeEventListener('mousemove', this.getMove)
      }
    }
  },
  methods: {
    _getEnergyData (params) {
      this.$api['schedulingAnalysis.getEnergyData'](params).then((res) => {
        console.log(res)
        this.tableData = res
      }).catch((err) => {
        this.$message.error(err.message)
      })
    },
    getStart (e) {
      this.isShow = true
      this.initObj = {
        clientX: e.clientX,
        clientY: e.clientY
      }
    },
    getMove (e) {
      let width = e.clientX - this.initObj.clientX
      let height = e.clientY - this.initObj.clientY
      if (e.clientX - this.initObj.clientX > 0 && e.clientY - this.initObj.clientY > 0) {
        this.classStyle.left = this.classStyle.left + e.clientX + 'px'
        this.classStyle.top = this.classStyle.top + e.clientY + 'px'
        this.classStyle.width = width + 'px'
        this.classStyle.height = height + 'px'
      } else if (e.clientX - this.initObj.clientX > 0 && e.clientY - this.initObj.clientY < 0) {
        this.classStyle.left = this.classStyle.left + e.clientX + 'px'
        this.classStyle.top = this.initObj.clientY + height - 66 + 'px'
        this.classStyle.width = width + 'px'
        this.classStyle.height = -height + 'px'
      } else if (e.clientX - this.initObj.clientX < 0 && e.clientY - this.initObj.clientY > 0) {
        this.classStyle.left = this.initObj.clientX + width - 220 + 'px'
        this.classStyle.top = this.classStyle.top + e.clientY + 'px'
        this.classStyle.width = -width + 'px'
        this.classStyle.height = height + 'px'
      } else if (e.clientX - this.initObj.clientX < 0 && e.clientY - this.initObj.clientY < 0) {
        this.classStyle.left = this.initObj.clientX + width - 220 + 'px'
        this.classStyle.top = this.initObj.clientY + height - 66 + 'px'
        this.classStyle.width = -width + 'px'
        this.classStyle.height = -height + 'px'
      }
    },
    getEnd (e) {
      this.isShow = false
      this.classStyle = {
        border: '1px dashed #f00',
        position: 'absolute',
        top: -66,
        left: -220,
        width: 0,
        height: 0,
        backgroundColor: 'rgba(255,0,0,0.5)'
      }
      this.initObj = {
        clientX: 0,
        clientY: 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.config {
  border: 1px solid #f00;
  // position: relative;
  // z-index: 500;
  width: 100%;
  height: 50vh;
}
</style>
