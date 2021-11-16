import http from "@/services/FileAxiosInitialize";
import authHeader from "@/services/DataService";

export default class FileService {
  uploadFile(files, username) {
    let formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("files[" + i + "]", file);
    }

    return http
      .post("/api/v1/uploadFile/" + username, formData, {
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
  getFiles(username) {
    return http
      .get("/api/v1/getFiles/" + username, {
        headers: authHeader(),
      })
      .then(
        (files) => {
          return Promise.resolve(files);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
  }
  getFile(fileId) {
    return http
      .get("/api/v1/getFile/" + fileId, {
        headers: authHeader(),
      })
      .then(
        (file) => {
          return Promise.resolve(file);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
  }
  deleteFile(fileId) {
    return http
      .delete("/api/v1/deleteFile/" + fileId, {
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
