import axios from "axios";

const http = axios.create({
  baseURL: "https://www.binance.com",
  headers: {
    "Content-type": "application/json",
  },
});

export default http;
