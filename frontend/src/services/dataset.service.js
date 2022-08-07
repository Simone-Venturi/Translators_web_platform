import { ApiClient, API_ALL_DATASET_ENDPOINT, API_CREATE_DATASET_ENDPOINT} from '@/services/app.services';
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
}
export default new DatasetsService();