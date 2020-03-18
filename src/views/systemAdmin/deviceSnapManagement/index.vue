<template>
  <div class="device-snap-management">
    <div class="select-type-card">
      <el-button-group>
        <el-button size="small" icon="el-icon-user" @click="takePhoto">主动抓拍</el-button>
        <el-button size="small" icon="el-icon-circle-plus-outline"  @click="handleAdd">增加</el-button>
      </el-button-group>
    </div>
    <Search
      :isOrg='true'
      :isLine="true"
      :isBus="true"
      :isDateTo="true"
      :isEmpty="true"
      :isSelfCode="true"
      :isDeviceCode="true"
      @configCheck="getSearch" />
      <div class="table-style">
        <Table :selectData="selectData"/>
      </div>
      <Dialog :device="device"/>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm'
import Table from './Components/table'
import Dialog from './Components/dialog'
export default {
  name: 'deviceSnapManagement',
  data () {
    return {
      selectData: {},
      downLoadName: 'downLoad.getDrivingBehaviorDayExport',
      device: {}
    }
  },
  methods: {
    getSearch (data) {
      console.log(data)
      this.selectData = data
    },
    takePhoto () {
      console.log(this.$children)
      this.$children[3].deviceShow = true
      this.device = {
        type: '主动抓拍'
      }
    },
    handleAdd () {
      this.$children[3].deviceShow = true
      this.device = {
        type: '增加'
      }
    }
  },
  components: {
    Search,
    Table,
    Dialog
  }
}
</script>

<style lang="scss" scoped>
.device-snap-management {
  .table-style {
    width: 100%;
    padding: 3vh 2vw;
    box-sizing: border-box;
  }
  .select-type-card {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
