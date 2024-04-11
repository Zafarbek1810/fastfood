import React, { useEffect, useState } from "react";
import AdminProvider from "../../../../Data/AdminProvider";
import getURlFile from "../../../../utils/getUrlFromFile";

const OrderItem = ({ item }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    AdminProvider.imgPreview(item.product.image.hashId).then((res) => {
      const fileType = res.data.type.split("/")[1];
      const file = new File([res.data], `image.${fileType}`, {
        type: res.data.type,
      });

      setUrl(getURlFile(file));
    });
  }, []);

  return (
    <div className="item">
      <div className="in">
        <img style={{ width: 120 }} src={url} alt="" />
        <h3>{item.product.name}</h3>
        <h3>{item.quantity + " x " + item.product.price}</h3>
      </div>
      <span>{item.description}</span>
    </div>
  );
};

export default OrderItem;
