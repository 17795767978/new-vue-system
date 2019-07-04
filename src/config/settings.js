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
export const API_DEFAULT_CONFIG = {
  // mockBaseUrl: 'http://192.168.10.241:3000/mock/325',
  // mockBaseUrl: 'http://192.168.10.233:8089',
  mockBaseUrl: 'http://117.34.118.30:8089',
  // mockBaseUrl: 'http://192.168.10.233:8089',
  // 'http://117.34.10.233:8089',
  // mockBaseUrl: 'http://192.168.10.23:8089',
  // mockBaseUrl: 'http://192.168.10.81:8081',
  // prodBaseUrl: 'http://localhost:3000',
  // 10.233 8089
  // prodBaseUrl: 'http://192.168.10.233:8089',
  prodBaseUrl: 'http://117.34.118.30:8089',
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
