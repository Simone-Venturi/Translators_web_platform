import { ApiClient, API_ALL_LANGUAGES_ENDPOINT} from '@/services/app.services';
import authHeader from '@/services/auth-header';
class LanguagesService {
  getAllLanguages() {
    return ApiClient.get(API_ALL_LANGUAGES_ENDPOINT, { headers: authHeader() });
  }
}
export default new LanguagesService();