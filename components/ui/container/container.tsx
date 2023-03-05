import React from "react";
import classNames from "classnames/bind";
import styles from "./container.module.scss";

const cx = classNames.bind(styles);

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: IProps) => {
  let classes = cx({ container: true }, className);

  return <div className={classes}>{children}</div>;
};

export default Container;
