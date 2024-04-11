import styled from "styled-components";

const Styled = styled.div`
 table {
        width: 50%;
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

`

export{Styled}