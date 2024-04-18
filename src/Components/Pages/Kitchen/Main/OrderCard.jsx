import React, { useEffect, useState } from "react";
import OrderProvider from "../../../../Data/OrderProvider";
import { Wrap } from "./style";
import OrderItem from "./OrderItem";
import { toast } from "react-toastify";

const OrderCard = ({ id, setRender, setLoading, setLastOrderId }) => {
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    OrderProvider.getOrderDetail(id)
      .then((res) => {
        console.log(res.data.data);
        setDetail(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeStatus = (status) => {
    setLoading(true);
    OrderProvider.changeStatusOrder(id, status)
      .then((res) => {
        console.log(res);
        setRender(Math.random());
        if(status==="READY"){
          setLastOrderId(id)
        }
        toast.success(
          status === "READY"
            ? "Buyurtma tayyor bo'ldi!"
            : "Buyurtma bekor qilindi!"
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    <Wrap>
      <div className="top">
        <h3>Buyurtma № / {detail[0]?.order?.sequenceNumber}</h3>
        <button className="success" onClick={() => changeStatus("READY")}>
          Jo'natish
        </button>
        <button className="danger" onClick={() => changeStatus("CANCELLED")}>
          Bekor qilish
        </button>
      </div>
      {detail.map((det, index) => (
        <div className="order-card" key={index}>
          {
            det.product?.toKitchen ? <OrderItem item={det} /> : <></>
          }
          {/* <OrderItem item={det} /> */}
        </div>
      ))}
    </Wrap>
  );
};

export default OrderCard;
