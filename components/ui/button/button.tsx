import React from "react";
import styles from "./button.module.scss";
import classNames from "classnames/bind";
import { Content, Icon } from "@components";

const cx = classNames.bind(styles);

interface IProps {
  text: string;
  size?: string;
  color?: string;
  textColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  link?: boolean;
  outline?: boolean;
  disabled?: boolean;
  icon?: React.ComponentProps<typeof Icon>;
  className?: string;
}

const Button = ({
  text,
  size = "m",
  color = "positive",
  textColor = "light",
  onClick = () => null,
  link = false,
  outline = false,
  disabled = false,
  icon,
  className,
}: IProps) => {
  const classes = cx(
    {
      button: true,
      link,
      disabled,
      outline,
      icon,
      [`background-${color}`]: color,
    },
    className
  );
  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {text && <Content text={text} size={size} color={textColor} />}
      {icon && <Icon {...icon} />}
    </button>
  );
};

export default Button;
