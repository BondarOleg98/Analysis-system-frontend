import http from "@/services/DataAxiosInitialize";

export default class RegisterService {
  register(user) {
    console.log(user);
    return http.post("/api/v1/registerUser", user);
  }
}
