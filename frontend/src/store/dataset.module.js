import DatasetsService from '../services/dataset.service';

export const dataset = {
  namespaced: true,
  state: {
    datasets: null,
    reviewValues: [
      {
        id: 0,
        val: "0"
      },
      {
        id: 1,
        val: "1"
      },
      {
        id: 2,
        val: "2"
      },
      {
        id: 3,
        val: "3"
      },
      {
        id: 4,
        val: "4"
      },
      {
        id: 5,
        val: "5"
      }
    ]
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
    },
    getReviewValues(state){
      return state.reviewValues
    }
  }
};