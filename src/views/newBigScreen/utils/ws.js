import Socket from 'sockjs-client'
import Stomp from 'stompjs'
import { Message } from 'element-ui'
import { WSPOSITION } from '../../../config/settings'
class Subscribe {
  constructor () {
    // 连接名
    this.name = WSPOSITION.name
    // 订阅的基础地址
    this.url = WSPOSITION.url
    // 是否订阅http服务
    this.isHttp = false
    // 是否关闭当前订阅
    this.close = false
    // 是否已经建立连接
    this.isConnnect = false
    // 原生websocet连接实例
    this.ws = null
    // 订阅的实例
    this.stomp = null
    // 账号密码等配置
    this.config = WSPOSITION.config
    // 返回的单条数据
    this.simpleData = {}
    // 重新组装的数据
    this.assembleDatas = []
  }
  // 创建http连接
  createHttpConnect () {
    const httpChecked = httpChecking(this.url)
    if (!httpChecked) {
      return
    }
    const socket = new Socket(this.url)
    this.stomp = Stomp.over(socket)
    this.stomp.debug = null
  }
  // 订阅http连接
  subscribeHttpConnect (adr) {
    this.stomp.connect({ ...this.config }, (frame) => {
      Message.success(this.name + '连接成功')
      this.isConnnect = true
      this.stomp.subscribe(adr, (res) => {
        const data = JSON.parse(res.body)
        this.simpleData = data
      })
    })
  }
  // 创建ws订阅
  createWsConnect () {
    const wsChecked = wsChecking(this.url)
    if (!wsChecked) {
      return
    }
    this.ws = new WebSocket(this.url)
    this.stomp = Stomp.over(this.ws)
    this.stomp.debug = null
  }
  // 订阅ws连接
  subscribeWsConnect (adr) {
    console.log(1231312312313123213213)
    this.stomp.connect({ ...this.config }, (frame) => {
      Message.success(this.name + '连接成功')
      this.isConnnect = true
      this.stomp.subscribe(adr, (res) => {
        const data = JSON.parse(res.body)
        this.simpleData = data
        this.dataToAssemble()
      })
    })
  }
  // 删除当前订阅
  wsDisconnect () {
    this.stomp.disconnect()
    this.simpleData = {}
    this.assembleDatas = []
  }
  // data封装 以满足车辆订阅
  dataToAssemble () {
    const isHav = this.assembleDatas.some(item => item.busUuid === this.simpleData.busUuid)
    if (!this.assembleDatas.length || !isHav) {
      this.assembleDatas.push(this.simpleData)
    } else {
      this.assembleDatas.forEach(item => {
        if (item.busUuid === this.simpleData.busUuid) {
          item.lat = this.simpleData.lat
          item.lng = this.simpleData.lng
        }
      })
    }
  }
  // 关闭http连接
  closeHttpConnect () {
    this.stomp.ws.close()
    this.isConnnect = false
    this.close = false
    Message.warning(`${this.name}http连接关闭`)
  }
  // 关闭ws连接
  closeWsConnect () {
    this.stomp.ws.close()
    this.isConnnect = false
    this.close = false
    Message.warning(`${this.name}ws连接关闭`)
  }
}

// http检查
function httpChecking (url) {
  const isHttp = url.indexOf('http:') === 0 || url.indexOf('https:') === 0
  return isHttp || Message.warning('请检查链接是否为http链接')
}
// ws检查
function wsChecking (url) {
  const isWs = url.indexOf('ws:') === 0
  return isWs || Message.warning('请检查链接是否为ws链接')
}

export default Subscribe
