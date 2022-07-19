import { ApiClient, API_ALL_ALIGNMENTS_ENDPOINT, API_GET_PARALLEL_TEXT_FROM_ID_ENDPOINT, API_CREATE_ALIGNMENT_ENDPOINT} from '@/services/app.services';
import authHeader from '@/services/auth-header';
class AlignmentsService {
  getAllAlignments() {
    return ApiClient.get(API_ALL_ALIGNMENTS_ENDPOINT, { headers: authHeader() });
  }  
  getAlignmentFromID(id) {
    return ApiClient.get(API_GET_PARALLEL_TEXT_FROM_ID_ENDPOINT + '/' + id, { headers: authHeader() });
  }
  createAlignment(idParallelText, translationObjectsArray, sentenceArray){
    return ApiClient.post(API_CREATE_ALIGNMENT_ENDPOINT, {
      idParallelText: parseInt(idParallelText),
      translationObjectsArray, translationObjectsArray,
      sentenceArray: sentenceArray
    },{headers: authHeader()})
  }
}
export default new AlignmentsService();