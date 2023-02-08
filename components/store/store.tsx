import React from "react";
import styles from "./store.module.scss";
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

const Store = ({ className, href, index, title, content, icon }: IProps) => {
  const classes = cx(
    {
      store: true,
    },
    className
  );

  return (
    <Tile href={href} className={classes} boxShadow borderRadius>
      {icon && <Icon size={"xs"} {...icon} />}
      {index && (
        <Content
          className={styles.index}
          size={"xs"}
          text={`${index}`}
          color={"dark"}
          emphasize
        />
      )}
      <div className={styles.wrapper}>
        {title && <Title tag={"h6"} {...title} />}
        {content && <Content size={"xs"} color={"stable-700"} {...content} />}
      </div>
    </Tile>
  );
};

export default Store;
