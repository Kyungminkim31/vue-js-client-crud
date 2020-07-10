import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(user){
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if(response.data.token){
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout(){
    localStorage.removeItem('user');
  }

  register(user){
    return axios.post(API_URL+'register', {
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password
    }).then( response => {
      if(response.data.token){
        console.log(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
  }
}

export default new AuthService();