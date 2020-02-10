<template>
  <div class="table-wrapper" v-loading="loading">
    <el-table
      :data="tableData"
      element-loading-text="拼命加载中"
      border
      stripe
      size="small"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80"
      >
      <template slot-scope="scope">
        <span> {{scope.$index + (pageNumber - 1) * pageSize + 1}} </span>
      </template>
      </el-table-column>
      <el-table-column
        v-for="item in tableTitle"
        :key="item.key"
        align="center"
        :prop="item.value"
        :label="item.key">
        <template slot-scope="scope">
          <span v-if="item.value === 'uploadTime'">{{moment(scope.row[item.value]).format('YYYY-MM-DD HH:mm:ss')}}</span>
          <span v-else-if="item.value === 'lineType'">{{scope.row[item.value] === '1' ? '上行' : '下行'}}</span>
          <span v-else>{{scope.row[item.value]}}</span>
        </template>
      </el-table-column>
      <!-- prfGetPersonCount -->
    </el-table>
    <el-pagination
      style="float: right; margin-top: 20px;"
      background
      :disabled="isDisabled"
      :current-page="pageNumber"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
    <span class="demonstration" style="float: right; margin-top: 20px; line-height: 36px;">共{{total}}条</span>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  props: {
    selectData: {
      type: Object
    },
    isUpdate: {
      type: Boolean
    },
    isDownLoad: {
      type: Boolean
    }
  },
  data () {
    return {
      moment: '',
      tableData: [],
      tableTitle: [{ key: '机构', value: 'orgName' }, { key: 'IC卡线路', value: 'icLineName' }, { key: '线路', value: 'lineName' }, { key: '车辆', value: 'busPlateNumber' }, { key: '刷卡时间', value: 'uploadTime' }, { key: '卡号', value: 'icCardUuid' }, { key: '卡类型', value: 'icCardType' }],
      total: 0,
      pageNumber: 1,
      pageSize: 15,
      downLoadData: [],
      loading: true,
      isDisabled: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted () {
    this.loading = false
    this.isDisabled = false
    this.moment = moment
  },
  watch: {
    isUpdate () {
      if (this.isUpdate) {
        this.pageNumber = 1
        this.selectData.pageNumber = this.pageNumber
        this.selectData.pageSize = 15
        this._passengerFlow({
          orgUuid: this.selectData.orgId === '1' ? '' : this.selectData.orgId,
          lineUuid: this.selectData.lineId,
          busSelfCode: this.selectData.busSelfNumber,
          busPlateNumber: this.selectData.busNumber,
          lineType: this.selectData.lineType,
          sTime: this.selectData.startTime,
          eTime: this.selectData.endTime,
          pageSize: this.selectData.pageSize,
          pageNumber: this.selectData.pageNumber
        }, this.selectData.radio)
        this.$emit('isUpdateTo')
      }
    },
    isDownLoad () {
      if (this.isDownLoad) {
        this.selectData.pageNumber = 1
        this.selectData.pageSize = 10000
        this.downLoadList(this.selectData)
        this.$emit('isDownLoadTo')
      }
    }
  },
  methods: {
    _passengerFlow (params, type) {
      this.loading = true
      this.isDisabled = true
      if (type === '1') {
        this.tableTitle = [{ key: '机构', value: 'orgName' }, { key: 'IC卡线路', value: 'icLineName' }, { key: '线路', value: 'lineName' }, { key: '车辆自编号', value: 'busSelfCode' }, { key: '车辆', value: 'busPlateNumber' }, { key: '刷卡时间', value: 'uploadTime' }, { key: '卡号', value: 'icCardUuid' }, { key: '卡类型', value: 'icCardType' }]
        this.$api['passengerFlow.todayList'](params).then(res => {
          this.tableData = res.list
          this.total = res.total
          this.$message.success('数据已更新')
          this.loading = false
          this.isDisabled = false
        }).catch((error) => {
          this.$message.error(error.message)
          this.loading = false
          this.isDisabled = false
        })
      } else {
        this.tableTitle = [{ key: '机构', value: 'orgName' }, { key: 'IC卡线路', value: 'icLineName' }, { key: '线路', value: 'lineName' }, { key: '车辆', value: 'busPlateNumber' }, { key: '方向', value: 'lineType' }, { key: '站序', value: 'staSequence' }, { key: '站点名称', value: 'staName' }, { key: '卡号', value: 'icCardUuid' }, { key: '卡类型', value: 'icCardType' }, { key: '刷卡时间', value: 'uploadTime' }]
        this.$api['passengerFlow.list'](params).then(res => {
          this.tableData = res.list
          this.total = res.total
          this.$message.success('数据已更新')
          this.loading = false
          this.isDisabled = false
        }).catch((error) => {
          this.$message.error(error.message)
          this.loading = false
          this.isDisabled = false
        })
      }
    },
    downLoadList (params) {
      this.$emit('getData', [], 0)
      this.$api['passengerFlow.list'](params).then(res => {
        res.list.forEach((item, index) => {
          item.pfrUploadTime = moment(item.pfrUploadTime).format('YYYY-MM-DD HH:mm:ss')
          this.downLoadData[index] = {
            '机构名称': item.orgName,
            '线路': item.pfrLineName,
            '车辆': item.prfBusPlateNumber,
            '方向': item.pfrLineType === 1 ? '上行' : '下行',
            '站序': item.pfrStationSeq,
            '站点名称': item.pfrStationName,
            '趟次': item.pfrTripTime,
            '客流时间': item.pfrUploadTime,
            '车内人数': item.prfGetPersonCount,
            '上车人数': item.pfrGetOnNumber,
            '下车人数': item.pfrGetOffNumber,
            '前门上车人数': item.prfGetFOnNumber,
            '前门下车人数': item.prfGetFOffNumber,
            '后门上车人数': item.prfGetEOnNumber,
            '后门下车人数': item.prfGetEOffNumber
          }
        })
        if (this.total > 0) {
          this.$emit('getData', this.downLoadData, this.total)
        } else {
          this.$message.warning('暂无数据，无法导出')
        }
        // this.$message.success('数据已更新')
      })
    },
    handleCurrentChange (val) {
      this.selectData.pageNumber = val
      this.selectData.pageSize = 15
      this.pageNumber = val
      this._passengerFlow({
        orgUuid: this.selectData.orgId === '1' ? '' : this.selectData.orgId,
        lineUuid: this.selectData.lineId,
        busPlateNumber: this.selectData.busNumber,
        busSelfCode: this.selectData.busSelfNumber,
        lineType: this.selectData.lineType,
        sTime: this.selectData.startTime,
        eTime: this.selectData.endTime,
        pageSize: this.selectData.pageSize,
        pageNumber: this.selectData.pageNumber
      }, this.selectData.radio)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  margin-top: 20px;
  padding: 20px 20px;
  box-sizing: border-box;
}
</style>
