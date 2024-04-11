import React, { useEffect, useState } from "react";
import { TableStatisticWrap } from "./style";
import OrderProvider from "../../../../../Data/OrderProvider";
import moment from "moment";

const TableStatistic = ({ dateString }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    OrderProvider.getTableStatisticsOrder(dateString[0], dateString[1])
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dateString]);

  return (
    <TableStatisticWrap>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{ minWidth: "20%" }} className="col">
              Mahsulot nomi
            </th>
            <th style={{ minWidth: "20%" }} className="col">
              Soni
            </th>
            <th style={{ minWidth: "20%" }} className="col">
              Narxi
            </th>
            <th style={{ minWidth: "20%" }} className="col">
              Jami narxi
            </th>
            <th style={{ minWidth: "20%" }} className="col">
              Sana
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{ minWidth: "20%" }} className="col">
                {index + 1}. {item.productName}
              </td>
              <td style={{ minWidth: "20%" }} className="col">
                {item.totalQuantity}
              </td>
              <td style={{ minWidth: "20%" }} className="col">
                {item.price}
              </td>
              <td style={{ minWidth: "20%" }} className="col">
                {item.totalPrice}
              </td>
              <td style={{ minWidth: "20%" }} className="col">
                {moment(new Date(item.createdAt)).format("DD.MM.YYYY HH:mm")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableStatisticWrap>
  );
};

export default TableStatistic;
