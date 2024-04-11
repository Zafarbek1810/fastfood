import React, { useState } from "react";
import { AudioAddWrapper } from "./style";
import { Input, Radio, Spin } from "antd";
import SeoProvider from "../../../../../Data/SeoProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AudioAdd = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const fileForm = useForm();
  const { handleSubmit } = fileForm;
  const [gender, setGender] = useState('male');
  const [number, setNumber] = useState(null);
  const [file, setFile] = useState({});

  const onChangeGender = (e) => {
    setGender(e.target.value);
  };

  const onChangeNumber = (e) => {
    setNumber(e.target.value)
  };

  const onChangeFile = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setFile(formData);
  };

  const onSubmit = async () => {
    setBtnLoading(true);
    SeoProvider.uploadAudio(gender, number, file)
      .then((res) => {
        console.log(res.data);
        toast.success("Audio yuklandi");
        setBtnLoading(false);
        setFile({})
        setGender('male')
        setNumber(null)
      })
      .catch((err) => {
        console.log(err);
        toast.error("Audio yuklanmadi");
        setBtnLoading(false);
      });
  };

  return (
    <AudioAddWrapper>
      <Spin spinning={btnLoading} tip="Yuklanmoqda...">
        <h3>
            Audio yuklash
        </h3>
        <div className="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <Radio.Group onChange={onChangeGender} value={gender}>
                <Radio value={'male'}>Erkak</Radio>
                <Radio value={'female'}>Ayol</Radio>
              </Radio.Group>
            </label>
            <label>
            <span>Raqam</span>
              <Input onChange={onChangeNumber} type="number"/>
            </label>
            <label>
              <span>Audio fayl</span>
              <input
                type="file"
                name="file"
                onChange={(e) => onChangeFile(e)}
              />
            </label>
            <button class="btn btn-success btn-rounded m-1" type="submit">
              {!btnLoading ? "Yuklash" : "Yuklanmoqda"}
              {btnLoading && (
                <div
                  class="spinner-border spinner-border-sm ms-3"
                  role="status"
                ></div>
              )}
            </button>
          </form>
        </div>
      </Spin>
    </AudioAddWrapper>
  );
};

export default AudioAdd;
