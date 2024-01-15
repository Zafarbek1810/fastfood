import React, { useEffect, useState } from "react";
import AdminProvider from "../../../../../Data/AdminProvider";
import numberFormat from "../../../../../utils/numberFormat";
import getURlFile from "../../../../../utils/getUrlFromFile";
import EditSvg from "../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../Common/Svgs/DeleteSvg";

const OrderItem = ({ item, setSumm, handleDelete }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setSumm((parseInt(item.count) * parseInt(item.price)));
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
        <img src={url} alt="img" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: 10,
          }}
        >
          <div className="btns">
            <button className="edit">
              <EditSvg />
            </button>
            <button className="delete" onClick={()=>handleDelete(item.id)}>
              <DeleteSvg />
            </button>
          </div>
          <h4>
            {+item.count} x {numberFormat(item.price)} so'm
          </h4>
        </div>
      </div>
      <div className="bottom">
        <h4>{numberFormat(parseInt(item.count) * parseInt(item.price))} so'm</h4>
      </div>
    </div>
  );
};

export default OrderItem;
