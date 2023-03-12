import React from "react";
import classNames from "classnames/bind";
import styles from "./chart.module.scss";
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  type: string;
  width: number;
  height: number;
  seriesName: string;
  seriesData: number[];
  optionsCategories: string[];
}
const Chart = ({
  className,
  type,
  width,
  height,
  seriesName,
  seriesData,
  optionsCategories,
}: IProps) => {
  let classes = cx({ chart: true }, className);

  const chartData = {
    series: [
      {
        name: seriesName,
        data: seriesData,
      },
    ],
    options: {
      colors: ["#512da8"],
      chart: {
        height: 350,
        type: type,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: optionsCategories,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  return (
    <div className={classes}>
      <ApexCharts width={width} height={height} {...chartData} />
    </div>
  );
};

export default Chart;
