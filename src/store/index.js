import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      user: {
        lastupdate: null,
        updating: false,
        data: {
          userid: null,
          userType: -1,          // -1 for no login, 0 for common user, 1 for admin
          name: null,
          username: null,
          telephone: null
        }
      },
      profile: {
        lastupdate: null,
        updating: false,
        data: {
          selectedJob: null,     // maybe {id: ..., name:..., score:...}                 {id: 0, name: "aaa", score: 99}
          tags: []               // maybe [{id: ..., name:..., level:...}, ...]
        },
      },
      analysis: {
        lastupdate: null,
        updating: false,
        data: []                 // maybe {id: ..., name:..., level:...}                 {id: 0, name: "aaa", score: 20}
      },
    },
    mutations: {
      startUserUpdate (state) {
        state.user.updating = true;
      },
      updateUser (state, payload) {
        state.user.data = payload;
        state.user.lastupdate = Date.now();
        state.user.updating = false;
      },
      logoutUser (state) {
        state.user = {
          lastupdate: null,
          updating: false,
          data: {
            userid: null,
            userType: -1,
            name: null,
            username: null,
            telephone: null
          }
        }
      },

      startProfileUpdate (state) {
        state.profile.updating = true;
      },
      updateSelectJob (state, payload) {
        state.profile.data.selectedJob = payload;
        state.profile.lastupdate = Date.now();
      },
      updateTags (state, payload) {
        state.profile.data.tags = payload;
        state.profile.lastupdate = Date.now();
      },
      finishProfileUpdate (state) {
        state.profile.updating = false;
      },

      startAnalysisUpdate (state) {
        state.user.updating = true;
      },
      updateAnalysis (state, payload) {
        state.analysis.data = payload;
        state.analysis.lastupdate = Date.now();
      },
      finishAnalysisUpdate (state) {
        state.user.updating = false;
      },

    }
  })