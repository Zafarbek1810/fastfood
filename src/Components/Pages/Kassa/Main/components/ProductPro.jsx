import React, { useEffect, useState } from "react";
import AdminProvider from "../../../../../Data/AdminProvider";
import getURlFile from "../../../../../utils/getUrlFromFile";
import numberFormat from "../../../../../utils/numberFormat";

const ProductPro = ({ item, handleClick }) => {
  const [url, setUrl] = useState("");

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
    <div onClick={() => handleClick(item)}>
      <div className="img">
        <img src={url} alt="img" />
        <h4>{item.name}</h4>
        <h4>{numberFormat(item.price)} so'm</h4>
      </div>
    </div>
  );
};

export default ProductPro;
