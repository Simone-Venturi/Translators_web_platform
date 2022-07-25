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
      return state.profile == null ? 0 : state.profile.translations
    },
    getAlignmentsNumber(state){
      return state.profile == null ? 0 : state.profile.alignments
    },
    getReviewsNumber(state){
      return state.profile == null ? 0 : state.profile.reviews
    },
    getReviewMeanAllTranslations(state){
      return state.profile == null ? 0 : state.profile.mean_review_all_translations
    },
    getReviewMeanTranslationsNotFromAlignment(state){
      return state.profile == null ? 0 : state.profile.mean_review_translations_not_from_alignment
    },
    getReviewMeanTranslationsFromAlignment(state){
      return state.profile == null ? 0 : state.profile.mean_review_translations_from_alignment
    },
    getReviewWeightedAverageAllTranslations(state){
      return state.profile == null ? 0 : state.profile.weighted_average_review_all_translations
    },
    getReviewWeightedAverageTranslationsNotFromAlignment(state){
      return state.profile == null ? 0 : state.profile.weighted_average_review_translations_not_from_alignment
    },
    getReviewWeightedAverageTranslationsFromAlignment(state){
      return state.profile == null ? 0 : state.profile.weighted_average_review_translations_from_alignment
    }
  }
};