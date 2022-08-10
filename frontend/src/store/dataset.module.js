import { parseQuery } from 'vue-router';
import DatasetsService from '../services/dataset.service';

export const dataset = {
  namespaced: true,
  state: {
    datasets: null
  },
  actions: {
    readAllDatasets({commit}){
      return DatasetsService.getAllDatasets().then(
        (datasets) => {
          commit('readAllDatasetsSuccess', datasets);
          return Promise.resolve(datasets);
        },
        (error) => {
          commit('readAllDatasetsFailure');
          return Promise.reject(error);
        }
      );
    },
    createDataset({dispatch}, payload){
      return DatasetsService.createDataset(payload.datasetName, payload.datasetURL).then(
        () =>{
          dispatch('readAllDatasets');
          return Promise.resolve();
        },
        (error) => {
          return Promise.reject(error);
        }
      )
    }
  },    
  mutations: {
    readAllDatasetsSuccess(state, datasets) {
      state.datasets = datasets.data;
    },
    readAllDatasetsFailure(state) {
      state.datasets = null
    }
  },
  getters: {
    getAllDatasets(state){
      return state.datasets
    }
  }
};