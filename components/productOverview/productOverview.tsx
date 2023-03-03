import React from "react";
import styles from "./productOverview.module.scss";
import classNames from "classnames/bind";
import { Tile, Title, Content } from "@ui";
import { Icon } from "@helper";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  href?: string;
  index?: string;
  title?: React.ComponentProps<typeof Title>;
  content?: React.ComponentProps<typeof Content>;
  icon?: React.ComponentProps<typeof Icon>;
}

const ProductOverview = ({ className, title, content, icon }: IProps) => {
  const classes = cx(
    {
      productOverview: true,
    },
    className
  );

  return (
    <div className={classes}>
      {icon && <Icon className={styles.icon} size={"xs"} {...icon} />}
      <div className={styles.wrapper}>
        {title && <Content size={"xxs"} emphasize {...title} />}
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

export default ProductOverview;
