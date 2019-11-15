<template>
  <div class="dashboard-container cont-container">
    <el-row>
      <span class="main-title">公交综合运营监控分析系统</span>
    </el-row>
    <el-row class="main-card" :gutter="50">
      <el-col style="margin-left: 50px;" :span="4">
        <h3 style="font-size: 20px;">实时综合运营监控</h3>
        <div class="tab-con" :class="isScreen ? '' : 'tab-con-dis'" @click="goToContral()">
        </div>
      </el-col>
      <el-col :span="6" v-if="operationAnalysis.some(item => item.admin)">
        <h3 style="font-size: 20px;">运营分析</h3>
        <div class="tab-ans">
          <ul class="item-fam">
            <li class="item-font" :class="item.admin ? '' : 'item-font-dis'" v-for="(item, index) in operationAnalysis" :key="index" @click="goToChart(item)">
              <div class="inside-font" v-if="item.admin">
                <img :src="item.icon" width="30" height="30" class="img-font"/>
              </div>
              <p v-if="item.admin" style="text-align: center; font-size: 0.7vw;">{{item.name}}</p>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="6" v-if="tiredContral.some(item => item.admin)">
        <h3 style="font-size: 20px;">安全运营监控</h3>
        <div class="tab-ans">
          <ul class="item-fam">
            <li class="item-font"  :class="item.admin ? '' : 'item-font-dis'" v-for="(item, index) in tiredContral" :key="index" @click="goToAlarm(item)">
              <div class="inside-font" v-if="item.admin">
                <img :src="item.icon" width="30" height="30" class="img-font"/>
              </div>
              <p v-if="item.admin" style="text-align: center; font-size: 0.7vw;">{{item.name}}</p>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="6" v-if="lineNets.some(item => item.admin)">
        <h3 style="font-size: 20px;">线网评价</h3>
        <div class="tab-ans">
          <ul class="item-fam">
            <li class="item-font"  :class="item.admin ? '' : 'item-font-dis'" v-for="(item, index) in lineNets" :key="index" @click="goToLineNets(item)">
              <div class="inside-font" v-if="item.admin">
                <img :src="item.icon" width="30" height="30" class="img-font"/>
              </div>
              <p v-if="item.admin" style="text-align: center; font-size: 0.7vw;">{{item.name}}</p>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iconHomeKlfx from '../../assets/images/homeIcon/klfx.png'
import iconHomeFctc from '../../assets/images/homeIcon/fctc.png'
import iconHomeMzl from '../../assets/images/homeIcon/mzl.png'
import iconHomeXlzd from '../../assets/images/homeIcon/xlzd.png'
import iconHomeYlyl from '../../assets/images/homeIcon/ylyl.png'
import iconHomeKlgf from '../../assets/images/homeIcon/klgf.png'
import iconHomeYxsj from '../../assets/images/homeIcon/yxsj.png'
import iconHomeBjfx from '../../assets/images/homeIcon/bjfx.png'
import iconHomeBjlx from '../../assets/images/homeIcon/bjlx.png'
import iconHomeBjzx from '../../assets/images/homeIcon/bjzx.png'
import iconHomeBjzt from '../../assets/images/homeIcon/bjzt.png'
const PER_ANA = [
  { name: '客流首页', icon: iconHomeYlyl, path: '/passenger-home', admin: false },
  { name: '客流实时统计', icon: iconHomeKlfx, path: '/realtime-passenger-flow', admin: false },
  { name: '线路站间运行时间分析', icon: iconHomeYxsj, path: '/runtime-analysis', admin: false },
  { name: '客流数据查询', icon: iconHomeMzl, path: '/search-passenger', admin: false },
  { name: '客流高峰时刻分析', icon: iconHomeKlfx, path: '/timeTable-analysis', admin: false },
  { name: '车辆发车趟次时序图', icon: iconHomeFctc, path: '/trip-order', admin: false },
  { name: '区间满载率查询', icon: iconHomeMzl, path: '/full-load-rate', admin: false },
  { name: '线路站点登降量查询', icon: iconHomeXlzd, path: '/landing-volume', admin: false },
  { name: '客流运力运量分析', icon: iconHomeYlyl, path: '/passenger-transport-capacity', admin: false },
  { name: '线路客流高峰断面分析', icon: iconHomeKlgf, path: '/section-analysis', admin: false }
]
const TIRED_CONTRAL = [
  { name: '安全运营首页', icon: iconHomeBjzx, path: '/alarm-home', admin: false },
  { name: '司机排行分析', icon: iconHomeBjzt, path: '/alarm-drive', admin: false },
  { name: '报警类型分析', icon: iconHomeBjfx, path: '/alarm-type', admin: false },
  { name: '报警速度分析', icon: iconHomeBjlx, path: '/alarm-speed', admin: false },
  { name: '驾驶行为监测', icon: iconHomeBjzx, path: '/alarm-center', admin: false },
  { name: '设备状态', icon: iconHomeBjzt, path: '/device-status', admin: false },
  { name: '报警分析', icon: iconHomeBjfx, path: '/alarm-analysis', admin: false },
  { name: '报警类型管理', icon: iconHomeBjlx, path: '/alarm-management', admin: false }
]

