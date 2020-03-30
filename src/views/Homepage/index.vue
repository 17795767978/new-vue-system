<template>
  <div class="dashboard-container cont-container">
    <el-row>
      <span class="main-title">公交综合运营监控分析系统</span>
    </el-row>
    <el-row class="main-card" :gutter="50">
      <el-col style="margin-left: 50px;" :span="5">
        <h3 style="font-size: 20px;">运营实况</h3>
        <div class="tab-con" @click="goToContral()">
        </div>
      </el-col>
      <el-col :span="5" v-if="operationAnalysis.some(item => item.admin)">
        <h3 style="font-size: 20px;">客流总体态势</h3>
        <div class="tab-con" @click="goToRealtime()">
        </div>
      </el-col>
      <el-col :span="7" v-if="lineNets.some(item => item.admin)">
        <h3 style="font-size: 20px;">数据分析</h3>
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
  { name: '实时总体态势', icon: iconHomeYlyl, path: '/passenger-home', admin: false }
]
const LINE_NET = [
  { name: '发车趟次时序图', icon: iconHomeBjzx, path: '/trip-order', admin: false },
  { name: '线路OD分析', icon: iconHomeKlfx, path: '/line-od', admin: false },
  { name: '线路站点客流查询', icon: iconHomeFctc, path: '/comprehensive-query', admin: false },
  { name: '区间满载率查询', icon: iconHomeMzl, path: '/full-load-rate', admin: false },
  { name: '客流详情查询', icon: iconHomeXlzd, path: '/search-passenger', admin: false },
  { name: '站点OD矩阵', icon: iconHomeYxsj, path: '/station-od', admin: false },
  { name: '线路客流查询', icon: iconHomeBjfx, path: '/line-passenger-flow', admin: false },
  { name: '客流热力分析', icon: iconHomeKlgf, path: '/hot-map', admin: false },
  { name: '站点OD电子地图', icon: iconHomeBjzt, path: '/station-map', admin: false },
  { name: '单车客流统计', icon: iconHomeBjlx, path: '/bus-passenger', admin: false },
  { name: '客流数据查询', icon: iconHomeKlfx, path: '/search-passenger-flow', admin: false }
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
      this.operationAnalysis = anaPer
      this.lineNets = lines
    },
    goToContral () {
      this.$router.push(`/newBigScreen/newBigScreen-analysis`)
    },
    goToRealtime () {
      this.$router.push(`/real-time/passenger-home`)
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
    margin-top: 20px;
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
      min-height: 30vh;
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
          height: 14vh;
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
