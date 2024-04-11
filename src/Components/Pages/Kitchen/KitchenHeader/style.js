import styled from "styled-components";

const Wrapper = styled.div`
  background: #fff;
  border-bottom: 1px solid #999;

  .wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 10px;

    .center{
        span{
            background-color: #e74247;
            padding: 10px;
            border-radius: 5px;
            color: #fff;
        }
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: end;
      h3 {
        font-size: 20px;
        margin-right: 20px;
        margin-bottom: 0;
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
