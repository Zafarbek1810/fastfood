import React, { useEffect, useState } from "react";
import { Wrapper } from "./style";
import CashierProvider from "../../../../Data/CashierProvider";
import OrderItem from "./components/OrderItem";
import ProductPro from "./components/ProductPro";
import CardCat from "./components/CardCat";
import numberFormat from "../../../../utils/numberFormat";
import OrderProvider from "../../../../Data/OrderProvider";
import { toast } from "react-toastify";
import { Modal, Drawer, Button } from "antd";

const Main = ({setLastOrderId}) => {
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [productArr, setProductArr] = useState([]);
  const [summ, setSumm] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [descr, setDescr] = useState("");
  const [editProductId, setEditProductId] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const totalSum = productArr.reduce((sum, item) => {
    const count = parseInt(item.count, 10) || 0;
    const price = parseFloat(item.price) || 0;
    return sum + count * price;
  }, 0);

  const totalCount = productArr.reduce((count, item) => {
    const itemCount = parseInt(item.count, 10) || 0;
    return count + itemCount;
  }, 0);

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
    CashierProvider.getProducts(categoryId)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetch, categoryId]);

  console.log(productArr);

  const handleClick = (item) => {
    const existingProduct = productArr.find(
      (product) => product.id === item.id
    );

    if (existingProduct) {
      setProductArr((prevArr) =>
        prevArr.map((product) =>
          product.id === item.id
            ? { ...product, count: product.count + 1 }
            : product
        )
      );
    } else {
      setProductArr((prevArr) => [...prevArr, { ...item, count: 1 }]);
    }
  };

  const handleDelete = (id) => {
    setProductArr((prevArr) => {
      const updatedArr = prevArr.map((product) =>
        product.id === id
          ? { ...product, count: product.count > 1 ? product.count - 1 : 0 }
          : product
      );

      const filteredArr = updatedArr.filter((product) => product.count > 0);

      const newSumm = filteredArr.reduce((total, product) => {
        const count = parseInt(product.count, 10) || 0; // Convert count to a valid integer
        const price = parseFloat(product.price) || 0; // Convert price to a valid number
        return total + count * price;
      }, 0);

      setSumm(newSumm);
      return filteredArr;
    });
  };

  const handleEdit = (id) => {
    const productToUpdate = productArr.find((product) => product.id === +id);
    if (productToUpdate) {
      setIsModalOpen(true);
      setDescr(productToUpdate.description || "");
      setEditProductId(+id);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
    const updatedProductArr = productArr.map((product) => {
      if (product.id === editProductId) {
        return { ...product, description: descr };
      }
      return product;
    });
    setProductArr(updatedProductArr);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCreateOrder = (productArr) => {
    setLoadingBtn(true);
    OrderProvider.createOrder()
      .then(async (res) => {
        console.log(res);
        if (res.data.success) {
          const body = [];
          setLastOrderId(res.data.data)

          for (let i = 0; i < productArr.length; i++) {
            body.push({
              orderId: res.data.data,
              productId: productArr[i].id,
              quantity: productArr[i].count,
              description: productArr[i].description,
            });
          }
          await OrderProvider.addProductOrder(body)
            .then((res) => {
              toast.success("Buyurtma muvaffaqiyatli berildi");
              setProductArr([]);
              setLoadingBtn(false);
            })
            .catch((err) => {
              console.log(err);
            });

          // await OrderProvider.downloadPdf(res.data.data)
          //   .then((res) => {
          //     console.log(res);
          //     const blob = new Blob([res.data], {
          //       type: "application/pdf",
          //     });

          //     const link = document.createElement("a");
          //     link.href = window.URL.createObjectURL(blob);
          //     //no download
          //     link.target = "_blank";
          //     link.click();

          //     // link.download = `${drawerData.firstName} ${drawerData.lastName}.pdf`;
          //     // link.click();
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //     toast.error(err?.response?.data?.message);
          //   });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingBtn(false);
      });
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
                  <ProductPro
                    handleClick={handleClick}
                    item={item}
                    key={item.id}
                  />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <div className="right">
            <div className="orders">
              <div className="main">
                {productArr ? (
                  productArr.map((item, index) => (
                    <OrderItem
                      key={index}
                      item={item}
                      setSumm={setSumm}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                    />
                  ))
                ) : (
                  <h3>Menyu mavjud emas</h3>
                )}
              </div>
              <button
                onClick={() => handleCreateOrder(productArr)}
                className="order"
                disabled={loadingBtn}
              >
                Buyurtma berish <b>{totalCount > 0 && `  ${totalSum} so'm`}</b>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Drawer
        title="Tahrirlash"
        placement={'left'}
        closable={false}
        onClose={handleCancel}
        open={isModalOpen}
        
      >
        <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
        <input
          style={{ width: "100%" }}
          type="text"
          value={descr}
          onChange={(e) => setDescr(e.target.value)}
        />
        <Button onClick={handleOk}>
          Saqlash
        </Button>
        </div>
      </Drawer>
    </Wrapper>
  );
};

export default Main;
