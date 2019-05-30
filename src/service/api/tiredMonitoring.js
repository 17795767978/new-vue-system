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
        endTime: '',
        pageSize: 10,
        pageNum: 1
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
      path: '/deviceStatus/lineDeviceStatusPage/get',
      mockPath: '/deviceStatus/lineDeviceStatusPage/get',
      params: {
        pageNum: '',
        pageSize: '',
        lineUuid: [],
        orgUuid: ''
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
        plWarnLevel: '',
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
        plWarnLevel: '',
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
    }
  ]
}
