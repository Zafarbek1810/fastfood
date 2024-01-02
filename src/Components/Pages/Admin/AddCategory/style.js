import styled from "styled-components";

const AddCategoryWrapper = styled.div`
    .wrapper{
        display: flex;
        flex-wrap: wrap;
        gap: 12px;

    }

    .ant-card-meta{
        display: flex;
        flex-direction: column !important;
        align-items: center;

        .ant-avatar{
            width: 130px;
            height: 130px;
            border-radius: 1px;
            img{
                width: 130px;
                height: 130px;
                object-fit: contain;
            }
        }
    }
`

export{AddCategoryWrapper}