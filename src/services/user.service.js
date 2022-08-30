import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8081/';
class UserService {
  getUsername() {
    return axios.get(API_URL + 'student/all', { headers: authHeader() });
  }
 
}
export default new UserService();
