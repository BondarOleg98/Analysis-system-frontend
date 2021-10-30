import http from "@/services/DataAxiosInitialize";
import authHeader from "@/services/DataService";

export default class UserService {
  getUserByUsername(username) {
    return http.get("/api/v1/getUserData/byFilter/" + username, {
      headers: authHeader(),
    });
  }
}
