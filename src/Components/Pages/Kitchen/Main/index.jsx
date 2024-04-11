import React, { useEffect, useState } from "react";
import OrderProvider from "../../../../Data/OrderProvider";
import OrderCard from "./OrderCard";
import { Spin } from "antd";
import useSound from "use-sound";

const MainKitchen = ({ setArray }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [play] = useSound("../audio/audio.mp3", { volume: 1 }); 
  const [render, setRender] = useState(null)

  useEffect(() => {
    const fetchOrders = () => {
      OrderProvider.getAllOrders("PENDING")
        .then((res) => {
          console.log(res.data.data);
          const newOrders = res.data.data;
          const isNewOrderAdded = newOrders.length > orders.length;

          setOrders(newOrders);
          setArray(newOrders);
          setLoading(false);

          if (isNewOrderAdded) {
            // Play the sound when a new order is added
            play();
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    // Fetch orders initially
    fetchOrders();

    // Fetch orders every 1 second
    const intervalId = setInterval(fetchOrders, 3000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [setArray, render]);

  return (
    <Spin tip="Loading" spinning={loading}>
      {orders
        .filter((i) => i.status === "PENDING")
        .map((order, index) => (
          <OrderCard key={order.id} id={order.id} setLoading={setLoading} setRender={setRender} />
        ))}
    </Spin>
  );
};

export default MainKitchen;
