import axios from "axios";
import API from "@constants/API";

const http = axios.create({
  baseURL: API.HOST_API,
  headers: {
    "Content-type": "application/json",
  },
});

export default http;
