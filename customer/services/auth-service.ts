import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = "http://127.0.0.1:3000/";

class AuthService {
  async login(email, password) {
    return axios({
	    method: 'post',
      url: API_URL + 'auth/login',
      data: {
        username: email,
        password: password
      }
    })
    .then(response => {
      if (response.data.access_token) {
	      Cookies.set('user', response.data.access_token)
      }
      return response.data;
    })
	  .catch(error => console.log(error));
  }

	logout() {
	  Cookies.remove('user')
  }

  register(username, email, password) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password
    });
  }

  getCurrentUser(user) {
	  return axios({
		  // url: API_URL + "user",
		  url: API_URL + 'user/getProfile',
		  method: 'GET',
		  headers: {'Authorization': `Bearer ${user}`}
	  });
  }

  refreshToken(token) {
	  Cookies.set('user', token);
  }
}

export default new AuthService();