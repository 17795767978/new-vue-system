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
    }, {
      name: 'getVmContentsByVtUuid',
      method: 'POST',
      path: '/msgsend/getVmContentsByVtUuid',
      mockPath: '/msgsend/getVmContentsByVtUuid',
      params: {
        voicetempTypeUuid: ''
      },
      desc: '获取提醒类型数据'
    }, {
      name: 'addNewVoicetempTypeData',
      method: 'POST',
      path: '/msgsend/addNewVoicetempTypeData',
      mockPath: '/msgsend/addNewVoicetempTypeData',
      params: {

      },
      desc: '新建一个提醒类型'
    }, {
      name: 'delNewVoicetempTypeById',
      method: 'POST',
      path: '/msgsend/delNewVoicetempTypeById',
      mockPath: '/msgsend/delNewVoicetempTypeById',
      params: {
        voicetempTypeUuid: ''
      },
      desc: '移除一个提醒类型'
    }, {
      name: 'editNewVoicetempTypeById',
      method: 'POST',
      path: '/msgsend/editNewVoicetempTypeById',
      mockPath: '/msgsend/editNewVoicetempTypeById',
      params: {
        voicetempTypeUuid: '', voicetempContent: '', voicetempTypeCode: ''
      },
      desc: '编辑一个提醒类型'
    }, {
      name: 'addVoicetempMessage',
      method: 'POST',
      path: '/msgsend/addVoicetempMessage',
      mockPath: '/msgsend/addVoicetempMessage',
      params: {
        voicetempTypeUuid: '', voicetempMessageContent: ''
      },
      desc: '为指定的提醒类型新增一条提醒内容'
    }, {
      name: 'editVoicetempMessage',
      method: 'POST',
      path: '/msgsend/editVoicetempMessage',
      mockPath: '/msgsend/editVoicetempMessage',
      params: {
        voicetempUuid: '', voicetempMessageContent: ''
      },
      desc: '编辑指定ID的提醒内容'
    }, {
      name: 'delVoicetempMessageById',
      method: 'POST',
      path: '/msgsend/delVoicetempMessageById',
      mockPath: '/msgsend/delVoicetempMessageById',
      params: {
        voicetempUuid: ''
      },
      desc: '移除一个提醒内容'
    }
  ]
}
