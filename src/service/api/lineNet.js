export const lineNetApi = {
  lineNet: [
    {
      name: 'getlineNumLength',
      method: 'POST',
      path: '/api/net/data/busline/getCompanyEchartData',
      mockPath: '/api/net/data/busline/getCompanyEchartData',
      params: {
        company: '',
        lineID: ''
      },
      desc: '分公司线路条数/总长度'
    },
    {
      name: 'getComStation',
      method: 'POST',
      path: '/api/net/data/basestation/getCompanyEchartData',
      mockPath: '/api/net/data/basestation/getCompanyEchartData',
      params: {
        company: '',
        lineID: ''
      },
      desc: '分公司站点/站位数'
    },
    {
      name: 'getLineOnOrDownEchartData',
      method: 'POST',
      path: '/api/net/data/busline/getLineOnOrDownEchartData',
      mockPath: '/api/net/data/busline/getLineOnOrDownEchartData',
      params: {
        company: '',
        lineID: ''
      },
      desc: '(公交*公司)线路长度'
    },
    {
      name: 'getLineCondition',
      method: 'POST',
      path: '/api/net/data/busline/getCompanyLineListsData',
      mockPath: '/api/net/data/busline/getCompanyLineListsData',
      params: {
        company: '',
        lineID: ''
      },
      desc: '线路情况列表'
    },
    {
      name: 'getRepeatData',
      method: 'POST',
      path: '/api/net/index/repeat/company/getCompanyLineRepeatEchartData',
      mockPath: '/api/net/index/repeat/company/getCompanyLineRepeatEchartData',
      params: {
        company: '',
        lineID: ''
      },
      desc: '分公司线路重复度'
    },
    {
      name: 'getrepeatPieData',
      method: 'POST',
      path: '/api/net/index/repeat/linenum/getCompanyLineNumRepeatPieData',
      mockPath: '/api/net/index/repeat/linenum/getCompanyLineNumRepeatPieData',
      params: {
        company: '',
        lineID: ''
      },
      desc: '重复度指标雷达图'
    }, {
      name: 'getRepeatTable',
      method: 'POST',
      path: '/api/net/index/repeat/arrow/getCompanyLineRepeatListData',
      mockPath: '/api/net/index/repeat/arrow/getCompanyLineRepeatListData',
      params: {
        company: '',
        lineID: ''
      },
      desc: '重复度指标列表'
    },
    {
      name: 'getRepeatDetailLink',
      method: 'POST',
      path: '/api/net/index/repeat/sc/getCompanyLineRepeatScListData',
      mockPath: '/api/net/index/repeat/sc/getCompanyLineRepeatScListData',
      params: {
        company: '',
        lineID: '',
        arrow: '',
        sStation: '',
        eStation: ''
      },
      desc: '重复度指标链接列表'
    },
    {
      name: 'getPfBaseListData',
      method: 'POST',
      path: '/api/net/index/pf/base/getPfBaseListData',
      mockPath: '/api/net/index/pf/base/getPfBaseListData',
      params: {
        company: '',
        lineID: '',
        arrow: '',
        pDate: ''
      },
      desc: '线路站点客流综合列表'
    },
    {
      name: 'getPfStationDayListGridData',
      method: 'POST',
      path: '/api/net/index/pf/station/day/getPfStationDayListGridData',
      mockPath: '/api/net/index/pf/station/day/getPfStationDayListGridData',
      params: {
        company: '',
        lineID: '',
        arrow: '',
        pDate: ''
      },
      desc: '线路站点登降量'
    },
    {
      name: 'getPfBaseUpDownGrid',
      method: 'POST',
      path: '/api/net/index/pf/base/getPfBaseUpDownGrid',
      mockPath: '/api/net/index/pf/base/getPfBaseUpDownGrid',
      params: {
        company: '',
        lineID: '',
        arrow: '',
        pDate: ''
      },
      desc: '线路时段登降量'
    },
    {
      name: 'getPfBaseApprovalGrid',
      method: 'POST',
      path: '/api/net/index/pf/base/getPfBaseApprovalGrid',
      mockPath: '/api/net/index/pf/base/getPfBaseApprovalGrid',
      params: {
        company: '',
        lineID: '',
        arrow: '',
        pDate: ''
      },
      desc: '线路时段满载率'
    }
  ]
}
