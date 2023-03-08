import React from "react";
import styles from "./store.module.scss";
import classNames from "classnames/bind";
import { Tile, Title, Content, Button } from "@ui";
import { Icon } from "@helper";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  href?: string;
  index?: string;
  title?: React.ComponentProps<typeof Title>;
  content?: React.ComponentProps<typeof Content>;
  icon?: React.ComponentProps<typeof Icon>;
  button?: React.ComponentProps<typeof Button>;
}

const Store = ({
  className,
  href,
  index,
  title,
  content,
  icon,
  button,
}: IProps) => {
  const classes = cx(
    {
      store: true,
    },
    className
  );

  return (
    <div className={classes}>
      {button && (
        <Button
          className={styles.delete}
          link
          icon={{ name: "delete", size: "xxs" }}
          {...button}
        />
      )}
      <Tile href={href} className={styles.tile} borderRadius>
        {icon && <Icon size={"xs"} color={"energized"} {...icon} />}
        <div className={styles.wrapper}>
          {title && <Title tag={"h6"} {...title} />}
          {content && <Content size={"xs"} color={"stable-700"} {...content} />}
        </div>
      </Tile>
    </div>
  );
};

export default Store;
