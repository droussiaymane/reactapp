import axios from "axios";
const API_URL = "http://localhost:8081/";

class AuthService {
  login(mail, password) {
    return axios
      .post(API_URL + "login", {
        mail,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.token));
          localStorage.setItem("id", JSON.stringify(response.data.id));
          localStorage.setItem("role", JSON.stringify(response.data.role));

        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    localStorage.removeItem("role");


  }
  register(name,username, mail, password,role) {
    return axios.post(API_URL + "register", {
        name,username, mail, password,role
    });
  }
  getCurrentUserId() {
    return JSON.parse(localStorage.getItem('id'));
  }
  getCurrentUserToken() {
    return JSON.parse(localStorage.getItem('user'));
  }
  getCurrentUsername() {
  
  const id =this.getCurrentUserId();
  return axios.get(API_URL + "username/"+ id,{
    headers:{ Authorization: 'Bearer ' + this.getCurrentUserToken() }
  }
  ).then(response=>{return response.data.username}).catch((e)=>console.log(e));
  
  }
  getCurrentRole(){
    return JSON.parse(localStorage.getItem('role'));
  }
  islogged(){
    return JSON.parse(localStorage.getItem('role'))!=undefined && JSON.parse(localStorage.getItem('user'))!=undefined && JSON.parse(localStorage.getItem('id'))!=undefined;
  }
}
export default new AuthService();