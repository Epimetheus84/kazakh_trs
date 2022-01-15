import BaseService from "./BaseService";

class ImageService extends BaseService {

    async upload(image) {
      const { data } = await this.axios.post("/images/upload", image);
      return data;
    }

    async getImagesList() {
      const { data } = await this.axios.get("/images/list");
      return data;
    }

    async deleteImage(imageName) {
      const { data } = await this.axios.delete(`/images/delete/${imageName}`);
      return data;
    }

}

export default new ImageService();
