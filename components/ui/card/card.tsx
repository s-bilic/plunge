import React from "react";
import Link from "next/link";
import styles from "./card.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface IProps {
  borderRadius?: boolean;
  padding?: boolean;
  boxShadow?: boolean;
  overflow?: boolean;
  children?: React.ReactNode;
  color?: string;
  className?: string;
  href?: string;
}

const Card = ({
  borderRadius = false,
  padding = false,
  boxShadow = false,
  overflow = false,
  children,
  color,
  className,
  href,
}: IProps) => {
  const classes = cx(
    {
      card: true,
      borderRadius,
      padding,
      boxShadow,
      overflow,
      [`background-${color}`]: color,
    },
    className
  );

  const CustomComponent = () => <div className={classes}>{children}</div>;

  return href ? (
    <Link href={href}>
      <a>
        <CustomComponent />
      </a>
    </Link>
  ) : (
    <CustomComponent />
  );
};

export default Card;
