import styled from "styled-components";

const StatisticStayled = styled.div`
 .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h3 {
      font-size: 1.5rem;
      font-weight: 600;
    }

    img{
      width: 20px;
      height: 20px;
    }
  }

.topCards {
    .bottom {
      display: flex;
      justify-content: space-between;
    }

    h3{
      color: rgba(0, 0, 0, 0.5);

    }

    p, span{
      font-size: 20px;
    }
   
  }

`

export{ StatisticStayled }