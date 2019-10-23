
const routerData = {
  state: {
    data: {}
  },
  mutations: {
    ROUTER_DATA: (state, data) => {
      state.data = data
    }
  },
  actions: {
    getRouterData ({ commit }, data) {
      return new Promise((resolve, reject) => {
        resolve(data)
        commit('ROUTER_DATA', data)
      })
    }
  }
}

export default routerData
