import http from "@/services/FileAxiosInitialize";
import authHeader from "@/services/DataService";

export default class FileService {
  uploadFile(files) {
    let formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("files[" + i + "]", file);
    }

    return http
      .post("/api/v1/uploadFile", formData, {
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
