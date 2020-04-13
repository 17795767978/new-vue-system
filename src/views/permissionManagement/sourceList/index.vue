<template>
<<<<<<< HEAD
  <div class="wrapper">
    <div class="search">
      <el-button type="primary" @click="addModules">添加模块</el-button>
      <el-button type="primary" @click="addPages">添加页面</el-button>
    </div>
    <div class="table">
      <el-table
        :data="list"
        row-key="id"
        border
        fit
        highlight-current-row
        style="width: 100%">
        <el-table-column align="center" label="序号" type="index" width="60">
          <template slot-scope="scope">
            <span> {{scope.$index + (current - 1) * pageSize + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="资源名称" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.resourceTitle}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="资源编码" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.resourceName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="资源类型" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.resourceLevel === '1' ? '模块' : '页面'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="url" prop="resourceUrl" width="400">
        </el-table-column>
        <el-table-column align="center" label="排序"  width="80">
          <template slot-scope="scope">
            <span>{{scope.row.resourceSort}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.enabled === '1' ? '启用' : '禁用'}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="资源等级" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.resourceType}}级</span>
          </template>
        </el-table-column> -->
        <el-table-column align="center" label="创建时间" :formatter="forMatterCreateTime"  width="200">
        </el-table-column>
        <el-table-column align="center" label="更新时间" :formatter="forMatterUpdateTime"  width="200">
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.id === 1">
              -----
            </div>
            <div v-else>
              <el-button
                size="mini"
                type="primary"
                @click="handleEditAdmin(scope.row)"
              >编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        :current-page="current"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <Modules ref="modulesWrapper" :parentOptions="parentOptions" :titleMsg="titleMsg" @updateList="updateList" :moduleRowData="moduleRowData"/>
=======
  <div class="map-wrapper" v-loading="show">
    <!-- <el-button type="primary" style="position: absolute; z-index: 999; top: 1vh; left: 2vw;" @click="reset">暂停</el-button> -->
    <el-button type="primary" size="small" style="position: absolute; z-index: 999; top: 3vh; left: 2vw;" @click="go">重播</el-button>
    <baidu-map class="map" :center="path[3]" :zoom="15" :style="{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0, 0.5)'} " :ak="'7vVOlMOKr03PaWX82WajF6m'"
      :mapClick="false"
      :scroll-wheel-zoom="false"
      @click="getPoint"
      @ready="handler">
      <bm-marker style="z-index: 9999; position: absolute" v-for="(item, index) in dataTo" :position="{lng: item.lng, lat: item.lat}" :key="index"  @click="handleInfo"  :title="`${item.lng}-${item.lat}`">
      </bm-marker>
      <bm-driving :start="{
        lng: 104.654793,
        lat: 28.771449
      }" :end="{
        lng: 104.705663,
        lat: 28.802875
      }" :panel="false" :autoViewport="false"></bm-driving>
      <bml-lushu
        @stop="reset"
        :path="path"
        :icon="icon"
        :play="play"
        :speed="500"
        :content="content"
        :autoView="true"
        :rotation="true">
      </bml-lushu>
    </baidu-map>
>>>>>>> f33f6724342a112172797c499f4aa198da2d2097
  </div>
</template>

