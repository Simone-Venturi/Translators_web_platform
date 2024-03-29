import { ApiClient, API_ALIGNMENTS_AVAILABLE_ENDPOINT, API_GET_PARALLEL_TEXT_FROM_ID_ENDPOINT, API_CREATE_ALIGNMENT_ENDPOINT, API_CREATE_PARALLELTEXT_ENDPOINT} from '@/services/app.services';
import authHeader from '@/services/auth-header';
class AlignmentsService {
  getAllAlignments() {
    return ApiClient.get(API_ALIGNMENTS_AVAILABLE_ENDPOINT, { headers: authHeader() });
  }  
  getAlignmentFromID(id) {
    return ApiClient.get(API_GET_PARALLEL_TEXT_FROM_ID_ENDPOINT + '/' + id, { headers: authHeader() });
  }
  createAlignment(idParallelText, translationObjectsArray, sentenceArrayOriginal, sentenceArrayTranslated){
    //White spaces are removed from first position
    translationObjectsArray = translationObjectsArray.map(element => {
      if(element.original_sentence[0] == ' '){
        return {
          original_sentence: element.original_sentence.substring(1),
          translated_sentence: element.translated_sentence
        }
      } else {
        return element
      }
    }).map(element => {
      if(element.translated_sentence[0]== ' '){
        return {
          original_sentence: element.original_sentence,
          translated_sentence: element.translated_sentence.substring(1)
        }
      } else {
        return element
      }
    })
    sentenceArrayOriginal = sentenceArrayOriginal.map(element => {
      if(element[0] == ' '){
        return element.substring(1)
      } else {
        return element
      }
    })
    sentenceArrayTranslated = sentenceArrayTranslated.map(element => {
      if(element[0] == ' '){
        return element.substring(1)
      } else {
        return element
      }
    })
    return ApiClient.post(API_CREATE_ALIGNMENT_ENDPOINT, {
      idParallelText: parseInt(idParallelText),
      translationObjectsArray, translationObjectsArray,
      sentenceArrayOriginal: sentenceArrayOriginal,
      sentenceArrayTranslated: sentenceArrayTranslated
    },{headers: authHeader()})
  }
  createParallelText(idLanguageFrom, originalText, idLanguageTo, translatedText){
    return ApiClient.post(API_CREATE_PARALLELTEXT_ENDPOINT, {
      idLanguageFrom: parseInt(idLanguageFrom),
      originalText, originalText,
      idLanguageTo: parseInt(idLanguageTo),
      translatedText: translatedText
    },{headers: authHeader()})
  }
}
export default new AlignmentsService();