import React from "react";
import styles from "./badge.module.scss";
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
  disabled?: boolean;
  active?: boolean;
  lighten?: boolean;
  icon?: React.ComponentProps<typeof Icon>;
  className?: string;
}

const Badge = ({
  text,
  size = "xxs",
  color = "positive",
  textColor = "light",
  onClick = () => null,
  link = false,
  outline = false,
  boxShadow = false,
  disabled = false,
  active = false,
  lighten = false,
  icon,
  className,
}: IProps) => {
  const classes = cx(
    {
      badge: true,
      link,
      disabled,
      active,
      outline,
      boxShadow,
      icon,
      lighten,
      [`background-${color}`]: color,
    },
    className
  );
  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {text && (
        <Content
          className={styles.content}
          text={text}
          size={size}
          color={textColor}
        />
      )}
      {icon && <Icon {...icon} />}
    </button>
  );
};

export default Badge;
