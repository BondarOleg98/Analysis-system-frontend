import http from "@/services/initialize";

export default class RegisterService {
  register(user) {
    return http.post("/v1/registerUser", user);
  }
}
