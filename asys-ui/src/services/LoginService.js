import http from "@/services/AuthAxiosInitialize";

class LoginService {
  login(user) {
    const params = new URLSearchParams();
    params.append("username", user.username);
    params.append("password", user.password);
    params.append("grant_type", "password");
    return http.post("/oauth/token", params).then((response) => {
      if (response.data.access_token) {
        response.data.username = user.username;
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  }
  logout() {
    localStorage.removeItem("user");
  }
}

export default new LoginService();
