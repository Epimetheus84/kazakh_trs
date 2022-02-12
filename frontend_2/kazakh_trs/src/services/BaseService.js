import axios from "axios";

export default class BaseService {
  constructor() {
    this.axios = axios.create({
      baseURL: `${window.location.origin}/api`,
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });

    this._setToken(localStorage.getItem("token"));
  }

  _setToken(token) {
    this.token = token;
    localStorage.setItem("token", token);
    if (token) {
      this.axios.defaults.headers.Authorization = `Token ${token}`;
    }
  }
}
