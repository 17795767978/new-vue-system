import Layout from '@/components/layout'

const _import_ = file => () => import('@/views/' + file + '.vue')
/*
 * 公共路由表, 一般情况这里无需任何修改.
 * 除非你需要配置更多任何角色或权限下都可以访问的路由
 */
export const constantRouterMap = [
  {
    path: '/',
    redirect: '/Homepage/home'
  },
  {
    path: '/login',
    component: _import_('Login/index'),
    hidden: true
  },
  {
    path: '/yyjk/sso',
    component: _import_('Login/sso'),
    hidden: true
  },
  {
    path: '/homepage',
    component: Layout,
    meta: { title: 'Homepage', icon: 'iconfont icon-yunzhuomian' },
    children: [
      {
        path: 'home',
        name: 'Homepage',
        component: _import_('Homepage/index'),
        meta: { title: '首页', icon: 'nocturne icon-home', isHome: true }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'personal-settings',
        name: 'PersonalSettings',
        component: () => import('@/components/layout/Components/Settings/index'),
        meta: { title: '个性化配置', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/modify-password',
    component: () => import('@/components/layout/Components/ModifyPassword/index'),
    hidden: true,
    meta: { title: '修改密码', icon: '', noCache: true }
  },
  { path: '/401', component: _import_('others/401'), hidden: true },
  { path: '*', component: _import_('others/404'), hidden: true }
]
