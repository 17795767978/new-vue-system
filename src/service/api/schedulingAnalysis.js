export const schedulingAnalysisApi = {
  schedulingAnalysis: [
    {
      name: 'getUpRushHourLinePassengerChartDatas',
      method: 'POST',
      path: '/zhfxpt/analysis/getUpRushHourLinePassengerChartDatas',
      mockPath: '/zhfxpt/analysis/getUpRushHourLinePassengerChartDatas',
      params: {
        lineId: '',
        month: '',
        type: ''
      },
      desc: '线路客流高峰时刻分析-上行'
    },
    {
      name: 'getDownRushHourLinePassengerChartDatas',
      method: 'POST',
      path: '/zhfxpt/analysis/getDownRushHourLinePassengerChartDatas',
      mockPath: '/zhfxpt/analysis/getDownRushHourLinePassengerChartDatas',
      params: {
        month: '',
        type: ''
      },
      desc: '线路客流高峰时刻分析-下行'
    },
    {
      name: 'getAnalysisDatasByWarnLeave',
      method: 'POST',
      path: '/zhfxpt/analysis/getSectionLinePassengerChartDatas',
      mockPath: '/zhfxpt/analysis/getSectionLinePassengerChartDatas',
      params: {
        lineId: '',
        type: '',
        month: ''
      },
      desc: '客流高峰断面分析'
    },
    {
      name: 'getUpLineStationChartDatas',
      method: 'POST',
      path: '/zhfxpt/analysis/getUpLineStationChartDatas',
      mockPath: '/zhfxpt/analysis/getUpLineStationChartDatas',
      params: {
        lineId: '',
        type: '',
        dateTime: '',
        startHour: '',
        endHour: ''
      },
      desc: '线路区间满载率查询(上行)'
    },
    {
      name: 'getDownLineStationChartDatas',
      method: 'POST',
      path: '/zhfxpt/analysis/getDownLineStationChartDatas',
      mockPath: '/zhfxpt/analysis/getDownLineStationChartDatas',
      params: {
        lineId: '',
        type: '',
        dateTime: '',
        startHour: '',
        endHour: ''
      },
      desc: '线路区间满载率查询(下行)'
    },
    {
      name: 'getSequenceChartDatas',
      method: 'POST',
      path: '/zhfxpt/analysis/getSequenceChartDatas',
      mockPath: '/zhfxpt/analysis/getSequenceChartDatas',
      params: {
        lineId: '',
        type: '',
        dateTime: '',
        startHour: '',
        endHour: ''
      },
      desc: '车辆发车趟次时序图'
    },
    {
      name: 'getSequenceChartDatasOfBubble',
      method: 'POST',
      path: '/zhfxpt/analysis/getSequenceChartDatasOfBubble',
      mockPath: '/zhfxpt/analysis/getSequenceChartDatasOfBubble',
      params: {
        lineId: '',
        type: '',
        dateTime: '',
        startHour: '',
        endHour: ''
      },
      desc: '单车客流统计'
    },
    {
      name: 'getUpLineCapacityChartDatas',
      method: 'POST',
      path: '/zhfxpt/analysis/getUpLineCapacityChartDatas',
      mockPath: '/zhfxpt/analysis/getUpLineCapacityChartDatas',
      params: {
        lineId: '',
        type: '',
        dateTime: ''
      },
      desc: '线路运力运量车内人数分析(上行)'
    },
    {
      name: 'getDownLineCapacityChartDatas',
      method: 'POST',
      path: '/zhfxpt/analysis/getDownLineCapacityChartDatas',
      mockPath: '/zhfxpt/analysis/getDownLineCapacityChartDatas',
      params: {
        lineId: '',
        type: '',
        dateTime: ''
      },
      desc: '线路运力运量车内人数分析(下行)'
    },
    {
      name: 'getStationOnOffTableDatas',
      method: 'POST',
      path: '/zhfxpt/analysis/getStationOnOffTableDatas',
      mockPath: '/zhfxpt/analysis/getStationOnOffTableDatas',
      params: {
        lineId: '',
        type: '',
        dateTime: ''
      },
      desc: '线路站点登降量查询'
    },
    {
      name: 'getLineBetweenStationsRunningTimeChartDatas',
      method: 'POST',
      path: '/zhfxpt/analysis/getLineBetweenStationsRunningTimeChartDatas',
      mockPath: '/zhfxpt/analysis/getLineBetweenStationsRunningTimeChartDatas',
      params: {
        lineId: '',
        type: '',
        dateTime: ''
      },
      desc: '线路站间运行时间分析'
    }
  ]
}
