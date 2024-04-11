import styled from "styled-components";

const AudioAddWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  h3{
    margin-bottom: 20px;
  }
  label {
    /* display: flex;
    flex-direction: column; */
    margin-bottom: 20px;

    span {
      /* font-size: 1.5rem; */
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

    .radio{
        display: flex;
        flex-direction: row;
    }
  }
`;

export { AudioAddWrapper };
