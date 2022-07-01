import { ApiClient, API_ALL_LANGUAGES_ENDPOINT, API_ALL_LANGUAGES_KNOWN_BY_USER_ENDPOINT} from '@/services/app.services';
import authHeader from '@/services/auth-header';
class LanguagesService {
  getAllLanguages() {
    return ApiClient.get(API_ALL_LANGUAGES_ENDPOINT, { headers: authHeader() });
  }
  getAllLanguagesFilteredByUser() {
    return ApiClient.get(API_ALL_LANGUAGES_KNOWN_BY_USER_ENDPOINT, { headers: authHeader() });
  }
}
export default new LanguagesService();