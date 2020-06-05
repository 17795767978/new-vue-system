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
        <i class="el-icon-s-home" style="display: block; font-size: 1.5vw;text-align: center;color: #0371cc"></i>
        <span style="display: block; font-size: .7vw;text-align: center; color: #0371cc">全部（{{totalDatas.deviceCount}}）</span>
      </el-col>
      <el-col :span="8">
        <i class="el-icon-success" style="display: block; font-size: 1.5vw;text-align: center;color:#1edf62"></i>
        <span style="display: block; font-size: .7vw;text-align: center">在线（{{totalDatas.onlineDeviceCount}}）</span>
      </el-col>
      <el-col :span="8">
        <i class="el-icon-error" style="display: block; font-size: 1.5vw;text-align: center"></i>
        <span style="display: block; font-size: .7vw;text-align: center">离线（{{totalDatas.deviceCount - totalDatas.onlineDeviceCount || 0}}）</span>
      </el-col>
    </el-row>
    <div style="overflow-y: auto; height: 80vh;width: 100%;">
      <el-tree
        :data="busTree"
        accordion
        ref="busTree"
        show-checkbox
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
export default {
  props: {},
  data () {
    return {
      drawer: true,
      totalDatas: {},
      busTree: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  mounted () {
    this._getbusTree({
      orgId: ''
    })
  },
  watch: {
    drawer (newV) {
      if (newV) {
      }
    }
  },
  methods: {
    closeDrawer () {
      this.drawer = false
    },
    handleClose () {
    },
    renderContent (h, { node, data, store }) {
      return (<span style={data.busStatus === '1' ? { fontSize: '14px', color: '#3cb32f' } : { fontSize: '14px' }} class="selling-category">{node.label}</span>)
    },
    _getbusTree (params) {
      this.$api['wholeInformation.getbusTree'](params).then(res => {
        this.totalDatas = res.onlines
        // 总公司
        this.busTree = res.list.filter(item => item.pId === '')
        // 分公司
        this.getComData(this.busTree[0].id, res.list)
      })
    },
    getComData (id, data) {
      this.busTree[0].children = data.filter(item => item.pId === id)
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
