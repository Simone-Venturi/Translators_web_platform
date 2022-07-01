import { ApiClient,API_ALL_SENTENCES_ENDPOINT, API_GET_SENTENCE_FROM_ID_ENDPOINT, API_GET_SENTENCE_FROM_LANGUAGE_TO_TRANSLATE_ENDPOINT} from '@/services/app.services';
import authHeader from '@/services/auth-header';
class SentencesService {
  getAllSentences() {
    return ApiClient.get(API_ALL_SENTENCES_ENDPOINT, { headers: authHeader() });
  }
  getSentenceFromID(id) {
    return ApiClient.get(API_GET_SENTENCE_FROM_ID_ENDPOINT + '/' + id, { headers: authHeader() });
  }
  getAllSentencesFromLanguageToTranslate(fromLanguage, toLanguage) {
    return ApiClient.get(API_GET_SENTENCE_FROM_LANGUAGE_TO_TRANSLATE_ENDPOINT + '/' + fromLanguage + '/' + toLanguage, { headers: authHeader() });
  }
}
export default new SentencesService();