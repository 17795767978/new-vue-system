<template>
  <div>
    <Search
      :isOrgSec='true'
      :isLineSec="true"
      :isTurn="true"
      :isEmpty="true"
      :isDataCurrent="true"
      :isDownload="activeName === 'second'"
      :isDefault="true"
      :downLoadName="downLoadName"
      @configCheck="getSearch"
    />
    <div class="content-wrapper">
      <el-tabs style="width: 100%;" v-model="activeName">
        <el-tab-pane label="OD图" name="first">
          <div class="table">
            <Echarts :selectData="selectData"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="OD表格" name="second">
          <Table :selectData="selectData"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Table from './Components/table'
import Echarts from './Components/echart'
import Immutable from 'immutable'
import mixinsTime from '@/mixins/global/'
export default {
  name: 'lineOD',
  mixins: [mixinsTime],
  data () {
    return {
      selectData: {},
      echartsData: {},
      activeName: 'first',
      downLoadName: 'downLoad.ODExport'
    }
  },
  methods: {
    getSearch (data) {
      if (data.lineLineId === '' || data.lineOrgId === '' || data.lineType === '') {
        this.$message.warning('请选择完整的查询条件')
      } else {
        this.activeName = 'first'
        this.selectData = data
      }
    }
  },
  mounted () {
    let map1 = {
      a: {
        c: 2
      },
      b: 2
    }
    let map2 = Immutable.Map(map1)
    let map3 = Immutable.Map(map1)
    Immutable.fromJS(map2)
    map2 = map2.toJS()
    console.log(Immutable.is(map3, map2))
  },
  components: {
    Search,
    Table,
    Echarts
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 100%;
  height: calc(100vh - 16vh);
  padding: 2vh 2vw;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .table {
    width: 100%;
    height: 75vh;
    box-sizing: border-box;
  }
}
</style>
