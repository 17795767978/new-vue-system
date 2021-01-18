// import api from '@/plugins/api'
// import store from '@/plugins/store'

const queryData = {
  state: {
    renderId: '1',
    queryId: '1'
  },
  mutations: {
    RENDER_DATA: (state, renderId) => {
      state.renderId = renderId
    },
    QUERY_ID: (state, queryId) => {
      state.queryId = queryId
    }
  },
  actions: {
    getStation ({ commit }, id) {
      commit('RENDER_DATA', id)
    },
    getQuery ({ commit }, id) {
      commit('QUERY_ID', id)
    }
  }
}

export default queryData
