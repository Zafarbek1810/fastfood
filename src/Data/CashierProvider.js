import client from "../HHTP/client";

export default class AdminProvider {
  

  static async getCategory() {
    return await client.get("/cashier/category/list");
  }
  static async getProducts(categoryId = 0) {
    const params = { categoryId };
    return await client.get(`/cashier/product/list`, { params });
  }
  

}
