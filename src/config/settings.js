/**
 * Global Configurations
 * =========================
 * Author: Vicco Wang
 * Date: 2018.06.22
 */

/**
  * 全局项目名称配置
  */
export const PLATFORM_PREFIX_NAME = 'NOCTURNE_UI'

/**
  * API接口默认参数配置
  */
let id = Math.random().toString(36).substr(3, 30)
// let ip = window.location.host
// let baseUrl = ''
// if (ip.indexOf('192.168') !== -1) {
//   baseUrl = 'http://192.168.0.48:12345'
// } else {
//   baseUrl = 'http://172.16.100.160:8081'
// }
export const WSAPI = `ws://192.168.10.81:8081/websocket/mesgshow/${id}`
export const API_DEFAULT_CONFIG = {
  // mockBaseUrl: 'http://192.168.10.145:8082',
  // mockBaseUrl: 'http://111.62.52.35:8089',
  // mockBaseUrl: 'http://117.34.118.30:8089',
  // mockBaseUrl: 'http://61.157.184.120:8088',
  // mockBaseUrl: 'http://192.168.10.23:8081',
  mockBaseUrl: 'http://192.168.10.81:8081',
  // mockBaseUrl: 'http://111.62.52.35:8089', // 邢台
  // 192.168.10.33:8081
  // mockBaseUrl: 'http://192.168.10.33:8081',
  // mockBaseUrl: 'http://192.168.10.23:8081',
  // 10.233 8089
  // prodBaseUrl: 'http://192.168.10.233:8089', // 测试
  // prodBaseUrl: 'http://117.34.118.30:8089', // 自测
  // prodBaseUrl: 'http://61.157.184.120:8088', // 宜宾
  // prodBaseUrl: 'http://117.34.118.30:7088', // 自测
  prodBaseUrl: 'http://121.30.214.189:9088', // 大同
  isMocked: process.env.NODE_ENV !== 'production',
  isDebug: true,
  sep: '.'
}

/**
 * AXIOS默认参数配置
 */
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 180000
}

/**
  * 平台基础参数配置
  */
export const PLATFORM_DEFAULT_CONFIG = {
  productionTip: false
}

/**
  * 路由表默认参数配置
  */
export const ROUTER_DEFAULT_CONFIG = {
  isUseStaticRouter: true
}
