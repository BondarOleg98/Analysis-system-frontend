import http from "@/services/initialize";

http.baseURL = "http://localhost:3000";

export default class LoginService {
  login(user) {
    http
      .post(baseURL + "/oauth/token", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      });
    return response.data;
  }
  logout() {
    localStorage.removeItem("user");
  }
}
