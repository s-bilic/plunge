import React from "react";
import styles from "./product.module.scss";
import classNames from "classnames/bind";
import { Tile, Title, Content, Button } from "@ui";
import { Icon } from "@helper";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  onClick?: Function;
  title?: React.ComponentProps<typeof Title>;
  content?: React.ComponentProps<typeof Content>;
  icon?: React.ComponentProps<typeof Icon>;
  active?: boolean;
  button?: React.ComponentProps<typeof Button>;
  admin?: boolean;
  publicView?: boolean;
}

const Product = ({
  className,
  onClick,
  title,
  content,
  icon,
  active,
  button,
  admin,
  publicView,
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
      {button && admin && !publicView && (
        <Button
          className={styles.delete}
          link
          icon={{ name: "delete", size: "xxs" }}
          {...button}
        />
      )}
      <Tile
        onClick={onClick}
        className={styles.tile}
        color={"light"}
        borderRadius
      >
        {icon && <Icon className={styles.icon} size={"s"} {...icon} />}
      </Tile>
      <div className={styles.wrapper}>
        {title && (
          <Content className={styles.title} size={"xs"} emphasize {...title} />
        )}
        <div className={styles.currency}>
          {content && (
            <Content size={"xs"} color={"dark"} emphasize {...content} />
          )}
          <Icon className={styles.iconCurrency} name={"sol"} size={"xxxxs"} />
        </div>
      </div>
    </div>
  );
};

export default Product;
