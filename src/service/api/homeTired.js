export const homeTiredApi = {
  homeTired: [
    {
      name: 'getBadDrivingBehaviorDatas',
      method: 'POST',
      path: '/plapp/getBadDrivingBehaviorDatas',
      mockPath: '/plapp/getBadDrivingBehaviorDatas',
      params: {
        orgId: ''
      },
      desc: '不良驾驶行为数据(按分公司)'
    },
    {
      name: 'getStatisticDatasByWarnType',
      method: 'POST',
      path: '/zhfxpt/monitorScreen/getStatisticDatasByWarnType',
      mockPath: '/zhfxpt/monitorScreen/getStatisticDatasByWarnType',
      params: {
        orgId: ''
      },
      desc: '不良驾驶行为类型--监控大屏'
    },
    {
      name: 'getStatisticDatasByWarnTypeHome',
      method: 'POST',
      path: '/zhfxpt/homepage/getStatisticDatasByWarnType',
      mockPath: '/zhfxpt/homepage/getStatisticDatasByWarnType',
      params: {
        orgId: ''
      },
      desc: '不良驾驶行为类型--客流首页'
    },
    {
      name: 'getStatisticDatasByWarnTypeAnalysis',
      method: 'POST',
      path: '/zhfxpt/warnTypeAnalysis/getStatisticDatasByWarnType',
      mockPath: '/zhfxpt/warnTypeAnalysis/getStatisticDatasByWarnType',
      params: {
        orgId: ''
      },
      desc: '不良驾驶行为类型--报警类型分析 '
    },
    {
      name: 'getAnalysisDatasByWarnLeave',
      method: 'POST',
      path: '/zhfxpt/getAnalysisDatasByWarnLeave',
      mockPath: '/zhfxpt/getAnalysisDatasByWarnLeave',
      params: {
        orgId: ''
      },
      desc: '不良驾驶行为等级分析'
    },
    {
      name: 'getBadDrivingBehaviorTable',
      method: 'POST',
      path: '/zhfxpt/getBadDrivingBehaviorDatas',
      mockPath: '/zhfxpt/getBadDrivingBehaviorDatas',
      params: {
        orgId: ''
      },
      desc: '不良驾驶行为数据（图表）'
    },
    {
      name: 'getVideoMsg',
      method: 'POST',
      path: '/zhfxpt/getDetail',
      mockPath: '/zhfxpt/getDetail',
      params: {
        busId: '',
        busNumber: '',
        samplingTime: '',
        busSelfcode: '',
        warnSpeed: '',
        orgName: '',
        lineName: '',
        lineType: '',
        driverName: '',
        driverNum: ''
      },
      desc: '获取单车明细'
    }
  ]
}
