import { ApiClient, API_ALL_STATISTIC_ENDPOINT} from '@/services/app.services';
import authHeader from '@/services/auth-header';
class ProfileService {
  readAllStatistics() {
    return ApiClient.get(API_ALL_STATISTIC_ENDPOINT, { headers: authHeader() });
  }
}
export default new ProfileService();