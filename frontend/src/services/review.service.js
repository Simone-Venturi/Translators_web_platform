import { ApiClient, API_CREATE_REVIEW_ENDPOINT} from '@/services/app.services';
import authHeader from '@/services/auth-header';
class ReviewsService {
  createReview(idTranslation, rateReview) {
    return ApiClient.post(API_CREATE_REVIEW_ENDPOINT, {idTranslation: idTranslation, rateReview: rateReview}, { headers: authHeader() });
  }
}
export default new ReviewsService();