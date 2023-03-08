import React from "react";
import classNames from "classnames/bind";
import styles from "./breadcrumbs.module.scss";
import { Badge } from "@ui";
import { Icon } from "@helper";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
}

const Breadcrumbs = ({ className, items }: IProps) => {
  const classes = cx({ breadcrumbs: true }, className);

  return (
    <div className={classes}>
      {items?.map((item, index) => (
        <React.Fragment key={index}>
          <Badge
            className={styles.badge}
            color={"royal"}
            textColor={"royal"}
            lighten
            {...item}
          />
          {index !== items?.length - 1 && (
            <Icon name={"arrow-right"} size={"xxxs"} {...item} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
