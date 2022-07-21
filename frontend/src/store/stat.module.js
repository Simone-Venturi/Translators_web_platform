import ProfileService from '../services/profile.service';

export const stat = {
  namespaced: true,
  state: {
    profile: null
  },
  actions: {
    readAllStatistics({commit}){
      return ProfileService.readAllStatistics().then(
        (stats) => {
          commit('readAllStatisticsSuccess', stats);
          return Promise.resolve(stats);
        },
        (error) => {
          commit('readAllStatisticsFailure');
          return Promise.reject(error);
        }
      );
    }
  },    
  mutations: {
    readAllStatisticsSuccess(state, statistics) {
      state.profile = statistics.data;
    },
    readAllStatisticsFailure(state) {
      state.profile = null
    }
  },
  getters: {
    getAllStatistics(state){
      return state.profile
    },
    getTranslationsNumber(state){
      return state.profile.translations
    },
    getAlignmentsNumber(state){
      return state.profile.alignments
    },
    getReviewsNumber(state){
      return state.profile.reviews
    }
  }
};