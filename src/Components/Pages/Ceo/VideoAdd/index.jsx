import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  VideoWrapper,
  VideoListWrapper,
  CardProWrap,
  VideoListWrap,
} from "./style";
import { Image, Spin, Tabs, Upload } from "antd";
import DeleteSvg from "../../../Common/Svgs/DeleteSvg";
import FileSvg from "../../../Common/Svgs/FileSvg";
import SeoProvider from "../../../../Data/SeoProvider";
import AdminProvider from "../../../../Data/AdminProvider";

const VideoAdd = () => {
  const [forRender, setForRender] = useState(false);
  const onChange = (key) => {
    console.log(key);
    setForRender(key);
  };

  const items = [
    {
      label: "Fayl yuklash",
      key: "1",
      children: <UploadVideoCourse forRender={forRender} />,
    },
    {
      label: "Fayllarni ko'rish",
      key: "2",
      children: <VideoList forRender={forRender} />,
    },
  ];

  return <Tabs onChange={onChange} type="card" items={items} />;
};

const UploadVideoCourse = ({ forRender }) => {
  const fileForm = useForm();
  const [fileStorageId, setFileStorageId] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);

  const uploadVideo = async (file) => {
    const formdata = new FormData();

    formdata.append("file", file);
    setBtnLoading(true);
    const res = await SeoProvider.uploadVideo(formdata);
    setBtnLoading(false);
    toast.success('Muvaffaqiyatli yuklandi!')

    return res.data;
  };

  // const onSubmit = async () => {
  //   const body = {
  //     fileStorageId: fileStorageId,
  //   };
  //   console.log(body);
  //   setBtnLoading(true);
  //   RoleFileProvider.postFile(body)
  //     .then((res) => {
  //       console.log(res.data);
  //       toast.success("File yuklandi");
  //       setBtnLoading(false);
  //       setFileStorageId(null);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("Video yuklanmadi");
  //       setBtnLoading(false);
  //     });
  // };

  return (
    <>
      <VideoWrapper>
        <Spin spinning={btnLoading} tip="Yuklanmoqda...">
          <div className="left">
            <label>
              <span>Fayl</span>
              <input
                type="file"
                name="file"
                onChange={(e) => uploadVideo(e.target.files[0])}
              />
            </label>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
            <button
            class="btn btn-success btn-rounded m-1"
            type="submit"
            disabled={!fileStorageId || !fileCategoryId}
            >
            {!btnLoading ? "Yuklash" : "Yuklanmoqda"}
            {btnLoading && (
              <div
              class="spinner-border spinner-border-sm ms-3"
              role="status"
              ></div>
              )}
              </button>
            </form> */}
          </div>
        </Spin>
      </VideoWrapper>
    </>
  );
};

const VideoList = ({ forRender }) => {
  return (
    <VideoListWrapper>
      <div className="bottom">
        <VideoListPro />
      </div>
    </VideoListWrapper>
  );
};

const VideoListPro = ({ fileCategoryId, courseId }) => {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    SeoProvider.getVideos()
      .then((res) => {
        console.log(res.data.data);
        setVideo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteFile = async (hashId) => {
    await AdminProvider.deleteFile(hashId)
      .then((res) => {
        console.log(res.data);
        toast.success("Fayl o'chirildi");
        setVideo(video.filter((item) => item.hashId !== hashId));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Fayl o'chirilmadi");
      });
  };

  return (
    <VideoListWrap>
      <div className="files">
        {video.length ? (
          video.map((item) => (
            <CardPro
              obj={item}
              deleteFile={deleteFile}
              key={item.id}
              fileCategoryId={fileCategoryId}
            />
          ))
        ) : (
          <h3 className="empty" style={{ margin: "auto", marginTop: 50 }}>
            Fayl mavjud emas
          </h3>
        )}
      </div>
    </VideoListWrap>
  );
};

const CardPro = ({ obj, fileCategoryId, deleteFile }) => {
  const [url, setUrl] = useState("");

  console.log(obj);

  useEffect(() => {
    setUrl(
      ` http://217.18.63.208:8080/api/admin/file/preview/video?hashId=${obj.hashId}`
    );
  }, [fileCategoryId]);

  // useEffect(() => {
  //   AdminProvider.previewVideo(obj.hashId).then((res) => {
  //     const fileType = res.data?.type.split("/")[1];
  //     const file = new File([res.data], `image.${fileType}`, {
  //       type: res.data.type,
  //     });

  //     setUrl(getURlFile(file));
  //   });
  // }, [obj]);

  return (
    <CardProWrap>
      <div className="card">
        {obj.extension === "mp4" ? (
          url && (
            <video
              onContextMenu={(e) => e.preventDefault()}
              controls="controls"
              controlsList="nodownload"
              id="videoElement"
            >
              <source src={url} type="video/mp4" />
            </video>
          )
        ) : obj.extension === "pdf" ? (
          <>
            <FileSvg />
            <a href={url} target="__blank">
              Ko'rish
            </a>
          </>
        ) : obj.extension === "jpg" ||
          obj.extension === "png" ||
          obj.extension === "jpeg" ||
          obj.extension === "gif" ||
          obj.extension === "svg" ||
          obj.extension === "webp" ||
          obj.extension === "tiff" ? (
          <Image src={url} alt="img" />
        ) : obj.extension === "doc" ||
          obj.extension === "docx" ||
          obj.extension === "xls" ||
          obj.extension === "xlsx" ||
          obj.extension === "ppt" ||
          obj.extension === "pptx" ||
          obj.extension === "pps" ||
          obj.extension === "txt" ? (
          url && (
            <>
              <FileSvg />
              <a
                href={url}
                //only wiew not download
                target="_blank"
                rel="noreferrer"
                download={false}
              >
                Yuklab olish
              </a>
            </>
          )
        ) : obj.extension === "mp3" ||
          obj.extension === "wav" ||
          obj.extension === "ogg" ? (
          url && (
            <audio controls controlsList="nodownload">
              <source src={url} type="audio/mpeg" />
              <source src={url} type="audio/ogg" />
            </audio>
          )
        ) : (
          <></>
        )}
        <div className="bottom">
          <h3 className="orginalName">{obj.originalName}</h3>
          <button
            className="delete"
            onClick={() => {
              if (window.confirm("Faylni o'chirishni xohlaysizmi?")) {
                deleteFile(obj.hashId);
              } else {
                return;
              }
            }}
          >
            <DeleteSvg />
          </button>
        </div>
      </div>
    </CardProWrap>
  );
};

export default VideoAdd;
