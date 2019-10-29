<template>
  <div>
    <Search
      :isOrgSec='true'
      :isLineSec="true"
      :isBus="false"
      :isTime="false"
      :isTurn="true"
      :isMonth="false"
      :isDataCurrent="true"
      :isEmpty="true"
      :isDownload="true"
      :isWarntype="false"
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
import Echarts from './Components/echarts'
import Immutable from 'immutable'
export default {
  name: 'lineOD',
  data () {
    return {
      selectData: {},
      echartsData: {},
      activeName: 'first'
    }
  },
  methods: {
    getSearch (data) {
      console.log(data)
      this.activeName = 'first'
      this.selectData = data
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
    height: 50%;
    border-bottom: 1px solid #EBEEF5;
    box-sizing: border-box;
  }
}
</style>
