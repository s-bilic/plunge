import React from "react";
import { ReactSVG } from "react-svg";
import classNames from "classnames/bind";
import styles from "./icon.module.scss";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  name: string;
  size?: string;
  color?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

const Icon = ({
  className,
  name,
  size = "s",
  color = "dark",
  fill,
  stroke,
  strokeWidth,
}: IProps) => {
  let classes = cx(
    {
      icon: true,
      [`icon-${size}`]: size,
      [`icon-${color}`]: color,
    },
    className
  );

  const svgStyle = {
    fill,
    stroke,
    strokeWidth,
    color,
  };

  return (
    <>
      <ReactSVG
        color={color}
        src={`./icons/${name}.svg`}
        className={classes}
        style={svgStyle}
      />
    </>
  );
};

export default Icon;
