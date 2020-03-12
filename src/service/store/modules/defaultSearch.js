// import api from '@/plugins/api'
// import store from '@/plugins/store'

const defaultSearch = {
  state: {
    defaultSearch: {},
    formDown: ''
  },
  mutations: {
    DEFAULT_SEARCH: (state, defaultSearch) => {
      console.log(defaultSearch)
      state.defaultSearch = defaultSearch
    },
    FORM_DOWN: (state, data) => {
      state.formDown = data
    }
  },
  actions: {
    getDefaultSearch ({ commit }, data) {
      commit('DEFAULT_SEARCH', data)
    },
    getDownloadData ({ commit }, data) {
      // console.log(data)
      // let dataForm = { datas: data }
      let dataForm = JSON.stringify(data)
      commit('FORM_DOWN', dataForm)
    }
  }
}

export default defaultSearch
