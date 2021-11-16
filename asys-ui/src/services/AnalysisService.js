import http from "@/services/DataAxiosInitialize";
import authHeader from "@/services/DataService";

export default class AnalysisService {
  executeAnalysis(file_id) {
    return http
      .post(
        "/api/v1/executeAnalysis/" + file_id,
        {},
        {
          headers: authHeader(),
        }
      )
      .then(
        () => {
          return Promise.resolve();
        },
        (error) => {
          return Promise.reject(error);
        }
      );
  }
  getAnalysisResult(file_id) {
    return http
      .get("/api/v1/getResultAnalysis/" + file_id, {
        headers: authHeader(),
      })
      .then(
        (data) => {
          return Promise.resolve(data);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
  }
  executeForecasting(file_id) {
    return http
      .post(
        "/api/v1/executeForecasting/" + file_id,
        {},
        {
          headers: authHeader(),
        }
      )
      .then(
        () => {
          return Promise.resolve();
        },
        (error) => {
          return Promise.reject(error);
        }
      );
  }
  getForecastingResult(file_id) {
    return http
      .get("/api/v1/getResultForecasting/" + file_id, {
        headers: authHeader(),
      })
      .then(
        (data) => {
          return Promise.resolve(data);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
  }
  buildChart(file_id) {
    return http
      .post(
        "/api/v1/buildChart/" + file_id,
        {},
        {
          headers: authHeader(),
        }
      )
      .then(
        (data) => {
          return Promise.resolve(data);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
  }
}
