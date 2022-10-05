import { ApiClient, API_CREATE_TRANSLATION_ENDPOINT, API_ALL_TRANSLATIONS_ENDPOINT, API_ALL_TRANSLATIONS_NOT_REVIEWED_ENDPOINT} from '@/services/app.services';
import authHeader from '@/services/auth-header';
class TranslationsService {
  getAllTranslations() {
    return ApiClient.get(API_ALL_TRANSLATIONS_ENDPOINT, { headers: authHeader() });
  }
  getAllTranslationsNotReviewed(original_language, translated_language) {
    return ApiClient.get(API_ALL_TRANSLATIONS_NOT_REVIEWED_ENDPOINT  + '/' + original_language + '/' + translated_language, { headers: authHeader() });
  }
  createTranslation(idSentence, translationText, idLanguage) {
    return ApiClient.post(API_CREATE_TRANSLATION_ENDPOINT, {idSentence: idSentence, translationText: translationText, idLanguage: idLanguage}, { headers: authHeader() });
  }
}
export default new TranslationsService();