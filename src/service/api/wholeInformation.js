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
    }
  ]
}
