import client from "../HHTP/client";

export default class CompanyProvider {
  static async getCompany() {
    return await client.get("/company/get/all");
  }
  static async addCompany(body) {
    return await client.post(`/company/create`, body);
  }
  static async editCompany(body) {
    return await client.post(`/company/update`, body);
  }
  static async deleteCompany(id) {
    return await client.delete(`/company/delete/${id}`,);
  }
}
