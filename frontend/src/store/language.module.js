import LanguageService from '../services/language.service';

export const language = {
  namespaced: true,
  state: {
    allLanguages: null,
    languagesKnown: null
  },
  actions: {
    readAllLanguagesKnownByUser({commit}){
      return LanguageService.getAllLanguagesFilteredByUser().then(
        (languages) => {
          commit('readAllLanguagesKnownByUserSuccess', languages);
          return Promise.resolve(languages);
        },
        (error) => {
          commit('readAllLanguagesKnownByUserFailure');
          return Promise.reject(error);
        }
      );
    },
    readAllLanguages({commit}){
      return LanguageService.getAllLanguages().then(
        (languages) => {
          commit('readAllLanguagesSuccess', languages);
          return Promise.resolve(languages);
        },
        (error) => {
          commit('readAllLanguagesFailure');
          return Promise.reject(error);
        }
      );
    },
    updateLanguagesKnowByUser({commit, dispatch}, modifiedLangugesIDs){
      return LanguageService.updateLanguagesKnowByUser(modifiedLangugesIDs).then(
        () => {
          return Promise.resolve(dispatch('readAllLanguagesKnownByUser'));
        },
        (error) => {
          return Promise.reject(error);
        }
      )
    }
  },    
  mutations: {
    readAllLanguagesKnownByUserSuccess(state, languages) {
      state.languagesKnown = languages.data;
    },
    readAllLanguagesKnownByUserFailure(state) {
      state.languagesKnown = null
    },
    readAllLanguagesSuccess(state, languages) {
      state.allLanguages = languages.data;
    },
    readAllLanguagesFailure(state) {
      state.allLanguages = null
    }
  },
  getters: {
    getAllLanguagesAvailable(state){
      return state.allLanguages
    },
    getAllLanguagesKnownByUser(state){
      return state.languagesKnown
    }
  }
};