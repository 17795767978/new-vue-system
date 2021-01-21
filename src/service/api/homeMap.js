export const homeMapApi = {
  homeMap: [
    {
      name: 'getBusPositionAndFullLoadRate',
      method: 'POST',
      path: '/zhfxpt/map/getBusPositionAndFullLoadRate',
      mockPath: '/zhfxpt/map/getBusPositionAndFullLoadRate',
      params: {
        orgId: ''
      },
      desc: '车辆实时位置及满载率'
    },
    {
      name: 'getBusHeatmapDatas',
      method: 'POST',
      path: '/zhfxpt/map/getBusHeatmapDatas',
      mockPath: '/zhfxpt/map/getBusHeatmapDatas',
      params: {
        orgId: ''
      },
      desc: '线路站点热力数据'
    },
    {
      name: 'getLineNetInfos',
      method: 'POST',
      path: '/api/bus/line/getLineNetInfos',
      mockPath: '/api/bus/line/getLineNetInfos',
      params: {
        orgId: ''
      },
      desc: '线路规划点'
    }
  ]
}
