import React, { useEffect, useState } from "react";
import { StatisticStayled } from "./style";
import { Card, Col, Row, DatePicker, Tooltip } from "antd";
import CountUp from "react-countup";
import OrderProvider from "../../../../Data/OrderProvider";
import TableStatistic from "./TableStatistic";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import { Button } from "@mui/material";

const Statistic = () => {
  const [statistic, setStatistic] = useState([]);
  const dateFormat = "YYYY-MM-DD";

  useEffect(() => {
    OrderProvider.getGeneralStatistics()
      .then((res) => {
        setStatistic(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const formattedDate2 =
    yesterday.getFullYear() +
    "-" +
    ("0" + (yesterday.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + yesterday.getDate()).slice(-2);
  const formattedDate =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);
  const [dateString, setDateString] = useState([formattedDate, formattedDate]);


  const downloadExcel = () => {
    OrderProvider.downloadExcel(dateString[0], dateString[1])
      .then((res) => {
        console.log(res);
        const blob = new Blob([res.data], {
          type: "application/xlsx",
        });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        //no download
        // link.target = "_blank";
        // link.click();

        link.download = `Hisobot.xlsx`;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <StatisticStayled>
      <div className="top">
        <h3>Umumiy statistika</h3>
        <div className="col-3 d-flex">
          <Tooltip title="Excel yuklash">
            <Button onClick={() => downloadExcel()}>
              <img src="/images/excelicon.png" alt="xls" />
            </Button>
          </Tooltip>
          <Tooltip title="Sana bo'yicha filter">
            <RangePicker
              size="large"
              defaultValue={[
                dayjs(formattedDate, dateFormat),
                dayjs(formattedDate, dateFormat),
              ]}
              onChange={(date, dateString) => {
                setDateString(dateString);
              }}
            />
          </Tooltip>
        </div>
      </div>
      <Row gutter={12} style={{ marginBottom: 30 }}>
        <Col span={6}>
          <Card bordered={true} className="topCards">
            <h3>Kunlik</h3>
            <div bordered={true} className="bottom">
              <p>Kirim:</p>{" "}
              <span>
                {statistic.currentDayIncome ? (
                  <CountUp end={statistic.currentDayIncome} separator=" " />
                ) : (
                  "0"
                )}
              </span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={true} className="topCards">
            <h3>Haftalik</h3>
            <div className="bottom">
              <p>Kirim:</p>{" "}
              <span>
                {statistic.currentWeekIncome ? (
                  <CountUp end={statistic.currentWeekIncome} separator=" " />
                ) : (
                  "0"
                )}
              </span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={true} className="topCards">
            <h3>Oylik</h3>

            <div className="bottom">
              <p>Kirim:</p>{" "}
              <span>
                {statistic.currentMonthIncome ? (
                  <CountUp end={statistic.currentMonthIncome} separator=" " />
                ) : (
                  "0"
                )}
              </span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={true} className="topCards">
            <h3>Yillik</h3>
            <div className="bottom">
              <p>Kirim:</p>{" "}
              <span>
                {statistic.currentYearIncome ? (
                  <CountUp end={statistic.currentYearIncome} separator=" " />
                ) : (
                  "0"
                )}
              </span>
            </div>
          </Card>
        </Col>
      </Row>

      <TableStatistic dateString={dateString} />
    </StatisticStayled>
  );
};

export default Statistic;
