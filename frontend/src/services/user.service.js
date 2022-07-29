import { ApiClient, API_TEST_ALL_ENDPOINT, API_TEST_ADMIN_ENDPOINT, API_TEST_TRANSLATOR_ENDPOINT, API_TEST_DATASCIENTIST_ENDPOINT } from '@/services/app.services';
import authHeader from '@/services/auth-header';
class UserService {
  getPublicContent() {
    return ApiClient.get(API_TEST_ALL_ENDPOINT);
  }
  getAdminContent() {
    return ApiClient.get(API_TEST_ADMIN_ENDPOINT, { headers: authHeader() });
  }
  getTranslatorContent() {
    return ApiClient.get(API_TEST_TRANSLATOR_ENDPOINT, { headers: authHeader() });
  }
  getDataScientistContent() {
    return ApiClient.get(API_TEST_DATASCIENTIST_ENDPOINT, { headers: authHeader() });
  }
}
export default new UserService();