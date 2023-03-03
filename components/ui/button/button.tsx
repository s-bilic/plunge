import React from "react";
import styles from "./button.module.scss";
import classNames from "classnames/bind";
import { Content } from "@ui";
import { Icon } from "@helper";

const cx = classNames.bind(styles);

interface IProps {
  text?: string;
  size?: string;
  color?: string;
  textColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  link?: boolean;
  outline?: boolean;
  boxShadow?: boolean;
  grow?: boolean;
  disabled?: boolean;
  icon?: React.ComponentProps<typeof Icon>;
  className?: string;
}

const Button = ({
  text,
  size = "m",
  color = "dark",
  textColor = "light",
  onClick = () => null,
  link = false,
  outline = false,
  boxShadow = false,
  grow = false,
  disabled = false,
  icon,
  className,
  title,
}: IProps) => {
  const classes = cx(
    {
      button: true,
      link,
      disabled,
      outline,
      boxShadow,
      icon,
      grow,

      [`background-${color}`]: color,
    },
    className
  );
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {text && <Content text={text} size={size} color={textColor} />}
      {icon && <Icon {...icon} />}
    </button>
  );
};

export default Button;
