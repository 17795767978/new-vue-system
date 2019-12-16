export const downLoadApi = {
  downLoad: [
    {
      name: 'todayExport',
      method: 'POST',
      path: '/api/temp/ic/card/data/export',
      mockPath: '/api/temp/ic/card/data/export',
      params: {
      },
      desc: '客流报表下载（today）'
    },
    {
      name: 'historyExport',
      method: 'POST',
      path: '/api/mid/id/card/data/export',
      mockPath: '/api/mid/id/card/data/export',
      params: {
      },
      desc: '客流报表下载（history）'
    },
    {
      name: 'warnExport',
      method: 'POST',
      path: '/warns/export',
      mockPath: '/warns/export',
      params: {
        busPlateNumber: '',
        busSelfCode: '',
        busUuid: '',
        devCode: '',
        endTime: '',
        lineId: '',
        orgId: '',
        startTime: '',
        warnLevel: '',
        warnTypeId: []
      },
      desc: '报警table报表下载'
    },
    {
      name: 'totalDataExport',
      method: 'POST',
      path: '/api/mid/pf/detail/data/export',
      mockPath: '/api/mid/pf/detail/data/export',
      params: {
        orgUuid: '',
        lineUuid: '',
        lineType: '',
        startStation: '',
        endStation: '',
        date: ''
      },
      desc: '数据综合查询导出'
    },
    {
      name: 'repeatExport',
      method: 'POST',
      path: '/api/net/index/repeat/sc/export',
      mockPath: '/api/net/index/repeat/sc/export',
      params: {
        orgId: '',
        dateTime: ''
      },
      desc: '重复度指标详情导出'
    },
    {
      name: 'lineTotalExport',
      method: 'POST',
      path: '/api/net/index/pf/line/day/export',
      mockPath: '/api/net/index/pf/line/day/export',
      params: {
        orgId: '',
        dateTime: ''
      },
      desc: '线路客流综合查询导出'
    },
    {
      name: 'ODExport',
      method: 'POST',
      path: '/api/anal/line/od/data/export',
      mockPath: '/api/anal/line/od/data/export',
      params: {
        orgUuid: '',
        lineUuid: '',
        lineType: '',
        uploadDate: ''
      },
      desc: '线路OD导出'
    },
    {
      name: 'passengerFlowExport',
      method: 'POST',
      path: '/api/passenger/flow/result/export',
      mockPath: '/api/passenger/flow/result/export',
      params: {
        orgId: '',
        lineId: '',
        startDate: '',
        endDate: ''
      },
      desc: '客流查询导出'
    },
    {
      name: 'stationODExports',
      method: 'POST',
      path: '/api/anal/sta/od/month/data/export',
      mockPath: '/api/anal/sta/od/month/data/export',
      params: {
        month: '',
        linearDistanceMin: '',
        linearDistanceMax: '',
        payNumberMin: '',
        payNumberMax: '',
        upStaUuid: '',
        downStaUuid: '',
        payTimeIntervalMin: '',
        payTimeIntervalMax: ''
      },
      desc: '全市站点OD矩阵_导出'
    },
    {
      name: 'lineFlowExports',
      method: 'POST',
      path: '/api/mid/pf/detail/time/data/export',
      mockPath: '/api/mid/pf/detail/time/data/export',
      params: {
        orgUuid: '',
        lineUuid: '',
        lineType: '',
        date: ''
      },
      desc: '线路客流查询-列表导出'
    }
  ]
}
