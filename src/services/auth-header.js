export default function authHeader() {
  console.log("hh")
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return { Authorization: 'Bearer ' + user };
    } else {
      return {};
    }
  }
  