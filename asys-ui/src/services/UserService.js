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
  getUsers() {
    return http
      .get("/api/v1/getUserData/", {
        headers: authHeader(),
      })
      .then(
        (users) => {
          return Promise.resolve(users);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
  }
  editUser(user, user_id) {
    console.log(user);
    return http
      .put("/api/v1/updateUser/" + user_id, user, {
        headers: authHeader(),
      })
      .then(
        () => {
          return Promise.resolve();
        },
        (error) => {
          return Promise.reject(error);
        }
      );
  }
  deleteUser(user_id) {
    return http
      .delete("/api/v1/removeUser/" + user_id, {
        headers: authHeader(),
      })
      .then(
        () => {
          return Promise.resolve();
        },
        (error) => {
          return Promise.reject(error);
        }
      );
  }
}
