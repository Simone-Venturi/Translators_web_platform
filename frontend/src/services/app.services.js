import axios from 'axios'
import {
    setApiURL,
    setJsonEndpointHeaders
} from './config.service'

export const API_LOGIN_ENDPOINT = process.env.LOGIN_ENDPOINT,
API_LOGOUT_ENDPOINT = process.env.LOGOUT_ENDPOINT,
ApiClient = axios.create({
    baseURL: setApiURL(),
    responseType: 'json',
    withCredentials: true
})

ApiClient.defaults.header = setJsonEndpointHeaders()

export default {
    // ------------------ AXIOS INSTANCES
    ApiClient,
    // ------------------ ENDPOINTS
    API_LOGIN_ENDPOINT,
    API_LOGOUT_ENDPOINT
}