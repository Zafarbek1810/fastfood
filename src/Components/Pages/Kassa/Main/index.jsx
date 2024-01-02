import React, { useEffect, useState } from "react";
import { Wrapper } from "./style";
import CashierProvider from "../../../../Data/CashierProvider";
import AdminProvider from "../../../../Data/AdminProvider";
import { Avatar, Button, Card, Modal, Skeleton, Spin } from "antd";
const { Meta } = Card;
import getURlFile from "../../../../utils/getUrlFromFile";
import { AddPriceWrapper } from "../../Admin/AddPrice/style";
import numberFormat from "../../../../utils/numberFormat";

const Main = () => {
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    CashierProvider.getCategory()
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoading2(true);
    CashierProvider.getProducts(categoryId)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading2(false);
      });
  }, [fetch, categoryId]);

  const uploadImg = async (file) => {
    const formdata = new FormData();
    formdata.append("file", file);
    const res = await AdminProvider.fileUpload(formdata);
    return res.data;
  };

  return (
    <Wrapper>
      <div className="bottom">
        <div className="wrap">
          <div className="left">
            {category ? (
              category.map((item, index) => (
                <CardCat
                  loading={loading}
                  setLoading={setLoading}
                  key={index}
                  item={item}
                  setFetch={setFetch}
                  setCategoryId={setCategoryId}
                />
              ))
            ) : (
              <h3>Menyu mavjud emas</h3>
            )}
          </div>
          <div className="middle">
            {products.length > 0 ? (
              products.map((item) => (
                <div className="product">
                  <ProductPro item={item} key={item.id} />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <div className="right">
            <div className="orders">
              <div className="main">main</div>
              <button>Buyurtma berish</button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const CardCat = ({ item, loading, setCategoryId }) => {
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
    <button onClick={() => setCategoryId(item.id)} className="card">
      <img src={url} alt="" />
      <h3>{item.name}</h3>
    </button>
  );
};

const ProductPro = ({ item }) => {
  const [url, setUrl] = useState("");
  const [productsArr, setProductsArr] = useState([]);

  const handleClick = (item) => {
    setProductsArr([item]);
    console.log(productsArr, "pro");
  };

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

export default Main;
