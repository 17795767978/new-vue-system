<template>
    <div class="homePage-container" :class="skinType === 0 ? 'whiteSkinBg' : 'blackSkinBg'">
        <div :class="skinType === 0 ? 'whiteSkinRightBottom' : ''" @click="downLoad"></div>
        <div class="homePage-title blackSkin-title" :class="skinType === 0 ? 'whiteSkin-title' : 'blackSkin-title'">
            <span>公交综合运营监控分析系统</span>
        </div>
        <div class="homePage-content">
            <div class="homePage-content-item">
                <cell-view :skinType="skinType" :cellData = "menuResults[0]" @onChangeCard="onChangeCard"></cell-view>
            </div>
             <div class="homePage-content-item">
                 <cell-view :skinType="skinType" :cellData = "menuResults[1]" @onChangeCard="onChangeCard"></cell-view>
                 <cell-view :skinType="skinType" :cellData = "menuResults[2]" @onChangeCard="onChangeCard"></cell-view>
            </div>
        </div>
    </div>
</template>
<script>
import CellView from './components/CellView'
import image from '../../assets/images/homePageIcon/bgImg/首页浅色背景插画.png'

/**
 * @description 公交运营监控系控制台
 * @method plumLi
 * @date 2020/03/23
 */
export default {
  name: 'Homepage',
  components: {
    CellView
  },
  methods: {

    /**
     * 根据菜单类型选择进入不同的路由
     */
    onChangeCard (e) {
      switch (e.type) {
        case 'control':
          if (this.isScreen) {
            this.$router.push(`/newBigScreen/newBigScreen-analysis`)
          } else {
            this.$message.warning('权限不足，无法进入此页面')
          }
          break
        case 'chart' :
          if (e.hasRole) {
            let path = `/operation-analysis${e.path}`
            this.$router.push(path)
          } else {
            this.$message.warning('权限不足，无法进入此页面')
          }
          break
        case 'alarm' :
          if (e.hasRole) {
            let path = `/fatigue-monitoring${e.path}`
            this.$router.push(path)
          } else {
            this.$message.warning('权限不足，无法进入此页面')
          }
          break
        default:
          break
      }
    },

    /**
     * 获取当前角色的路由数列
     */
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
      console.log(roleData)
    },

    /**
     * 为每一个菜单数据赋值 是否拥有权限
     */
    checkRoles () {
      this.menuResults.forEach(item => {
        item.child.forEach(cdItem => {
          const pathStr = cdItem.path
          let hasRole = this.rolesTem.some(role => pathStr === role)
          cdItem.hasRole = hasRole
        })
      })
    },
    downLoad () {
      let a = document.createElement('a')
      a.download = 'pic'
      a.href = image
      this.$message.success('正在下载')
      setTimeout(() => {
        window.open(image)
        a.click()
      }, 500)
    }
  },
  watch: {
    '$store.state.views.activeNight' (val) {
      val ? this.skinType = 1 : this.skinType = 0
    }
  },
  mounted () {
    this.$store.state.views.activeNight ? this.skinType = 1 : this.skinType = 0
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
  data () {
    return {
      skinType: 0, // 皮肤 0 白色 1 黑色
      rolesTem: [], // 权限路由
      isScreen: false, // 是否全屏
      isScreenTo: [],
      menuResults: [ // 菜单数据
        {
          name: '实时综合运营监控', // 分组名称
          allCol: false, // 是否为单个按钮
          child: [ // 菜单数据
            [
              { name: '' /* 菜单名称 */, hasRole: true /* 是否有访问权限 */, type: 'control' /* 菜单类型 */, icon: require('../../assets/images/homePageIcon/smallIcon/sszhyyjk.png') /* 图标资源 */, path: '/newBigScreen/newBigScreen-analysis' /* 路由 */, bgColor: '#3388E4' /* 按钮背景色 */, width: 246 } // width: 自定义按钮宽度
            ]
          ]
        }, {
          name: '调度运营分析',
          allCol: true,
          child: [
            [
              { name: '客流首页', type: 'chart', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/klsy.png'), bgColor: '#029CAE', path: '/passenger-home', colspan: 1 },
              { name: '客流实时统计', type: 'chart', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/klsstj.png'), bgColor: '#8EC500', path: '/realtime-passenger-flow', colspan: 1 },
              { name: '客流高峰时刻分析', type: 'chart', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/klgfskfx.png'), bgColor: '#3388E4', path: '/timeTable-analysis', colspan: 1 },
              { name: '车辆发车趟次时序图', type: 'chart', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/clfctccxt.png'), bgColor: '#00A100', path: '/trip-order', colspan: 1 }
            ], [
              { name: '区间满载率查询', type: 'chart', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/qjmzlcx.png'), bgColor: '#5839B1', path: '/full-load-rate', colspan: 1 },
              { name: '线路站点登降量查询', type: 'chart', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/xlzddjlcx.png'), bgColor: '#A6029B', path: '/landing-volume', colspan: 1 },
              { name: '客流运力运量分析', type: 'chart', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/klylylfx.png'), bgColor: '#F0840B', path: '/passenger-transport-capacity', colspan: 1 },
              { name: '客流数据明细查询', type: 'chart', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/klylylfx.png'), bgColor: '#F0840B', path: '/search-passenger', colspan: 1 }
            ], [
              { name: '线路客流高峰断面分析', type: 'chart', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/xlklgfdmfx.png'), bgColor: '#0859C0', path: '/section-analysis', colspan: 1 },
              { name: '客流数据查询', type: 'chart', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/klsjcx.png'), bgColor: '#ED830A', path: '/search-passenger-flow', colspan: 1 },
              { name: '线路站间运行时间分析', type: 'chart', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/xlzjyxsjfx.png'), bgColor: '#3388E4', path: '/runtime-analysis', colspan: 2 }
            ], [
              { name: '单车客流详情分析', type: 'chart', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/dcklxqfx.png'), bgColor: '#8DC600', path: '/simple-passenger-flow', colspan: 2 },
              { name: '单车客流统计', type: 'chart', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/dckltj.png'), bgColor: '#E16033', path: '/bus-passenger', colspan: 2 }
            ], [
              { name: '线路客流查询', type: 'chart', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/xlklcx.png'), bgColor: '#EC8408', path: '/line-passenger-flow', colspan: 1 },
              { name: '线路站点客流查询', type: 'chart', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/xlzdklcx.png'), bgColor: '#A6029D', path: '/comprehensive-query', colspan: 1 },
              { name: '客流热力分析', type: 'chart', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/klrlfx.png'), bgColor: '#9EB527', path: '/hot-map', colspan: 1 },
              { name: '线路OD', type: 'chart', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/xlOD.png'), bgColor: '#00A500', path: '/line-od', colspan: 1 }
            ]
          ]
        }, {
          name: '安全运营',
          allCol: true,
          child: [
            [
              { name: '驾驶行为监测', type: 'alarm', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/jsxwjc.png'), bgColor: '#A200AC', path: '/alarm-center', colspan: 1 },
              { name: '设备状态', type: 'alarm', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/cbzt.png'), bgColor: '#01A402', path: '/device-status', colspan: 1 },
              { name: '报警分析', type: 'alarm', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/bjfx.png'), bgColor: '#ED8406', path: '/alarm-analysis', colspan: 1 },
              { name: '数据质量排查', type: 'alarm', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/sjzlpc.png'), bgColor: '#8DC601', path: '/status-management', colspan: 1 }
            ], [
              { name: '报警类型管理', type: 'alarm', hasRole: true, icon: require('../../assets/images/homePageIcon/smallIcon/bjlxgl.png'), bgColor: '#D7532B', path: '/alarm-management', colspan: 2 }
            ]

          ]
        }
      ]
    }
  }
}
</script>
<style scoped>
    .homePage-container {
        width: 100%;
        height: 100%;
        background-size: cover;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
    .homePage-title {
        width: 100%;
        font-size: 22px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        min-height: 74px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        font-weight: bold;
    }
    .blackSkinBg {
        background-image: url('../../assets/images/homePageIcon/bgImg/blackSkinBg.png');
    }
    .whiteSkinRightBottom {
      width: 20vw;
      height: 25vh;
      background-image: url('../../assets/images/homePageIcon/bgImg/首页浅色背景插画.png');
      background-repeat: no-repeat;
      position: absolute;
      right: 0;
      bottom: 0;
    }
    .whiteSkinBg {
        background-image: url('../../assets/images/homePageIcon/bgImg/normalBg.png');
        background-size: 100% 100%;
    }
    .blackSkin-title {
        color: #ffffff;
        background-image: url('../../assets/images/homePageIcon/bgImg/blackSkin-title.png');
    }
    .whiteSkin-title {
        color: #000000;
        background-image: url('../../assets/images/homePageIcon/bgImg/normal-title.png');
    }
    .homePage-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        height: auto;
        padding: 2vh 5vw;
        box-sizing: border-box;
    }
    .homePage-content-item:nth-child(2) {
        display: flex;
        flex-direction: row;
    }
    .homePage-content-item > div {
        margin-left: 10px;
        margin-top: 12px;
        margin-right: 3vw;
    }
</style>
