import client from "../HHTP/client";

export default class SeoProvider {
  static async uploadVideo(file) {
    return await client.post(`/ceo/file/upload/video`, file, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  static async uploadAudio(gender, number, file) {
    return await client.post(
      `/ceo/save/audio?gender=${gender}&number=${number}`,
      file,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }

  static async getVideos() {
    return await client.get(`/ceo/file/get/video`);
  }
  static async getAudios() {
    return await client.get(`/ceo/get-all/data/audio`);
  }
  static async deleteAudio(id) {
    return await client.delete(`/ceo/delete/audio/${id}`);
  }




  // tv
  static async tvFileGetAudio(number, gender) {
    return await client.get(`/tv/file/preview/audio?number=${number}&gender=${gender}`);
  }
}
