<template>
  <div class="dashboard-container cont-container">
    <el-row>
      <span class="main-title">邢台公交管理综合分析决策系统</span>
    </el-row>
    <el-row class="main-card" :gutter="50">
      <el-col style="margin-left: 50px;" :span="8">
        <h3 style="font-size: 20px;">运营监控</h3>
        <div class="tab-con" @click="goToContral()">
        </div>
      </el-col>
      <el-col :span="7">
        <h3 style="font-size: 20px;">调度运营分析</h3>
        <div class="tab-ans">
          <ul class="item-fam">
            <li class="item-font" :class="item.admin ? '' : 'item-font-dis'" v-for="(item, index) in operationAnalysis" :key="index" @click="goToChart(item)">
              <div class="inside-font">
                <img :src="item.icon" width="30" height="30" class="img-font"/>
              </div>
              <p style="text-align: center; font-size: 13px;">{{item.name}}</p>
            </li>
          </ul>
          <ul class="item-fam">
            <li class="item-font" :class="item.admin ? '' : 'simple-font-dis'" v-for="(item, index) in simple" :key="index"  @click="goToTimeAna(item)">
              <div class="inside-font">
                <img :src="item.icon" width="30" height="30" class="img-font"/>
              </div>
              <p style="text-align: center; font-size: 13px;">{{item.name}}</p>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="7">
        <h3 style="font-size: 20px;">疲劳监测</h3>
        <div class="tab-contral">
          <ul class="item-fam">
            <li class="item-font"  :class="item.admin ? '' : 'item-font-dis'" v-for="(item, index) in tiredContral" :key="index" @click="goToAlarm(item)">
              <div class="inside-font">
                <img :src="item.icon" width="40" height="40" class="img-font"/>
              </div>
              <p style="text-align: center; font-size: 13px;">{{item.name}}</p>
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
  { name: '客流高峰时刻分析', icon: iconHomeKlfx, path: '/timeTable-analysis', admin: false },
  { name: '车辆发车趟次时序图', icon: iconHomeFctc, path: '/trip-order', admin: false },
  { name: '区间满载率查询', icon: iconHomeMzl, path: '/full-load-rate', admin: false },
  { name: '线路站点登降量查询', icon: iconHomeXlzd, path: '/landing-volume', admin: false },
  { name: '客流运力运量分析', icon: iconHomeYlyl, path: '/passenger-transport-capacity', admin: false },
  { name: '线路客流高峰断面分析', icon: iconHomeKlgf, path: '/section-analysis', admin: false }
]
const SIMPLE = [
  { name: '线路站间运行时间分析', icon: iconHomeYxsj, path: '/runtime-analysis', admin: false },
  { name: '客流数据查询', icon: iconHomeYxsj, path: '/search-passenger', admin: false }
]
const TIRED_CONTRAL = [
  { name: '报警中心', icon: iconHomeBjzx, path: '/alarm-center', admin: false },
  { name: '设备状态', icon: iconHomeBjzt, path: '/device-status', admin: false },
  { name: '报警分析', icon: iconHomeBjfx, path: '/alarm-analysis', admin: false },
  { name: '报警类型管理', icon: iconHomeBjlx, path: '/alarm-management', admin: false }
]
export default {
  name: 'Homepage',
  data () {
    return {
      operationAnalysis: [],
      simple: [],
      tiredContral: [],
      rolesTem: []
    }
  },
  components: {
  },
  computed: {
  },
  mounted () {
    let roles = this.$store.getters.roles
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
      let simple = SIMPLE
      let tired = TIRED_CONTRAL
      anaPer.forEach(item => {
        let isPer = this.rolesTem.some(role => item.path === role)
        if (isPer) {
          item.admin = true
        } else {
          item.admin = false
        }
      })
      simple.forEach(item => {
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
      this.simple = simple
      this.tiredContral = tired
    },
    goToContral () {
      this.$router.push('/chart-analysis/chart-analysis')
    },
    goToChart (e) {
      if (e.admin) {
        let path = `/operation-analysis${e.path}`
        this.$router.push(path)
      } else {
        this.$message.warning('权限不足，无法进入此页面')
      }
    },
    goToTimeAna (e) {
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
      height: 400px;
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
    .tab-ans {
      width: 100%;
      height: 400px;
      color: #fff;
      .item-fam {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item-font {
          width: 32%;
          height: 133px;
          background-color:  #4fa3e4;
          margin-bottom: 8px;
          border-radius: 6px;
          .inside-font {
            width: 100%;
            height: 80px;
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
          background-color: #999 !important
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
      height: 400px;
      color: #fff;
      .item-fam {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item-font {
          width: 48%;
          height: 195px;
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
