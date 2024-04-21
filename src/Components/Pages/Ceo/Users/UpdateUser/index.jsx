import React, { useEffect, useState } from "react";
import ButtonLoader from "../../../../Common/ButtonLoader";
import { Controller, useForm } from "react-hook-form";
import CloseIconSvg from "../../../../Common/Svgs/CloseIconSvg";
import Select from "react-select";
import UserProvider from "../../../../../Data/UserProvider";
import { toast } from "react-toastify";
import { DrawerWrapper, ModalContent, ModalHeader } from "../AddUser/style";
import { Checkbox } from "antd";

const UpdateUser = ({ onCloseModal2, editUser }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [editPass, setEditPass] = useState(false);
  const [roleType, setRoleType] = useState({});

  useEffect(() => {
    setValue("firstName", editUser.firstName);
    setValue("lastName", editUser.lastName);
    setValue("username", editUser.username);
    setValue("password", editUser.password);
  }, [editUser]);

  const onSubmitEditUser = async (values) => {
    const body = {};
    body.id = editUser.id;
    body.firstName = values.firstName;
    body.lastName = values.lastName;
    body.password = values.password;
    body.roleName = roleType.value;

    setLoading(true);
    UserProvider.updateUser(body)
      .then((res) => {
        toast.success("Muvaffaqiyatli o'zgartirildi");
        onCloseModal2();
        reset();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const options = [
    { value: "ROLE_ADMIN", label: "Admin" },
    { value: "ROLE_CASHIER", label: "Kassir" },
    { value: "ROLE_KITCHEN", label: "Kuxnya" },
    { value: "ROLE_TV", label: "Ekran" },
  ];

  return (
    <DrawerWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Foydalanuvchi o`zgartirish</h2>
        <button className="closeSvg" onClick={onCloseModal2}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitEditUser)}
        >
          <div className="label">
            <label>Ismi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Ismi"}
              {...register("firstName", { required: true })}
            />
          </div>
          <div className="label">
            <label>Familyasi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Familyasi"}
              {...register("lastName", { required: true })}
            />
          </div>
          <div className="label">
            <label>Lavozimi</label>
            <Controller
              control={control}
              name="lavozim"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select col-3 w-100"
                  value={value}
                  placeholder="Lavozimi"
                  options={options}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    setRoleType(v);
                  }}
                  ref={ref}
                />
              )}
            />
          </div>
          
          <div className="label">
            <label>Parol</label>
            <input
              disabled={!editPass}
              autoComplete="off"
              className="form-control"
              placeholder={"Parol"}
              {...register("password", { required: true })}
            />
          </div>
          <label style={{ display: "flex",alignItems:'center', gap:'20px'}}>
            <input
              onChange={(e) => setEditPass(e.target.checked)}
              style={{
                background: "#fff",
                width:'20px',
                height:'20px'
              }}
              type="checkbox"
            />
            Parol yangilansinmi?
          </label>
          <button
            type="submit"
            className="btn btn-primary btn-rounded m-1"
            style={{ display: "flex" }}
          >
            O`zgartirish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </DrawerWrapper>
  );
};

export default UpdateUser;
