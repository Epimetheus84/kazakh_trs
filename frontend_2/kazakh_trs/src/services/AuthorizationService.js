import axios from "axios";

class AuthorizationService {
  constructor() {
    this.instance = axios.create({
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
      this.instance.defaults.headers.Authorization = `Token ${token}`;
    }
  }

  async signin(credentials) {
    const { data } = await this.instance.post("/cabinet/login", credentials);
    this._setToken(data.token);
    return data;
  }

  async me() {
    const { data } = await this.instance.get("/cabinet/me");
    return data;
  }
}

export default new AuthorizationService();
