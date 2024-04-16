import styled from "styled-components";

const Wrap = styled.div`
  border: 3px solid #000;
  margin: 10px;
  border-radius: 15px;
  padding: 15px;

  

  .top {
    display: flex;
    gap: 50px;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    .success {
      background: #09bb53;
      border: none;
      border-radius: 10px;
      padding: 10px 20px;
      color: #fff;
    }
    .danger {
      background: #b22222;
      border: none;
      border-radius: 10px;
      padding: 10px;
      color: #fff;
    }
  }

  .order-card {
    border-top: 1px solid #555;
    .in{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      border-bottom: 1px solid #555;
      min-height: 120px;

      span{
        color: red;
        font-size: 30px;
      }
    }
  }
`;

export { Wrap };
