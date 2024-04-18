import React from "react";
import { useContextSelector } from "use-context-selector";
import UserContext from "../../../../Context/UserContext";
import { useRouter } from "next/router";
import { useConfirm } from "material-ui-confirm";
import { Wrapper } from "./style";
import OrderProvider from "../../../../Data/OrderProvider";

const KitchenHeader = ({array, lastOrderId}) => {
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
  
  const resetPrintCheque = () => {
    OrderProvider.ordersPrint(lastOrderId)
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })
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
          <button onClick={resetPrintCheque} title="Print chek" style={{border:'1px solid #000', borderRadius: '16px', marginLeft:'10px', padding:'10px'}}>
              Qayta chek chiqarish
            </button>
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
