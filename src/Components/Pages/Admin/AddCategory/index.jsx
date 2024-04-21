import React, { useEffect, useState } from "react";
import { AddCategoryWrapper } from "./style";
import { Avatar, Button, Card, Skeleton, Modal, Form, Input } from "antd";
const { Meta } = Card;
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AdminProvider from "../../../../Data/AdminProvider";
import getURlFile from "../../../../utils/imgPreview";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useConfirm } from "material-ui-confirm";
import { useForm } from "react-hook-form";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const productForm = useForm();
  const [fetch, setFetch] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editObj, setEditObj] = useState({});

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    productForm.reset();
  };

  useEffect(() => {
    setLoading(true);
    AdminProvider.getCategory()
      .then((res) => {
        console.log(res.data.data);
        setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetch]);

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
        const res = await AdminProvider.updateCategory({
          ...rest,
          id: editObj?.id,
          image: imageData.data || editObj.image,
          name: rest.name,
          isDeleted: false,
        });
        console.log(res);
        setIsModalOpen(false);
        setIsEdit(false)
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
        const res = await AdminProvider.createCategory({
          ...rest,
          image: imageData.data,
          name: rest.name,
          isDeleted: false,
        });
        console.log(res);
        setIsModalOpen(false);
        productForm.reset();
        setIsEdit(false)
        setFetch(Math.random());
        toast.success("Muvaffaqiyatli yaratildi");
      } catch (err) {
        console.log("PRODUCT YARATISHDA ERROR", err);
      }
    }
  });

  const editCategory = (obj) => {
    console.log(obj);
    setIsModalOpen(true);
    setIsEdit(true);
    setEditObj(obj)
    productForm.setValue("name", obj.name);
  };

  return (
    <AddCategoryWrapper>
      <div className="top">
        <Button type="primary" onClick={showModal}>
          Kategoriya qo'shish
        </Button>
        <Modal
          title={isEdit ? "Kategoriya taxrirlash" :"Kategoryiya qo'shish"}
          open={isModalOpen}
          onCancel={handleCancel}
          onOk={handleOk}
          style={{background:"#fff"}}
        >
          <form onSubmit={handleOk}>
            <label className="label">
              <span>Kategoriya nomi</span>
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
          </form>
        </Modal>
      </div>
      <div className="wrapper">
        {category ? (
          category.map((item, index) => (
            <CardCat
            className="card"
              loading={loading}
              setLoading={setLoading}
              key={index}
              item={item}
              setFetch={setFetch}
              editCategory={editCategory}
            />
          ))
        ) : (
          <h3>Menyu mavjud emas</h3>
        )}
      </div>
    </AddCategoryWrapper>
  );
};

const CardCat = ({ item, loading, setLoading, setFetch, editCategory }) => {
  const [url, setUrl] = useState("");
  const router = useRouter();
  const confirm = useConfirm();

  useEffect(() => {
    AdminProvider.imgPreview(item.image?.hashId).then((res) => {
      const fileType = res.data.type.split("/")[1];
      const file = new File([res.data], `image.${fileType}`, {
        type: res.data.type,
      });

      setUrl(getURlFile(file));
    });
  }, []);

  const deleteCategory = (id) => {
    confirm({
      title: "Kategoriya o'chirilsinmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(() => {
        setLoading(true);
        AdminProvider.deleteCategory(id)
          .then((res) => {
            console.log(res);
            setFetch(Math.random());
            toast.success(res.data.data?.message);
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
    <Card
      style={{
        width:300,
        marginTop: 16,
        borderColor: "#e5e5e5",
        boxShadow: "0px 0px 5px 4px rgba(229,229,229,1)",
      }}
      actions={[
        <EditOutlined
          key="edit"
          onClick={() => {
            editCategory(item);
          }}
        />,
        <DeleteOutlined key="delete" onClick={() => deleteCategory(item.id)} />,
      ]}
    >
      <Skeleton loading={loading} avatar active>
        <Meta avatar={<Avatar src={url} />} title={item.name} />
      </Skeleton>
    </Card>
  );
};

export default AddCategory;
