import React, { useEffect, useState } from "react";
import { Wrapper } from "./style";
import CashierProvider from "../../../../Data/CashierProvider";
import OrderItem from "./components/OrderItem";
import ProductPro from "./components/ProductPro";
import CardCat from "./components/CardCat";
import numberFormat from "../../../../utils/numberFormat";
import OrderProvider from "../../../../Data/OrderProvider";
import { toast } from "react-toastify";

const Main = () => {
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [productArr, setProductArr] = useState([]);
  const [summ, setSumm] = useState(0);

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
    // Check if the product is already in the productArr
    const existingProduct = productArr.find(
      (product) => product.id === item.id
    );

    if (existingProduct) {
      // If it exists, update the count
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

  const handleCreateOrder = (productArr) => {
    OrderProvider.createOrder()
      .then((res) => {
        console.log(res.data.success);
        if (res.data.success) {
          const body = [];
          for (let i = 0; i < productArr.length; i++) {
            body.push({
              orderId: res.data.data,
              productId: productArr[i].id,
              quantity: productArr[i].count,
            });
          }
          OrderProvider.addProductOrder(body)
            .then((res) => {
              console.log(res);
              toast.success("Buyurtma muvaffaqiyatli berildi");
              setProductArr([])
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
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
                    />
                  ))
                ) : (
                  <h3>Menyu mavjud emas</h3>
                )}
              </div>
              <button
                onClick={() => handleCreateOrder(productArr)}
                className="order"
              >
                Buyurtma berish <b>{totalCount > 0 && `  ${totalSum} so'm`}</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Main;
