import React, { useEffect, useState } from "react";
import { CompanyWrapper } from "./style";
import { IconButton } from "@mui/material";
import EditSvg from "../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../Common/Svgs/DeleteSvg";
import { useConfirm } from "material-ui-confirm";
import { Button, Drawer, Input, Spin } from "antd";
import CompanyProvider from "../../../../Data/CompanyProvider";
import AddCompany from "./AddCompany";
import { toast } from "react-toastify";
import EditCompany from "./EditCompany";

const Company = () => {
  const confirm = useConfirm();
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawer2, setOpenDrawer2] = useState(false);
  const [edit, setEdit] = useState({})

  const get = () => {
    CompanyProvider.getCompany()
      .then((res) => {
        setCompany(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    get();
  }, [openDrawer, openDrawer2]);

  const handleEdit = (obj) => {
    console.log(obj);
    setOpenDrawer2(true)
    setEdit(obj)
  };

  const deleteProduct = (id) => {
    confirm({
      title: "Company o'chirilsinmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(() => {
        setLoading(true);
        CompanyProvider.deleteCompany(id)
          .then((res) => {
            console.log(res);
            toast.success("Muvaffaqiyatli o'chirildi!");
            get();
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

  const handleDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <CompanyWrapper>
      <div className="top">
        <h3>Kompaniya</h3>
        <Button type="primary" onClick={handleDrawer}>
          Kompaniya qo'shish
        </Button>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{ minWidth: "20%" }} className="col">
              Nomi
            </th>
            <th style={{ minWidth: "20%" }} className="col">
              Address
            </th>
            <th style={{ minWidth: "20%" }} className="col">
              Telefon raqam
            </th>
            <th style={{ minWidth: "20%" }} className="col">
              Telegram bot
            </th>
            <th style={{ minWidth: "20%" }} className="col">
              Amallar
            </th>
          </tr>
        </thead>
        <tbody>
          {company.map((item, index) => (
            <tr key={index}>
              <td style={{ minWidth: "20%" }} className="col">
                {index+1}. {item.name}
              </td>
              <td style={{ minWidth: "20%" }} className="col">
                {item.address}
              </td>
              <td style={{ minWidth: "20%" }} className="col">
                {item.phoneNum}
              </td>
              <td style={{ minWidth: "20%" }} className="col">
                {item.telegramBot}
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
        </tbody>
      </table>

      <Drawer
        title="Company qo'shish"
        placement="right"
        closable={true}
        onClose={() => setOpenDrawer(false)}
        visible={openDrawer}
        width={500}
      >
        <AddCompany setOpenDrawer={setOpenDrawer} />
      </Drawer>
      <Drawer
        title="Company taxrirlash"
        placement="right"
        closable={true}
        onClose={() => setOpenDrawer2(false)}
        visible={openDrawer2}
        width={500}
      >
        <EditCompany setOpenDrawer2={setOpenDrawer2} edit={edit}/>
      </Drawer>
    </CompanyWrapper>
  );
};

export default Company;
