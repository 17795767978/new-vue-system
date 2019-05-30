import api from '@/plugins/api'
/**
 * Globel STORE
 */
const selectData = {
  state: {
    lineData: [],
    stationData: [],
    comData: []
    // carData: []
  },
  mutations: {
    LINE_DATA: (state, lineData) => {
      state.lineData = lineData
    },
    STATION_DATA: (state, stationData) => {
      state.stationData = stationData
    },
    COM_DATA: (state, comData) => {
      state.comData = comData
    }
  },
  actions: {
    getLineList ({ commit }) {
      return new Promise((resolve, reject) => {
        api['wholeInformation.getLine']({
          lineId: '',
          lineName: ''
        }).then(res => {
          let list = []
          res.data.data.forEach(item => {
            list.push({
              label: item.lineName,
              value: item.lineUuid
            })
          })
          commit('LINE_DATA', list)
          resolve(list)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getStationList ({ commit }) {
      return new Promise((resolve, reject) => {
        api['wholeInformation.getStation']().then(res => {
          commit('STATION_DATA', res.data.data.list)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getComList ({ commit }) {
      return new Promise((resolve, reject) => {
        api['wholeInformation.getCompany']({
          orgId: '',
          orgName: ''
        }).then(res => {
          let list = []
          res.data.data.forEach(item => {
            list.push({
              label: item.orgName,
              value: item.orgUuid
            })
          })
          commit('COM_DATA', list)
          resolve(list)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default selectData
