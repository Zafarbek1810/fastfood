import styled from "styled-components";

const Wrapper = styled.div`
  background: #fff;
  border-bottom: 1px solid #999;

  .wrap {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    height: 60px;
    font-family: Azo sans;

    .left {
      width: 15%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #999;
    }

    .middle {
      width: 55%;
      height: 100%;
      border-right: 1px solid #999;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .right {
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: end;
      h3 {
        font-size: 20px;
        margin-right: 20px;
        margin-bottom: 0;
      }

      @keyframes bell {
        0% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(10deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }

      button {
        background: transparent;
        border: none;
        color: #000;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;

        img {
          width: 20px;
        }
      }

      svg {
        width: 20px;
      }
    }
  }
`;

export { Wrapper };
