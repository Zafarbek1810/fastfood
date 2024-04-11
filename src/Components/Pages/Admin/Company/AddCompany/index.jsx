import React, { useState } from 'react';
import { AddCompanyWrapper } from '../style';
import ButtonLoader from '../../../../Common/ButtonLoader';
import { Controller, useForm } from 'react-hook-form';
import CompanyProvider from '../../../../../Data/CompanyProvider';
import { toast } from 'react-toastify';
import { PatternFormat } from 'react-number-format';

const AddCompany = ({setOpenDrawer}) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset,
      } = useForm();
      const [loading, setLoading] = useState(false)


      const onSubmit = async (values) => {
        const body = {};
        console.log("values", values);
        body.companyName = values.companyName;
        body.address = values.address;
        body.phoneNum = values.phoneNum;
        body.telegramBot = values.telegramBot;
        setLoading(true);
        CompanyProvider.addCompany(body)
          .then((res) => {
            toast.success(res.data?.message);
            reset();
            setOpenDrawer(false);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message);
          })
          .finally(() => {
            setLoading(false);
          });
      };

    return (
        <AddCompanyWrapper>
            <form
          className="p-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="label">
            <label>Kompaniya nomi</label>
            {errors.companyName && (
              <span className="err-text">Majburiy maydon</span>
            )}
            <input
              autoComplete="off"
              className="form-control"
              style={errors.companyName && { border: "1px solid red" }}
              placeholder={"Kompaniya nomi"}
              {...register("companyName", { required: true })}
            />
          </div>
          
          <div className="label">
            <label>Manzil</label>
            {errors.address && (
              <span className="err-text">Majburiy maydon</span>
            )}
            <input
              autoComplete="off"
              className="form-control"
              style={errors.address && { border: "1px solid red" }}
              placeholder={"Manzil"}
              {...register("address", { required: true })}
            />
          </div>
          <div className="label">
            <label>Telefon raqami</label>
            <Controller
              control={control}
              name="phoneNum"
              render={({ field: { onChange, onBlur, value } }) => (
                <PatternFormat
                  format="+998(##) ### ## ##"
                  className="form-control"
                  mask="_" 
                  name="phoneNum"
                  allowEmptyFormatting
                  value={value}
                  style={{ width: "100%" }}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </div>
          <div className="label">
            <label>Telegram bot</label>
            {errors.telegramBot && (
              <span className="err-text">Majburiy maydon</span>
            )}
            <input
              autoComplete="off"
              className="form-control"
              style={errors.telegramBot && { border: "1px solid red" }}
              placeholder={"Telegram bot"}
              {...register("telegramBot", { required: true })}
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
        </AddCompanyWrapper>
    );
};

export default AddCompany;