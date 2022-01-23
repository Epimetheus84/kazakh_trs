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

    async uploadImage(image) {
      let formData = new FormData();
      formData.append("file", image);

      const { data } = await this.axios.post('/images/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return data;
    }

    async findCoordinates(imageName) {
      const { data } = await this.axios.get(`/images/mark/${imageName}`);
      return data;
    }

    async checkImage(imageName) {
      const { data } = await this.axios.get(`/images/show/${imageName}`);
      return data;
    }
}

export default new ImageService();
