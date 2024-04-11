import React from "react";
import { useContextSelector } from "use-context-selector";
import UserContext from "../../../../Context/UserContext";
import { useRouter } from "next/router";
import { useConfirm } from "material-ui-confirm";
import { Wrapper } from "./style";

const KitchenHeader = ({array}) => {
  const logoutContext = useContextSelector(
    UserContext,
    (ctx) => ctx.actions.logout
  );

  const router = useRouter();
  const confirm = useConfirm();
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
  return (
    <Wrapper>
      <div className="top">
        <div className="wrap">
          <div className="left">
            <h3>Jami buyurtmalar soni: {array.filter(i=>i.status==="PENDING").length}</h3>
          </div>
          <div className="center">
            {
              array.filter(i=>i.status==="PENDING").length === 0 ? <span>Hozircha buyurtma yo'q</span> : ''
            }
          </div>
          <div className="right">
            <button onClick={handleLogout} title="Chiqish">
            Chiqish <img src="/images/logout.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default KitchenHeader;
