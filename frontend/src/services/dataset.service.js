import {
  ApiClient,
  API_ALL_DATASET_ENDPOINT,
  API_CREATE_DATASET_ENDPOINT,
  API_LOAD_RESOURCE_DATASET_ENDPOINT,
  API_CHECK_DOWNLOAD_SIZE_DATASET_ENDPOINT,
  API_DOWNLOAD_SIZE_DATASET_ENDPOINT
} from '@/services/app.services';
import authHeader from '@/services/auth-header';
class DatasetsService {
  getAllDatasets() {
    return ApiClient.get(API_ALL_DATASET_ENDPOINT, { headers: authHeader() });
  }
  createDataset(datasetName, datasetUrl){
    return ApiClient.post(API_CREATE_DATASET_ENDPOINT, {
      name: datasetName,
      url: datasetUrl
    },{headers: authHeader()})
  }  
  loadResourceDataset(datasetID, file){
    return ApiClient.post(API_LOAD_RESOURCE_DATASET_ENDPOINT, {
      id: datasetID,
      file: file
    },{headers: { ...authHeader(), 'Content-Type': 'multipart/form-data'}})
  }
  checkDownloadSize(datasets, languagesTo, minReviewScore, maxReviewScore, nMinReview){
    return ApiClient.post(API_CHECK_DOWNLOAD_SIZE_DATASET_ENDPOINT, {
      datasets: datasets,
      languagesTo: languagesTo,
      minReviewScore: minReviewScore,
      maxReviewScore: maxReviewScore,
      minReview: nMinReview
    },{headers: authHeader()})
  }
  downloadDataset(datasets, languagesTo, minReviewScore, maxReviewScore, nMinReview){
    return ApiClient.post(API_DOWNLOAD_SIZE_DATASET_ENDPOINT, {
      datasets: datasets,
      languagesTo: languagesTo,
      minReviewScore: minReviewScore,
      maxReviewScore: maxReviewScore,
      minReview: nMinReview
    },{headers: authHeader(), responseType: 'arraybuffer'})
  }
}
export default new DatasetsService();