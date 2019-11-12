export const passengerFlowApi = {
  passengerFlow: [
    {
      name: 'getTotalPassengerFlow',
      method: 'POST',
      path: '/zhfxpt/passengerflow/getTotalPassengerFlow',
      mockPath: '/zhfxpt/passengerflow/getTotalPassengerFlow',
      params: {
        orgId: ''
      },
      desc: '当日累计客流（人次）'
    },
    {
      name: 'getRealTimePassengerFlow',
      method: 'POST',
      path: '/zhfxpt/passengerflow/getRealTimePassengerFlow',
      mockPath: '/zhfxpt/passengerflow/getRealTimePassengerFlow',
      params: {
        orgId: ''
      },
      desc: '实时客流人次'
    },
    {
      name: 'getRealTimeFullLoadRate',
      method: 'POST',
      path: '/zhfxpt/passengerflow/getRealTimeFullLoadRate',
      mockPath: '/zhfxpt/passengerflow/getRealTimeFullLoadRate',
      params: {
        orgId: ''
      },
      desc: '实时满载率（图表）'
    },
    {
      name: 'getRealTimeFullRateTop10',
      method: 'POST',
      path: '/zhfxpt/passengerflow/getRealTimeFullRateTop10',
      mockPath: '/zhfxpt/passengerflow/getRealTimeFullRateTop10',
      params: {
        orgId: '',
        lineId: ''
      },
      desc: '线路满载率排行top10'
    },
    {
      name: 'getRealTimePersoncountAndFullLoadRate',
      method: 'POST',
      path: '/zhfxpt/passengerflow/getRealTimePersoncountAndFullLoadRate',
      mockPath: '/zhfxpt/passengerflow/getRealTimePersoncountAndFullLoadRate',
      params: {
        orgId: ''
      },
      desc: '总实时载客（人）、实时满载率'
    },
    {
      name: 'getRealTimeOperLines',
      method: 'POST',
      path: '/zhfxpt/passengerflow/getRealTimeOperLines',
      mockPath: '/zhfxpt/passengerflow/getRealTimeOperLines',
      params: {
        orgId: ''
      },
      desc: '运营线路'
    },
    {
      name: 'list',
      method: 'POST',
      path: '/api/passenger/flow/result/list',
      mockPath: '/api/passenger/flow/result/list',
      params: {
        orgId: '',
        lineId: '',
        busNumber: '',
        lineType: '',
        startTime: '',
        endTime: '',
        pageSize: '',
        pageNumber: ''
      },
      desc: '客流数据明细查询'
    },
    {
      name: 'getOnOffPersonCountlist',
      method: 'POST',
      path: '/api/passenger/flow/result/getOnOffPersonCountlist',
      mockPath: '/api/passenger/flow/result/getOnOffPersonCountlist',
      params: {
        orgId: '',
        lineId: '',
        startTime: '',
        endTime: ''
      },
      desc: '客流数据查询'
    },
    {
      name: 'getCompanyTotalPassengerFlow',
      method: 'POST',
      path: '/zhfxpt/passengerflow/getCompanyTotalPassengerFlow',
      mockPath: '/zhfxpt/passengerflow/getCompanyTotalPassengerFlow',
      params: {
      },
      desc: '各公司客流数据查询'
    },
    {
      name: 'getLineTotalPassengerFlow',
      method: 'POST',
      path: '/zhfxpt/passengerflow/getLineTotalPassengerFlow',
      mockPath: '/zhfxpt/passengerflow/getLineTotalPassengerFlow',
      params: {
        orgId: ''
      },
      desc: '线路当日累计客流（人次）'
    }
  ]
}
