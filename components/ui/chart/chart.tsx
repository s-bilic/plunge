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
  options: any;
  series: any;
}

const Chart = ({ className, type, width, height, options, series }: IProps) => {
  let classes = cx({ chart: true }, className);

  return (
    <div className={classes}>
      <ApexCharts
        options={options}
        series={series}
        type={type}
        width={width}
        height={height}
      />
    </div>
  );
};

export default Chart;