<script>
<<<<<<< HEAD
import moment from 'moment'
import { mapGetters } from 'vuex'
import Modules from './Components/modules.vue'
export default {
  name: 'sourceList',
  data () {
    return {
      form: {
        name: ''
      },
      list: [],
      current: 1,
      total: 0,
      parentOptions: [],
      pageSize: 10,
      titleMsg: '',
      moduleRowData: {}
    }
  },
  components: {
    Modules
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
    this.getSourceList({
      // orgId: this.userId === '1' ? '' : this.userId,
      pageSize: 10000,
      pageNumber: 1
    })
  },
  watch: {
  },
  methods: {
    getSourceList (params) {
      this.parentOptions = []
      this.$api['resource.list'](params).then(res => {
        let list = res.list.filter(item => item.enabled === '1')
        this.allList = res.list
        this.list = this.allList.slice(0, 10)
        this.total = this.allList.length
        this.getParentList(list)
      })
    },
    handleCurrentChange (val) {
      this.current = val
      this.list = this.allList.slice((this.current - 1) * 10, this.current * 10)
    },
    addModules () {
      this.titleMsg = '新增模块'
      this.$refs.modulesWrapper.dialogVisible = true
      setTimeout(() => {
        this.$refs.modulesWrapper.$refs['adminForm'].resetFields()
      }, 20)
    },
    addPages () {},
    updateList () {
      this.getSourceList({
      // orgId: this.userId === '1' ? '' : this.userId,
        pageSize: 10000,
        pageNumber: 1
      })
    },
    // clearForm () {
    //   this.moduleRowData = {}
    // },
    handleChangeTabs (tab, event) {},
    getParentList (roles) {
      roles.forEach(item => {
        if (item.resourceLevel === '1') {
          this.parentOptions.push({
            label: item.resourceTitle,
            value: item.resourceId
          })
        }
      })
    },
    forMatterCreateTime (row) {
      return moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    forMatterUpdateTime (row) {
      return moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleEditAdmin (row) {
      if (row.resourceLevel === '1') {
        console.log(row)
        this.moduleRowData = JSON.parse(JSON.stringify(row))
        this.titleMsg = '编辑模块'
        this.$refs.modulesWrapper.dialogVisible = true
        setTimeout(() => {
          this.$refs.modulesWrapper.$refs['adminForm'].resetFields()
        }, 20)
      } else {
        this.$message.warning('页面还没开发')
      }
=======
import { BaiduMap, BmlLushu, BmDriving, BmMarker } from 'vue-baidu-map'
import { setTimeout } from 'timers'
export default {
  components: {
    BaiduMap,
    BmlLushu,
    BmDriving,
    BmMarker
  },
  data () {
    return {
      address: '',
      show: true,
      content: '123',
      play: true,
      dataTo: [
        {
          lng: 104.654793,
          lat: 28.771449,
          bShow: false,
          html: `<div>123</div>`,
          pauseTime: 500
        },
        {
          lng: 104.653123,
          lat: 28.7654,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 10,
          bShow: false
        },
        {
          lng: 104.666257,
          lat: 28.774314,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.674613,
          lat: 28.781925,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.684964,
          lat: 28.791632,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.700523,
          lat: 28.796219,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.705989,
          lat: 28.797774,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.705663,
          lat: 28.802875,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        }
      ],
      path: [],
      kobe: [],
      icon: {
        url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
        size: { width: 50, height: 26 },
        opts: { anchor: { width: 27, height: 13 } }
      }
    }
  },
  mounted () {
    this.show = true
    setTimeout(() => {
      this.show = false
      this.path = [
        {
          lng: 104.654793,
          lat: 28.771449,
          bShow: false,
          html: `<div>123</div>`,
          pauseTime: 500
        },
        {
          lng: 104.653123,
          lat: 28.7654,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 10,
          bShow: false
        },
        {
          lng: 104.666257,
          lat: 28.774314,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.674613,
          lat: 28.781925,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.684964,
          lat: 28.791632,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.700523,
          lat: 28.796219,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.705989,
          lat: 28.797774,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        },
        {
          lng: 104.705663,
          lat: 28.802875,
          value: '123',
          html: `<div>123</div>`,
          pauseTime: 5,
          bShow: false
        }
      ]
    }, 1000)
  },
  methods: {
    handler ({ BMap, map }) {
      this.zoom = 18
      this.geocoder = new BMap.Geocoder()
      // this.center = this.center
    },
    reset () {
      this.play = false
    },
    getPoint (e) {
      if (!this.isErrorPosition) {
        this.geocoder.getLocation(e.point, res => {
          this.address = res.address
          // console.log(this.address)
        })
      } else {
        this.address = ''
      }
    },
    go () {
      this.play = true
    },
    handleInfo (e) {
      console.log(event)
      if (!this.isErrorPosition) {
        this.geocoder.getLocation(e.point, res => {
          this.address = res.address
          console.log(this.address)
        })
      } else {
        this.address = ''
      }
      // this.$notify({
      //   title: item.lng,
      //   message: item.lat,
      //   duration: 0
      // })
>>>>>>> f33f6724342a112172797c499f4aa198da2d2097
    }
  }
}
</script>

<style scoped lang="scss">
.map-wrapper {
  width: 100%;
  height: 100%;
  .map {
    width: 100%;
    height: 100%;
  }
  .pagination {
    margin-top: 20px;
    float: right;
  }
}
</style>
