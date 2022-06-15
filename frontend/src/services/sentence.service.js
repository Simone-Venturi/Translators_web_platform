import { ApiClient, API_ALL_SENTENCES_ENDPOINT, API_GET_SENTENCE_FROM_ID_ENDPOINT} from '@/services/app.services';
import authHeader from '@/services/auth-header';
class SentencesService {
  getAllSentences() {
    return ApiClient.get(API_ALL_SENTENCES_ENDPOINT, { headers: authHeader() });
  }
  getSentenceFromID(id) {
    return ApiClient.get(API_GET_SENTENCE_FROM_ID_ENDPOINT + '/' + id, { headers: authHeader() });
  }
}
export default new SentencesService();