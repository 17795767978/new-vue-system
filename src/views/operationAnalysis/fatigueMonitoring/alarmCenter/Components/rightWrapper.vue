<template>
  <div class="right-search-wrapper">
    <div class="top-search">
      <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
        <el-form-item label="设备编号">
          <el-input v-model="formInline.devCode" placeholder="请输设备编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="formInline.busPlateNumber" placeholder="请输车牌号" clearable></el-input>
        </el-form-item>
        <el-form-item label="自编号">
          <el-input v-model="formInline.busSelfCode" placeholder="请输自编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="报警级别">
          <el-select v-model="formInline.warnLevel" placeholder="请选择">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报警类型">
          <el-select v-model="formInline.warnTypeId" multiple collapse-tags placeholder="请选择">
            <el-option
              v-for="item in warnOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择时间">
          <el-date-picker
            v-model="formInline.timeValue"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="warning" @click="onClear">重置</el-button>
          <el-button type="success" @click="onSave">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <hr style="border: 1px solid #eee; margin-bottom: 20px;" />
    <div class="content">
      <el-table
        :data="tableData"
        stripe
        border
        height="580"
        v-loading="loading"
        size="mini"
        style="width: 100%">
        <el-table-column
          align="center"
          type="index"
          label="序列"
          width="60">
          <template slot-scope="scope">
            <span> {{scope.$index + (pageNum - 1) * pageSize + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orgName"
          align="center"
          label="所属公司"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="lineName"
          label="所属线路"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="busPlateNumber"
          label="车牌号"
          width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="busSelfCode"
          label="车辆自编号"
          width="150">
        </el-table-column>
        <el-table-column
          align="center"
          prop="devCode"
          label="设备编号"
          width="150">
        </el-table-column>
        <el-table-column
          align="center"
          prop="warnTypeName"
          label="报警类型"
          width="120">
        </el-table-column>
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
          prop="warnTime"
          label="报警时间"
          :formatter="formatterTime"
          >
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="mini">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          style="float: right; margin-top: 20px;"
          background
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
        <span class="demonstration" style="float: right; margin-top: 20px; line-height: 36px;">共{{total}}条</span>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>数据量可能过大，请耐心等待(如果数据量超过10000条，默认下载前10000条信息)</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <downloadExcel
          :data= "json_data"
          type="xls"
          style="display: inline-block; margin-left: 10px;"
          name= "报警中心报表.xls"
        >
        <el-button type="primary" @click="getExcel" :loading="downloadLoading">{{code}}</el-button>
        </downloadExcel>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
// import { tableList, alarmType, downLoad } from 'server/interface'
import downloadExcel from 'vue-json-excel'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  props: {
    selectCarData: {
      type: Object
    }
  },
  components: {
    downloadExcel
  },
  data () {
    return {
      formInline: {
        orgId: '',
        lineId: '',
        devCode: '',
        busPlateNumber: '',
        busUuid: '',
        busSelfCode: '',
        warnLevel: '',
        warnTypeId: [],
        timeValue: []
      },
      levelOptions: [
        {
          value: '1',
          label: 'L1'
        }, {
          value: '2',
          label: 'L2'
        }, {
          value: '3',
          label: 'L3'
        }
      ],
      warnOptions: [],
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      json_data: [],
      centerDialogVisible: false,
      loading: true,
      downloadLoading: true,
      code: '加载中'
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
    let dataNow = new Date()
    let endTime = dataNow.getTime() - 3600 * 24 * 1 * 1000
    let timeStart = moment(endTime).format('YYYY-MM-DD 00:00:00')
    let timeEnd = moment(dataNow).format('YYYY-MM-DD 23:59:59')
    setTimeout(() => {
      this.formInline.timeValue = [timeStart, timeEnd]
    }, 20)
    this._alarmType({
      warnLevel: ''
    })
    this._tableList({
      orgId: this.userId === '1' ? '' : this.userId, // 组织机构id
      lineId: this.formInline.lineId, // 线路id
      busUuid: this.formInline.busUuid, // 车辆id
      devCode: this.formInline.devCode, // 设备号
      busPlateNumber: this.formInline.busPlateNumber, // 车牌号
      busSelfCode: this.formInline.busSelfCode, // 自编号
      warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
      warnTypeId: this.formInline.warnTypeId, // 报警类型
      startTime: this.formInline.timeValue[0] || timeStart, // 时间格式   开始结束默认查近7天的
      endTime: this.formInline.timeValue[1] || timeEnd,
      pageSize: 10,
      pageNum: 1
    })
  },
  mounted () {
    let dataNow = new Date()
    let endTime = dataNow.getTime() - 3600 * 24 * 1 * 1000
    let timeStart = moment(endTime).format('YYYY-MM-DD 00:00:00')
    let timeEnd = moment(dataNow).format('YYYY-MM-DD 23:59:59')
    setTimeout(() => {
      this.formInline.timeValue = [timeStart, timeEnd]
    }, 20)
    // console.log(this.formInline);
  },
  activeted () {
  },
  watch: {
    selectCarData: {
      deep: true,
      handler (newValue) {
        // 车偏号 联动
        this.changeBusPlateNumber()
        this.formInline.timeValue.forEach(time => {
          time = moment(time).format('YYYY-MM-DD HH:mm:ss')
        })
        if (newValue.levelsType !== '0') {
          this._tableList({
            orgId: this.formInline.orgId, // 组织机构id
            lineId: this.formInline.lineId, // 线路id
            busUuid: this.formInline.busUuid, // 车辆id
            devCode: this.formInline.devCode, // 设备号
            busPlateNumber: this.formInline.busPlateNumber, // 车牌号
            busSelfCode: this.formInline.busSelfCode, // 自编号
            warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
            warnTypeId: this.formInline.warnTypeId, // 报警类型
            startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
            endTime: this.formInline.timeValue[1],
            pageSize: 10,
            pageNum: 1
          })
        }
      }
    },
    'formInline.warnLevel' () {
      // console.log(this.formInline.warnLevel);
      this._alarmType({
        warnLevel: this.formInline.warnLevel
      })
    }
  },
  methods: {
    _alarmType (params) {
      this.$api['tiredMonitoring.getWarntypes'](params).then(res => {
        let dataArr = res
        this.warnOptions = []
        this.formInline.warnTypeId = []
        dataArr.forEach((list, index) => {
          this.warnOptions[index] = {
            label: list.value,
            value: list.code
          }
        })
      })
    },
    _tableList (params) {
      this.loading = true
      this.$api['tiredMonitoring.getWarnList'](params).then(res => {
        this.tableData = res.list
        this.total = res.total
        this.loading = false
      })
    },
    // 左侧点击是否显示右侧搜索内容，0 总公司 1 公司 2 线路 3 车牌号
    changeBusPlateNumber () {
      if (this.selectCarData.levelsType === '3') {
        this.formInline.busPlateNumber = this.selectCarData.name
        this.formInline.busUuid = this.selectCarData.id
      } else if (this.selectCarData.levelsType === '2') {
        this.formInline.busPlateNumber = ''
        this.formInline.busUuid = ''
        this.formInline.orgId = ''
        this.formInline.lineId = this.selectCarData.id
      } else if (this.selectCarData.levelsType === '1') {
        this.formInline.busPlateNumber = ''
        this.formInline.busUuid = ''
        this.formInline.lineId = ''
        this.formInline.orgId = this.selectCarData.id
      } else if (this.selectCarData.levelsType === '0') {
        this.formInline.busPlateNumber = ''
        this.formInline.busUuid = ''
        this.formInline.lineId = ''
        this.formInline.orgId = this.userId === '1' ? '' : this.userId
      }
    },
    formatterTime (row) {
      return moment(row.warnTime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleCurrentChange (val) {
      this.pageNum = val
      console.log(this.userId)
      console.log(this.formInline.orgId)
      this._tableList({
        orgId: this.formInline.orgId.length > 0 ? this.formInline.orgId : '', // 组织机构id
        lineId: this.formInline.lineId, // 线路id
        busUuid: this.formInline.busUuid, // 车辆id
        devCode: this.formInline.devCode, // 设备号
        busPlateNumber: this.formInline.busPlateNumber, // 车牌号
        busSelfCode: this.formInline.busSelfCode, // 自编号
        warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: this.formInline.warnTypeId, // 报警类型
        startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
        endTime: this.formInline.timeValue[1],
        pageSize: 10,
        pageNum: this.pageNum
      })
    },
    handleClick (row) {
      sessionStorage.setItem('id', row.warnUuid)
      this.$router.push({
        name: 'alarmContent',
        query: {
          id: row.warnUuid
        }
      })
    },
    onSubmit () {
      let dateArr = []
      this.formInline.timeValue.forEach(time => {
        dateArr.push(moment(time).format('YYYY-MM-DD HH:mm:ss'))
      })
      if (this.userId !== '1') {
        this.formInline.orgId = this.userId
      }
      this.pageNum = 1
      this._tableList({
        orgId: this.formInline.orgId, // 组织机构id
        lineId: this.formInline.lineId, // 线路id
        busUuid: this.formInline.busUuid, // 车辆id
        devCode: this.formInline.devCode, // 设备号
        busPlateNumber: this.formInline.busPlateNumber, // 车牌号
        busSelfCode: this.formInline.busSelfCode, // 自编号
        warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: this.formInline.warnTypeId, // 报警类型
        startTime: dateArr[0], // 时间格式   开始结束默认查近7天的
        endTime: dateArr[1],
        pageSize: 10,
        pageNum: 1
      })
    },
    onClear () {
      let dataNow = new Date()
      let endTime = dataNow.getTime() - 3600 * 24 * 1 * 1000
      this.formInline = {
        orgId: '',
        lineId: '',
        devCode: '',
        busPlateNumber: '',
        busUuid: '',
        busSelfCode: '',
        warnLevel: '',
        warnTypeId: [],
        timeValue: [moment(endTime).format('YYYY-MM-DD 00:00:00'), moment(dataNow).format('YYYY-MM-DD 23:59:59')]
      }
      this.$emit('clear')
    },
    onSave () {
      this.$api['tiredMonitoring.getWarnList']({
        orgId: this.formInline.orgId, // 组织机构id
        lineId: this.formInline.lineId, // 线路id
        busUuid: this.formInline.busUuid, // 车辆id
        devCode: this.formInline.devCode, // 设备号
        busPlateNumber: this.formInline.busPlateNumber, // 车牌号
        busSelfCode: this.formInline.busSelfCode, // 自编号
        warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: this.formInline.warnTypeId, // 报警类型
        startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
        endTime: this.formInline.timeValue[1],
        pageSize: 10000,
        pageNum: 1
      }).then(res => {
        let excelArr = []
        res.list.forEach((item, index) => {
          item.warnTime = moment(item.warnTime).format('YYYY-MM-DD HH:mm:ss')
          excelArr[index] = {
            '所属公司': item.orgName,
            '所属线路': item.lineName,
            '车牌号': item.busPlateNumber,
            '车辆自编号': item.busSelfCode,
            '设备编号': item.devCode,
            '报警级别(级)': item.warnLevel,
            '报警类型': item.warnTypeName,
            '报警时间': item.warnTime
          }
        })
        this.json_data = excelArr
        this.downloadLoading = false
        this.code = '下载'
        this.centerDialogVisible = true
      })
    },
    getExcel () {
      this.centerDialogVisible = false
      if (this.json_data.length > 0) {
        this.$message.success('正在下载中。。。')
      } else {
        this.$message.warning('暂无数据')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.right-search-wrapper {
  width: 100%;
  padding: 20px 10px;
  box-sizing: border-box;
  max-height: 800px;
  overflow: auto;
}
</style>
