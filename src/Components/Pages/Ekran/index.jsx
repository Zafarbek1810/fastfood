import React, { useEffect, useRef, useState } from "react";
import OrderProvider from "../../../Data/OrderProvider";
import { Wrapper } from "./style";
import { useContextSelector } from "use-context-selector";
import UserContext from "../../../Context/UserContext";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";
import SeoProvider from "../../../Data/SeoProvider";
import { Modal } from "antd";

const EkranMain = () => {
  const [orders, setOrders] = useState([]);
  const [ordersReady, setOrdersReady] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const logoutContext = useContextSelector(
    UserContext,
    (ctx) => ctx.actions.logout
  );
  const confirm = useConfirm();
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = () => {
      OrderProvider.getAllOrders("PENDING")
        .then((res) => {
          setOrders(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchOrders = () => {
      OrderProvider.getAllOrders("READY")
        .then((res) => {
          setOrdersReady(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const [urlAudio, setUrlAudio] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (ordersReady.filter((item) => item.toModal == 1).length === 1) {
        setOpenModal(true);
        playAudio(
          ordersReady.filter((item) => item.toModal == 1)[0]?.sequenceNumber,
          "female"
        );
        setTimeout(() => {
          OrderProvider.updateModalStatus(
            +ordersReady.filter((item) => item.toModal == 1)[0].sequenceNumber
          );
          setOpenModal(false);
        }, 3000);
      }
    };
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 3000);
    return () => clearInterval(intervalId);
  }, [ordersReady]);

  const handleLogout = () => {
    confirm({
      title: "Haqiqatan ham tizimdan chiqmoqchimisiz?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(() => {
        logoutContext();
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const playAudio = (number) => {
    setUrlAudio(
      `http://217.18.63.208:8080/api/tv/file/preview/audio?number=${number}&gender=female`
    );
    // SeoProvider.tvFileGetAudio(number, "female")
    //   .then((res) => {
    //     setUrlAudio(
    //       `http://217.18.63.208:8080/api/tv/file/preview/audio?number=${number}&gender=female`
    //     );
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <Wrapper>
      {ordersReady.filter((item) => item.toModal == 1).length !== 0 && (
        <Modal
          style={{
            top: "25%",
          }}
          open={true}
          footer={false}
        >
          {urlAudio && (
            <audio
              style={{ display: "none" }}
              controls
              autoPlay
              src={urlAudio}
            />
          )}
          <div className="modal-inner">
            <h1>
              {
                ordersReady.filter((item) => item.toModal == 1)[0]
                  .sequenceNumber
              }
            </h1>
          </div>
        </Modal>
      )}
      <button className="logout" onClick={handleLogout}>
        Chiqish
      </button>
      <div className="left">
        <h1 className="title">Tayyorlanmoqda</h1>
        <div className="numbers">
          {orders.map((order, index) => (
            <h2 key={index}>{order.sequenceNumber}</h2>
          ))}
        </div>
      </div>
      <div className="middle">
        {video.length ? (
          video.map((item) => {
            return <CardPro obj={item} />;
          })
        ) : (
          <></>
        )}
      </div>
      <div className="right">
        <h1 className="title">Tayyor</h1>
        <div className="numbers">
          {ordersReady.map((order, index) => (
            <h2>{order.sequenceNumber}</h2>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default EkranMain;

const CardPro = ({ obj }) => {
  const [url, setUrl] = useState("");

  console.log(obj, "obj");
  useEffect(() => {
    setUrl(
      `http://217.18.63.208:8080/api/admin/file/preview/video?hashId=${obj.hashId}`
    );
  }, [obj]);

  return (
    <>
      <div className="card">
        {obj.extension === "mp4" && url && (
          <video
            onContextMenu={(e) => e.preventDefault()}
            controls="controls"
            autoPlay
            loop
            controlsList="nodownload"
            id="videoElement"
          >
            <source src={url} type="video/mp4" />
          </video>
        )}
      </div>
    </>
  );
};
