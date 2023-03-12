import React from "react";
import styles from "./empty.module.scss";
import classNames from "classnames/bind";
import { Title, Content } from "@ui";
import { Icon } from "@helper";
const cx = classNames.bind(styles);

interface IProps {
  className?: string;
}

const Empty = ({
  className,
  title,
  content,
  icon = { name: "empty" },
}: IProps) => {
  const classes = cx(
    {
      empty: true,
    },
    className
  );

  return (
    <div className={classes}>
      {icon && (
        <Icon
          name={"empty"}
          size={"xs"}
          color={"stable-500"}
          stroke
          {...icon}
        />
      )}
      {title && <Content className={styles.title} size={"l"} {...title} />}
      {content && <Content size={"xxs"} color={"stable-500"} {...content} />}
    </div>
  );
};
export default Empty;
