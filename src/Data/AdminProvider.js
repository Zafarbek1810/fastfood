import client from "../HHTP/client";

export default class AdminProvider {
  static async createCategory(body) {
    return await client.post("/admin/category/create", body);
  }
  static async updateCategory(body) {
    return await client.put("/admin/category/update", body);
  }
  static async createProduct(body) {
    return await client.post("/admin/product/create", body);
  }
  static async fileUpload(file) {
    return await client.post("/admin/file/upload", file, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async updateCategory(body) {
    return await client.put("/admin/category/update", body);
  }
  static async updateProduct(body) {
    return await client.put("/admin/product/update", body);
  }

  static async getCategory() {
    return await client.get("/admin/category/list");
  }
  static async getProducts(categoryId = 0) {
    const params = { categoryId };
    return await client.get(`/admin/product/list`, { params });
  }
  static async previewImage(hashId) {
    return await client.get(`/admin/file/preview?hashId=${hashId}`);
  }

  static async imgPreview(hashId) {
    return await client
      .get(`/admin/file/preview?hashId=${hashId}`, { responseType: "blob" })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  static async deleteCategory(id) {
    return await client.delete(`/admin/category/delete/${id}`);
  }
  static async deleteProduct(id) {
    return await client.delete(`/admin/product/delete/${id}`);
  }
}
