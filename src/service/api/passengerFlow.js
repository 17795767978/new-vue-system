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
      path: '/api/mid/id/card/data/getMidIdCardData',
      mockPath: '/api/mid/id/card/data/getMidIdCardData',
      params: {
        orgUuid: '',
        lineUuid: '',
        busPlateNumber: '',
        lineType: '',
        sTime: '',
        eTime: '',
        pageSize: '',
        pageNumber: ''
      },
      desc: '客流数据明细查询-历史'
    },
    {
      name: 'todayList',
      method: 'POST',
      path: '/api/temp/ic/card/data/getPFDetailByThisDayData',
      mockPath: '/api/temp/ic/card/data/getPFDetailByThisDayData',
      params: {
        orgUuid: '',
        lineUuid: '',
        busPlateNumber: '',
        lineType: '',
        sTime: '',
        eTime: '',
        pageSize: '',
        pageNumber: ''
      },
      desc: '客流数据明细查询-当天'
    },
    {
      name: 'getOnOffPersonCountlist',
      method: 'POST',
      path: '/api/mid/pf/detail/data/getLinePFStatisticsByHis',
      mockPath: '/api/mid/pf/detail/data/getLinePFStatisticsByHis',
      params: {
        orgUuid: '',
        lineUuids: '',
        startDate: '',
        endDate: ''
      },
      desc: '客流数据查询-历史'
    },
    {
      name: 'getTodayOnOffPersonCountlist',
      method: 'POST',
      path: '/api/temp/ic/card/data/getLinePFStatisticsByDay',
      mockPath: '/api/temp/ic/card/data/getLinePFStatisticsByDay',
      params: {
        orgUuid: '',
        lineUuids: '',
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
      name: 'getLineUpPayNumberTOP10Data',
      method: 'POST',
      path: '/api/temp/ic/card/data/getLineUpPayNumberTOP10Data',
      mockPath: '/api/temp/ic/card/data/getLineUpPayNumberTOP10Data',
      params: {
        orgId: ''
      },
      desc: '线路登量TOP10'
    },
    {
      name: 'getSingleBusPFStatisticsByDay',
      method: 'POST',
      path: '/api/temp/ic/card/data/getSingleBusPFStatisticsByDay',
      mockPath: '/api/temp/ic/card/data/getSingleBusPFStatisticsByDay',
      params: {
        lineUuid: '',
        // pageNumber: '',
        // pageSize: '',
        sTime: '',
        eTime: '',
        orgUuid: '',
        busPlateNumber: ''
      },
      desc: '单车客流统计（当日）'
    },
    {
      name: 'getSingleBusPFStatisticsByHis',
      method: 'POST',
      path: '/api/mid/id/card/data/getSingleBusPFStatisticsByHis',
      mockPath: '/api/mid/id/card/data/getSingleBusPFStatisticsByHis',
      params: {
        lineUuid: '',
        // pageNumber: '',
        // pageSize: '',
        sTime: '',
        eTime: '',
        orgUuid: '',
        busPlateNumber: ''
      },
      desc: '单车客流统计（历史）'
    },
    {
      name: 'ICCardTypeAnalysis',
      method: 'POST',
      path: '/api/mid/id/card/data/ICCardTypeAnalysis',
      mockPath: '/api/mid/id/card/data/ICCardTypeAnalysis',
      params: {
        cardSelfCodes: '',
        date: '',
        orgUuid: ''
      },
      desc: 'IC卡类型统计分析'
    }
  ]
}
