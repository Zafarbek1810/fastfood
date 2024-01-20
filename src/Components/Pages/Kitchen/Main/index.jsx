import React, { useEffect, useState } from "react";
import OrderProvider from "../../../../Data/OrderProvider";

const MainKitchen = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState(null)

  useEffect(() => {
    OrderProvider.getAllOrders(1, 100)
      .then((res) => {
        console.log(res.data.data);
        setOrders(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    OrderProvider.getOrderDetail(1)
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return (
    <div>
        {
            orders.filter(i=>i.status==="PENDING").map((order, index)=>(
                <h1>{order.id}</h1>
            ))
        }
    </div>
  );
};

export default MainKitchen;
