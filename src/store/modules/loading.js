const state = {
    loadingShow: false
}

const mutations = {
    SET_LOADING: (state, loadingShow) => {
        state.loadingShow = loadingShow
    }
}
export default {
    state,
    mutations
  }