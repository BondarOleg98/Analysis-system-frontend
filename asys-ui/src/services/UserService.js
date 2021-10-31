import http from "@/services/DataAxiosInitialize";
import authHeader from "@/services/DataService";

export default class UserService {
  getUserByUsername(username) {
    return http
      .get("/api/v1/getUserData/byFilter/" + username, {
        headers: authHeader(),
      })
      .then(
        (user) => {
          return Promise.resolve(user);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
  }
}
