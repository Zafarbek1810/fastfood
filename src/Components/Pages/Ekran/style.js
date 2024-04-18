import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  /* padding: 20px; */
  position: relative;
  height: 100vh;
  overflow-y: hidden;

  .logout {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    border-radius: 6px;
    padding: 5px;
    color: #008000;
  }

  h1,
  h2 {
    font-size: 44px;
    text-transform: uppercase;
  }

  .left {
    width: 35%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      color: #000;
      border: 1px solid #ffef00;
      padding: 5px;
      background-color: #ffef00;
      width: 100%;
    }

    .numbers {
      display: flex;
      flex-direction: column;
      height: 90vh;
      flex-wrap: wrap;
    }

    h2 {
      color: #000;
      border: 1px solid #ffef00;
      background-color: #ffef00;
      border-radius: 50%;
      width: 120px;
      font-size: 58px;
      height: 19%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 25px 5px 25px;
    }
  }

  .middle {
    width: 30%;
    height: 100vh;
    /* border-right: 1px solid #555; */
    /* border-left: 1px solid #555; */

    video {
      height: 100%;
      width: 100%;

      -webkit-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);
    }
  }

  .right {
    width: 35%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;

    .numbers {
      display: flex;
      flex-direction: column;
      height: 90vh;
      flex-wrap: wrap;
    }

    h1 {
      color: #fff;
      border: 1px solid #008000;
      background-color: #008000;
      padding: 5px;
      width: 100%;
    }

    h2 {
      color: #fff;
      border: 1px solid #fff;
      background-color: #008000;
      border-radius: 50%;
      font-size: 58px;
      width: 120px;
      height: 19%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 25px 5px 25px;
    }
  }

  .fade-in {
    opacity: 0;
    animation: fadeIn 1s ease forwards;
  }

  .ant-modal-content {
    background: transparent !important;
    backdrop-filter: blur(20px) !important;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export { Wrapper };
