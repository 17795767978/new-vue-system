export const tiredMonitoringApi = {
  tiredMonitoring: [
    {
      name: 'getWarnList',
      method: 'POST',
      path: '/warns/warnPage/get',
      mockPath: '/warns/warnPage/get',
      params: {
        orgId: '', // 组织机构id
        lineId: '', // 线路id
        busUuid: '', // 车辆id
        devCode: '', // 设备号
        busPlateNumber: '', // 车牌号
        busSelfCode: '', // 自编号
        warnLevel: '', // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: [], // 报警类型
        startTime: '', // 时间格式   开始结束默认查近7天的
        endTime: ''
      },
      desc: '报警中心-列表'
    },
    {
      name: 'getLineBusTree',
      method: 'POST',
      path: '/warns/orgLineBusTree/get',
      mockPath: '/warns/orgLineBusTree/get',
      desc: '报警中心-组织线路车辆树'
    },
    {
      name: 'getWarnDetail',
      method: 'POST',
      path: '/warns/warnInfoDetail/get',
      mockPath: '/warns/warnInfoDetail/get',
      params: {
        warnUuid: ''
      },
      desc: '报警中心-详情'
    },
    {
      name: 'getWarntypes',
      method: 'POST',
      path: '/common/warntypes/get',
      mockPath: '/common/warntypes/get',
      params: {
        warnLevel: ''
      },
      desc: '报警中心-报警类型查询'
    },
    {
      name: 'getDeviceStatus',
      method: 'POST',
      path: '/deviceStatus/online/get',
      mockPath: '/deviceStatus/online/get',
      desc: '设备状态-设备在线率'
    },
    {
      name: 'getLineDeviceStatusPage',
      method: 'POST',
      path: '/deviceStatus/list',
      mockPath: '/deviceStatus/list',
      params: {
        pageNumber: '',
        pageSize: '',
        lineId: '',
        orgId: '',
        busPlateNumber: '',
        busSelfCode: '',
        devOnlineStatus: ''
      },
      desc: '设备状态-线路设备状态列表'
    },
    {
      name: 'getLinelineStatusPage',
      method: 'POST',
      path: '/deviceStatus/lineStatusPage/get',
      mockPath: '/deviceStatus/lineStatusPage/get',
      params: {
        pageNum: '',
        pageSize: '',
        lineId: ''
      },
      desc: '设备状态-各线路下的设备状态'
    },
    {
      name: 'getWarnPie',
      method: 'POST',
      path: '/warnsAnalysis/warnPie/echar/get',
      mockPath: '/warnsAnalysis/warnPie/echar/get',
      params: {
        orgId: '',
        lineId: '',
        busPlateNumber: '',
        startTime: '',
        endTime: ''
      },
      desc: '报警分析-等级占比'
    },
    {
      name: 'getWarnLevelList',
      method: 'POST',
      path: '/warnsAnalysis/warnLevelPage/get',
      mockPath: '/warnsAnalysis/warnLevelPage/get',
      params: {
        orgId: '',
        lineId: '',
        busPlateNumber: '',
        startTime: '',
        endTime: '',
        pageSize: '',
        pageNum: ''
      },
      desc: '报警分析-列表'
    },
    {
      name: 'getWarnSort',
      method: 'POST',
      path: '/warnsAnalysis/warnSort/echar/get',
      mockPath: '/warnsAnalysis/warnSort/echar/get',
      params: {
        orgId: '',
        lineId: '',
        busPlateNumber: '',
        startTime: '',
        endTime: ''
      },
      desc: '报警分析-报警排序'
    },
    {
      name: 'getWarnLine',
      method: 'POST',
      path: '/warnsAnalysis/warnLine/echar/get',
      mockPath: '/warnsAnalysis/warnLine/echar/get',
      params: {
        orgId: '',
        lineId: '',
        busPlateNumber: '',
        startTime: '',
        endTime: '',
        warnUuid: ''
      },
      desc: '报警分析-次数趋势折线图'
    },
    {
      name: 'getWarnTypeList',
      method: 'POST',
      path: '/warntype/warnTypePage/get',
      mockPath: '/warntype/warnTypePage/get',
      params: {
        pageSize: '',
        pageNum: ''
      },
      desc: '报警类型管理--列表'
    },
    {
      name: 'createWarntype',
      method: 'POST',
      path: '/warntype/create',
      mockPath: '/warntype/create',
      params: {
        // plWarnLevel: '',
        plIsvalid: '',
        plValue: '',
        plDisplay: '',
        plSort: '',
        plRemark: ''
      },
      desc: '报警类型管理--新增'
    },
    {
      name: 'updateWarntype',
      method: 'POST',
      path: '/warntype/update',
      mockPath: '/warntype/update',
      params: {
        plUuid: '',
        // plWarnLevel: '',
        plIsvalid: '',
        plValue: '',
        plDisplay: '',
        plSort: '',
        plRemark: ''
      },
      desc: '报警类型管理--修改'
    },
    {
      name: 'warntypeIsvalid',
      method: 'POST',
      path: '/warntype/isvalid/update',
      mockPath: '/warntype/isvalid/update',
      params: {
        plUuid: '',
        plIsvalid: ''
      },
      desc: '报警类型管理--启用/禁用'
    },
    {
      name: 'warnExpert',
      method: 'POST',
      path: '/warns/warnPage/expert',
      mockPath: '/warns/warnPage/expert',
      params: {
        orgId: '',
        lineId: '',
        busUuid: '',
        devCode: '',
        busPlateNumber: '',
        busSelfCode: '',
        warnLevel: '',
        warnTypeId: [],
        startTime: '',
        endTime: ''
      },
      desc: '报警中心-列表导出'
    },
    {
      name: 'getBadDrivingBehaviorRanking',
      method: 'POST',
      path: '/zhfxpt/getBadDrivingBehaviorRanking',
      mockPath: '/zhfxpt/getBadDrivingBehaviorRanking',
      params: {
        orgId: '',
        lineId: '',
        busPlateNumber: '',
        warnTypes: []
      },
      desc: '不良驾驶行为日排行'
    },
    {
      name: 'getBadDrivingDriverRanking',
      method: 'POST',
      path: '/zhfxpt/getBadDrivingDriverRanking',
      mockPath: '/zhfxpt/getBadDrivingDriverRanking',
      params: {
        orgId: '',
        lineId: '',
        startTime: '',
        endTime: '',
        warnTypes: []
      },
      desc: '不良驾驶行为分析报警司机排行'
    },
    {
      name: 'getDriverWarnTimeTrend',
      method: 'POST',
      path: '/zhfxpt/getDriverWarnTimeTrend',
      mockPath: '/zhfxpt/getDriverWarnTimeTrend',
      params: {
        orgId: '',
        lineId: '',
        startTime: '',
        endTime: '',
        warnTypes: [],
        driverName: '',
        driverNum: ''
      },
      desc: '司机报警时间趋势'
    },
    {
      name: 'getAlarmLevelRatioAnalysis',
      method: 'POST',
      path: '/zhfxpt/getAlarmLevelRatioAnalysis',
      mockPath: '/zhfxpt/getAlarmLevelRatioAnalysis',
      params: {
        orgId: '',
        lineId: '',
        startTime: '',
        endTime: ''
      },
      desc: '各报警速度占比统计'
    },
    {
      name: 'getFatigueDrivingWarnTimeAnalysis',
      method: 'POST',
      path: '/zhfxpt/getFatigueDrivingWarnTimeAnalysis',
      mockPath: '/zhfxpt/getFatigueDrivingWarnTimeAnalysis',
      params: {
        orgId: '',
        lineId: '',
        startTime: '',
        endTime: ''
      },
      desc: '（疲劳驾驶） 报警时间段分析'
    },
    {
      name: 'getFatigueDrivingWarnTimeTrendAnalysis',
      method: 'POST',
      path: '/zhfxpt/getFatigueDrivingWarnTimeTrendAnalysis',
      mockPath: '/zhfxpt/getFatigueDrivingWarnTimeTrendAnalysis',
      params: {
        orgId: '',
        lineId: '',
        startTime: '',
        endTime: ''
      },
      desc: '（疲劳驾驶） 报警时间趋势分析'
    },
    {
      name: 'getAlarmTypeRatioAnalysis',
      method: 'POST',
      path: '/zhfxpt/getAlarmTypeRatioAnalysis',
      mockPath: '/zhfxpt/getAlarmTypeRatioAnalysis',
      params: {
        orgId: '',
        lineId: '',
        startTime: '',
        endTime: '',
        warnLevel: ''
      },
      desc: '报警速度条件下各报警类型占比统计'
    },
    {
      name: 'getFatAlarmSpeedStatistic',
      method: 'POST',
      path: '/zhfxpt/getAlarmSpeedStatistic',
      mockPath: '/zhfxpt/getAlarmSpeedStatistic',
      params: {
        orgId: '',
        lineId: '',
        startTime: '',
        endTime: ''
      },
      desc: '各速度下报警总数统计'
    },
    {
      name: 'getBadDrivingBehaviorRankingDetail',
      method: 'POST',
      path: '/zhfxpt/getBadDrivingBehaviorRankingDetail',
      mockPath: '/zhfxpt/getBadDrivingBehaviorRankingDetail',
      params: {
        orgId: '',
        lineId: '',
        startTime: '',
        endTime: ''
      },
      desc: '不良驾驶行为日排行详情'
    },
    {
      name: 'wsUpdate',
      method: 'POST',
      path: '/warns/warnHandle',
      mockPath: '/warns/warnHandle',
      params: {
        orgId: '',
        lineId: '',
        startTime: '',
        endTime: '',
        pageNumber: '',
        pageSize: ''
      },
      desc: '更新疲劳处理状态'
    },
    {
      name: 'warnAudit',
      method: 'POST',
      path: '/warns/warnAudit',
      mockPath: '/warns/warnAudit',
      params: {
        warnUuid: '',
        auditStatus: '',
        auditSuggestion: ''
      },
      desc: '更新审核内容'
    },
    {
      name: 'getTaskPageList',
      method: 'POST',
      path: '/api/temp/device/send/task/taskPage/get',
      mockPath: '/api/temp/device/send/task/taskPage/get',
      params: {
        taskName: '',
        pageSize: '',
        pageNum: ''
      },
      desc: '参数任务--列表'
    }, {
      name: 'getOrgLineBusTree',
      method: 'POST',
      path: '/api/temp/device/send/task/orgLineBusTree/get',
      mockPath: '/api/temp/device/send/task/orgLineBusTree/get',
      params: {
      },
      desc: '参数设置-组织线路车辆树'
    }, {
      name: 'getTaskDetailPage',
      method: 'POST',
      path: '/api/temp/device/send/task/detail/taskDetailPage/get',
      mockPath: '/api/temp/device/send/task/detail/taskDetailPage/get',
      params: {
        taskUuid: '',
        pageSize: '',
        pageNum: ''
      },
      desc: '参数任务详情列表'
    }, {
      name: 'taskAdd',
      method: 'POST',
      path: '/api/temp/device/send/task/add',
      mockPath: '/api/temp/device/send/task/add',
      params: {},
      desc: '参数下发'
    }, {
      name: 'taskAdd2',
      method: 'POST',
      path: '/api/temp/device/send/task/add2',
      mockPath: '/api/temp/device/send/task/add2',
      params: {},
      desc: '参数补发'
    },
    {
      name: 'export',
      method: 'POST',
      path: '/deviceStatus/export',
      mockPath: '/deviceStatus/export',
      params: {},
      desc: '设备状态excel'
    },
    {
      name: 'overWarnInfoDetail',
      method: 'POST',
      path: '/warns/overWarnInfoDetail/get',
      mockPath: '/warns/overWarnInfoDetail/get',
      params: {
      },
      desc: '超速报警'
    },
    {
      name: 'getCarAlarmList',
      method: 'POST',
      path: '/zhfxpt/getBadDrivingBusRanking',
      mockPath: '/zhfxpt/getBadDrivingBusRanking',
      params: {
        orgId: '',
        lineId: '',
        startTime: '',
        endTime: '',
        warnTypes: []
      },
      desc: '车辆排行'
    },
    {
      name: 'getDrivingBehaviorDay',
      method: 'POST',
      path: '/zhfxpt/getDrivingBehaviorDay',
      mockPath: '/zhfxpt/getDrivingBehaviorDay',
      params: {
        orgId: '',
        lineId: '',
        startTime: '',
        endTime: '',
        busNumber: '',
        driverNum: '',
        warnTypes: []
      },
      desc: '监测台账'
    },
    {
      name: 'getAlarmUploadReportDay',
      method: 'POST',
      path: '/zhfxpt/getAlarmUploadReportDay',
      mockPath: '/zhfxpt/getAlarmUploadReportDay',
      params: {
        orgId: '',
        warnDate: ''
      },
      desc: '上传统计日报'
    },
    {
      name: 'devicePhotoList',
      method: 'POST',
      path: '/takePhoto/warnPage/get',
      mockPath: '/takePhoto/warnPage/get',
      params: {
        orgId: '',
        lineId: '',
        devCode: '',
        busPlateNumber: '',
        busSelfCode: '',
        warnTypeId: ['ADASSNAP', 'DMSTOSNAP'],
        pageNum: '',
        pageSize: '',
        startTime: '',
        endTime: ''
      },
      desc: '设备抓拍-列表'
    },
    {
      name: 'addAlarmResult',
      method: 'POST',
      path: '/api/base/sys/alarm/handle/result/add',
      mockPath: '/api/base/sys/alarm/handle/result/add',
      params: {
        hContext: '',
        hStatus: ''
      },
      desc: '报警处理结果-新增'
    },
    {
      name: 'updateAlarmResult',
      method: 'POST',
      path: '/api/base/sys/alarm/handle/result/update',
      mockPath: '/api/base/sys/alarm/handle/result/update',
      params: {
        uuid: '',
        hContext: '',
        hStatus: ''
      },
      desc: '报警处理结果-修改'
    },
    {
      name: 'deleteAlarmResult',
      method: 'POST',
      path: '/api/base/sys/alarm/handle/result/delete',
      mockPath: '/api/base/sys/alarm/handle/result/delete',
      params: {
        uuid: ''
      },
      desc: '报警处理结果-删除'
    },
    {
      name: 'getAlarmResult',
      method: 'POST',
      path: '/api/base/sys/alarm/handle/result/get',
      mockPath: '/api/base/sys/alarm/handle/result/get',
      params: {
        uuid: ''
      },
      desc: '报警处理结果-查询'
    },
    {
      name: 'getByStatus',
      method: 'POST',
      path: '/api/base/sys/alarm/handle/result/getByStatus',
      mockPath: '/api/base/sys/alarm/handle/result/getByStatus',
      params: {
        hStatus: ''
      },
      desc: '报警处理结果-根据状态查询处理结果'
    },
    // /zhfxpt/getAlarmHandleAnalysis
    {
      name: 'getAlarmHandleAnalysis',
      method: 'POST',
      path: '/zhfxpt/getAlarmHandleAnalysis',
      mockPath: '/zhfxpt/getAlarmHandleAnalysis',
      params: {
        userId: '',
        startTime: '',
        endTime: ''
      },
      desc: '用户处理结果报表'
    },
    {
      name: 'chargeList',
      method: 'POST',
      path: '/can/charge/pageList',
      mockPath: '/can/charge/pageList',
      params: {
      },
      desc: '充电详情列表'
    },
    {
      name: 'chargeExport',
      method: 'POST',
      path: '/can/charge/export',
      mockPath: '/can/charge/export',
      params: {
      },
      desc: '充电详情导出'
    },
    {
      name: 'carSpeedEcharts',
      method: 'POST',
      path: '/api/can/carspeed',
      mockPath: '/api/can/carspeed',
      params: {
      },
      desc: '车速历史趋势'
    },
    {
      name: 'socEcharts',
      method: 'POST',
      path: '/api/can/soc',
      mockPath: '/api/can//soc',
      params: {
      },
      desc: 'SOC历史趋势'
    },
    {
      name: 'motor1Speed',
      method: 'POST',
      path: '/api/can/motor1Speed',
      mockPath: '/api/can/motor1Speed',
      params: {
      },
      desc: 'SOC历史趋势'
    }
  ]
}
