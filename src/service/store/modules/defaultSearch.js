// import api from '@/plugins/api'
// import store from '@/plugins/store'

const defaultSearch = {
  state: {
    defaultSearch: {}
  },
  mutations: {
    DEFAULT_SEARCH: (state, defaultSearch) => {
      state.defaultSearch = defaultSearch
    }
  },
  actions: {
    getDefaultSearch ({ commit }, data) {
      commit('DEFAULT_SEARCH', data)
    }
  }
}

export default defaultSearch
