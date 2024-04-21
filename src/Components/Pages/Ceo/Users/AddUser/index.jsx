import React, { useEffect, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { DrawerWrapper, ModalContent, ModalHeader } from "./style";
import Select from "react-select";
import { toast } from "react-toastify";
import { PatternFormat } from "react-number-format";
import ButtonLoader from "../../../../Common/ButtonLoader";
import CloseIconSvg from "../../../../Common/Svgs/CloseIconSvg";
import UserProvider from "../../../../../Data/UserProvider";

const AddUser = ({ onCloseModal }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [roleType, setRoleType] = useState({});

 

  const onSubmitUser = async (values) => {
    const body = {};
    body.firstName = values.firstName;
    body.lastName = values.lastName;
    body.username = values.username;
    body.password = values.password;
    body.roleName = roleType.value;

    console.log("body", values);
    setLoading(true);
    UserProvider.createUser(body)
      .then((res) => {
        toast.success("Qo'shildi");
        onCloseModal();
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.reason);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const options = [
    { value: 'ROLE_ADMIN', label: "Admin" },
    { value: 'ROLE_CASHIER', label: "Kassir" },
    { value: 'ROLE_KITCHEN', label: "Kuxnya" },
    { value: 'ROLE_TV', label: "Ekran" },
  ];

 
  return (
    <DrawerWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Foydalanuvchi qo`shish</h2>
        <button className="closeSvg" onClick={onCloseModal}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitUser)}
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
            <label>Username</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Username"}
              {...register("username", { required: true })}
            />
          </div>
         
          <div className="label">
            <label>Parol</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Parol"}
              {...register("password", { required: true })}
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
          <button
            type="submit"
            className="btn btn-primary btn-rounded m-1"
            style={{ display: "flex" }}
          >
            Qo`shish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </DrawerWrapper>
  );
};

export default AddUser;
