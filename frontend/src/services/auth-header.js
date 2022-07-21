export default function authHeader() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }