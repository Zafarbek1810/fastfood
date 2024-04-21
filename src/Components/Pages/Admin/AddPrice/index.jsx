import { Avatar, Button, Card, Modal, Skeleton, Spin } from "antd";
const { Meta } = Card;
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import AdminProvider from "../../../../Data/AdminProvider";
import getURlFile from "../../../../utils/imgPreview";
import { AddPriceWrapper } from "./style";
import EditSvg from "../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../Common/Svgs/DeleteSvg";
import { IconButton } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import numberFormat from "../../../../utils/numberFormat";

const AddPrice = () => {
  const confirm = useConfirm();
  const productForm = useForm();
  const [fetch, setFetch] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editObj, setEditObj] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const[toKitchen, setToKitchen] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    AdminProvider.getCategory()
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoading2(true);
    AdminProvider.getProducts(categoryId)
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

  const handleOk = productForm.handleSubmit(async (values) => {
    if (isEdit) {
      try {
        const { image, ...rest } = values;
        const imageData = await uploadImg(image[0]);
        const res = await AdminProvider.updateProduct({
          ...rest,
          id: editObj?.id,
          categoryId: editObj.category?.id,
          imageId: imageData.data?.id || editObj.image?.id,
          name: rest.name,
          price: rest.price,
          isAvailable: true,
          toKitchen: !toKitchen,
          description: "",
        });
        console.log(res);
        setIsModalOpen(false);
        setIsEdit(false);
        productForm.reset();
        setFetch(Math.random());
        toast.success("Muvaffaqiyatli yangilandi");
      } catch (err) {
        console.log("PRODUCT YARATISHDA ERROR", err);
      }
    } else {
      try {
        const { image, ...rest } = values;
        const imageData = await uploadImg(image[0]);
        const res = await AdminProvider.createProduct({
          ...rest,
          imageId: imageData.data?.id,
          categoryId: +rest.categoryId.value,
          name: rest.name,
          price: +rest.price,
          isAvailable: true,
          toKitchen: !toKitchen,
          description: "",
        });
        console.log(res);
        setIsModalOpen(false);
        productForm.reset();
        setIsEdit(false);
        setFetch(Math.random());
        toast.success("Muvaffaqiyatli yaratildi");
      } catch (err) {
        console.log("PRODUCT YARATISHDA ERROR", err);
      }
    }
  });

  const categoryOptions = useMemo(() => {
    return [
      ...category.map((i) => ({
        label: i.name,
        value: i.id,
      })),
    ];
  }, [category]);

  const handleEdit = (obj) => {
    setEditObj(obj);
    setIsEdit(true);
    console.log(obj);
    setIsModalOpen(true);
    productForm.setValue("name", obj.name);
    productForm.setValue("price", obj.price);
    productForm.setValue("categoryId", {
      label: obj.category?.name,
      value: obj.category?.id,
    });
  };


  const deleteProduct = (id) => {
    confirm({
      title: "Menyu o'chirilsinmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(() => {
        setLoading(true);
        AdminProvider.deleteProduct(id)
          .then((res) => {
            console.log(res);
            setFetch(Math.random());
            toast.success("Muvaffaqiyatli o'chirildi!");
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AddPriceWrapper>
      <div className="left">
        <div className="top">
          <Button type="primary" onClick={showModal}>
            Menyu qo'shish
          </Button>
          <Modal
            title="Menyu yaratish"
            open={isModalOpen}
            onCancel={handleCancel}
            onOk={handleOk}
            style={{background:"#fff"}}
          >
            <form onSubmit={handleOk}>
              <label className="label">
                Kategoriya
                <Controller
                  control={productForm.control}
                  name="categoryId"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <Select
                      className="select"
                      value={value}
                      placeholder="Categoryni tanlang"
                      options={categoryOptions}
                      onBlur={onBlur}
                      onChange={(v) => {
                        onChange(v);
                      }}
                      ref={ref}
                    />
                  )}
                />
              </label>
              <label className="label">
                <span>Menyu nomi</span>
                <input
                  className="ant-input"
                  type="text"
                  {...productForm.register("name", { required: true })}
                />
              </label>
              <label className="label">
                <span>Rasm</span>
                <input
                  type="file"
                  multiple={false}
                  {...productForm.register("image", { required: true })}
                />
              </label>
              <label className="label">
                Menyu narxi
                <input
                  type="number"
                  {...productForm.register("price", { required: true })}
                />
              </label>
              <label style={{display:'flex', gap: "20px"}}>
                <input
                onChange={e=>setToKitchen(e.target.checked)}
                style={{
                  background:'#fff'
                }}
                  type="checkbox"
                  />
                  Tayyor mahsulotmi?
              </label>


            </form>
          </Modal>
        </div>
        <div className="wrapper">
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
      </div>
      <div className="right">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th style={{ minWidth: "20%" }} className="col">
                Rasmi
              </th>
              <th style={{ minWidth: "30%" }} className="col">
                Nomi
              </th>
              <th style={{ minWidth: "30%" }} className="col">
                Narxi
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            <Spin spinning={loading2}>
              {products.map((item, index) => (
                <tr key={index}>
                  <td style={{ minWidth: "20%" }} className="col">
                    <ProductPro item={item} />
                  </td>
                  <td style={{ minWidth: "30%" }} className="col">
                    {item.name}
                  </td>
                  <td style={{ minWidth: "30%" }} className="col">
                    {numberFormat(item.price)}
                  </td>
                  <td style={{ minWidth: "20%" }} className="col">
                    <div className="btns">
                      <IconButton
                        style={{ background: "rgb(253, 181, 40, 0.12)" }}
                        onClick={() => handleEdit(item)}
                      >
                        <EditSvg />
                      </IconButton>
                      <IconButton
                        style={{ background: "rgb(253, 181, 40, 0.12)" }}
                        onClick={() => deleteProduct(item.id)}
                      >
                        <DeleteSvg />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </Spin>
          </tbody>
        </table>
      </div>
    </AddPriceWrapper>
  );
};

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
    <Card
      onClick={() => setCategoryId(item.id)}
      style={{
        width: 300,
        marginTop: 16,
        borderColor: "#e5e5e5",
        boxShadow: "0px 0px 5px 4px rgba(229,229,229,1)",
        cursor: "pointer",
      }}
      actions={null}
    >
      <Skeleton loading={loading} avatar active>
        <Meta avatar={<Avatar src={url} />} title={item.name} />
      </Skeleton>
    </Card>
  );
};

const ProductPro = ({ item }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    AdminProvider.imgPreview(item.image?.hashId).then((res) => {
      const fileType = res.data.type.split("/")[1];
      const file = new File([res.data], `image.${fileType}`, {
        type: res.data.type,
      });
      setUrl(getURlFile(file));
    });
  }, [item]);

  return (
    <AddPriceWrapper>
      <div className="product">
        <div className="img">
          <img src={url} alt="img" />
        </div>
      </div>
    </AddPriceWrapper>
  );
};

export default AddPrice;
