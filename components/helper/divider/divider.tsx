import React from "react";
import classNames from "classnames/bind";
import styles from "./divider.module.scss";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

const Divider = ({
  className,
  width,
  height,
  color = "transparent",
}: IProps) => {
  let classes = cx(
    {
      divider: true,
      [`background-${color}`]: color,
    },
    className
  );

  return (
    <div className={classes}>
      <span
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      ></span>
    </div>
  );
};

export default Divider;
