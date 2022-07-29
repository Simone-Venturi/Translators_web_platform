export const BaseJsonEndpointHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
}
/**
 * joins the BaseJsonEndpointHeaders object with the given one
 * @param {{}} headers request headers
 * @returns {{}} the request's headers
 */
export function setJsonEndpointHeaders(headers = undefined) {
    if (headers) return Object.assign(BaseJsonEndpointHeaders, headers)
    return BaseJsonEndpointHeaders
}
/**
 * @param {string} path the endpoint route
 * @returns {string} the url
 */
export function setApiURL(path) {
    const base_url = process.env.VUE_APP_BACKEND_URL
    console.log(base_url)
    if (path) return base_url + path
    return base_url
}
export default {
    BaseJsonEndpointHeaders,
    setJsonEndpointHeaders,
    setApiURL
}