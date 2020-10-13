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
      name: 'deviceManageList',
      method: 'POST',
      path: '/takePhoto/takephotoPage/get',
      mockPath: '/takePhoto/takephotoPage/get',
      params: {
        orgId: '', // 组织机构id
        lineId: '', // 线路id
        devCode: '', // 设备号
        busPlateNumber: '', // 车牌号
        busSelfCode: '', // 自编号
        startDate: '', // 日期
        endDate: '',
        pageSize: '',
        pageNum: ''
      },
      desc: '设备抓拍设置-列表'
    },
    {
      name: 'deletePhoto',
      method: 'POST',
      path: '/takePhoto/delete',
      mockPath: '/takePhoto/delete',
      params: {
        takePhotoUuids: []
      },
      desc: '设备抓拍设置-删除'
    },
    // {
    //   name: 'deletePhoto',
    //   method: 'POST',
    //   path: '/takePhoto/delete',
    //   mockPath: '/takePhoto/delete',
    //   params: {
    //     takePhotoUuids: []
    //   },
    //   desc: '设备抓拍设置-删除'
    // },
    {
      name: 'addPhoto',
      method: 'POST',
      path: '/takePhoto/add',
      mockPath: '/takePhoto/add',
      params: {
        startDate: '',
        endDate: '',
        isvalid: '',
        timingClass: '',
        timingRemark: '',
        startTime: '',
        endTime: '',
        duration: '',
        devList: []
      },
      desc: '设备抓拍设置-新增'
    },
    {
      name: 'manual',
      method: 'POST',
      path: '/takePhoto/manual',
      mockPath: '/takePhoto/manual',
      params: {
        devList: []
      },
      desc: '设备抓拍设置-主动抓拍'
    },
    {
      name: 'photoUpdate',
      method: 'POST',
      path: '/takePhoto/update',
      mockPath: '/takePhoto/update',
      params: {
      },
      desc: '设备抓拍设置-修改'
    },
    {
      name: 'minieyeBusList',
      method: 'POST',
      path: '/takePhoto/minieyeBusList/get',
      mockPath: '/takePhoto/minieyeBusList/get',
      params: {
        lineIds: ''
      },
      desc: '设备抓拍设置-根据线路查车辆'
    },
    {
      name: 'paramsListGet',
      method: 'POST',
      path: '/api/base/sys/param/info/parampage/get',
      mockPath: '/api/base/sys/param/info/parampage/get',
      params: {
      },
      desc: '系统参数列表'
    },
    {
      name: 'paramsCreate',
      method: 'POST',
      path: '/api/base/sys/param/info/add',
      mockPath: '/api/base/sys/param/info/add',
      params: {
      },
      desc: '系统参数新增'
    },
    {
      name: 'paramsUpdate',
      method: 'POST',
      path: '/api/base/sys/param/info/update',
      mockPath: '/api/base/sys/param/info/update',
      params: {
      },
      desc: '系统参数修改更新'
    },
    {
      name: 'paramsDelete',
      method: 'POST',
      path: '/api/base/sys/param/info/delete',
      mockPath: '/api/base/sys/param/info/delete',
      params: {
      },
      desc: '系统参数删除'
    },
    {
      name: 'getLoginList',
      method: 'POST',
      path: '/api/base/loginlog/list',
      mockPath: '/api/base/loginlog/list',
      params: {
        orgUuid: '',
        userAccount: '',
        accessModel: '',
        accessIp: '',
        startTime: '',
        endTime: ''
      },
      desc: '登录日志'
    },
    {
      name: 'getModelAndPageInfoByUserId',
      method: 'POST',
      path: '/api/base/accesslog/getModelAndPageInfoByUserId',
      mockPath: '/api/base/accesslog/getModelAndPageInfoByUserId',
      params: {
      },
      desc: '获取登录用户能访问的模块及页面信息'
    },
    {
      name: 'getPageAssessLog',
      method: 'POST',
      path: '/api/base/accesslog/list',
      mockPath: '/api/base/accesslog/list',
      params: {
        orgId: '',
        userId: '',
        accessModelName: '',
        accessPageName: '',
        accessIp: '',
        startTime: '',
        endTime: ''
      },
      desc: '页面访问日志'
    },
    {
      name: 'loginLogStatisticAnalysis',
      method: 'POST',
      path: '/api/base/loginlog/loginLogStatisticAnalysis',
      mockPath: '/api/base/loginlog/loginLogStatisticAnalysis',
      params: {
        startTime: '',
        endTime: '',
        orgId: ''
      },
      desc: '每日登录情况统计'
    },
    {
      name: 'accessLogStatisticAnalysis',
      method: 'POST',
      path: '/api/base/accesslog/accessLogStatisticAnalysis',
      mockPath: '/api/base/accesslog/accessLogStatisticAnalysis',
      params: {
        startTime: '',
        endTime: '',
        orgId: ''
      },
      desc: '分公司用户操作频次统计'
    },
    {
      name: 'pageLogStatisticAnalysis',
      method: 'POST',
      path: '/api/base/accesslog/pageLogStatisticAnalysis',
      mockPath: '/api/base/accesslog/pageLogStatisticAnalysis',
      params: {
        startTime: '',
        endTime: '',
        orgId: ''
      },
      desc: '页面操作频次统计'
    },
    {
      name: 'getDurations',
      method: 'POST',
      path: '/api/base/accesspagelog/add',
      mockPath: '/api/base/accesspagelog/add',
      params: {
        userId: '',
        accessPageName: '',
        accessDuration: ''
      },
      desc: '获取用户访问行为日志（页面停留时间）'
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
    {
      name: 'busDeviceClassList',
      method: 'POST',
      path: '/api/sys/datadict/getDatadicts',
      mockPath: '/api/sys/datadict/getDatadicts',
      params: {
      },
      desc: 'bus设备类型列表'
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
    },
    {
      name: 'busToDevGet',
      method: 'POST',
      path: '/api/bus/getDeviceInfos',
      mockPath: '/api/bus/getDeviceInfos',
      params: {
      },
      desc: '车辆管理---查询挂接设备'
    }
  ]
}
