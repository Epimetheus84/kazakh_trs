import BaseService from "./BaseService";

class UserService extends BaseService {

  /**
   * @param {Object} userData
   * @returns {Promise<Object>}
   * @throws {Error}
  */
  async createUser(userData) {
    const { data } = await this.axios.post("/users/create", userData);
    return data;
  }

  /**
   * @returns {Promise<Object>}
  */
  async getUsersList() {
    const { data } = await this.axios.get("/users/list");
    return data;
  }

  /**
   * @param {String} userName
   * @returns {Promise<Object>}
   * @throws {Error}
  */
  async getUser(userName) {
    const { data } = await this.axios.get(`/users/show/${userName}`);
    return data;
  }

  /**
   * @param {String} userName
   * @param {Object} userData
   * @returns {Promise<Object>}
   * @throws {Error}
  */
  async updateUser(userName, userData) {
    const { data } = await this.axios.put(`/users/update/${userName}`, userData);
    return data;
  }

  /**
   * @param {String} userName
   * @returns {Promise<Object>}
   * @throws {Error}
  */
  async deleteUser(userName) {
    const { data } = await this.axios.delete(`/users/delete/${userName}`);
    return data;
  }
}

export default new UserService();
