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
      desc: '客流数据明细查询-历史'
    },
    {
      name: 'todayList',
      method: 'POST',
      path: '/api/passenger/flow/result/todayList',
      mockPath: '/api/passenger/flow/result/todayList',
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
      desc: '客流数据明细查询-当天'
    },
    {
      name: 'getOnOffPersonCountlist',
      method: 'POST',
      path: '/api/passenger/flow/result/getOnOffPersonCountlist',
      mockPath: '/api/passenger/flow/result/getOnOffPersonCountlist',
      params: {
        orgId: '',
        lineId: '',
        startDate: '',
        endDate: ''
      },
      desc: '客流数据查询-历史'
    },
    {
      name: 'getTodayOnOffPersonCountlist',
      method: 'POST',
      path: '/api/passenger/flow/result/getTodayOnOffPersonCountlist',
      mockPath: '/api/passenger/flow/result/getTodayOnOffPersonCountlist',
      params: {
        orgId: '',
        lineId: '',
        startDate: '',
        endDate: ''
      },
      desc: '客流数据查询-当天'
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
    },
    {
      name: 'pageBusPersonTotalList',
      method: 'POST',
      path: '/api/passenger/flow/result/pageBusPersonTotalList',
      mockPath: '/api/passenger/flow/result/pageBusPersonTotalList',
      params: {
        orgId: ''
      },
      desc: '单车客流查询列表'
    },
    {
      name: 'busTotalPersonExport',
      method: 'POST',
      path: '/api/passenger/flow/result/busTotalPerson/export',
      mockPath: '/api/passenger/flow/result/busTotalPerson/export',
      params: {
        orgId: ''
      },
      desc: '单车客流查询-导出'
    },
    {
      name: 'pageBusPersonTotalWeekList',
      method: 'POST',
      path: '/api/passenger/flow/result/pageBusPersonTotalWeekList',
      mockPath: '/api/passenger/flow/result/pageBusPersonTotalWeekList',
      params: {
      },
      desc: '单车客流周报查询'
    },
    {
      name: 'getBusPersonTotalWeekListExport',
      method: 'POST',
      path: '/api/passenger/flow/result/getBusPersonTotalWeekListExport',
      mockPath: '/api/passenger/flow/result/getBusPersonTotalWeekListExport',
      params: {
      },
      desc: '单车客流周报查询-导出'
    },
    {
      name: 'getStationOnOffListDatas',
      method: 'POST',
      path: '/zhfxpt/analysis/getStationOnOffListDatas',
      mockPath: '/zhfxpt/analysis/getStationOnOffListDatas',
      params: {
      },
      desc: '登降量详情'
    }
  ]
}
