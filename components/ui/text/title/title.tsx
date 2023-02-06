import React from "react";
import classNames from "classnames/bind";
import styles from "./title.module.scss";

const cx = classNames.bind(styles);

interface IProps {
  tag?: React.ElementType;
  text: string;
  color?: string;
  className?: string;
}

const Title = ({ tag = "h1", text, color = "dark", className }: IProps) => {
  const classes = cx(
    {
      title: true,
    },
    [`color-${color}`],
    className
  );

  const CustomComponent = tag;

  return <CustomComponent className={classes}>{text}</CustomComponent>;
};

export default Title;
