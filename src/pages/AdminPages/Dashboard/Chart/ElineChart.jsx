import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserApi } from "../../../../redux/Reducers/userAdminReducer";

const LineChart = ({}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserApi());
  }, []);

  const { arrUser } = useSelector((state) => state.userAdminReducer);
  const arrUserCount = arrUser.length;

  const options = {
    chart: {
      width: "100%",
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: ["#8c8c8c"],
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: [
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
          ],
        },
      },
      categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    },
  };

  const lineChart = {
    series: [
      {
        name: "Mobile apps",
        data: [50, 40, 60, 50, 70, 77, 80, 90, arrUserCount],
        offsetY: 0,
      },
      {
        name: "Websites",
        data: [67, 48, 82, 95, 103, 77, 70, 98, arrUserCount],
        offsetY: 0,
      },
    ],
  };

  const { Title, Paragraph } = Typography;

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Số lượng người dùng</Title>
          <Paragraph className="lastweek">
            Hơn tháng trước <span className="text-lime-400">+10%</span>
          </Paragraph>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
};

export default LineChart;
