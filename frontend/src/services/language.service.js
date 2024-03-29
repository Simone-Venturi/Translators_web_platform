import { ApiClient, API_ALL_LANGUAGES_ENDPOINT, API_ALL_LANGUAGES_KNOWN_BY_USER_ENDPOINT, API_UPDATE_LANGUAGES_KNOWN_BY_USER_ENDPOINT} from '@/services/app.services';
import authHeader from '@/services/auth-header';
class LanguagesService {
  getAllLanguages() {
    return ApiClient.get(API_ALL_LANGUAGES_ENDPOINT, { headers: authHeader() });
  }
  getAllLanguagesFilteredByUser() {
    return ApiClient.get(API_ALL_LANGUAGES_KNOWN_BY_USER_ENDPOINT, { headers: authHeader() });
  }
  updateLanguagesKnowByUser(idsLanguages) {
    return ApiClient.post(API_UPDATE_LANGUAGES_KNOWN_BY_USER_ENDPOINT, {idsLanguages: idsLanguages}, { headers: authHeader() });
  }
}
export default new LanguagesService();