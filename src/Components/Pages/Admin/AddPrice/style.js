import styled from "styled-components";

const AddPriceWrapper = styled.div`
  display: flex;
  .left {
    width: 50%;
  }

  .right {
    width: 50%;
  }

  .product {
    width: 100%;
    .ant-card-body {
      display: flex !important;
      justify-content: space-between;
    }
    .img {
      width: 50px;
      height: 50px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  table{
    thead{
      width: 100%;
      tr{
        display: flex;
      }
    }
    tbody{
      width: 100%;

      tr{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        width: 100%;
      }
    }
  }
`;

export { AddPriceWrapper };
