export const wholeInformationApi = {
  wholeInformation: [
    {
      name: 'getLine',
      method: 'POST',
      path: '/api/bus/line/list',
      mockPath: '/api/bus/line/list',
      desc: '获取线路信息'
    },
    {
      name: 'getLineTree',
      method: 'POST',
      path: '/api/base/user/getOrgLineAuths',
      mockPath: '/api/base/user/getOrgLineAuths',
      params: {
        orgUuid: ''
      },
      desc: '获取线路树形结构'
    },
    {
      name: 'getBusByLineIds',
      method: 'POST',
      path: '/api/bus/getBusByLineIds',
      mockPath: '/api/bus/getBusByLineIds',
      params: {
        lineUuids: []
      },
      desc: '线路树形结构联动表格'
    },
    {
      name: 'correlationLinePermissions',
      method: 'POST',
      path: '/api/base/role/correlationLinePermissions',
      mockPath: '/api/base/role/correlationLinePermissions',
      params: {
        roleId: '',
        resourceIds: []
      },
      desc: '增加线路权限'
    },
    {
      name: 'getLineSec',
      method: 'POST',
      path: '/api/net/data/busline/getLineListData',
      mockPath: '/api/net/data/busline/getLineListData',
      desc: '--获取线网线路信息--'
    },
    {
      name: 'getComSec',
      method: 'POST',
      path: '/api/net/data/busline/getCompanyListData',
      mockPath: '/api/net/data/busline/getCompanyListData',
      desc: '--获取线网机构信息--'
    },
    {
      name: 'getStation',
      method: 'POST',
      path: '/zhfxpt/analysis/getStations',
      mockPath: '/zhfxpt/analysis/getStations',
      desc: '获取站点信息'
    },
    {
      name: 'getCompany',
      method: 'POST',
      path: '/api/bus/sysorg/list',
      mockPath: '/api/bus/sysorg/list',
      params: {},
      desc: '获取机构信息'
    },
    {
      name: 'getCar',
      method: 'POST',
      path: '/api/bus/list',
      mockPath: '/api/bus/list',
      params: {
        orgId: '',
        lineId: ''
      },
      desc: '获取车辆信息'
    },
    {
      name: 'getCarNo',
      method: 'POST',
      path: '/api/bus/carNo',
      mockPath: '/api/bus/carNo',
      params: {
        orgId: '',
        lineId: ''
      },
      desc: '获取车辆自编号'
    },
    {
      name: 'getCityCoordinatePoints',
      method: 'POST',
      path: '/api/base/common/getCityCoordinatePoints',
      mockPath: '/api/base/common/getCityCoordinatePoints',
      params: {},
      desc: '获取城市坐标'
    },
    {
      name: 'getAllBaseStationNamesListData',
      method: 'POST',
      path: '/api/net/data/basestation/getAllBaseStationNamesListData',
      mockPath: '/api/net/data/basestation/getAllBaseStationNamesListData',
      params: {},
      desc: '站位列表'
    },
    {
      name: 'videoInfo',
      method: 'POST',
      path: '/api/base/video/param/info/list',
      mockPath: '/api/base/video/param/info/list',
      params: {},
      desc: '视频通道'
    },
    {
      name: 'videoInfoAdd',
      method: 'POST',
      path: '/api/base/bus/video/info/add',
      mockPath: '/api/base/bus/video/info/add',
      params: {
      },
      desc: '车辆视频位置关系-新增'
    },
    {
      name: 'videoList',
      method: 'POST',
      path: '/api/base/bus/video/info/list',
      mockPath: '/api/base/bus/video/info/list',
      params: {},
      desc: '车辆视频位置关系-列表'
    },
    {
      name: 'videoUpdateList',
      method: 'POST',
      path: '/api/base/bus/video/info/update',
      mockPath: '/api/base/bus/video/info/update',
      params: {},
      desc: '车辆视频位置关系-更新'
    },
    {
      name: 'getDevType',
      method: 'POST',
      path: '/zhfxpt/getDevType',
      mockPath: '/zhfxpt/getDevType',
      params: {},
      desc: '设备列表'
    },
    {
      name: 'getPassengerFlowAlgList',
      method: 'POST',
      path: '/api/kl/config/item/getAll',
      mockPath: '/api/kl/config/item/getAll',
      params: {},
      desc: '客流算法配置列表'
    },
    {
      name: 'updatePassengerFlowAlg',
      method: 'POST',
      path: '/api/kl/config/item/update',
      mockPath: '/api/kl/config/item/update',
      params: {},
      desc: '客流算法配置更新'
    },
    {
      name: 'setRelationLine',
      method: 'POST',
      path: '/api/kl/config/item/setRelationLine',
      mockPath: '/api/kl/config/item/setRelationLine',
      params: {},
      desc: '客流算法配置设置线路'
    },
    {
      name: 'busToDevGet',
      method: 'POST',
      path: '/api/bus/getDeviceInfos',
      mockPath: '/api/bus/getDeviceInfos',
      params: {
      },
      desc: '车辆管理---查询挂接设备'
    },
    {
      name: 'deleteBus',
      method: 'POST',
      path: '/buses/delete',
      mockPath: '/buses/delete',
      params: {
      },
      desc: '车辆管理---删除'
    },
    {
      name: 'isvalidBus',
      method: 'POST',
      path: '/buses/isvalid/update',
      mockPath: '/buses/isvalid/update',
      params: {
      },
      desc: '车辆管理---启用/禁用'
    },
    {
      name: 'busDeviceClassList',
      method: 'POST',
      path: '/api/sys/datadict/getDatadicts',
      mockPath: '/api/sys/datadict/getDatadicts',
      params: {
      },
      desc: 'bus设备类型列表'
    },
    {
      name: 'deviceClassList',
      method: 'POST',
      path: '/api/sys/datadict/list',
      mockPath: '/api/sys/datadict/list',
      params: {
      },
      desc: '设备类型列表'
    },
    {
      name: 'deviceList',
      method: 'POST',
      path: '/api/device/nobindDevices',
      mockPath: '/api/device/nobindDevices',
      params: {
      },
      desc: '获取可用设备下拉列表'
    },
    {
      name: 'createBus',
      method: 'POST',
      path: '/buses/create',
      mockPath: '/buses/create',
      params: {
      },
      desc: '车辆---新增'
    },
    // /api/bus/device/binding
    {
      name: 'updateBus',
      method: 'POST',
      path: '/api/bus/device/binding',
      mockPath: '/api/bus/device/binding',
      params: {
      },
      desc: '车辆编辑'
    },
    {
      name: 'downloadFile',
      method: 'POST',
      path: '/excel/template/download',
      mockPath: '/excel/template/download',
      params: {
      },
      desc: 'Excel导入---导入---模板下载'
    },
    {
      name: 'checkImportLog',
      method: 'POST',
      path: '/excel/log/logpage/get',
      mockPath: '/excel/log/logpage/get',
      params: {
      },
      desc: 'Excel导入日志查看'
    },
    {
      name: 'uploadFileSave',
      method: 'POST',
      path: '/excel/create',
      mockPath: '/excel/create',
      params: {
      },
      desc: 'Excel导入---导入---保存'
    },
    {
      name: 'devicepageSearch',
      method: 'POST',
      path: '/api/device/list',
      mockPath: '/api/device/list',
      params: {
      },
      desc: '设备管理---列表信息查询'
    },
    {
      name: 'deleteDevice',
      method: 'POST',
      path: '/api/device/delete',
      mockPath: '/api/device/delete',
      params: {
      },
      desc: '设备管理---删除'
    },
    {
      name: 'isvalidDevice',
      method: 'POST',
      path: '/api/device/update',
      mockPath: '/api/device/update',
      params: {
      },
      desc: '设备管理---设备启用禁用'
    },
    {
      name: 'createDevice',
      method: 'POST',
      path: '/api/device/add',
      mockPath: '/api/device/add',
      params: {
      },
      desc: '设备管理---新增'
    },
    {
      name: 'updateDevice',
      method: 'POST',
      path: '/api/device/update',
      mockPath: '/api/device/update',
      params: {
      },
      desc: '设备管理---编辑'
    }
  ]
}
