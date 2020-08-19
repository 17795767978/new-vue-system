<template>
<div class="wrapper">
  <el-drawer
    title=""
    :visible.sync="drawer"
    :direction="'rtl'"
    :modal="false"
    :with-header="false"
    size="100%"
    :before-close="handleClose">
    <i class="el-icon-close" style="display: inline-block; margin-left: 85%;font-size: 1.5vw; margin-top: .5vh" @click="closeDrawer"></i>
    <el-row style="padding: .5vh 1vw;" :gutter="12">
      <el-col :span="8">
        <i class="el-icon-s-home" style="display: block; font-size: 1.5vw;text-align: center;color: #0371cc" @click="busSelect('all')"></i>
        <span style="display: block; font-size: .7vw;text-align: center; color: #0371cc">全部（{{totalDatas.deviceCount}}）</span>
      </el-col>
      <el-col :span="8">
        <i class="el-icon-success" style="display: block; font-size: 1.5vw;text-align: center;color:#1edf62" @click="busSelect('online')"></i>
        <span style="display: block; font-size: .7vw;text-align: center">在线（{{totalDatas.onlineDeviceCount}}）</span>
      </el-col>
      <el-col :span="8">
        <i class="el-icon-error" style="display: block; font-size: 1.5vw;text-align: center" @click="busSelect('outline')"></i>
        <span style="display: block; font-size: .7vw;text-align: center">离线（{{totalDatas.deviceCount - totalDatas.onlineDeviceCount || 0}}）</span>
      </el-col>
    </el-row>
    <el-input
      style="width: 90%;margin: 1vh auto; display: block"
      size="mini"
      placeholder="请输入车牌号"
      v-model="filterText">
    </el-input>
    <div style="overflow-y: auto; height: 70vh;width: 95%;margin: 0 auto;position: relative" v-loading="loading">
      <span style="position: absolute; z-index: 999; top: .4vh; right: 1vw;font-size: 14px; color: '#3cb32f'">{{status}}</span>
      <el-tree
        :data="busTree"
        accordion
        ref="busTree"
        show-checkbox
        :filter-node-method="filterNode"
        :render-content="renderContent"
        node-key="id"
        @check-change="getChecked"
        :props="defaultProps">
      </el-tree>
    </div>
  </el-drawer>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import outlineIcon from '../../../../../assets/images/outline.png'
