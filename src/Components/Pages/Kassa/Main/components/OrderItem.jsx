import React, { useEffect, useState } from "react";
import AdminProvider from "../../../../../Data/AdminProvider";
import numberFormat from "../../../../../utils/numberFormat";
import getURlFile from "../../../../../utils/getUrlFromFile";
import EditSvg from "../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../Common/Svgs/DeleteSvg";

const OrderItem = ({ item, setSumm, handleDelete, handleEdit }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setSumm(parseInt(item.count) * parseInt(item.price));
  }, [item, setSumm]);

  useEffect(() => {
    AdminProvider.imgPreview(item.image.hashId).then((res) => {
      const fileType = res.data.type.split("/")[1];
      const file = new File([res.data], `image.${fileType}`, {
        type: res.data.type,
      });
      setUrl(getURlFile(file));
    });
  }, []);

  return (
    <div className="orderItem">
      <div className="top">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: 10,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ width: "30%" }}>{item.name} </span>
            <span style={{ width: "20%", textAlign: "center" }}>
              {+item.count}
            </span>
            <span style={{ width: "30%", textAlign: "center" }}>
              {numberFormat(item.price)}
            </span>
            <span style={{ width: "20%", display: "flex" }}>
              <button onClick={() => handleEdit(item.id)}>
                <EditSvg />
              </button>
              <button onClick={() => handleDelete(item.id)}>
                <DeleteSvg />
              </button>
            </span>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default OrderItem;
