import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/auth/';

class UserService {
  getPublicContent(){
    return axios.get(API_URL + 'all');
  }

  getUserBoard(){
    return axios.get(API_URL + 'user', {header: authHeader()});
  }

  getModeratorBoard(){
    return axios.get(API_URL + 'mod', {header: authHeader()});
  }

  getAdminBoard(){
    return axios.get(API_URL + 'admin', { headers: authHeader()});
  }
}

export default new UserService();