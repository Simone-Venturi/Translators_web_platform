import { ApiClient, API_ALL_ALIGNMENTS_ENDPOINT, API_GET_PARALLEL_TEXT_FROM_ID_ENDPOINT} from '@/services/app.services';
import authHeader from '@/services/auth-header';
class AlignmentsService {
  getAllAlignments() {
    return ApiClient.get(API_ALL_ALIGNMENTS_ENDPOINT, { headers: authHeader() });
  }
  
  getAlignmentFromID(id) {
    return ApiClient.get(API_GET_PARALLEL_TEXT_FROM_ID_ENDPOINT + '/' + id, { headers: authHeader() });
  }
}
export default new AlignmentsService();