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
    API_ALL_SENTENCES_ENDPOINT = process.env.VUE_APP_SENTENCES_ALL,
    API_GET_SENTENCE_FROM_ID_ENDPOINT = process.env.VUE_APP_SENTENCE_GET,
    API_CREATE_TRANSLATION_ENDPOINT = process.env.VUE_APP_TRANSLATION_CREATE,

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
    API_ALL_SENTENCES_ENDPOINT,
    API_GET_SENTENCE_FROM_ID_ENDPOINT,
    API_CREATE_TRANSLATION_ENDPOINT
}