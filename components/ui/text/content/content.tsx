import React from "react";
import classNames from "classnames/bind";
import styles from "./content.module.scss";

const cx = classNames.bind(styles);

interface IProps {
  text?: string;
  color?: string;
  size?: string;
  inline?: boolean;
  italic?: boolean;
  emphasize?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Content = ({
  text,
  color = "dark",
  size = "m",
  inline = false,
  italic = false,
  emphasize = false,
  className,
  children,
}: IProps) => {
  const classes = cx(
    {
      content: true,
      italic,
      emphasize,
    },
    className,
    [`color-${color}`],
    [`font-${size}`]
  );

  const CustomComponent = inline ? "span" : "p";

  return (
    <CustomComponent className={classes}>
      {text}
      {children}
    </CustomComponent>
  );
};

export default Content;
