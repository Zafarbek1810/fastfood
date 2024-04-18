import client from "../HHTP/client";

class OrderProvider {
  static async getOrders(page, size) {
    return await client.get(`/orders/list?page=${page}&size=${size}`);
  }

  static async createOrder(orderType) {
    return await client.post(`/orders?orderType=${orderType}`);
  }

  static async addProductOrder(body) {
    return await client.post(`/orders/add-product`, body);
  }

  static async getAllOrders(status) {
    return await client.get(`/orders/list?status=${status}`);
  }

  static async updateModalStatus(orderId) {
    return await client.post(`/orders/change/status-modal?orderId=${orderId}`);
  }
  static async getOrderDetail(orderId) {
    return await client.get(`/orders/${orderId}`);
  }

  static async getGeneralStatistics() {
    return await client.get(`/orders/general/statistics`);
  }
  static async getTableStatisticsOrder(startDate, endDate) {
    return await client.get(
      `/orders/get/stat/product?startDate=${startDate}&endDate=${endDate}`
    );
  }

  static async changeStatusOrder(orderId, status) {
    return await client.put(
      `/orders/change-status/${orderId}?status=${status}`
    );
  }
  static async ordersPrint(orderId) {
    return await client.post(
      `/orders/print/cheque?orderId=${orderId}`
    );
  }

  static async downloadExcel(startDate, endDate) {
    try {
      const response = await client.get(
        `/orders/excel?startDate=${startDate}&endDate=${endDate}`,
        {
          responseType: "blob",
        }
      );

      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async downloadPdf(orderId) {
    try {
      const response = await client.get(
        `/orders/pdf?orderId=${orderId}`,
        {
          responseType: "blob",
        }
      );

      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default OrderProvider;
