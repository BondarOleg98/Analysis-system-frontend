import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/x-www-form-urlencoded",
    Authorization: "Basic YXRzSWQ6YXRzU2VjcmV0",
  },
});
