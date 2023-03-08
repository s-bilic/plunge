import React from "react";
import styles from "./product.module.scss";
import classNames from "classnames/bind";
import { Tile, Title, Content } from "@ui";
import { Icon } from "@helper";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  onClick?: string;
  index?: string;
  title?: React.ComponentProps<typeof Title>;
  content?: React.ComponentProps<typeof Content>;
  icon?: React.ComponentProps<typeof Icon>;
  active?: boolean;
}

const Product = ({
  className,
  onClick,
  title,
  content,
  icon,
  active,
}: IProps) => {
  const classes = cx(
    {
      product: true,
      active,
    },
    className
  );

  return (
    <div className={classes}>
      <Tile
        onClick={onClick}
        className={styles.tile}
        color={"light"}
        borderRadius
      >
        {icon && <Icon className={styles.icon} size={"s"} {...icon} />}
      </Tile>
      <div className={styles.wrapper}>
        {title && <Content size={"xs"} emphasize {...title} />}
        <div className={styles.currency}>
          {content && (
            <Content size={"s"} color={"dark"} emphasize {...content} />
          )}
          <Icon className={styles.iconCurrency} name={"sol"} size={"xxxxs"} />
          {/* <Icon name={"usdc"} size={"xxxs"} /> */}
        </div>
      </div>
    </div>
  );
};

export default Product;
