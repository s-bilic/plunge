import React from "react";
import Link from "next/link";
import styles from "./tile.module.scss";
import classNames from "classnames/bind";
import { Content, Button } from "@ui";

const cx = classNames.bind(styles);

interface IProps {
  header?: any;
  footer?: any;
  borderRadius?: boolean;
  padding?: boolean;
  boxShadow?: boolean;
  overflow?: boolean;
  children?: React.ReactNode;
  color?: string;
  className?: string;
  href?: string;
  onClick?: any;
}

const Tile = ({
  header,
  footer,
  borderRadius = false,
  padding = false,
  boxShadow = false,
  overflow = false,
  children,
  color = "light",
  className,
  href,
  onClick,
}: IProps) => {
  const classes = cx(
    {
      tile: true,
      borderRadius,
      padding,
      boxShadow,
      overflow,
      [`background-${color}`]: color,
    },
    className
  );

  const CustomComponent = (
    <div className={classes} onClick={onClick}>
      {header && (
        <div className={styles.header}>
          {header?.content && <Content {...header?.content} />}
        </div>
      )}
      {children && <div className={styles.body}>{children}</div>}
      {footer && (
        <div className={styles.footer}>
          {footer?.buttons?.map((item, index) => (
            <Button
              key={index}
              size={"xxs"}
              className={styles.button}
              {...item}
            />
          ))}
        </div>
      )}
    </div>
  );

  return href ? (
    <Link href={href} className={styles.link}>
      {CustomComponent}
    </Link>
  ) : (
    CustomComponent
  );
};

export default Tile;
