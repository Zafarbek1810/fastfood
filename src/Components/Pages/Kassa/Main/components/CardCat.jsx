import React, { useEffect, useState } from "react";
import AdminProvider from "../../../../../Data/AdminProvider";
import getURlFile from "../../../../../utils/getUrlFromFile";

const CardCat = ({ item, loading, setCategoryId }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    AdminProvider.imgPreview(item.image?.hashId).then((res) => {
      const fileType = res.data.type.split("/")[1];
      const file = new File([res.data], `image.${fileType}`, {
        type: res.data.type,
      });
      setUrl(getURlFile(file));
    });
  }, []);

  return (
    <button onClick={() => setCategoryId(item.id)} className="card">
      <img src={url} alt="" />
      <h3>{item.name}</h3>
    </button>
  );
};

export default CardCat;
