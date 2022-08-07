import axios from 'axios'
import {
    setApiURL,
    setJsonEndpointHeaders
} from '@/services/config.services'

export const API_LOGIN_ENDPOINT = process.env.VUE_APP_LOGIN_ENDPOINT,
    API_LOGOUT_ENDPOINT = process.env.VUE_APP_LOGOUT_ENDPOINT,
    
    API_TEST_ALL_ENDPOINT = process.env.VUE_APP_TEST_ALL,
    API_TEST_ADMIN_ENDPOINT = process.env.VUE_APP_TEST_ADMIN,
    API_TEST_TRANSLATOR_ENDPOINT = process.env.VUE_APP_TEST_TRANSLATOR,
    API_TEST_DATASCIENTIST_ENDPOINT = process.env.VUE_APP_TEST_DATASCIENTIST,
    API_ALL_LANGUAGES_ENDPOINT = process.env.VUE_APP_LANGUAGES_ALL,
    API_ALL_LANGUAGES_KNOWN_BY_USER_ENDPOINT = process.env.VUE_APP_LANGUAGES_ALL_KNOWN_BY_USER,
    API_UPDATE_LANGUAGES_KNOWN_BY_USER_ENDPOINT = process.env.VUE_APP_UPDATE_LANGUAGES_KNOWN_BY_USER,
    API_ALL_SENTENCES_ENDPOINT = process.env.VUE_APP_SENTENCES_ALL,
    API_GET_SENTENCE_FROM_ID_ENDPOINT = process.env.VUE_APP_SENTENCE_GET,
    API_GET_SENTENCE_FROM_LANGUAGE_TO_TRANSLATE_ENDPOINT = process.env.VUE_APP_SENTENCE_FROM_LANGUAGE_TO_TRANSLATE,
    API_ALL_TRANSLATIONS_ENDPOINT = process.env.VUE_APP_TRANSLATIONS_ALL,
    API_ALL_TRANSLATIONS_NOT_REVIEWED_ENDPOINT = process.env.VUE_APP_TRANSLATIONS_ALL_NOT_REVIEWED,
    API_CREATE_TRANSLATION_ENDPOINT = process.env.VUE_APP_TRANSLATION_CREATE,
    API_CREATE_REVIEW_ENDPOINT = process.env.VUE_APP_REVIEW_CREATE,
    API_ALL_ALIGNMENTS_ENDPOINT = process.env.VUE_APP_ALIGNMENTS_ALL,
    API_ALIGNMENTS_AVAILABLE_ENDPOINT = process.env.VUE_APP_ALIGNMENTS_AVAILABLE,
    API_GET_PARALLEL_TEXT_FROM_ID_ENDPOINT = process.env.VUE_APP_PARALLEL_TEXT_GET,
    API_CREATE_ALIGNMENT_ENDPOINT = process.env.VUE_APP_ALIGNMENT_CREATE,
    API_ALL_STATISTIC_ENDPOINT = process.env.VUE_APP_STATISTIC_ALL,
    API_ALL_STATISTIC_CHART_ENDPOINT = process.env.VUE_APP_STATISTIC_CHART,
    API_ALL_DATASET_ENDPOINT = process.env.VUE_APP_DATASET_ALL,
    API_CREATE_DATASET_ENDPOINT = process.env.VUE_APP_DATASET_CREATE,

    ApiClient = axios.create({
        baseURL: setApiURL(),
        responseType: 'json'
    })

ApiClient.defaults.header = setJsonEndpointHeaders()

export default {
    // ------------------ AXIOS INSTANCES
    ApiClient,
    // ------------------ ENDPOINTS
    API_LOGIN_ENDPOINT,
    API_LOGOUT_ENDPOINT,    
    
    API_TEST_ALL_ENDPOINT,
    API_TEST_ADMIN_ENDPOINT,
    API_TEST_TRANSLATOR_ENDPOINT,
    API_TEST_DATASCIENTIST_ENDPOINT,

    API_ALL_LANGUAGES_ENDPOINT,
    API_ALL_LANGUAGES_KNOWN_BY_USER_ENDPOINT,
    API_UPDATE_LANGUAGES_KNOWN_BY_USER_ENDPOINT,
    API_ALL_SENTENCES_ENDPOINT,
    API_GET_SENTENCE_FROM_ID_ENDPOINT,
    API_GET_SENTENCE_FROM_LANGUAGE_TO_TRANSLATE_ENDPOINT,
    API_ALL_TRANSLATIONS_ENDPOINT,
    API_ALL_TRANSLATIONS_NOT_REVIEWED_ENDPOINT,
    API_CREATE_TRANSLATION_ENDPOINT,
    API_CREATE_REVIEW_ENDPOINT,
    API_ALL_ALIGNMENTS_ENDPOINT,
    API_ALIGNMENTS_AVAILABLE_ENDPOINT,
    API_GET_PARALLEL_TEXT_FROM_ID_ENDPOINT,
    API_CREATE_ALIGNMENT_ENDPOINT,
    API_ALL_STATISTIC_ENDPOINT,
    API_ALL_STATISTIC_CHART_ENDPOINT,
    API_ALL_DATASET_ENDPOINT,
    API_CREATE_DATASET_ENDPOINT,
}