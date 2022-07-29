import {ApiClient, API_LOGIN_ENDPOINT, API_LOGOUT_ENDPOINT} from './app.services';

class AuthService {
  login(user) {
    return ApiClient
      .post(API_LOGIN_ENDPOINT, {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          sessionStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    sessionStorage.removeItem('user');
  }
  register(user) {
    return ApiClient
      .post(API_LOGOUT_ENDPOINT, {
        username: user.username,
        email: user.email,
        password: user.password
      });
  }
}
export default new AuthService();