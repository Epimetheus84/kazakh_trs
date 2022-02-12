import BaseService from "./BaseService";

class RecognitionService extends BaseService {
  async recognizeText(imageName) {
    const { data } = await this.axios.get(`images/recognize/${imageName}`);
    return data;
  }
  async saveRectangles(imageName, { coordinates, text }) {
    const { data } = await this.axios.put(`images/update/${imageName}`, {
      coordinates,
      text
    });
    return data;
  }
}

export default new RecognitionService();
