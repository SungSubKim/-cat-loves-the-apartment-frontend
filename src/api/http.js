import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "http://localhost:9999/vue",
  // baseURL: "http://43.200.116.155:9999/vue",

  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
