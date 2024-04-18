import styled from "styled-components";

const Wrapper = styled.div`
  background: #fff;
  border-bottom: 1px solid #999;

  /* background: url('/images/login-bg.jpg'); */
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;


  .ant-modal-content {
    background: #fff !important;
  }

  .wrap {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    height: calc(100vh - 60px);

    .left {
      width: 15%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-y: auto;
      border-right: 1px solid #999;
      padding-top: 20px;

      button.card {
        margin-bottom: 20px;
        padding: 20px;
        width: 85%;
        height: 300px;

        img {
          width: 100%;
          min-height: 110px;
        }
      }
    }

    .middle {
      width: 55%;
      height: 100%;
      border-right: 1px solid #999;
      display: flex;
      flex-wrap: wrap;
      overflow-y: auto;
      gap: 15px;
      padding: 15px;

      .product {
        width: 200px;
        height: 270px;
        border: 1px solid rgba(0, 0, 0, 0.175);
        border-radius: 5px;
        text-align: center;
        background-color: #fff;
        cursor: pointer;
        img {
          width: 100%;
          height: 200px;
          object-fit: contain;
        }

        h4{
          font-size: 18px;
        }
      }
    }

    .right {
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      position: relative;
      margin-top: 15px;
      padding: 0 15px;

      .summ {
        position: absolute;
        top: 0;
        left: 0;
      }

      .orders {
        height: calc(100vh - 75px);
        width: 100%;
        overflow-y: scroll;

        .main{
        background-color: #fff;

        }

        .radios{
          width: 100%;
          position: absolute;
          bottom: 45px;
          right: 0;
          left: 0;

          label{
            width: 50% !important;
          }
        }

        button.order {
          color: #000;
          background-color: #80ff00;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          padding: 10px 0;
          gap: 10px;
          cursor: pointer;
          width: 100%;
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;

          &:disabled {
            cursor: not-allowed;
            opacity: 0.7;
          }
        }

        .orderItem {
          /* border: 1px solid rgba(0, 0, 0, 0.175); */
          margin-bottom: 15px;
          border-radius: 5px;

          span {
            font-size: 12px;
            button {
              background: transparent;
              border: none;
            }
          }
        }

        .top {
          display: flex;
          border-bottom: 1px solid rgba(0, 0, 0, 0.175);
          img {
            min-width: 50%;
            height: 140px;
            object-fit: contain;
            border-right: 1px solid rgba(0, 0, 0, 0.175);
          }

          .btns {
            width: 100%;
            display: flex;
            gap: 10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.175);
            padding-bottom: 15px;
            margin-bottom: 15px;
            button {
              width: 100%;
              border: none;
              padding: 10px;
              border-radius: 5px;
              svg {
                stroke: #fff;

                path {
                  stroke: #fff;
                }
              }
            }

            .edit {
              background-color: green;
            }

            .delete {
              background-color: red;
            }
          }
        }

        .bottom {
          h4 {
            text-align: center;
          }
        }
      }

      svg {
        width: 20px;
      }
    }
  }
`;

export { Wrapper };
