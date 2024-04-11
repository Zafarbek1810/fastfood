import styled from "styled-components";

const VideoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  label {
    display: flex;
    flex-direction: column;

    span {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    input {
      margin-bottom: 10px;
    }
    input {
      width: 100%;
      border: 1px solid #e5e5e5;
      font-style: normal;
      font-weight: 400;
      font-size: 1rem;
      line-height: 16px;
      color: #000000;
      border-radius: 6px;
      padding: 8px;
      background-color: #fff;
    }
    textarea {
      border: 1px solid #e5e5e5;
      background: #fff;
      color: #000;
      padding: 8px;
    }
    .select {
      width: 100%;
      font-style: normal;
      font-weight: 400;
      font-size: 1rem;
      line-height: 20px;
      color: #000000;
      border: 1px solid #000 !important;
      font-family: Azo sans !important;
      background-color: #fff;
    }
  }
  .left {
    width: 100%;
    form {
      display: flex;
      flex-direction: column;
    }

    button {
      width: 100%;
      padding: 10px;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      margin-top: 1rem;

      &:disabled {
        cursor: not-allowed;
      }
    }
  }

  .right {
    width: 50%;
    video {
      width: 100%;
      height: calc(100vh - 200px);
    }
  }
`;

const VideoListWrapper = styled.div`
  .left {
    width: 40%;
    label {
      display: flex;
      flex-direction: column;

      span {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      input {
        margin-bottom: 10px;
      }
      input {
        width: 100%;
        border: 1px solid #e5e5e5;
        font-style: normal;
        font-weight: 400;
        font-size: 1rem;
        line-height: 16px;
        color: #000000;
        border-radius: 6px;
        padding: 8px;
        background-color: #fff;
      }
      textarea {
        border: 1px solid #e5e5e5;
        background: #fff;
        color: #000;
        padding: 8px;
      }
      .select {
        width: 100%;
        font-style: normal;
        font-weight: 400;
        font-size: 1rem;
        line-height: 20px;
        color: #000000;
        border: 1px solid #000 !important;
        font-family: Azo sans !important;
        background-color: #fff;
      }
    }
  }
`;

const CategoryWrapper = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
  }

  .table {
    margin-top: 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06), 0 3px 6px rgba(0, 0, 0, 0.03);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* box-shadow: rgb(20 21 33 / 18%) 0px 2px 10px 0px; */

    thead {
      width: 100%;
      tr {
        display: flex;
        /* background: #006786; */
        /* border-radius: 6px 6px 0px 0px; */
        border-bottom: 1px solid rgba(159, 160, 184, 0.3);

        th.col {
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 24px;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: start;
          text-align: center;
          font-family: "Azo sans";
          padding: 15px 12px 10px 20px;
        }
      }
    }

    tbody {
      background: #fff;
      tr {
        display: flex;
        /* border-bottom: 1px solid rgba(159, 160, 184, 0.3); */
        justify-content: space-between;

        td.col {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          display: flex;
          align-items: center;
          justify-content: start;
          color: rgba(0, 0, 0, 0.7);
          text-align: center;
          font-family: "Azo sans";
          padding: 5px;
        }

        img {
          width: 50px;
          height: 50px;
        }

        .btns {
          width: 40%;
          display: flex;
          margin-left: 20px;
          justify-content: start;

          button {
            cursor: pointer;
            transition: 300ms;
            background: transparent;

            svg {
              fill: none;
              width: 20px;
              height: 20px;
              /* fill: rgb(253, 181, 40); */
            }
          }
        }
      }
    }
  }

  .wrap {
    display: flex;
    gap: 50px;
    .left,
    .right {
      width: 50%;
    }
  }

  .checkInput {
    width: 30px !important;
    height: 30px !important;
    background-color: #fff;
  }
`;

const VideoListWrap = styled.div`
  display: flex;

  .files {
    width: 100%;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    /* justify-content: space-between; */
  }
`;

const CardProWrap = styled.div`
  margin-top: 30px;
  /* display: flex !important; */
  width: 30%;
  .card {
    border: none;
    display: flex;
    align-items: start;
    height: 100%;
    video {
      width: 100% !important;
      height: 300px !important;
    }
    img {
      width: 100%;
      height: 300px;
      object-fit: contain;
    }

    .bottom {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: start;
      gap: 10px;
      margin-top: 10px;
    }

    .delete {
      background-color: transparent;
      border: none;
    }

    .orginalName {
      font-size: 16px;
      font-weight: 500;
      color: #000;
      line-height: 24px;
      margin: 0;
    }
  }
`;

export {
  VideoListWrapper,
  VideoWrapper,
  CategoryWrapper,
  CardProWrap,
  VideoListWrap,
};
