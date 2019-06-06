export const dispatchApi = {
  dispatch: [
    {
      name: 'getOnlineCarNumber',
      method: 'POST',
      path: '/zhfxpt/getOnlineBusNumber',
      mockPath: '/zhfxpt/getOnlineBusNumber',
      params: {
        orgId: ''
      },
      desc: '在线车辆数'
    },
    {
      name: 'getOnCarNumber',
      method: 'POST',
      path: '/zhfxpt/getOperateBusNumber',
      mockPath: '/zhfxpt/getOperateBusNumber',
      params: { // 0：待发 ；1：运营
        orgId: '',
        type: '1'
      },
      desc: '运营车辆数'
    },
    {
      name: 'getOffCarNumber',
      method: 'POST',
      path: '/zhfxpt/getOperateBusNumber',
      mockPath: '/zhfxpt/getOperateBusNumber',
      params: { // 0：待发 ；1：运营
        orgId: '',
        type: '0'
      },
      desc: '运营车辆数'
    },
    {
      name: 'getRealtimeTrips',
      method: 'POST',
      path: '/zhfxpt/getRealtimeTrips',
      mockPath: '/zhfxpt/getRealtimeTrips',
      params: {
        orgId: '',
        lineId: ''
      },
      desc: '实时趟次'
    },
    {
      name: 'getRealtimeMileage',
      method: 'POST',
      path: '/zhfxpt/getRealtimeMileage',
      mockPath: '/zhfxpt/getRealtimeMileage',
      params: {
        orgId: '',
        lineId: ''
      },
      desc: '实时里程'
    },
    {
      name: 'getRealtimeClasses',
      method: 'POST',
      path: '/zhfxpt/getRealtimeClasses',
      mockPath: '/zhfxpt/getRealtimeClasses',
      params: {
        orgId: '',
        lineId: ''
      },
      desc: '实时班次'
    },
    {
      name: 'getBusToStationInfo',
      method: 'POST',
      path: '/zhfxpt/getBusToStationInfo',
      mockPath: '/zhfxpt/getBusToStationInfo',
      params: {
        orgId: '',
        dateTime: ''
      },
      desc: '车辆到站时刻信息(获取前一天数据)(运营线路比)'
    }
  ]
}
