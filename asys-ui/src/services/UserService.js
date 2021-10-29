import http from "@/services/initialize";
import authHeader from "@/services/DataService";

const role_user = "READ_PRIVILEGE";

export default class UserService {
  getUser() {
    return http.get("/v1/getUserData/byFilter/" + role_user, 
    {headers: authHeader()});
  }
}
