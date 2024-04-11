import styled from "styled-components";

const CompanyWrapper = styled.div`
  .top {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  table {
    
    thead {
      width: 100%;
      tr {
        display: flex;
        border-bottom: 1px solid rgba(159, 160, 184, 0.3);

        th{
            font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          color: #000;
          display: flex;
          align-items: center;
          /* padding: 15px 12px 10px 20px; */
        }
      }
    }
    tbody {
      width: 100%;

      tr {
        display: flex;
        width: 100%;
        cursor: pointer;

        td{
            font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          display: flex;
          align-items: center;
          justify-content: start;
          color: rgba(0, 0, 0, 0.7);
        }
      }
    }
  }
`;

const AddCompanyWrapper = styled.div`
 form {
    background: #fff;
    font-family: "Inter";
    width: 100%;

    .label {
      width: 100%;
      display: block;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      margin-bottom: 30px;
      font-family: Azo sans;

      span.label-text {
        font-style: normal;
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 18px;
        color: #000000;
        margin-bottom: 8px;
      }

      input {
        font-style: normal;
        font-weight: 400;
        font-size: 1rem;
        line-height: 16px;
        color: #000000;
        border-radius: 6px;
        padding: 10px 10px;

        /* &:focus{
          border: red;
          box-shadow: 0 0 0 0.1rem rgba(255,99,71);
        } */
      }

      span.err-text {
        color: red !important;
        position: absolute;
        right: 0;
        top: 0;
      }

    }

      button {
        width: 100%;
        text-align: center;
        font-style: normal;
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 18px;
        border-radius: 4px;
        padding: 12px 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Azo sans;

        &:disabled {
          cursor: not-allowed;
          opacity: 0.8;
        }
      }
  }
`

export { CompanyWrapper, AddCompanyWrapper };
