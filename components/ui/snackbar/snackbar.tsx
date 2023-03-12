import React from "react";
import styles from "./snackbar.module.scss";
import classNames from "classnames/bind";
import { Title, Content, Card, Button } from "@ui";
import { Icon } from "@helper";
import Toggle from "react-toggle";
const cx = classNames.bind(styles);

interface IProps {
  className?: string;
}

const Snackbar = ({
  className,
  title,
  content,
  icon,
  button,
  toggle,
}: IProps) => {
  const classes = cx(
    {
      snackbar: true,
    },
    className
  );

  return (
    <Card className={classes} borderRadius padding>
      <div className={styles.wrapper}>
        {icon && (
          <Icon className={styles.icon} size={"xxxs"} stroke {...icon} />
        )}
        <div>
          {title && (
            <Content
              className={styles.title}
              size={"xs"}
              emphasize
              {...title}
            />
          )}
          {content && <Content size={"xxxs"} {...content} />}
        </div>
      </div>
      {button && <Button size={"xs"} color={"royal"} {...button} />}
      {toggle && <Toggle {...toggle} />}
    </Card>
  );
};
export default Snackbar;
