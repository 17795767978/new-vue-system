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
    }
  ]
}