import onlineIcon from '../../../../../assets/images/online.png'
export default {
  props: {},
  data () {
    return {
      loading: false,
      drawer: true,
      totalDatas: {},
      totalBus: [],
      busTree: [],
      filterText: '',
      status: '全部',
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted () {
    this._getbusTree({
      orgId: this.userId
    }, 'all')
  },
  watch: {
    drawer (newV) {
      if (newV) {
      }
    },
    filterText (newV) {
      if (newV.length > 3) {
        this.$refs.busTree.filter(newV)
      } else {
        this.$refs.busTree.filter('')
      }
    }
  },
  methods: {
    busSelect (type) {
      this.loading = true
      // 总公司
      const topCom = this.totalBus.filter(item => item.pId === '')
      // 分公司
      const fetchCom = this.totalBus.filter(item => item.levelsType === '1')
      // 线路
      const lines = this.totalBus.filter(item => item.levelsType === '2')
      // 车辆
      const busData = this.totalBus.filter(item => item.levelsType === '3')
      if (type === 'all') {
        this.status = '全部'
        const datas = this.totalBus
        this.getTopData(datas, busData.length - 1)
      } else if (type === 'online') {
        this.status = '在线'
        let onlineCom = []
        let onlineLines = []
        let onlineBus = []
        let busPids = []
        let linePids = []
        // 在线车辆
        onlineBus = busData.filter(item => item.busStatus === '1')
        // 车辆父级ID去重
        busPids = Array.from(new Set(onlineBus.map(item => item.pId)))
        // 在线线路
        lines.forEach(item => {
          busPids.forEach(val => {
            if (val === item.id) {
              onlineLines.push(item)
            }
          })
        })
        // 线路去重
        linePids = Array.from(new Set(onlineLines.map(item => item.pId)))
        // 在线分公司
        fetchCom.forEach(item => {
          linePids.forEach(val => {
            if (val === item.id) {
              onlineCom.push(item)
            }
          })
        })
        this.getTopData([...topCom, ...onlineCom, ...onlineLines, ...onlineBus])
      } else {
        this.status = '离线'
        let outlineCom = []
        let outlineLines = []
        let outlineBus = []
        let busPids = []
        let linePids = []
        // 离线车辆
        outlineBus = busData.filter(item => item.busStatus === '0')
        // 车辆父级ID去重
        busPids = Array.from(new Set(outlineBus.map(item => item.pId)))
        // 离线线路
        lines.forEach(item => {
          busPids.forEach(val => {
            if (val === item.id) {
              outlineLines.push(item)
            }
          })
        })
        // 线路去重
        linePids = Array.from(new Set(outlineLines.map(item => item.pId)))
        // 离线分公司
        fetchCom.forEach(item => {
          linePids.forEach(val => {
            if (val === item.id) {
              outlineCom.push(item)
            }
          })
        })
        this.getTopData([...topCom, ...outlineCom, ...outlineLines, ...outlineBus])
      }
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    filterNode (value, data) {
      if (!value) return true
      if (value.length > 3) {
        return data.name.indexOf(value) !== -1
      } else {
        return data.name.indexOf('') !== -1
      }
    },
    closeDrawer () {
      this.drawer = false
    },
    handleClose () {
    },
    renderContent (h, { node, data, store }) {
      if (data.levelsType === '1' || data.levelsType === '0') {
        return (<span style={data.busStatus === '1' ? { fontSize: '14px', color: '#3cb32f' } : { fontSize: '14px' }} class="selling-category">
          {node.label}
        </span>)
      } else if (data.levelsType === '2') {
        return (<span style={data.busStatus === '1' ? { fontSize: '14px', color: '#3cb32f' } : { fontSize: '14px' }} class="selling-category">
          {node.label}
          ({data.number})
        </span>)
      } else if (data.levelsType === '3' && data.busStatus === '1') {
        return (<span style={data.busStatus === '1' ? { fontSize: '14px', color: '#3cb32f' } : { fontSize: '14px' }} class="selling-category">
          <img style={{ marginTop: '5px' }} src={onlineIcon} />
          {node.label}
        </span>)
      } else if (data.levelsType === '3' && data.busStatus === '0') {
        return (<span style={data.busStatus === '1' ? { fontSize: '14px', color: '#3cb32f' } : { fontSize: '14px' }} class="selling-category">
          <img style={{ marginTop: '5px' }} src={outlineIcon} />
          {node.label}
        </span>)
      }
    },
    _getbusTree (params) {
      this.status = '全部'
      this.loading = true
      this.$api['wholeInformation.getbusTree'](params).then(res => {
        this.loading = false
        this.totalDatas = res.onlines
        this.totalBus = res.list
        this.getTopData(res.list)
      })
    },
    getTopData (data, num) {
      // 总公司
      this.busTree = data.filter(item => item.pId === '')
      this.busTree[0].disabled = true
      this.busTree[0].number = num
      // 分公司
      this.getComData(this.busTree[0].id, data)
    },
    getComData (id, data) {
      if (this.userId === '1') {
        this.busTree[0].children = data.filter(item => item.pId === id)
      } else {
        this.busTree[0].children = data.filter(item => item.pId === id && item.id === this.userId)
      }
      // 线路处理
      this.getLineData(data)
    },
    getLineData (data) {
      this.busTree[0].children.forEach(item => {
        item.children = data.filter(itms => itms.pId === item.id)
        // 车辆处理
        this.getBusData(item.children, data)
      })
    },
    getBusData (child, data) {
      child.forEach(item => {
        item.children = data.filter(its => its.pId === item.id)
        item.number = item.children.length
      })
    },
    getChecked () {
      this.$emit('getPoint', this.$refs.busTree.getCheckedNodes())
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  width: 15%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  /deep/ .el-drawer__wrapper {
    position: absolute;
    z-index: 999;
    overflow-y: auto;
  }
}
.selling-category{
  font-size:14px;cursor:pointer;
  color:#1edf62 !important;
}
</style>
