import BaseService from "./BaseService";

class AuthorizationService extends BaseService {

  async signin(credentials) {
    const { data } = await this.axios.post("/cabinet/login", credentials);
    this._setToken(data.token);
    return data;
  }

  async me() {
    const { data } = await this.axios.get("/cabinet/me");
    return data;
  }

}

export default new AuthorizationService();
