import React from "react";
import styles from "./totalCard.module.scss";
import classNames from "classnames/bind";
import { Badge, Title, Content, Card } from "@ui";
import { Icon } from "@helper";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  title?: React.ComponentProps<typeof Title>;
  content?: React.ComponentProps<typeof Content>;
  badge?: React.ComponentProps<typeof Badge>;
  icon?: React.ComponentProps<typeof Icon>;
  currency?: React.ComponentProps<typeof Icon>;
}

const TotalCard = ({ className, title, content, icon, currency }: IProps) => {
  const classes = cx(
    {
      totalCard: true,
    },
    className
  );

  return (
    <Card className={classes} color={"light"} borderRadius padding>
      <div className={styles.wrapper}>
        {icon && <Icon className={styles.icon} size={"xxs"} {...icon} />}
        {content && (
          <Content
            className={styles.title}
            color={"stable-500"}
            size={"m"}
            {...content}
          />
        )}
      </div>
      <div className={styles.currency}>
        {currency && <Icon size={"xxxs"} {...currency} />}
        {title && <Title tag={"h5"} {...title} />}
      </div>
    </Card>
  );
};

export default TotalCard;
