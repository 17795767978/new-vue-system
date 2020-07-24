<template>
  <div class="basic-msg">
    <div class="top-msg">
      <h2 class="title">车辆信息</h2>
      <el-row :gutter="24" style="margin-bottom:1vh;">
        <el-col :span="4">
          <span>车牌号：{{warnDetails.name}}</span>
          <span></span>
        </el-col>
        <el-col :span="4">
          <span>车辆自编号：{{warnDetails.content.busPosition.busSelfcode}}</span>
          <span></span>
        </el-col>
        <el-col :span="4">
          <span>车辆类型：---</span>
          <span></span>
        </el-col>
        <el-col :span="4">
          <span>燃料类型：{{warnDetails.content.busFuelType}}</span>
          <span></span>
        </el-col>
        <el-col :span="4">
          <span>额定载客数：{{warnDetails.content.busLoadNumber}}</span>
          <span></span>
        </el-col>
        <el-col :span="4">
          <span>所属分公司：{{warnDetails.content.orgName}}</span>
          <span></span>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="margin-bottom:1vh;">
        <el-col :span="4" >
          <span>车辆用途：{{warnDetails.content.busProductUse}}</span>
          <span></span>
        </el-col>
        <el-col :span="4">
          <span>车辆状态：---</span>
          <span></span>
        </el-col>
        <el-col :span="4">
          <span>时间：{{getTimeFormat}}</span>
          <span></span>
        </el-col>
        <el-col :span="4">
          <span>当前速度：{{warnDetails.content.busPosition.positionSpeed}}</span>
          <span></span>
        </el-col>
        <el-col :span="4">
          <span>驾驶员：{{warnDetails.content.busPosition.drvName}}</span>
          <span></span>
        </el-col>
        <el-col :span="4">
          <span>工号：{{warnDetails.content.busPosition.drvIccard}}</span>
          <span></span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="4" >
          <span>客流当日累计：{{warnDetails.content.busPosition.totalPerson}}</span>
          <span></span>
        </el-col>
        <el-col :span="4" >
          <span>本班累计：{{warnDetails.content.busPosition.currentPerson}}</span>
          <span></span>
        </el-col>
        <el-col :span="4">
          <span>趟次执行：{{warnDetails.content.busPosition.currenttrip}}</span>
          <span></span>
        </el-col>
        <el-col :span="4" >
          <span>当前位置: {{address}}</span>
          <span></span>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <h2 class="title">主动安全报警</h2>
      <el-table
        :data="tableData"
        stripe
        border
        v-loading="loading"
        size="mini"
        style="width: 100%">
        <el-table-column
          align="center"
          type="index"
          label="序列"
          width="60">
        </el-table-column>
        <el-table-column
          prop="orgName"
          align="center"
          label="所属公司"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="lineName"
          label="所属线路">
        </el-table-column>
        <el-table-column
          align="center"
          prop="busPlateNumber"
          label="车牌号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="busSelfCode"
          label="车辆自编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="warnTypeName"
          label="报警类型"
          width="200">
        </el-table-column>
        <!-- warnNumber -->
        <el-table-column
          align="center"
          label="报警级别"
          width="100">
          <template slot-scope="scope">
            {{scope.row.warnLevel}}级
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="warnNumber"
          label="报警次数"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="speed"
          label="报警速度(KM/H)"
          width="120"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="warnTime"
          label="报警时间"
          :formatter="formatterTime"
          width="200"
          >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    warnDetails: {
      type: Object
    },
    tableData: {
      type: Array
    }
  },
  data () {
    return {
      // tableData: []
      loading: false,
      address: ''
    }
  },
  computed: {
    getTimeFormat () {
      return moment((this.warnDetails.content.busPosition.posUploadTime)).format('YYYY-MM-DD HH:mm:ss')
    }
    // getAddress () {
    //   return this.getPointAddress()
    // }
  },
  watch: {
    warnDetails: {
      deep: true,
      immediate: true,
      handler (newV) {
        this.getPointAddress(newV)
      }
    }
  },
  methods: {
    formatterTime (row) {
      return moment(row.warnTime).format('YYYY-MM-DD HH:mm:ss')
    },
    getPointAddress (newV) {
      // eslint-disable-next-line no-undef
      let point = new BMap.Point(Number(newV.value[0]), Number(newV.value[1]))
      // eslint-disable-next-line no-undef
      let gc = new BMap.Geocoder()
      gc.getLocation(point, (rs) => {
        let addComp = rs.addressComponents
        this.address = `${addComp.province}${addComp.city}${addComp.district}${addComp.street}${addComp.streetNumber}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-msg {
  width: 100%;
  height:75vh;
  padding: 1vh 1vw;
  box-sizing: border-box;
  .title {
    margin: 0 auto 1vh;
  }
  .top-msg {
    padding: 3vh 1vw;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
  }
  .table {
    margin-top: 2vh;
    height: 52vh;
    padding: 1vh 1vw;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
    overflow-y: auto;
  }
}
</style>
