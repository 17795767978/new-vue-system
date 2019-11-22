<template>
  <div>
    <Search
      :isOrgSec='true'
      :isLineSec="true"
      :isEmpty="true"
      :queryData="queryData"
      @configCheck="getSearch"
    />
    <div class="content-wrapper">
      <div class="title">线网评分详情</div>
      <div class="content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in tabArr" :key="item" :label="item" :name="item">
          <TabTable :tableData="tabDataArr[index]"/>
        </el-tab-pane>
      </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import TabTable from './Components/tabTable'
import { mapGetters } from 'vuex'
export default {
  name: 'lineNetWorkDetail',
  data () {
    return {
      selectData: {},
      echartsData: {},
      activeName: '',
      tableArrData: [],
      apiCond: {},
      tabArr: [], // 多少分类
      tabDataArr: [], // 分类下的list组
      queryData: {}
    }
  },
  computed: {
    ...mapGetters(['formData'])
  },
  created () {
  },
  mounted () {
    // this.apiCond = {}
    if (Object.keys(this.$route.params).length > 0) {
      this.queryData = this.$route.params.data
      this.apiCond.lineOrgId = this.$route.params.data.company
      this.apiCond.lineLineId = this.$route.params.data.lineUuid
    } else {
      this.apiCond = {
        lineOrgId: '',
        lineLineId: ''
      }
    }
    this._getNetIndexDeaData({
      company: this.apiCond.lineOrgId,
      lineID: this.apiCond.lineLineId
    })
  },
  activated () {
    if (this.$route.params.data) {
      this.queryData = this.$route.params.data
      this.apiCond = this.$route.params.data
      this._getNetIndexDeaData({
        company: this.apiCond.company,
        lineID: this.apiCond.lineUuid
      })
    }
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        let lineArr = newV.lineLineId.split('+')
        this.apiCond = newV
        this.apiCond.lineLineId = lineArr[0]
        this._getNetIndexDeaData({
          company: this.apiCond.lineOrgId,
          lineID: this.apiCond.lineLineId
        })
      }
    }
  },
  methods: {
    _getNetIndexDeaData (params) {
      this.$api['lineNet.getNetIndexDeaData'](params).then(res => {
        this.tabArr = res.typeNameList
        this.activeName = this.tabArr[0]
        this.tabDataArr = res.valueList
      })
    },
    getSearch (data) {
      this.selectData = data
    },
    handleClick (tab, event) {
      console.log(tab)
      console.log(event)
    }
  },
  components: {
    Search,
    TabTable
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 100%;
  height: calc(100vh - 16vh);
  padding: 0vh 2vw;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .title {
    width: 100%;
    height: 4vh;
    line-height: 4vh;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    border-bottom: 2px solid #E4E7ED;
    box-sizing: border-box;
  }
  .content {
    width: 100%;
    height: calc(100vh - 22vh)
  }
}
</style>
