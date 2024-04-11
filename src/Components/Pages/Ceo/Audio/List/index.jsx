import React, { useEffect, useState } from "react";
import SeoProvider from "../../../../../Data/SeoProvider";
import { Styled } from "./style";
import DeleteSvg from "../../../../Common/Svgs/DeleteSvg";
import { IconButton } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import { Spin } from "antd";

const ListAudios = () => {
  const [audios, setAudios] = useState([]);
  const confirm = useConfirm();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const get = () => {
    SeoProvider.getAudios()
      .then((res) => {
        console.log(res.data.data);
        setAudios(res.data.data);
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
  }, []);

  const deleteAudio = (id) => {
    confirm({
      title: "Audio o'chirilsinmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(() => {
        setLoading(true);
        SeoProvider.deleteAudio(id)
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

  const playAudio = (item) => {
    SeoProvider.tvFileGetAudio(item.number, item.gender)
      .then((res) => {
        console.log(res);
        setUrl(
          `http://217.18.63.208:8080/api/tv/file/preview/audio?number=${item.number}&gender=${item.gender}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Styled>
      <Spin spinning={loading}>
        {
            url && <audio style={{display:'none'}} controls autoPlay src={url} />
        }
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th style={{ minWidth: "20%" }} className="col">
                Raqami
              </th>
              <th style={{ minWidth: "60%" }} className="col">
                Jins
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {audios.map((item, index) => (
              <tr key={index}>
                <td style={{ minWidth: "20%" }} className="col">
                  {item.number}
                </td>
                <td
                  onClick={() => playAudio(item)}
                  style={{ minWidth: "60%" }}
                  className="col"
                >
                  {item.gender === "male" ? "Erkak" : "Ayol"}
                </td>
                
                <td style={{ minWidth: "20%" }} className="col">
                  <div className="btns">
                    <IconButton
                      style={{ background: "rgb(253, 181, 40, 0.12)" }}
                      onClick={() => deleteAudio(item.id)}
                    >
                      <DeleteSvg />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Spin>
    </Styled>
  );
};

export default ListAudios;
