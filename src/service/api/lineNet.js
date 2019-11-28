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
    },
    {
      name: 'getDeaLineScoreListData',
      method: 'POST',
      path: '/api/net/index/dea/linescore/getDeaLineScoreListData',
      mockPath: '/api/net/index/dea/linescore/getDeaLineScoreListData',
      params: {
        company: '',
        lineID: ''
      },
      desc: '线网评分-列表'
    },
    {
      name: 'getLevelLineCountListData',
      method: 'POST',
      path: '/api/net/index/level/entropy/result/getLevelLineCountListData',
      mockPath: '/api/net/index/level/entropy/result/getLevelLineCountListData',
      params: {
        company: '',
        lineID: ''
      },
      desc: '线网评分-线路等级占比'
    },
    {
      name: 'getNetIndexDeaData',
      method: 'POST',
      path: '/api/net/index/dea/transfordata/getNetIndexDeaData',
      mockPath: '/api/net/index/dea/transfordata/getNetIndexDeaData',
      params: {
        company: '',
        lineID: ''
      },
      desc: '线网评分指标链接-列表'
    },
    {
      name: 'getCompanyLineCountsListData',
      method: 'POST',
      path: '/api/net/data/busline/getCompanyLineCountsListData',
      mockPath: '/api/net/data/busline/getCompanyLineCountsListData',
      params: {
        company: '',
        lineID: ''
      },
      desc: '数据总览-分公司线路条数饼图'
    },
    {
      name: 'getLineRepeatTOP10ListData',
      method: 'POST',
      path: '/api/net/index/repeat/arrow/getLineRepeatTOP10ListData',
      mockPath: '/api/net/index/repeat/arrow/getLineRepeatTOP10ListData',
      params: {
        company: '',
        lineID: ''
      },
      desc: '数据总览-线路重复度TOP10'
    },
    {
      name: 'getDayPfTOP10ListData',
      method: 'POST',
      path: '/api/net/index/pf/line/day/getDayPfTOP10ListData',
      mockPath: '/api/net/index/pf/line/day/getDayPfTOP10ListData',
      params: {
        company: '',
        lineID: ''
      },
      desc: '数据总览-线路日均客流TOP10'
    },
    {
      name: 'getDeaLineScoreGrid',
      method: 'POST',
      path: '/api/net/index/dea/linescore/getDeaLineScoreGrid',
      mockPath: '/api/net/index/dea/linescore/getDeaLineScoreGrid',
      params: {
        company: '',
        lineID: ''
      },
      desc: '数据总览-线路评分展示'
    },
    {
      name: 'getIndexPfLineDayListData',
      method: 'POST',
      path: '/api/net/index/pf/line/day/getIndexPfLineDayListData',
      mockPath: '/api/net/index/pf/line/day/getIndexPfLineDayListData',
      params: {
        company: '',
        lineID: '',
        arrow: '',
        pDate: ''
      },
      desc: '线路客流综合查询-列表'
    },
    {
      name: 'getPfOdbrushCountListGridData',
      method: 'POST',
      path: '/api/net/index/pf/od/getPfOdbrushCountListGridData',
      mockPath: '/api/net/index/pf/od/getPfOdbrushCountListGridData',
      params: {
        company: '',
        lineID: '',
        arrow: '',
        pDate: ''
      },
      desc: '线路客流综合查询-线路各时间段客流详情-刷卡总量'
    },
    {
      name: 'getPfOdZZLListGridData',
      method: 'POST',
      path: '/api/net/index/pf/od/getPfOdZZLListGridData',
      mockPath: '/api/net/index/pf/od/getPfOdZZLListGridData',
      params: {
        company: '',
        lineID: '',
        arrow: '',
        pDate: ''
      },
      desc: '线路客流综合查询-线路各时间段客流详情-周转量'
    },
    {
      name: 'getPfOdPJYJListGridData',
      method: 'POST',
      path: '/api/net/index/pf/od/getPfOdPJYJListGridData',
      mockPath: '/api/net/index/pf/od/getPfOdPJYJListGridData',
      params: {
        company: '',
        lineID: '',
        arrow: '',
        pDate: ''
      },
      desc: '线路客流综合查询-线路各时间段客流详情-平均运距'
    },
    {
      name: 'getPfLineOdCountListData',
      method: 'POST',
      path: '/api/net/index/pf/od/getPfLineOdCountListData',
      mockPath: '/api/net/index/pf/od/getPfLineOdCountListData',
      params: {
        company: '',
        lineID: '',
        arrow: '',
        pDate: ''
      },
      desc: '线路OD-线路OD矩形-列表'
    },
    {
      name: 'getPfODYCountListData',
      method: 'POST',
      path: '/api/net/index/pf/od/getPfODYCountListData',
      mockPath: '/api/net/index/pf/od/getPfODYCountListData',
      params: {
        company: '',
        lineID: '',
        arrow: '',
        pDate: ''
      },
      desc: '线路OD-线路OD图'
    },
    {
      name: 'getAnalStaOdDataListData',
      method: 'POST',
      path: '/api/anal/sta/od/month/data/getAnalStaOdDataListData',
      mockPath: '/api/anal/sta/od/month/data/getAnalStaOdDataListData',
      params: {
        month: '',
        linearDistanceMin: '',
        linearDistanceMax: '',
        payNumberMin: '',
        payNumberMax: '',
        payTimeIntervalMin: '',
        payTimeIntervalMax: ''
      },
      desc: '全市站点OD矩阵'
    },
    {
      name: 'getMidLinePFData',
      method: 'POST',
      path: '/api/mid/pf/detail/time/data/getMidLinePFData',
      mockPath: '/api/mid/pf/detail/time/data/getMidLinePFData',
      params: {
        orgUuid: '',
        lineUuid: '',
        lineType: '',
        date: ''
      },
      desc: '线路客流查询-列表'
    },
    {
      name: 'getMidLinePFGridData',
      method: 'POST',
      path: '/api/mid/pf/detail/time/data/getMidLinePFGridData',
      mockPath: '/api/mid/pf/detail/time/data/getMidLinePFGridData',
      params: {
        orgUuid: '',
        lineUuid: '',
        lineType: '',
        date: ''
      },
      desc: '线路客流查询-折线图'
    },
    {
      name: 'getHeatMapData',
      method: 'POST',
      path: '/api/mid/pd/detail/time/month/data/getHeatMapData',
      mockPath: '/api/mid/pd/detail/time/month/data/getHeatMapData',
      params: {
        updateMonth: '',
        payTimeIntervalMin: '',
        payTimeIntervalMax: ''
      },
      desc: '客流热力等分析'
    }
  ]
}
