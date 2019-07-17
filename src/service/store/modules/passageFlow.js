/**
 * 客流断面echarts数据存储
 */
import api from '@/plugins/api'

const SectionData = {
  state: {
    sectionData: {}
  },
  mutations: {
    SET_SECTIONDATA (state, data) {
      state.sectionData = data
    }

  },
  actions: {
    getSectionData ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api['schedulingAnalysis.getAnalysisDatasByWarnLeave'](params).then(res => {
          commit('SET_SECTIONDATA', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default SectionData
