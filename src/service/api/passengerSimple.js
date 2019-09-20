export const passengerSimpleApi = {
  passengerSimple: [
    {
      name: 'getTotalPassengerSimple',
      method: 'POST',
      path: '/zhfxpt/passengerflow/getYesterdayTotalPassengerFlow',
      mockPath: '/zhfxpt/passengerflow/getYesterdayTotalPassengerFlow',
      params: {
        orgId: ''
      },
      desc: '昨日累计客流'
    },
    {
      name: 'getMonthtrend',
      method: 'POST',
      path: '/zhfxpt/passengerflow/line/monthtrend',
      mockPath: '/zhfxpt/passengerflow/line/monthtrend',
      params: {
        orgId: ''
      },
      desc: '客流月趋势图'
    },
    {
      name: 'getHotstations',
      method: 'POST',
      path: '/zhfxpt/passengerflow/bar/hotstations',
      mockPath: '/zhfxpt/passengerflow/bar/hotstations',
      params: {
        orgId: ''
      },
      desc: '客流最热站点top10'
    },
    {
      name: 'getHotlines',
      method: 'POST',
      path: '/zhfxpt/passengerflow/line/hotlines',
      mockPath: '/zhfxpt/passengerflow/line/hotlines',
      params: {
        orgId: ''
      },
      desc: '客流最热线路top10'
    },
    {
      name: 'getUpanddown',
      method: 'POST',
      path: '/zhfxpt/passengerflow/line/upanddown',
      mockPath: '/zhfxpt/passengerflow/line/upanddown',
      params: {
        orgId: ''
      },
      desc: '客流登降量（实时，昨日）'
    }
  ]
}
