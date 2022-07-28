import ProfileService from '../services/profile.service';
import moment from 'moment';

export const stat = {
  namespaced: true,
  state: {
    profile: null,
    chart: null
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
    },
    readChartStatistics({commit}){
      return ProfileService.readChartStatistics().then(
        (stats) => {
          commit('readChartStatisticsSuccess', stats);
          return Promise.resolve(stats);
        },
        (error) => {
          commit('readChartStatisticsFailure');
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
    },
    readChartStatisticsSuccess(state, chart) {      
      let date1month = new Date()
      date1month.setMonth(date1month.getMonth() - 1)
      let current = new moment(date1month);
      let end = new moment();
      let dates = []
      while (current.isBefore(end)) {
        dates.push(current.startOf('isoWeek').format('YYYY-MM-DD'));
        current.add(7, 'days');
      }
      let translations = []
      dates.forEach(date => {
        if(chart.data.translations.filter(record => record.createdAtWeek.substring(0,10) == date).length){
          translations.push(parseInt(chart.data.translations.filter(record => record.createdAtWeek.substring(0,10) == date).map(record => record.count)[0]))
        } else {
          translations.push(0)
        }
      })
      let reviews = []
      dates.forEach(date => {
        if(chart.data.reviews.filter(record => record.createdAtWeek.substring(0,10) == date).length){
          reviews.push(parseInt(chart.data.reviews.filter(record => record.createdAtWeek.substring(0,10) == date).map(record => record.count)[0]))
        } else {
          reviews.push(0)
        }
      })
      state.chart = {
        labels: dates,
        translations: translations,
        reviews: reviews
      }
    },
    readChartStatisticsFailure(state) {
      state.chart = null
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
    },
    getChartStatisticsLabels(state){
      return state.chart == null ? [0] : state.chart.labels
    },
    getChartStatisticsTranslationsData(state){
      return state.chart == null ? [0] : state.chart.translations
    },
    getChartStatisticsReviewsData(state){
      return state.chart == null ? [0] : state.chart.reviews
    },
  }
};