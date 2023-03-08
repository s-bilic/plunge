import React from "react";
import classNames from "classnames/bind";
import styles from "./heading.module.scss";
import { Title, Content, Button } from "@ui";
import { Icon } from "@helper";
const cx = classNames.bind(styles);

interface IProps {
  children?: React.ReactNode;
  className?: string;
  title?: React.ComponentProps<typeof Title>;
  content?: React.ComponentProps<typeof Content>;
  button?: React.ComponentProps<typeof Button>;
}

const Heading = ({ className, title, content, button, icon }: IProps) => {
  let classes = cx({ heading: true }, className);

  return (
    <div className={classes}>
      <div className={styles.wrapper}>
        {title && (
          <Title
            className={styles.title}
            tag={"h4"}
            color={"dark"}
            {...title}
          />
        )}
        <div className={styles.content}>
          {content && <Content size={"m"} color={"stable-500"} {...content} />}
          {icon && <Icon className={styles.icon} {...icon} />}
        </div>
        {button && <Button {...button} />}
      </div>
    </div>
  );
};

export default Heading;
