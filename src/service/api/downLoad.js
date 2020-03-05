export const downLoadApi = {
  downLoad: [
    {
      name: 'export',
      method: 'POST',
      path: '/api/passenger/flow/result/detail/export',
      mockPath: '/api/passenger/flow/result/detail/export',
      params: {
        orgId: '',
        dateTime: ''
      },
      desc: '客流报表下载'
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
      path: '/api/net/index/pf/base/export',
      mockPath: '/api/net/index/pf/base/export',
      params: {
        company: '',
        lineID: '',
        arrow: '',
        startStation: '',
        endStation: ''
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
      path: '/api/net/index/pf/od/export',
      mockPath: '/api/net/index/pf/od/export',
      params: {
        orgId: '',
        dateTime: ''
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
      name: 'getBadDrivingDriverRankingExport',
      method: 'POST',
      path: '/zhfxpt/getBadDrivingDriverRankingExport',
      mockPath: '/zhfxpt/getBadDrivingDriverRankingExport',
      params: {
        orgId: '',
        lineId: '',
        startTime: '',
        endTime: '',
        warnTypes: ''
      },
      desc: '不良驾驶行为分析报警司机排行导出'
    },
    {
      name: 'getBadDrivingBusRankingExport',
      method: 'POST',
      path: '/zhfxpt/getBadDrivingBusRankingExport',
      mockPath: '/zhfxpt/getBadDrivingBusRankingExport',
      params: {
        orgId: '',
        lineId: '',
        startTime: '',
        endTime: '',
        warnTypes: ''
      },
      desc: '不良驾驶行为分析报警车辆排行导出'
    },
    {
      name: 'getDrivingBehaviorDayExport',
      method: 'POST',
      path: '/zhfxpt/getDrivingBehaviorDayExport',
      mockPath: '/zhfxpt/getDrivingBehaviorDayExport',
      params: {
        orgId: '',
        lineId: '',
        startTime: '',
        endTime: '',
        warnTypes: '',
        busNumber: '',
        driverNum: ''
      },
      desc: '驾驶员行为监测台账（日报）导出'
    }
  ]
}
