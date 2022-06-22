import { ApiClient, API_CREATE_TRANSLATION_ENDPOINT, API_ALL_TRANSLATIONS_ENDPOINT } from '@/services/app.services';
import authHeader from '@/services/auth-header';
class TranslationsService {
  getAllTranslations() {
    return ApiClient.get(API_ALL_TRANSLATIONS_ENDPOINT, { headers: authHeader() });
  }
  createTranslation(idSentence, translationText, idLanguage) {
    return ApiClient.post(API_CREATE_TRANSLATION_ENDPOINT, {idSentence: idSentence, translationText: translationText, idLanguage: idLanguage}, { headers: authHeader() });
  }
}
export default new TranslationsService();