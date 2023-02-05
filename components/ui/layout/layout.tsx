import React from "react";
import styles from "./layout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  children: React.ReactNode;
}

const Layout = ({ className, children }: IProps) => {
  const classes = cx(
    {
      layout: true,
    },
    className
  );

  return <div className={classes}>{children}</div>;
};

export default Layout;
