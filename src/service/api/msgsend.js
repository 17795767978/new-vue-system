export const msgsendApi = {
  msgsend: [
    {
      name: 'getVoicetempTypeData',
      method: 'POST',
      path: '/msgsend/getVoicetempTypeData',
      mockPath: '/msgsend/getVoicetempTypeData',
      params: {
        voicetempTypeCode: '',
        voicetempContent: ''
      },
      desc: '获取提醒类型数据'
    }
  ]
}
