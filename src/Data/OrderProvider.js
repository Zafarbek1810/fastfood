import client from "../HHTP/client";

class OrderProvider{
  static async getOrders (page, size){
    return await client.get(`/orders/list?page=${page}&size=${size}`);
  }

  static async createOrder (){
    return await client.post(`/orders`);
  }

  static async addProductOrder (body){
    return await client.post(`/orders/add-product`, body);
  }

  static async getAllOrders(page, size) {
    return await client.get(`/orders/list?page=${page}&size=${size}`);
  }
  static async getOrderDetail(orderId) {
    return await client.get(`/orders/${orderId}`);
  }

}

export default OrderProvider;