const LINE_NET = [
  { name: '数据总览页', icon: iconHomeYlyl, path: '/data-overview-page', admin: false },
  { name: '线路情况', icon: iconHomeKlfx, path: '/line-condition', admin: false },
  { name: '重复度指标', icon: iconHomeYxsj, path: '/repeatability-index', admin: false },
  { name: '重复度指标详情', icon: iconHomeMzl, path: '/repeatability-detail', admin: false },
  { name: '数据综合查询', icon: iconHomeMzl, path: '/comprehensive-query', admin: false },
  { name: '线网评分', icon: iconHomeMzl, path: '/line-network-core', admin: false },
  { name: '线网评分详情', icon: iconHomeMzl, path: '/line-netWork-core-Detail', admin: false },
  { name: '线路OD', icon: iconHomeMzl, path: '/line-od', admin: false }
]
// const LINE_NET = []
export default {
  name: 'Homepage',
  data () {
    return {
      operationAnalysis: [],
      simple: [],
      tiredContral: [],
      lineNets: [],
      rolesTem: [],
      isScreen: false,
      isScreenTo: []
    }
  },
  components: {
  },
  computed: {
  },
  mounted () {
    let roles = this.$store.getters.roles
    this.isScreen = roles.some(role => role.path.indexOf('/chart-analysis') > -1)
    this.isScreenTo = roles.filter(role => role.title === '运营监控')
    if (roles !== 'error') {
      this.getRoles(roles)
      this.checkRoles()
    } else {
      window.location.reload()
      this.$store.dispatch('userLogout')
    }
  },
  methods: {
    getRoles (roles) {
      let roleData = []
      function filterRoles (roles) {
        roles.forEach(role => {
          role.roles.forEach(i => {
            roleData.push(i)
          })
          if (role.children && role.children.length > 0) {
            filterRoles(role.children)
          }
        })
      }
      filterRoles(roles)
      this.rolesTem = roleData
    },
    checkRoles () {
      let anaPer = PER_ANA
      let lines = LINE_NET
      let tired = TIRED_CONTRAL
      anaPer.forEach(item => {
        let isPer = this.rolesTem.some(role => item.path === role)
        if (isPer) {
          item.admin = true
        } else {
          item.admin = false
        }
      })
      lines.forEach(item => {
        let isSimple = this.rolesTem.some(role => item.path === role)
        if (isSimple) {
          item.admin = true
        } else {
          item.admin = false
        }
      })
      tired.forEach(item => {
        let isPer = this.rolesTem.some(role => item.path === role)
        if (isPer) {
          item.admin = true
        } else {
          item.admin = false
        }
      })
      this.operationAnalysis = anaPer
      this.lineNets = lines
      this.tiredContral = tired
    },
    goToContral () {
      // if (this.isScreen) {
      //   let path = this.isScreenTo[0].children[0].path
      //   this.$router.push(`/chart-analysis${path}`)
      // } else {
      //   this.$message.warning('权限不足，无法进入此页面')
      // }
      this.$router.push(`/newBigScreen/newBigScreen-analysis`)
    },
    goToChart (e) {
      if (e.admin) {
        let path = `/operation-analysis${e.path}`
        this.$router.push(path)
      } else {
        this.$message.warning('权限不足，无法进入此页面')
      }
    },
    goToAlarm (e) {
      if (e.admin) {
        let path = `/fatigue-monitoring${e.path}`
        this.$router.push(path)
      } else {
        this.$message.warning('权限不足，无法进入此页面')
      }
    },
    goToLineNets (e) {
      if (e.admin) {
        let path = `/data-analysis${e.path}`
        this.$router.push(path)
      } else {
        this.$message.warning('权限不足，无法进入此页面')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container  {
  padding: 20px;
  box-sizing: border-box;
  .main-title {
    margin-top: 50px;
    font-size: 30px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-weight: bold;
    margin-bottom: 50px;
    margin-left: 50px;
    display: block;
  }
  .main-card {
    .tab-con {
      width: 100%;
      min-height: 25vh;
      background-image: url(../../assets/images/yunying.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: #fff;
      background-color: #4fa3e4;
      border-radius: 12px;
    }
    .tab-con:hover {
      background-color: #2089db;
      transform: scale(0.99)
    }
    .tab-con-dis {
      background-color: #999 !important
    }
    .tab-ans {
      width: 100%;
      color: #fff;
      .item-fam {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item-font {
          width: 32%;
          height: 15vh;
          background-color:  #4fa3e4;
          margin-bottom: 8px;
          border-radius: 6px;
          display: block;
          .inside-font {
            width: 100%;
            height: 8vh;
            position:relative;
            .img-font {
              position: absolute;
              top: 50%;
              left: 50%;
              margin-left: -15px;
              margin-top: 10px;
            }
          }
        }
        .item-font-dis {
          display: none;
        }
        .item-font:hover{
          background-color: #2089db;
          transform: scale(0.96)
        }
        .item-font-dis:hover {
          background-color: #666;
          transform: scale(0.96)
        }
      }
      .simple-font {
        width: 100%;
        height: 118px;
        background-color:  #4fa3e4;
        border-radius: 6px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .simple-inside-font {
          width: 49%;
          height: 60px;
          position:relative;
          .simple-img-font {
            position: absolute;
            // left: 50%;
            margin-left: -20px;
            margin-top: 20px;
          }
        }
      }
      .simple-font-dis {
        background-color: #999 !important
      }
      .simple-font:hover {
        background-color: #2089db;
        transform: scale(0.97)
      }
      .simple-font-dis:hover {
        background-color: #666;
        transform: scale(0.97)
      }
    }
    .tab-contral {
      width: 100%;
      color: #fff;
      .item-fam {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item-font {
          width: 32%;
          height: 15vh;
          background-color:  #4fa3e4;
          margin-bottom: 8px;
          border-radius: 6px;
          .inside-font {
            width: 100%;
            height: 120px;
            position:relative;
            .img-font {
              position: absolute;
              top: 50%;
              left: 50%;
              margin-left: -20px;
              margin-top: 10px;
            }
          }
        }
        .item-font-dis {
          background-color: #999 !important
        }
        .item-font:hover {
          background-color: #2089db;
          transform: scale(0.97)
        }
        .item-font-dis:hover {
          background-color: #666;
          transform: scale(0.96)
        }
      }
    }
  }
}
</style>
