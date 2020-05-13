/**
 * AXIOS Interceptors Configuration
 * =================================
 * Author: Vicco Wang
 * Date: 2018.06.22
 */
import store from '@/plugins/store'
/**
 *
 *
 * @export
 * @param {*} config
 * @returns
 */
export function axiosRequestSucessFunc (config) {
  // dosth before request
  // config.headers['Content-type'] = 'application/x-www-form-urlencoded'
  const token = store.getters.token
  // config.withCredentials = true
  if (token) {
    config.headers.common['authorization'] = token
  }
  if (config.data && config.data.lineId !== undefined) {
    config.data.lineUuids = permissionLine(config.data.lineId, 'lineId')
  }
  if (config.data && config.data.lineIdRepeate !== undefined) {
    config.data.lineUuids = permissionLine(config.data.lineIdRepeate, 'lineIds')
  }
  if (config.data && config.data.orgId && config.data.orgId === '1') {
    config.data.orgId = ''
  }
  if (config.data && config.data.orgUuid && config.data.orgUuid === '1') {
    config.data.orgUuid = ''
  }
  config.data && (config.data.personId = localStorage.getItem('id'))
  return config
}

// 线路权限
function permissionLine (line, type) {
  if (type === 'lineId') {
    if (line === '') {
      return []
    } else if (line !== '') {
      return [line]
    }
  } else if (type === 'lineIds') {
    if (line.length === 0) {
      return []
    } else if (line.length > 0) {
      return line
    }
  }
}

/**
 *
 *
 * @export
 * @param {*} error
 * @returns
 */
export function axiosRequestFailFunc (error) {
  return Promise.reject(error)
}
/**
 *
 *
 * @export
 * @param {*} response
 * @returns
 */
export function axiosResponseSucessFunc (response) {
  /**
   * response 基本格式如下
   * {
   *  ...
   *  status: 200,
   *  data: {
   *    head: { success: 'true' },
   *    data: { some data here }
   *  }
   *  ...
   * }
   */
  // response by remote server
  switch (response.status) {
    case 200:
    case 304:
      const responseData = response.data
      const responseHead = responseData.head
      // response success and response data
      if (responseHead && responseHead.success === 'true') {
        return responseData.data
      } else {
        // case response data error code
        switch (responseData.code) {
          case '401':
            // 权限不够,重新登录
            store.dispatch('userLogout').then(() => {
              location.reload()
            })
            return Promise.reject(response.data).catch(() => {})
          default:
            return Promise.reject(response.data)
        }
      }
    default:
      return Promise.reject(response.data)
  }
}

export function axiosResponseFailFunc (error) {
  return Promise.reject(error)
}
